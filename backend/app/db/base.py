from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# 让 Alembic 能拿到完整 metadata
from app.models.achievement import Achievement  # noqa: F401,E402
from app.models.media_asset import MediaAsset  # noqa: F401,E402
from app.models.profile import Profile  # noqa: F401,E402
from app.models.profile_draft import ProfileDraft  # noqa: F401,E402
from app.models.review_request import ReviewRequest  # noqa: F401,E402
from app.models.user import User  # noqa: F401,E402