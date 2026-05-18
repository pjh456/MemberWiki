from contextvars import ContextVar
from uuid import uuid4

from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

REQUEST_ID_HEADER = "X-Request-ID"
_request_id_context: ContextVar[str | None] = ContextVar("request_id", default=None)


def new_request_id() -> str:
    return uuid4().hex


def get_request_id(request: Request | None = None) -> str:
    if request is not None:
        request_id = getattr(request.state, "request_id", None)
        if request_id:
            return request_id

    return _request_id_context.get() or new_request_id()


class RequestIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        request_id = request.headers.get(REQUEST_ID_HEADER) or new_request_id()
        request.state.request_id = request_id
        token = _request_id_context.set(request_id)
        try:
            response = await call_next(request)
        except Exception:
            from app.core.errors import error_response

            response = error_response(
                status_code=500,
                code="INTERNAL_ERROR",
                message="Internal server error",
                request_id=request_id,
            )
        finally:
            _request_id_context.reset(token)

        response.headers[REQUEST_ID_HEADER] = request_id
        return response


def register_request_id_middleware(app: FastAPI) -> None:
    app.add_middleware(RequestIdMiddleware)
