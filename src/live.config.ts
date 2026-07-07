// Define live collections for accessing real-time data
import { defineLiveCollection } from "astro:content";
import { guestbookLoader } from "./data/guestbook-loader";
import { GuestbookEntry } from "./lib/api";

const guestbook = defineLiveCollection({
  loader: guestbookLoader(),
  schema: GuestbookEntry,
});

// Export a single `collections` object to register your collection(s)
export const collections = { guestbook };
