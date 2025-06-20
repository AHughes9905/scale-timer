from fastapi import FastAPI
from routes import auth_routes, user_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth_routes.router)
app.include_router(user_routes.router)

origins = [
    "http://localhost:3000",  # Next.js app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
