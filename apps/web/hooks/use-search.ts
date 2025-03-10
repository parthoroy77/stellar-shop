import { fetcher } from "@/lib/fetcher";
import { throttle } from "@repo/utils/functions";
import { TProduct } from "@repo/utils/types";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type TUseSearchResult = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  searchResult: TProduct[];
  loading: boolean;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  showResult: boolean;
  setShowResult: Dispatch<SetStateAction<boolean>>;
};

export function useSearch(initialQuery: string = ""): TUseSearchResult {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<TProduct[]>([]);
  const [showResult, setShowResult] = useState(false);
  // ref to store abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearAbortController = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  };

  const fetchSearchResults = useCallback(
    throttle(async (searchQuery: string) => {
      setError(null);
      setLoading(true);

      // abort if there any ongoing query
      clearAbortController();

      try {
        const response = await fetcher<TProduct[]>(`/products/search?query=${searchQuery}`, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.success) {
          setError("Something went wrong while searching!");
        }

        const products = response.data;

        if (products) {
          setSearchResult(products as TProduct[]);
          setShowResult(true);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setShowResult(false);
          setError("Something went wrong while searching!");
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (query.length > 3) {
      fetchSearchResults(query);
    } else {
      setSearchResult([]);
      setShowResult(false);
      setError("Please insert more than 3 character");
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, fetchSearchResults]);
  return {
    query,
    setQuery,
    loading,
    error,
    setError,
    searchResult,
    showResult,
    setShowResult,
  };
}
