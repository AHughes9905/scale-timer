from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def authenticate_user(db: AsyncSession, username: str, password: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    user = result.scalars().first()
    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

async def create_user(db: AsyncSession, username: str, email: str, password: str) -> User:
    try:
        hashed_password = get_password_hash(password)
        user = User(username=username, email=email, hashed_password=hashed_password)
        print(f"New user id: {user.id}")
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user
    except Exception as e:
        print("Error creating user:", e)
        raise