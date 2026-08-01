import { returnError } from "../utils";

type SuccessJSONResponse<T> = {
  status: true;
  data: T;
};

type ErrorJSONResponse = {
  status: false;
  error: Error;
};

type JSONResponse<T> = SuccessJSONResponse<T> | ErrorJSONResponse;

export const DEFAULT_FETCH_TIMEOUT = 3000;

export async function fetchJSON<T>(
  input: string | URL | Request,
  init?: RequestInit | undefined,
): Promise<JSONResponse<T>> {
  try {
    const res = await fetch(input, {
      signal: AbortSignal.timeout(DEFAULT_FETCH_TIMEOUT),
      ...init,
    });
    if (res.headers.get("content-type")?.includes("application/json")) {
      return {
        status: true,
        data: await res.json(),
      };
    }

    throw new Error(await res.text());
  } catch (err) {
    const error = returnError(err);
    console.error(
      `[external-api] Failed to fetch JSON data, because ${error.message}`,
    );
    return {
      status: false,
      error,
    };
  }
}
