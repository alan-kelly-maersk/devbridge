#!/bin/bash

echo "Testing PostgreSQL connection..."
PGPASSWORD=devbridge psql -h localhost -U devbridge -d devbridge -c "\dt"

echo -e "\nListing migration files in container..."
podman exec devbridge-flyway-1 ls -la /flyway/sql/

echo -e "\nChecking Flyway info..."
podman exec devbridge-flyway-1 flyway info
