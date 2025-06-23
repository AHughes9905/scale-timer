from sqlalchemy import Column, Integer, String, DateTime
from db.database import Base
from pydantic import BaseModel
from datetime import datetime

class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    scale_name = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    duration = Column(Integer)
