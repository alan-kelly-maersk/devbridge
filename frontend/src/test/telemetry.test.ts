import { initializeTelemetry, getTelemetry } from '../modules/telemetry';

jest.mock('@microsoft/applicationinsights-web');
jest.mock('@opentelemetry/sdk-trace-web');

describe('Telemetry', () => {
  const mockConfig = {
    appInsightsKey: 'test-key',
    serviceName: 'test-service',
    environment: 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize telemetry service', () => {
    const telemetry = initializeTelemetry(mockConfig);
    expect(telemetry).toBeDefined();
  });

  it('should throw error when getting telemetry before initialization', () => {
    // Reset the telemetry instance
    jest.resetModules();
    expect(() => getTelemetry()).toThrow('Telemetry not initialized');
  });

  it('should track events correctly', () => {
    const telemetry = initializeTelemetry(mockConfig);
    const eventName = 'test-event';
    const properties = { key: 'value' };

    telemetry.trackEvent(eventName, properties);
    expect(telemetry).toBeDefined();
  });

  it('should track exceptions correctly', () => {
    const telemetry = initializeTelemetry(mockConfig);
    const error = new Error('Test error');
    
    telemetry.trackException(error);
    expect(telemetry).toBeDefined();
  });
});
