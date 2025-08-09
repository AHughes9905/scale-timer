import asyncio
from sqlalchemy import inspect
from models import user, timing_log
from db.database import Base, engine, AsyncSessionLocal
from service.auth_service import get_password_hash


async def is_initialized():
    async with engine.begin() as conn:
        def check_tables(sync_conn):
            inspector = inspect(sync_conn)
            return 'users' in inspector.get_table_names()
        return await conn.run_sync(check_tables)


async def init_models():
    try:
        if not await is_initialized():
            print("Initializing database...")
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("Database initialized.")
            await init_special_users()
        else:
            print("Database already initialized.")
    except Exception as e:
        print(f"Error initializing database: {e}")


async def init_special_users():
    async with AsyncSessionLocal() as session:
        from models.user import User
        demo_username = "demoUsername"
        demo_email = "demo@example.com"
        demo_password = "demoPassword"
        result = await session.execute(
            user.User.__table__.select().where(user.User.username == demo_username)
        )
        demo_user = result.first()
        if not demo_user:
            hashed_password = get_password_hash(demo_password)
            new_user = User(
                username=demo_username,
                email=demo_email,
                hashed_password=hashed_password
            )
            session.add(new_user)
            await session.commit()
            print("Demo user created.")
        else:
            print("Demo user already exists.")


if __name__ == "__main__":
    asyncio.run(init_models())