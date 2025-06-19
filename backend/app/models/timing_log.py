from sqlalchemy import Column, Integer, String, DateTime
from db.database import Base
from pydantic import BaseModel
from datetime import datetime

class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    scale_name = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    duration = Column(Integer)

# Pydantic model for request/response
class LogCreate(BaseModel):
    user_id: str
    scale_name: str
    duration: int

    class Config:
        orm_mode = True

class LogResponse(BaseModel):
    id: int
    user_id: str
    scale_name: str
    created_at: datetime
    duration: int

    class Config:
        orm_mode = True