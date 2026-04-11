from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_ok() -> None:
    resp = client.get("/api/v1/health")
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["status"] == "ok"
    assert "timestamp" in payload


def test_health_post_not_allowed() -> None:
    resp = client.post("/api/v1/health")
    assert resp.status_code == 405