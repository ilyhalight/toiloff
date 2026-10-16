import { PUBLIC_MY_WEBRING_SLUG, PUBLIC_WEBRING_BASE } from "astro:env/client";

import { fetchJSON } from "./shared";
import type { WebringData as BackendWebringData } from "../api/webring";

export type WebringDataItem = {
  slug: string;
  name: string;
  url: string;
  favicon?: string;
};

export type WebringData = {
  prev: WebringDataItem;
  curr: WebringDataItem;
  next: WebringDataItem;
};

export const MY_SLUG_HOST = `${PUBLIC_WEBRING_BASE}/${PUBLIC_MY_WEBRING_SLUG}`;
export const getFaviconUrl = (favicon: string | undefined) => {
  if (!favicon) {
    return undefined;
  }

  return `${PUBLIC_WEBRING_BASE}/media/${favicon}`;
};

export const getData = async (): Promise<BackendWebringData | null> => {
  const res = await fetchJSON<WebringData>(`${MY_SLUG_HOST}/data`);
  if (!res.status) {
    return null;
  }

  const {
    prev: { slug: _prevSlug, favicon: prevFavicon, ...prev },
    next: { slug: _nextSlug, favicon: nextFavicon, ...next },
  } = res.data;

  return {
    prev: {
      favicon: getFaviconUrl(prevFavicon),
      ...prev,
    },
    next: {
      favicon: getFaviconUrl(nextFavicon),
      ...next,
    },
    info: PUBLIC_WEBRING_BASE,
    random: `${MY_SLUG_HOST}/random`,
  };
};
