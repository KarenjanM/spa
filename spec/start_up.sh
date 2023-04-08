#!bin/bash

DELAY=10

echo "Starting Saleor"

echo "Building the Backend"
cd saleor-platform
docker compose build
docker compose run --rm api python3 manage.py migrate
docker compose run --rm api python3 manage.py collectstatic --noinput
docker compose run --rm api python3 manage.py populatedb --createsuperuser

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

echo Spin up
docker compose up -d