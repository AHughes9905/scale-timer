from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from service import time_service
from auth import dependencies
from schemas.time_log_schema import TimeLogSchema
from models.user import User

router = APIRouter()


@router.get("/{user_id}/{scale_name}")
async def get_user_times_by_scale(
    user_id: int,
    scale_name: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(dependencies.get_current_user)
):
    result = await time_service.get_user_timings_by_scale(db, user_id, scale_name)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user and scale."}
    
@router.get("/{user_id}")
async def get_user_times(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(dependencies.get_current_user)
):
    result = await time_service.get_user_timings(db, user_id)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user."}
    
@router.post("/create")
async def create_timing_log(
    timing_log: TimeLogSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(dependencies.get_current_user)
):
    log = await time_service.create_timing_log(db, current_user.id, timing_log.scale_name, timing_log.duration)
    return log