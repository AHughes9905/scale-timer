import asyncio
from sqlalchemy import inspect
from models import user, timing_log
from db.database import Base, engine


async def is_initialized():
    async with engine.begin() as conn:
        inspector = inspect(conn)
        tables = await conn.run_sync(inspector.get_table_names)
        return "users" in tables


async def init_models():
    if not await is_initialized():
        print("Initializing database...")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    else:
        print("Database already initialized.")


if __name__ == "__main__":
    asyncio.run(init_models())