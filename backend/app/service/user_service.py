from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from models.timing_log import Log
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

async def create_user(db: AsyncSession, username: str, email: str, password: str) -> User:
    hashed_password = get_password_hash(password)
    user = User(username=username, email=email, hashed_password=hashed_password)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def get_user_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalars().first()

async def get_user_timings(db: AsyncSession, user_id: int) -> list[Log]:
    result = await db.execute(select(Log).where(User.id == user_id))
    return result.scalars().all()
    
async def get_user_timings_by_scale(db: AsyncSession, user_id: int, scale_name: str) -> list[Log]:
    result = await db.execute(
        select(Log).where(
            Log.user_id == user_id,
            Log.scale_name == scale_name
        )
    )
    return result.scalars().all()

async def create_timing_log(db: AsyncSession, user_id: int, scale_name: str, duration: int) -> Log:
    log = Log(user_id=user_id, scale_name=scale_name, duration=duration)
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return log