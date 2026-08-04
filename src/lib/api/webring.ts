import { fetchFromAPI } from "./internal";

export type WebringSiteItem = {
  name: string;
  url: string;
  favicon?: string | undefined;
};

export type WebringData = {
  prev: WebringSiteItem;
  random: string;
  info: string;
  next: WebringSiteItem;
};

export type WebringClearCacheData = {
  status: true;
};

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
