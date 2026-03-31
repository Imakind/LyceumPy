import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Берем URL из переменных окружения (Docker Compose) или используем дефолт для локального запуска
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://aqbobek_admin:aqbobek_pass123@localhost:5432/aqbobek_lyceum")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
