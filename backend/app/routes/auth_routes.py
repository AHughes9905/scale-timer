from fastapi import APIRouter, Depends, Form, Response, HTTPException
from auth.auth import create_access_token
from schemas.user_schema import Token
from core.config import settings
from service.auth_service import authenticate_user
from service.auth_service import create_user
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    response: Response, 
    username: str = Form(...), 
    password: str = Form(...), 
    db: AsyncSession = Depends(get_db)
    ):
    print(f"Attempting to log in user: {username}")
    print(f"Password provided: {password}")
    user = await authenticate_user(db=db, username=username, password=password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user.username}, settings.SECRET_KEY, settings.ALGORITHM)
    # Set the token in an HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax"
    )
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register")
async def register_user(
    db: AsyncSession = Depends(get_db),
    username: str = Form(...),
    password: str = Form(...)
):
    email = username + "@example.com"
    user = await create_user(db=db, username=username, email=email, password=password)
    if not user:
        raise HTTPException(status_code=400, detail="User creation failed")
    
    return {"username": username, "email": email}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}