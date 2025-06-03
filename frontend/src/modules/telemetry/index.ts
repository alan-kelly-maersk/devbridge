import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';

interface TelemetryConfig {
  appInsightsKey: string;
  serviceName: string;
  environment: string;
}

class TelemetryService {
  private appInsights: ApplicationInsights;
  private tracerProvider: WebTracerProvider;

  constructor(config: TelemetryConfig) {
    // Initialize Application Insights
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: config.appInsightsKey,
        enableAutoRouteTracking: true,
        enableRequestTracing: true,
      },
    });

    // Initialize OpenTelemetry
    this.tracerProvider = new WebTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName,
        [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: config.environment,
      }),
    });

    // Set up context manager for async operations
    this.tracerProvider.register({
      contextManager: new ZoneContextManager(),
    });

    // Register additional instrumentations if needed
    registerInstrumentations({
      tracerProvider: this.tracerProvider,
      instrumentations: [],
    });
  }

  initialize(): void {
    this.appInsights.loadAppInsights();
    this.appInsights.trackPageView();
  }

  trackEvent(name: string, properties?: { [key: string]: string }): void {
    this.appInsights.trackEvent({ name, properties });
  }

  trackException(error: Error): void {
    this.appInsights.trackException({ exception: error });
  }

  trackMetric(name: string, value: number): void {
    this.appInsights.trackMetric({ name, average: value });
  }

  setUserId(userId: string): void {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId(): void {
    this.appInsights.clearAuthenticatedUserContext();
  }
}

let telemetryInstance: TelemetryService;

export const initializeTelemetry = (config: TelemetryConfig): TelemetryService => {
  if (!telemetryInstance) {
    telemetryInstance = new TelemetryService(config);
    telemetryInstance.initialize();
  }
  return telemetryInstance;
};

export const getTelemetry = (): TelemetryService => {
  if (!telemetryInstance) {
    throw new Error('Telemetry not initialized. Call initializeTelemetry first.');
  }
  return telemetryInstance;
};
