from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from passlib.context import CryptContext

def authenticate_user(db: AsyncSession, username: str, password: str) -> User | None:
    """
    Authenticate a user by username and password.
    Returns the user if authentication is successful, otherwise None.
    """
    user = db.execute(select(User).where(User.username == username)).scalars().first()
    if user and CryptContext(schemes=["bcrypt"]).verify(password, user.hashed_password):
        return user
    return None