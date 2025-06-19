from pydantic import Basemodel

class LogSchema(Basemodel):
    user_id: str
    scale_name: str
    duration: int
    created_at: str
    
    class Config:
        orm_mode = True