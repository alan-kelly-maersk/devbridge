package config_test

import (
	"os"
	"testing"

	"github.com/alan-kelly-maersk/devbridge/backend/go/src/internal/config"
)

func TestLoadConfig(t *testing.T) {
	// Test default configuration
	cfg, err := config.Load()
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	if cfg.ServiceName != "devbridge-go" {
		t.Errorf("Expected service name to be 'devbridge-go', got %s", cfg.ServiceName)
	}

	// Test environment variable override
	os.Setenv("SERVICE_NAME", "test-service")
	cfg, err = config.Load()
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	if cfg.ServiceName != "test-service" {
		t.Errorf("Expected service name to be 'test-service', got %s", cfg.ServiceName)
	}
}
