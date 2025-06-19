from datetime import datetime, timedelta
from jose import jwt

def create_access_token(data: dict, secret: str, algorithm: str, expires_minutes: int = 120):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret, algorithm=algorithm)
