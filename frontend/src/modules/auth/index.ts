import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { getTelemetry } from '../telemetry';

interface AuthConfig {
  authority: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  scope: string;
}

class AuthService {
  private userManager: UserManager;

  constructor(config: AuthConfig) {
    const settings: UserManagerSettings = {
      authority: config.authority,
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      post_logout_redirect_uri: config.postLogoutRedirectUri,
      scope: config.scope,
      response_type: 'code',
      automaticSilentRenew: true,
    };

    this.userManager = new UserManager(settings);

    // Handle silent token renewal errors
    this.userManager.events.addSilentRenewError((error) => {
      getTelemetry().trackException(error);
      console.error('Silent token renewal error:', error);
    });
  }

  async login(): Promise<void> {
    try {
      await this.userManager.signinRedirect();
    } catch (error) {
      getTelemetry().trackException(error as Error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userManager.signoutRedirect();
    } catch (error) {
      getTelemetry().trackException(error as Error);
      throw error;
    }
  }

  async handleRedirectCallback(): Promise<User | null> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      if (user) {
        getTelemetry().setUserId(user.profile.sub);
        getTelemetry().trackEvent('user_authenticated');
      }
      return user;
    } catch (error) {
      getTelemetry().trackException(error as Error);
      throw error;
    }
  }

  async getUser(): Promise<User | null> {
    try {
      return await this.userManager.getUser();
    } catch (error) {
      getTelemetry().trackException(error as Error);
      throw error;
    }
  }

  async renewToken(): Promise<User | null> {
    try {
      return await this.userManager.signinSilent();
    } catch (error) {
      getTelemetry().trackException(error as Error);
      throw error;
    }
  }
}

let authInstance: AuthService;

export const initializeAuth = (config: AuthConfig): AuthService => {
  if (!authInstance) {
    authInstance = new AuthService(config);
  }
  return authInstance;
};

export const getAuth = (): AuthService => {
  if (!authInstance) {
    throw new Error('Auth service not initialized. Call initializeAuth first.');
  }
  return authInstance;
};
