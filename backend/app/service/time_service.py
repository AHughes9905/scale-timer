from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from models.timing_log import Log
from schemas.time_log_schema import TimeLogSchema

async def create_timing_log(db: AsyncSession, user_id: int, scale_name: str, duration: int) -> Log:
    log = Log(user_id=user_id, scale_name=scale_name, duration=duration)
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return log

async def get_user_timings_by_scale(db: AsyncSession, user_id: int, scale_name: str) -> list[Log]:
    result = await db.execute(
        select(Log).where(
            Log.user_id == user_id,
            Log.scale_name == scale_name
        )
    )
    return [TimeLogSchema.from_orm(Log) for Log in result.scalars().all()]

async def get_user_timings(db: AsyncSession, user_id: int) -> list[Log]:
    print(f"Fetching timings for user_id: {user_id}")
    result = await db.execute(select(Log).where(Log.user_id == user_id))
    return [TimeLogSchema.from_orm(Log) for Log in result.scalars().all()]