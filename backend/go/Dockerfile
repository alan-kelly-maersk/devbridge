FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy only necessary files for dependency resolution
COPY go.* ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./src/cmd/server/main.go

# Use a minimal base image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/server .

# Run the application
ENTRYPOINT ["./server"]
