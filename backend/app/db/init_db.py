import asyncio
from sqlalchemy import inspect
from models import user, timing_log
from db.database import Base, engine


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
        else:
            print("Database already initialized.")
    except Exception as e:
        print(f"Error initializing database: {e}")


if __name__ == "__main__":
    asyncio.run(init_models())