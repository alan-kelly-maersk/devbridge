import '@testing-library/jest-dom';

// Mock Application Insights
jest.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: jest.fn().mockImplementation(() => ({
    loadAppInsights: jest.fn(),
    trackPageView: jest.fn(),
    trackEvent: jest.fn(),
    trackException: jest.fn(),
    trackMetric: jest.fn(),
    setAuthenticatedUserContext: jest.fn(),
    clearAuthenticatedUserContext: jest.fn(),
  })),
}));

// Mock OpenTelemetry
jest.mock('@opentelemetry/sdk-trace-web', () => ({
  WebTracerProvider: jest.fn().mockImplementation(() => ({
    register: jest.fn(),
  })),
}));
