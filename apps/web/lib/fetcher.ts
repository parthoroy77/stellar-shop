import { getErrorMessage } from "@repo/utils/functions";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: any;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};
const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(endpoint: string, options: FetcherOptions = {}) {
  const { method = "GET", headers = {}, body, cache = "force-cache", next = { revalidate: false } } = options;

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    });

    const result: T = await response.json();
    return result;
  } catch (error: unknown) {
    return { data: null, error: error, success: false, message: getErrorMessage(error) };
  }
}
