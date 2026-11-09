import type { APIContext } from "astro";

import { cached } from "./utils";
import index from "./routes/index.ts";
import projects from "./routes/projects.ts";
import models from "./routes/models.ts";
import about from "./routes/about.ts";
import donate from "./routes/donate.ts";

const getHandler = (pathname: string) => {
  switch (pathname) {
    case "/":
      return index;
    case "/projects":
      return projects;
    case "/models":
      return models;
    case "/about":
      return about;
    case "/donate":
      return donate;
    default:
      return null;
  }
};

export default async (context: APIContext): Promise<Response> => {
  const handler = getHandler(context.url.pathname);
  if (!handler) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(await cached(context, handler));
};
