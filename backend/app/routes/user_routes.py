from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from service import user_service
from auth import dependencies

router = APIRouter()

@router.get("/user/times/{user_id}")
async def get_user_times(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: int = Depends(dependencies.get_current_user)
):
    result = await user_service.get_user_timings(db, user_id)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user."}
    
@router.get("/user/times/{user_id}/{scale_name}")
async def get_user_times_by_scale(
    user_id: int,
    scale_name: str,
    db: AsyncSession = Depends(get_db),
    current_user: int = Depends(dependencies.get_current_user)
):
    result = await user_service.get_user_timings_by_scale(db, user_id, scale_name)
    if result:
        return result
    else:
        return {"message": "No timing logs found for this user and scale."}