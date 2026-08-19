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

export abstract class ExternalWebringAPI {
  static MY_SLUG_HOST = `${PUBLIC_WEBRING_BASE}/${PUBLIC_MY_WEBRING_SLUG}`;

  static getFaviconUrl(favicon: string | undefined) {
    if (!favicon) {
      return undefined;
    }

    return `${PUBLIC_WEBRING_BASE}/media/${favicon}`;
  }

  static async getData(): Promise<BackendWebringData | null> {
    const res = await fetchJSON<WebringData>(`${this.MY_SLUG_HOST}/data`);
    if (!res.status) {
      return null;
    }

    const {
      prev: { slug: _prevSlug, favicon: prevFavicon, ...prev },
      next: { slug: _nextSlug, favicon: nextFavicon, ...next },
    } = res.data;

    return {
      prev: {
        favicon: this.getFaviconUrl(prevFavicon),
        ...prev,
      },
      next: {
        favicon: this.getFaviconUrl(nextFavicon),
        ...next,
      },
      info: PUBLIC_WEBRING_BASE,
      random: `${this.MY_SLUG_HOST}/random`,
    };
  }
}
