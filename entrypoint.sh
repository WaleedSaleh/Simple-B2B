#!/bin/bash

echo "Generating initial schema migration..."
docker exec -it node_app npm run typeorm -- migration:generate src/migrations/InitialSchema -d src/data-source.ts

echo "Running migrations..."
docker exec -it node_app npm run typeorm migration:run -- -d src/data-source.ts

echo "Seeding the database..."
docker exec -it node_app npm run seed

echo "Initialization complete."
