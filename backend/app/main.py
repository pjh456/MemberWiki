from datetime import datetime, timezone

from fastapi import APIRouter, FastAPI

from app.core.config import settings

app = FastAPI(title="MemberWiki API", version="0.1.0")
api_router = APIRouter(prefix=settings.api_v1_prefix)


@api_router.get("/health", tags=["System"])
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }


app.include_router(api_router)