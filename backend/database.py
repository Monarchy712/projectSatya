from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

# psycopg v3 drive use karinge aur postgres link fix karinge
_url = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1) if DATABASE_URL else ""


# engine create
engine = create_engine(_url, pool_pre_ping=True, pool_size=5, max_overflow=10)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
  # Session generate karke yield karinge
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
