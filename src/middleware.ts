import type { APIContext } from "astro";
import { defineMiddleware } from "astro:middleware";

import routerTUI from "./tui";

import { AUTH_COOKIE_NAME, verify } from "./lib/api/auth";

const getUser = async (context: APIContext) => {
  const token = context.cookies.get(AUTH_COOKIE_NAME);
  if (!token) {
    return null;
  }

  try {
    return await verify(token.value);
  } catch {
    return null;
  }
};

const isCurl = (userAgent: string | null) => userAgent === "curl" || userAgent?.startsWith("curl/");

export const onRequest = defineMiddleware(async (context, next) => {
  const headers = context.request.headers;
  if (isCurl(headers.get("user-agent")) && headers.get("x-original") !== "true") {
    return await routerTUI(context);
  }

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
