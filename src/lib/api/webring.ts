import { z } from "astro/zod";
import { fetchFromAPI } from "./internal";

export const WebringSiteItem = z.object({
  favicon: z.optional(z.string()),
  name: z.string(),
  url: z.string(),
});

export type WebringSiteItem = z.infer<typeof WebringSiteItem>;

export const WebringData = z.object({
  prev: WebringSiteItem,
  random: z.string(),
  info: z.string(),
  next: WebringSiteItem,
});

export type WebringData = z.infer<typeof WebringData>;

export const WebringClearCacheData = z.object({
  status: z.literal(true),
});

export type WebringClearCacheData = z.infer<typeof WebringClearCacheData>;

export const WebringRouteAPI = {
  get: async () => {
    return await fetchFromAPI<WebringData>("webring");
  },
  clearCache: async () => {
    return await fetchFromAPI<WebringClearCacheData>(
      "admin/webring/cache",
      undefined,
      undefined,
      { method: "DELETE" },
    );
  },
};
