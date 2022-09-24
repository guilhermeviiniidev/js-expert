docker run \
    --name jsexpert \
    -e POSTGRES_USER=guilherme \
    -e POSTGRES_PASSWORD="test" \
    -e POSTGRES_DB=heroes \
    -p 5433:5433 \
    -d \
    postgres
