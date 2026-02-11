#!/bin/bash
# Script to access the GettUppLanding container

CONTAINER_NAME="gettupplanding-web-1"

if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "Container $CONTAINER_NAME is not running. Starting it..."
    docker-compose up -d
    sleep 5
fi

echo "Entering container $CONTAINER_NAME..."
docker exec -it $CONTAINER_NAME /bin/bash
