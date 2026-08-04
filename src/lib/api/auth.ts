import { fetchFromAPI } from "./internal";

export const AUTH_COOKIE_NAME = "tf_auth_token";
export const AUTH_LOGIN_PAGE = "/admin/login";
export const ADMIN_DASHBOARD_PAGE = "/admin";

export type AuthCredsEntry = {
  username: string;
  password: string;
};

export type AuthTokenResponseEntry = {
  token: string;
  expiresAt: number;
};

export type UserEntry = {
  username: string;
};

export const AuthRouteAPI = {
  getToken: async (creds: AuthCredsEntry, captchaPayload?: string) =>
    await fetchFromAPI<AuthTokenResponseEntry>(
      "admin/auth/token",
      JSON.stringify(creds),
      captchaPayload,
    ),
  verify: async (token: string) =>
    await fetchFromAPI<UserEntry>("admin/auth/verify", undefined, undefined, {
      method: "POST",
      headers: {
        Cookie: `${AUTH_COOKIE_NAME}=${token}`,
      },
    }),
};
