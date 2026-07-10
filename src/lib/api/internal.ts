const API_BASE_URL = "http://localhost:4321/api/v1";
export const AVATAR_BASE_URL = `${API_BASE_URL}/public/avatars/`;
const API_USER_CLIENT = "toiloff-frontend/1.0.0";

type APIError = Record<"error", string>;
type APIErrorDetail = Record<"detail", string>;

export const isError = (data: unknown): data is APIError => {
  return typeof data === "object" && data !== null && "error" in data;
};

export async function fetchFromAPI<T extends object>(
  path: string,
  body?: BodyInit,
  captchaPayload?: string,
  options: RequestInit = {},
): Promise<T> {
  const { headers, ...otherOptions } = options;
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    body,
    method: body ? "POST" : "GET",
    headers: {
      "x-client": API_USER_CLIENT,
      ...(body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(captchaPayload ? { "x-captcha-payload": captchaPayload } : {}),
      ...headers,
    },
    credentials: "include",
    ...otherOptions,
  });

  const data = (await res.json()) as T | APIError;
  if (isError(data)) {
    throw new Error(data.error);
  }

  if (res.status === 404) {
    throw new Error((data as APIErrorDetail).detail ?? "Not found");
  } else if (res.status === 422) {
    throw new Error("Validation error");
  }

  return data;
}
