package config

import (
	"os"
)

// Config holds all configuration for the application
type Config struct {
	ServiceName string
	Environment string
	LogLevel    string
	PostgreSQL  PostgreSQLConfig
	Kafka       KafkaConfig
}

// PostgreSQLConfig holds PostgreSQL specific configuration
type PostgreSQLConfig struct {
	Host     string
	Port     string
	Database string
	User     string
	Password string
}

// KafkaConfig holds Kafka specific configuration
type KafkaConfig struct {
	Brokers []string
	Topic   string
}

// Load reads configuration from environment variables
func Load() (*Config, error) {
	cfg := &Config{
		ServiceName: getEnvOrDefault("SERVICE_NAME", "devbridge-go"),
		Environment: getEnvOrDefault("ENVIRONMENT", "development"),
		LogLevel:    getEnvOrDefault("LOG_LEVEL", "info"),
		PostgreSQL: PostgreSQLConfig{
			Host:     getEnvOrDefault("DB_HOST", "localhost"),
			Port:     getEnvOrDefault("DB_PORT", "5432"),
			Database: getEnvOrDefault("DB_NAME", "devbridge"),
			User:     getEnvOrDefault("DB_USER", "postgres"),
			Password: getEnvOrDefault("DB_PASSWORD", "postgres"),
		},
		Kafka: KafkaConfig{
			Brokers: []string{getEnvOrDefault("KAFKA_BROKER", "localhost:9092")},
			Topic:   getEnvOrDefault("KAFKA_TOPIC", "devbridge.events"),
		},
	}

	return cfg, nil
}

func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}