package com.maersk.devbridge.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@Configuration
@EnableKafka
public class RetinaConfig {
    // Retina configuration will be provided by DevLib Retina client
    // The client will handle connection settings, retry logic, and monitoring
}
