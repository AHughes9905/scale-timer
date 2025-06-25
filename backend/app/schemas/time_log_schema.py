from pydantic import BaseModel
import datetime

class TimeLogSchema(BaseModel):
    user_id: int
    scale_name: str
    duration: int
    created_at: datetime.datetime
    
    class Config:
        orm_mode = True
        from_attributes = True

class TimeLogCreateSchema(BaseModel):
    user_id: int
    scale_name: str
    duration: int
    
    class Config:
        orm_mode = True
        