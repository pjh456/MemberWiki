from typing import Any

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.request_id import get_request_id


class AppError(Exception):
    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = 400,
        details: dict[str, Any] | None = None,
    ) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details or {}


def error_payload(
    *,
    code: str,
    message: str,
    request_id: str,
    details: dict[str, Any] | list[dict[str, Any]] | None = None,
) -> dict[str, dict[str, Any]]:
    return {
        "error": {
            "code": code,
            "message": message,
            "details": details or {},
            "request_id": request_id,
        }
    }


def error_response(
    *,
    status_code: int,
    code: str,
    message: str,
    request_id: str,
    details: dict[str, Any] | list[dict[str, Any]] | None = None,
) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content=jsonable_encoder(
            error_payload(
                code=code,
                message=message,
                details=details,
                request_id=request_id,
            )
        ),
    )


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    return error_response(
        status_code=exc.status_code,
        code=exc.code,
        message=exc.message,
        details=exc.details,
        request_id=get_request_id(request),
    )


async def validation_error_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    return error_response(
        status_code=422,
        code="VALIDATION_ERROR",
        message="Request validation failed",
        details=exc.errors(),
        request_id=get_request_id(request),
    )


async def http_error_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    code_by_status = {
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        405: "METHOD_NOT_ALLOWED",
    }
    return error_response(
        status_code=exc.status_code,
        code=code_by_status.get(exc.status_code, "HTTP_ERROR"),
        message=str(exc.detail),
        request_id=get_request_id(request),
    )


async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
    return error_response(
        status_code=500,
        code="INTERNAL_ERROR",
        message="Internal server error",
        request_id=get_request_id(request),
    )


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppError, app_error_handler)
    app.add_exception_handler(RequestValidationError, validation_error_handler)
    app.add_exception_handler(StarletteHTTPException, http_error_handler)
    app.add_exception_handler(Exception, unhandled_error_handler)
