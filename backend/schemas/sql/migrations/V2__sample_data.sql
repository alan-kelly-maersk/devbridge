-- Sample user messages
INSERT INTO messages (id, type, content, backend, created_at, processed_at)
VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'USER_MESSAGE', 'Hello from the frontend!', 'JAVA', NOW(), NOW() + interval '1 second'),
    ('123e4567-e89b-12d3-a456-426614174001', 'USER_MESSAGE', 'Testing Go backend', 'GO', NOW() - interval '1 hour', NOW() - interval '59 minutes'),
    ('123e4567-e89b-12d3-a456-426614174002', 'USER_MESSAGE', '.NET backend response', 'DOTNET', NOW() - interval '2 hours', NOW() - interval '1 hour 59 minutes');

-- Sample file upload messages and corresponding files
INSERT INTO messages (id, type, content, backend, created_at, processed_at)
VALUES
    ('123e4567-e89b-12d3-a456-426614174003', 'FILE_UPLOAD', 'example.pdf upload request', 'GO', NOW() - interval '3 hours', NOW() - interval '2 hours 59 minutes'),
    ('123e4567-e89b-12d3-a456-426614174004', 'FILE_PROCESSED', 'example.pdf processing completed', 'GO', NOW() - interval '2 hours 58 minutes', NOW() - interval '2 hours 57 minutes');

INSERT INTO files (id, name, size, mime_type, status, uploaded_at, processed_at, backend_id, created_by)
VALUES
    ('987fcdeb-51a2-43f7-b8c9-123456789012', 'example.pdf', 1048576, 'application/pdf', 'COMPLETED', NOW() - interval '3 hours', NOW() - interval '2 hours 57 minutes', '123e4567-e89b-12d3-a456-426614174004', 'test.user@maersk.com');

-- Add an in-progress file upload
INSERT INTO messages (id, type, content, backend, created_at, processed_at)
VALUES
    ('123e4567-e89b-12d3-a456-426614174005', 'FILE_UPLOAD', 'large_report.xlsx upload request', 'JAVA', NOW() - interval '30 minutes', NOW() - interval '29 minutes');

INSERT INTO files (id, name, size, mime_type, status, uploaded_at, processed_at, backend_id, created_by)
VALUES
    ('987fcdeb-51a2-43f7-b8c9-123456789013', 'large_report.xlsx', 2097152, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'PROCESSING', NOW() - interval '30 minutes', NULL, '123e4567-e89b-12d3-a456-426614174005', 'test.user@maersk.com');

-- Add a failed file upload
INSERT INTO messages (id, type, content, backend, created_at, processed_at)
VALUES
    ('123e4567-e89b-12d3-a456-426614174006', 'FILE_UPLOAD', 'invalid.exe upload request', 'DOTNET', NOW() - interval '4 hours', NOW() - interval '3 hours 59 minutes'),
    ('123e4567-e89b-12d3-a456-426614174007', 'FILE_PROCESSED', 'invalid.exe processing failed - invalid file type', 'DOTNET', NOW() - interval '3 hours 58 minutes', NOW() - interval '3 hours 57 minutes');

INSERT INTO files (id, name, size, mime_type, status, uploaded_at, processed_at, backend_id, created_by)
VALUES
    ('987fcdeb-51a2-43f7-b8c9-123456789014', 'invalid.exe', 512000, 'application/x-msdownload', 'FAILED', NOW() - interval '4 hours', NOW() - interval '3 hours 57 minutes', '123e4567-e89b-12d3-a456-426614174007', 'test.user@maersk.com');
