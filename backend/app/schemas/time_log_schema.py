from pydantic import BaseModel

class TimeLogSchema(BaseModel):
    user_id: int
    scale_name: str
    duration: int
    
    class Config:
        orm_mode = True
        from_attributes = True