import { AVATAR_BASE_URL, type CursorNav, fetchFromAPI } from "./internal";
import { toFormData } from "../utils";

export type GuestbookEntryStatus = "review" | "public" | "declined";

export type GuestbookEntry = {
  id: string;
  username: string;
  content: string;
  status: GuestbookEntryStatus;
  href?: string | null;
  subText?: string | null;
  avatarUrl?: string | null;
  replyText?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GuestbookStats = {
  review: number;
  public: number;
  declined: number;
  all: number;
};

export type GuestbookData = CursorNav & {
  items: GuestbookEntry[];
};

export type GuestbookAdminData = GuestbookData & {
  stats: GuestbookStats;
};

export type NewGuestbook = Omit<
  GuestbookEntry,
  "id" | "status" | "replyText" | "avatarUrl" | "createdAt" | "updatedAt"
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
};
