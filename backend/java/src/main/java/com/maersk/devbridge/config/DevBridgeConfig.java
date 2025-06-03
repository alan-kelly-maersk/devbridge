package com.maersk.devbridge.config;

import io.maersk.devlib.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;

@Configuration
public class DevBridgeConfig {
    
    @PostConstruct
    public void initializeDevLibConfig() {
        try {
            Client client = new Client();
            client.load(); // This will load configurations from Vault and set environment variables
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize DevLib configuration", e);
        }
    }
}
