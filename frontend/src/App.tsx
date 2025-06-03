import React from 'react';
import { initializeTelemetry } from '../modules/telemetry';
import { initializeAuth } from '../modules/auth';

// Initialize services
initializeTelemetry({
  appInsightsKey: import.meta.env.VITE_APP_INSIGHTS_KEY || 'local-dev-key',
  serviceName: 'devbridge-frontend',
  environment: import.meta.env.MODE,
});

initializeAuth({
  authority: import.meta.env.VITE_AUTH_AUTHORITY || 'http://localhost:8080',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID || 'devbridge-frontend',
  redirectUri: `${window.location.origin}/auth-callback`,
  postLogoutRedirectUri: window.location.origin,
  scope: 'openid profile email',
});

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>DevBridge</h1>
        <p>A reference implementation for Maersk developers</p>
      </header>
      <main>
        <p>Welcome to DevBridge</p>
      </main>
    </div>
  );
};

export default App;
