import { AVATAR_BASE_URL, type CursorNav, fetchFromAPI } from "./internal";
import { toFormData } from "../utils";
import { z } from "astro/zod";

export const GuestbookEntryStatus = z.union([
  z.literal("review"),
  z.literal("public"),
  z.literal("declined"),
]);

export type GuestbookEntryStatus = z.infer<typeof GuestbookEntryStatus>;

export const GuestbookEntrySchema = z.object({
  id: z.string(),
  username: z.string(),
  content: z.string(),
  status: GuestbookEntryStatus,
  href: z.optional(z.string().nullable()),
  subText: z.optional(z.string().nullable()),
  avatarUrl: z.optional(z.string().nullable()),
  replyText: z.optional(z.string().nullable()),
  createdAt: z.string(),
  updatedAt: z.string(),
  reviewedAt: z.string().nullable(),
});

export type GuestbookEntry = z.infer<typeof GuestbookEntrySchema>;

export const GuestbookLocalEntrySchema = GuestbookEntrySchema.extend({
  local: z.literal(true),
});

export type GuestbookLocalEntry = z.infer<typeof GuestbookLocalEntrySchema>;

export const GuestbookLocalEntrySchemaArray = z.array(
  GuestbookLocalEntrySchema,
);

export type GuestbookStats = {
  review: number;
  public: number;
  declined: number;
  all: number;
};

export type GuestbookData = CursorNav & {
  items: GuestbookEntry[];
  avgReviewTime: number | null;
};

export type GuestbookAdminData = GuestbookData & {
  stats: GuestbookStats;
};

export type NewGuestbook = Omit<
  GuestbookEntry,
  | "id"
  | "status"
  | "replyText"
  | "avatarUrl"
  | "createdAt"
  | "updatedAt"
  | "reviewedAt"
> & {
  avatar?: File;
};

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
  forceDelete: async (id: string) =>
    await fetchFromAPI<GuestbookEntry>(
      `admin/guestbook/${encodeURIComponent(id)}`,
      undefined,
      undefined,
      {
        method: "DELETE",
      },
    ),
};
