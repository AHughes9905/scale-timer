from fastapi import APIRouter, Depends, Form, Response, HTTPException
from auth.auth import create_access_token
from schemas.user import Token
from core.config import SECRET_KEY, ALGORITHM

router = APIRouter()

@router.post("/auth/token", response_model=Token)
async def login(response: Response, username: str = Form(...), password: str = Form(...)):
    # replace with actual DB lookup
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user.username}, SECRET_KEY, ALGORITHM)
    # Set the token in an HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax"
    )
    return {"access_token": token, "token_type": "bearer"}