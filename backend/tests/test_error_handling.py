from fastapi import APIRouter, FastAPI
from fastapi.testclient import TestClient

from app.api.v1.router import router as api_v1_router
from app.core.errors import AppError
from app.core.errors import register_exception_handlers
from app.core.request_id import REQUEST_ID_HEADER
from app.core.request_id import register_request_id_middleware


def create_test_client(extra_router: APIRouter | None = None) -> TestClient:
    test_app = FastAPI()
    register_request_id_middleware(test_app)
    register_exception_handlers(test_app)
    test_app.include_router(api_v1_router)
    if extra_router is not None:
        test_app.include_router(extra_router)
    return TestClient(test_app)


client = create_test_client()


def test_health_response_has_request_id() -> None:
    resp = client.get("/api/v1/health")

    assert resp.status_code == 200
    assert resp.headers[REQUEST_ID_HEADER]


def test_request_id_header_is_preserved() -> None:
    request_id = "req_test_123"

    resp = client.get("/api/v1/health", headers={REQUEST_ID_HEADER: request_id})

    assert resp.status_code == 200
    assert resp.headers[REQUEST_ID_HEADER] == request_id


def test_not_found_uses_error_contract() -> None:
    resp = client.get("/api/v1/missing")

    assert resp.status_code == 404
    assert resp.headers[REQUEST_ID_HEADER]
    payload = resp.json()
    assert payload["error"]["code"] == "NOT_FOUND"
    assert payload["error"]["message"] == "Not Found"
    assert payload["error"]["request_id"] == resp.headers[REQUEST_ID_HEADER]


def test_method_not_allowed_uses_error_contract() -> None:
    resp = client.post("/api/v1/health")

    assert resp.status_code == 405
    payload = resp.json()
    assert payload["error"]["code"] == "METHOD_NOT_ALLOWED"
    assert payload["error"]["request_id"] == resp.headers[REQUEST_ID_HEADER]


def test_validation_error_uses_error_contract() -> None:
    test_router = APIRouter()

    @test_router.get("/__test__/items/{item_id}")
    def get_item(item_id: int) -> dict[str, int]:
        return {"item_id": item_id}

    resp = create_test_client(test_router).get("/__test__/items/not-an-int")

    assert resp.status_code == 422
    payload = resp.json()
    assert payload["error"]["code"] == "VALIDATION_ERROR"
    assert payload["error"]["message"] == "Request validation failed"
    assert payload["error"]["details"]
    assert payload["error"]["request_id"] == resp.headers[REQUEST_ID_HEADER]


def test_app_error_uses_error_contract() -> None:
    test_router = APIRouter()

    @test_router.get("/__test__/app-error")
    def raise_app_error() -> None:
        raise AppError(
            code="CONFLICT",
            message="State conflict",
            status_code=409,
            details={"field": "status"},
        )

    resp = create_test_client(test_router).get("/__test__/app-error")

    assert resp.status_code == 409
    payload = resp.json()
    assert payload["error"]["code"] == "CONFLICT"
    assert payload["error"]["message"] == "State conflict"
    assert payload["error"]["details"] == {"field": "status"}
    assert payload["error"]["request_id"] == resp.headers[REQUEST_ID_HEADER]


def test_unhandled_error_uses_error_contract() -> None:
    test_router = APIRouter()

    @test_router.get("/__test__/unhandled-error")
    def raise_unhandled_error() -> None:
        raise RuntimeError("boom")

    resp = create_test_client(test_router).get("/__test__/unhandled-error")

    assert resp.status_code == 500
    payload = resp.json()
    assert payload["error"]["code"] == "INTERNAL_ERROR"
    assert payload["error"]["message"] == "Internal server error"
    assert payload["error"]["request_id"] == resp.headers[REQUEST_ID_HEADER]
