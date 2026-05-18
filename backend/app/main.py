from fastapi import FastAPI

from app.api.v1.router import router as api_v1_router
from app.core.errors import register_exception_handlers
from app.core.request_id import register_request_id_middleware


app = FastAPI(title="MemberWiki API", version="0.1.0")
register_request_id_middleware(app)
register_exception_handlers(app)
app.include_router(api_v1_router)
