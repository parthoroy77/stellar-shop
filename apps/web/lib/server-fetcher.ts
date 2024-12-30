import { IApiResponse } from "@repo/utils/types";
import { getServerAuth } from "./auth-utils";
import { fetcher, FetcherOptions } from "./fetcher";

export async function serverFetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetcherOptions<TBody> = {}
): Promise<IApiResponse<TResponse>> {
  const { session } = await getServerAuth();
  return await fetcher(endpoint, { ...options, session });
}
