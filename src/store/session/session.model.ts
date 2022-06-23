export interface Session {
  hasSession: boolean;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

export enum ActionType {
  SESSION_INIT = "SESSION_INIT",
  LOGGED_OUT = "LOGGED_OUT",
  LOGGED_IN = "LOGGED_IN",
}

export enum LocalStorage {
  IS_LOGGED_IN = "isLoggedIn",
}

export interface SessionAction {
  type: string;
  data?: Partial<Session>;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
