import { z } from "astro/zod";

const API_BASE_URL = "http://127.0.0.1:3001/v1";
const API_USER_AGENT = "toiloff-frontend/1.0.0";

type APIError = Record<"error", string>;

export const isError = (data: unknown): data is APIError => {
  return typeof data === "object" && data !== null && "error" in data;
};

const GuestbookEntryStatus = z.enum(["review", "public", "declined"]);

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

export const NewGuestbook = GuestbookEntry.omit({
  id: true,
  status: true,
  replyText: true,
  createdAt: true,
  updatedAt: true,
});

export type NewGuestbook = z.infer<typeof NewGuestbook>;

export async function fetchFromAPI<T extends object>(
  method: string,
  body?: BodyInit,
  captchaPayload?: string,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/${method}`, {
    body,
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "user-agent": API_USER_AGENT,
      ...(captchaPayload ? { "x-captcha-payload": captchaPayload } : {}),
    },
  });

  const data = (await res.json()) as T | APIError;
  console.log("fetch data", data);
  if (isError(data)) {
    throw new Error(data.error);
  }

  if (res.status === 422) {
    throw new Error("Validation error");
  }

  return data;
}

export const BackendAPI = {
  loadGuestbook: async () => await fetchFromAPI<GuestbookEntry[]>("guestbook"),
  createGuestMessage: async (item: NewGuestbook, captchaPayload?: string) =>
    await fetchFromAPI<GuestbookEntry>(
      "guestbook",
      JSON.stringify(item),
      captchaPayload,
    ),
};
