# Database Schema Documentation

This document describes the database schema used in DevBridge and provides guidance on managing database migrations.

## Schema Overview

The database schema consists of two main tables:

### Messages Table

Stores all messages processed by the backend services.

| Column         | Type                     | Description                                  |
|---------------|--------------------------|----------------------------------------------|
| id            | UUID                     | Primary key                                  |
| type          | message_type (enum)      | Type of message (USER_MESSAGE, FILE_UPLOAD, FILE_PROCESSED) |
| content       | TEXT                     | Content of the message                       |
| backend       | backend_type (enum)      | Backend service that processed the message   |
| created_at    | TIMESTAMP WITH TIME ZONE | When the message was created                 |
| processed_at  | TIMESTAMP WITH TIME ZONE | When the message was processed (nullable)    |

### Files Table

Stores metadata for uploaded files.

| Column        | Type                     | Description                                  |
|--------------|--------------------------|----------------------------------------------|
| id           | UUID                     | Primary key                                  |
| name         | VARCHAR(255)             | Original filename                            |
| size         | BIGINT                   | File size in bytes                          |
| mime_type    | VARCHAR(127)             | MIME type of the file (nullable)            |
| status       | file_status (enum)       | Current status of the file                  |
| uploaded_at  | TIMESTAMP WITH TIME ZONE | When the file was uploaded                  |
| processed_at | TIMESTAMP WITH TIME ZONE | When processing completed (nullable)         |
| backend_id   | UUID                     | Reference to processing message (Foreign Key)|
| created_by   | VARCHAR(255)             | User who uploaded the file                  |

### Enums

- `message_type`: USER_MESSAGE, FILE_UPLOAD, FILE_PROCESSED
- `backend_type`: JAVA, GO, DOTNET
- `file_status`: UPLOADED, PROCESSING, COMPLETED, FAILED

## Database Migration

We use Flyway for database migration management. Migration scripts are stored in the `/backend/schemas/sql/migrations` directory.

### Migration Naming Convention

Migration scripts follow Flyway's versioned migration naming pattern:

```
V<version>__<description>.sql
```

For example:
- `V1__initial_schema.sql`
- `V2__add_user_column.sql`

### Running Migrations

Migrations are automatically run when each backend service starts up. Each backend service uses the appropriate Flyway integration:

- Java: Uses `flyway-core` dependency
- .NET: Uses `Evolve` NuGet package (Flyway-compatible)
- Go: Uses `golang-migrate` library

### Development Guidelines

1. **Creating New Migrations**
   - Never modify existing migration files
   - Always create new migration files for schema changes
   - Use meaningful descriptions in migration filenames
   - Test migrations in development before committing

2. **Best Practices**
   - Include both "up" and "down" migrations when possible
   - Keep migrations atomic (one logical change per migration)
   - Add appropriate indexes for query optimization
   - Document complex migrations with comments

3. **Version Control**
   - All migration files should be committed to version control
   - Migration files are considered immutable once pushed to main branch

4. **Testing**
   - Test migrations on a clean database
   - Test migrations on a database with existing data
   - Include rollback testing where possible

## Local Development Setup

### Prerequisites

- PostgreSQL client tools (psql)
- Podman and podman-compose

### Setup Steps

1. From the project root directory, run the setup script:
   ```bash
   ./setup-db.sh
   ```
   
This script will:
- Stop and remove any existing containers
- Start PostgreSQL and Flyway containers
- Wait for PostgreSQL to be ready
- Run all migrations
- Display migration status

### Useful Commands

1. Check database status:
   ```bash
   podman exec devbridge-postgres psql -U devbridge -d devbridge -c "\dt"
   ```

2. Run migrations manually:
   ```bash
   podman exec devbridge-flyway flyway migrate
   ```

3. Check migration status:
   ```bash
   podman exec devbridge-flyway flyway info
   ```

4. Clean up all containers and volumes:
   ```bash
   podman-compose down -v
   ```

### Troubleshooting

If migrations fail:
1. Check the logs:
   ```bash
   podman logs devbridge-flyway
   ```

2. Verify PostgreSQL connection:
   ```bash
   podman exec devbridge-postgres pg_isready -U devbridge
   ```

3. Run the test script:
   ```bash
   ./test-migrations.sh
   ```
