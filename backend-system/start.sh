#!/bin/sh
docker compose down && docker compose up -d redis && sleep 5 && docker compose up --build -d
