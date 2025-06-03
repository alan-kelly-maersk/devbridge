# Message Schema Documentation

This document describes the AVRO schema used for messages in DevBridge's Retina (Kafka) topics.

## Overview

The schema is designed to handle both user messages and file processing events in a single topic, using a discriminator field (`messageType`) to distinguish between different types of messages.

## Message Types

1. `USER_MESSAGE`
   - Used for standard user messages
   - Contains user-provided content
   - Records which backend processed it

2. `FILE_UPLOAD`
   - Used when a file is uploaded
   - Contains file metadata
   - Initiates file processing

3. `FILE_PROCESSED`
   - Used when file processing is complete
   - Contains updated file status
   - Includes processing results

## Schema Fields

### Core Fields
- `id`: UUID for the message
- `messageType`: Enum indicating the purpose of the message
- `content`: The message content or file-related information
- `backend`: The backend service that processed the message (JAVA, GO, or DOTNET)

### Metadata
- `createdAt`: Timestamp when the message was created
- `processedAt`: Optional timestamp when the message was processed

### File Information (Optional)
Present only for file-related messages:
- `id`: UUID for the file
- `name`: Original filename
- `size`: File size in bytes
- `mimeType`: Optional MIME type
- `status`: Current status (UPLOADED, PROCESSING, COMPLETED, FAILED)

## Usage Examples

### User Message
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "messageType": "USER_MESSAGE",
  "content": "Hello from the frontend!",
  "backend": "JAVA",
  "metadata": {
    "createdAt": 1685817600000,
    "processedAt": 1685817601000
  },
  "fileInfo": null
}
```

### File Upload Message
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174001",
  "messageType": "FILE_UPLOAD",
  "content": "File upload request",
  "backend": "GO",
  "metadata": {
    "createdAt": 1685817600000,
    "processedAt": null
  },
  "fileInfo": {
    "id": "987fcdeb-51a2-43f7-b8c9-123456789012",
    "name": "example.pdf",
    "size": 1048576,
    "mimeType": "application/pdf",
    "status": "UPLOADED"
  }
}
```

### File Processed Message
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174002",
  "messageType": "FILE_PROCESSED",
  "content": "File processing completed",
  "backend": "DOTNET",
  "metadata": {
    "createdAt": 1685817600000,
    "processedAt": 1685817605000
  },
  "fileInfo": {
    "id": "987fcdeb-51a2-43f7-b8c9-123456789012",
    "name": "example.pdf",
    "size": 1048576,
    "mimeType": "application/pdf",
    "status": "COMPLETED"
  }
}
```
