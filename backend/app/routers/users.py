from fastapi import APIRouter

router = APIRouter()

@router.get("/users/times")
def get_users_times():
    # implementation to fetch user times
    return [{}]