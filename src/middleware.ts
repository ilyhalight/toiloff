import type { APIContext } from "astro";
import { defineMiddleware } from "astro:middleware";

import { BackendAPI } from "./lib/api";
import { AUTH_COOKIE_NAME } from "./lib/api/auth";

const getUser = async (context: APIContext) => {
  const token = context.cookies.get(AUTH_COOKIE_NAME);
  if (!token) {
    return null;
  }

  try {
    return await BackendAPI.auth.verify(token.value);
  } catch {
    return null;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.url.pathname.startsWith("/admin")) {
    return next();
  }

  if (context.url.pathname === "/admin/logout") {
    context.cookies.delete(AUTH_COOKIE_NAME);
    return next();
  }

  context.locals.user = await getUser(context);

  return next();
});
