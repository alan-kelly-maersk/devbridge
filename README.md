# DevBridge

A reference implementation demonstrating best practices in software development at Maersk, including API handling, messaging, and database handling. This project serves as a bridge between application developers and platform teams, showcasing real-world implementations of various software development concepts.

## Overview

DevBridge is designed to demonstrate:
- API handling and specification
- Real-time WebSocket communication
- Message processing with Retina (Kafka)
- Database operations with PostgreSQL
- File upload/download with Claim Check pattern
- Authentication and authorization
- Observability and monitoring
- Containerization and CI/CD

## Project Structure

```
devbridge/
├── frontend/            # TypeScript frontend application
│   ├── src/            # Source code
│   └── test/           # Test files
├── backend/
│   ├── java/           # Java backend service
│   │   ├── src/
│   │   └── test/
│   ├── go/             # Go backend service
│   │   ├── src/
│   │   └── test/
│   └── dotnet/         # .NET backend service
│       ├── src/
│       └── test/
├── .github/
│   └── workflows/      # GitHub Actions workflow definitions
└── docs/              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Java JDK 17+
- Go 1.20+
- .NET 7.0+
- Docker
- PostgreSQL
- Access to Retina (Kafka)

### Local Development

1. Clone the repository:
   ```bash
   git clone git@github.com:alan-kelly-maersk/devbridge.git
   cd devbridge
   ```

2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Set up the backend services:
   - Java: Instructions TBD
   - Go: Instructions TBD
   - .NET: Instructions TBD

### Environment Setup

Environment configuration instructions will be added as they are developed.

## Features

- Multiple backend implementations (Java, Go, .NET) demonstrating the same API
- Real-time updates via WebSocket
- File upload/download with Claim Check pattern
- Message processing via Retina
- Interactive API documentation
- Comprehensive test coverage
- DevLib integration for standardized functionality

## Contributing

1. Create a new branch from main with the Jira ticket ID
2. Make your changes following the coding standards
3. Write/update tests as needed
4. Create a pull request with a clear description
5. Link the pull request to the Jira ticket

## Best Practices

This project demonstrates these best practices:
- Clean Code principles
- Test-Driven Development
- API-First design
- Event-Driven Architecture
- Containerization
- CI/CD automation
- Observability
- Security by design

## Technologies

- Frontend: TypeScript
- Backend: Java (Spring Boot), Go, .NET
- Database: PostgreSQL
- Messaging: Retina (Kafka)
- Authentication: OIDC
- API Documentation: OpenAPI
- Testing: Various frameworks per language
- DevOps: Docker, GitHub Actions

## Documentation

Additional documentation can be found in the `docs` directory:
- API Specification
- Architecture Overview
- Development Guide
- Deployment Guide
- Testing Strategy

## Support

For questions or issues:
1. Check existing documentation
2. Search existing issues
3. Create a new issue with detailed information

## License

Copyright © 2025 A.P. Moller – Maersk
