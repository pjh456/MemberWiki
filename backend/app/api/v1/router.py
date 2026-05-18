from datetime import datetime, timezone

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(prefix=settings.api_v1_prefix)


@router.get("/health", tags=["System"])
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
