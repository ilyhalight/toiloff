import { z } from "astro/zod";
import { fetchFromAPI } from "./internal";

export const AUTH_COOKIE_NAME = "tf_auth_token";
export const AUTH_LOGIN_PAGE = "/admin/login";
export const ADMIN_DASHBOARD_PAGE = "/admin";

export const AuthCredsEntry = z.object({
  username: z.string(),
  password: z.string(),
});

export type AuthCredsEntry = z.infer<typeof AuthCredsEntry>;

export const AuthTokenResponseEntry = z.object({
  token: z.string(),
  expiresAt: z.number(),
});

export type AuthTokenResponseEntry = z.infer<typeof AuthTokenResponseEntry>;

export const UserEntry = z.object({
  username: z.string(),
});

export type UserEntry = z.infer<typeof UserEntry>;

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
