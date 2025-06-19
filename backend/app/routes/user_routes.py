from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from service import user_service

router = APIRouter()

@router.get("/user/times/{user_id}")
def get_user_times(user_id: int, db: AsyncSession = Depends(get_db)):
    result = user_service.get_user_timings(db, user_id)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user."}
    
@router.get("/user/times/{user_id}/{scale_name}")
def get_user_times_by_scale(user_id: int, scale_name: str, db: AsyncSession = Depends(get_db)):
    result = user_service.get_user_timings_by_scale(db, user_id, scale_name)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user and scale."}