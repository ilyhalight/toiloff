import { z } from "astro/zod";
import { AVATAR_BASE_URL, fetchFromAPI } from "./internal";
import { toFormData } from "../utils";

const GuestbookEntryStatus = z.enum(["review", "public", "declined"]);
export type GuestbookEntryStatus = z.infer<typeof GuestbookEntryStatus>;

export const GuestbookEntry = z.object({
  id: z.string(),
  username: z.string(),
  content: z.string(),
  status: GuestbookEntryStatus,
  href: z.string().nullable().optional(),
  hrefText: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  replyText: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GuestbookEntry = z.infer<typeof GuestbookEntry>;

export const GuestbookData = z.object({
  items: z.array(GuestbookEntry),
  nextCursor: z.nullable(z.string()),
  pageSize: z.number(),
});

export const GuestbookStats = z.object({
  review: z.number(),
  public: z.number(),
  declined: z.number(),
  all: z.number(),
});

export type GuestbookData = z.infer<typeof GuestbookData>;

export const GuestbookAdminData = GuestbookData.extend({
  stats: GuestbookStats,
});
export type GuestbookAdminData = z.infer<typeof GuestbookAdminData>;

export const NewGuestbook = GuestbookEntry.omit({
  id: true,
  status: true,
  replyText: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  avatar: z.instanceof(File).optional(),
});

export type NewGuestbook = z.infer<typeof NewGuestbook>;

export const GuestbookRouteAPI = {
  getAvatar: (avatarId?: string | null) => {
    // use raw for abs paths / null
    if (!avatarId || avatarId.includes("://")) {
      return avatarId;
    }

    return `${AVATAR_BASE_URL}${encodeURIComponent(avatarId)}`;
  },
  load: async (cursor?: string | null) => {
    const query = new URLSearchParams();
    if (cursor) {
      query.append("cursor", cursor);
    }

    return await fetchFromAPI<GuestbookData>(`guestbook?${query.toString()}`);
  },
  createMessage: async (item: NewGuestbook, captchaPayload?: string) => {
    const body = toFormData(item);
    console.log(body);
    return await fetchFromAPI<GuestbookEntry>(
      "guestbook",
      body,
      captchaPayload,
    );
  },
  loadAdmin: async (status?: string, cursor?: string | null) => {
    let query = new URLSearchParams();
    if (status) {
      query.append("status", status);
    }

    if (cursor) {
      query.append("cursor", cursor);
    }

    return await fetchFromAPI<GuestbookAdminData>(
      `admin/guestbook?${query.toString()}`,
    );
  },
  approveMessage: async (id: string, replyText?: string | null) =>
    await fetchFromAPI<GuestbookEntry>(
      `admin/guestbook/${encodeURIComponent(id)}/approve`,
      JSON.stringify({ replyText }),
    ),
  declineMessage: async (id: string, replyText?: string | null) =>
    await fetchFromAPI<GuestbookEntry>(
      `admin/guestbook/${encodeURIComponent(id)}/decline`,
      JSON.stringify({ replyText }),
    ),
};
