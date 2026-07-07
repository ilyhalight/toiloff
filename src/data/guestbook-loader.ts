import type { LiveLoader } from "astro/loaders";
import { BackendAPI, GuestbookEntry } from "../lib/api";

interface EntryFilter {
  id: string;
}

export function guestbookLoader(): LiveLoader<GuestbookEntry, EntryFilter> {
  return {
    name: "guestbook-loader",
    loadEntry: async ({ filter }) => {
      try {
        const entries = await BackendAPI.loadGuestbook();
        const entry = entries.find((entry) => entry.id === filter.id);

        if (!entry) {
          return undefined;
        }

        return {
          id: entry.id,
          data: entry,
        };
      } catch (error) {
        return {
          error: new Error("Failed to load guestbook message", {
            cause: error,
          }),
        };
      }
    },
    loadCollection: async () => {
      try {
        const entries = await BackendAPI.loadGuestbook();

        return {
          entries: entries.map((entry) => ({
            id: entry.id,
            data: entry,
          })),
        };
      } catch (error) {
        return {
          error: new Error("Failed to load guestbook messages", {
            cause: error,
          }),
        };
      }
    },
  };
}
