import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    api_v1_prefix: str = "/api/v1"
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./backend/data/memberwiki.db")


settings = Settings()