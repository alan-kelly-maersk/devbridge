package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/alan-kelly-maersk/devbridge/backend/go/src/internal/config"
	"github.com/alan-kelly-maersk/devbridge/backend/go/src/internal/telemetry"
)

func main() {
	// Initialize config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Setup context with cancellation
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Initialize telemetry
	cleanup, err := telemetry.Init(ctx, cfg)
	if err != nil {
		log.Fatalf("Failed to initialize telemetry: %v", err)
	}
	defer cleanup()

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	<-sigChan
	log.Println("Shutting down gracefully...")
}