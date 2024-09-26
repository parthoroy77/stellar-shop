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

export type ApiResponse<T> = {
  data?: T;
  success: boolean;
  message: string;
  error?: unknown;
};

const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(endpoint: string, options: FetcherOptions = {}): Promise<ApiResponse<T>> {
  const { method = "GET", headers = {}, body, cache = "force-cache", next = { revalidate: false } } = options;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next,
    });
    const result: ApiResponse<T> = await response.json();
    return result;
  } catch (error: unknown) {
    return { error: error, success: false, message: getErrorMessage(error) };
  }
}
