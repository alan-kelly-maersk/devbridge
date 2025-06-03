#!/bin/zsh
set -e

echo "Stopping and removing existing containers..."
podman-compose down -v

echo "Starting services..."
podman-compose up -d

echo "Waiting for PostgreSQL to be ready..."
sleep 10

echo "Testing PostgreSQL connection..."
podman exec devbridge-postgres psql -U devbridge -d devbridge -c "\dt"

echo "Running Flyway migrations..."
podman exec devbridge-flyway flyway migrate

echo "Showing migration status..."
podman exec devbridge-flyway flyway info
