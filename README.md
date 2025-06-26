# scale-timer

DB setup commans in order
docker run --name my-postgres -e POSTGRES_USER=aaron -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres
docker exec -it my-postgres psql -U aaron
CREATE DATABASE scaledb;
back in app dir -> python -m db.init_db