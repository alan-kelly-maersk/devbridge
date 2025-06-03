-- Create enum types
CREATE TYPE message_type AS ENUM ('USER_MESSAGE', 'FILE_UPLOAD', 'FILE_PROCESSED');
CREATE TYPE backend_type AS ENUM ('JAVA', 'GO', 'DOTNET');
CREATE TYPE file_status AS ENUM ('UPLOADED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    type message_type NOT NULL,
    content TEXT NOT NULL,
    backend backend_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Create files table
CREATE TABLE files (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    mime_type VARCHAR(127),
    status file_status NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE,
    backend_id UUID REFERENCES messages(id),
    created_by VARCHAR(255) NOT NULL
);

-- Create indexes
CREATE INDEX idx_messages_type ON messages(type);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_files_status ON files(status);
CREATE INDEX idx_files_uploaded_at ON files(uploaded_at);

-- Add comments
COMMENT ON TABLE messages IS 'Stores messages processed by backend services';
COMMENT ON TABLE files IS 'Stores metadata for uploaded files';

COMMENT ON COLUMN messages.id IS 'Unique identifier for the message';
COMMENT ON COLUMN messages.type IS 'Type of message (user message, file upload, or file processed)';
COMMENT ON COLUMN messages.content IS 'Content of the message';
COMMENT ON COLUMN messages.backend IS 'Backend service that processed the message';
COMMENT ON COLUMN messages.created_at IS 'Timestamp when the message was created';
COMMENT ON COLUMN messages.processed_at IS 'Timestamp when the message was processed';

COMMENT ON COLUMN files.id IS 'Unique identifier for the file';
COMMENT ON COLUMN files.name IS 'Original filename';
COMMENT ON COLUMN files.size IS 'Size of the file in bytes';
COMMENT ON COLUMN files.mime_type IS 'MIME type of the file';
COMMENT ON COLUMN files.status IS 'Current status of the file';
COMMENT ON COLUMN files.uploaded_at IS 'Timestamp when the file was uploaded';
COMMENT ON COLUMN files.processed_at IS 'Timestamp when the file processing was completed';
COMMENT ON COLUMN files.backend_id IS 'Reference to the message that processed this file';
COMMENT ON COLUMN files.created_by IS 'User who uploaded the file';
