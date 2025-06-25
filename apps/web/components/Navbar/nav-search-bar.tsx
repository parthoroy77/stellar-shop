"use client";
import { getProductBySearch } from "@/actions/product";
import { useQueryData } from "@repo/tanstack-query";
import { AppButton, Input } from "@repo/ui";
import { debounce } from "@repo/utils/functions";
import { TProduct } from "@repo/utils/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import SearchResultItem from "./search-result-item";

const NavSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const searchResultRef = useRef<HTMLDivElement | null>(null);

  const {
    data: searchResult = [],
    isFetching: loading,
    isError,
  } = useQueryData<TProduct[], Error>(
    ["search", query],
    async () => {
      const products = await getProductBySearch({ q: query });
      return products.data || [];
    },
    {
      staleTime: 1000 * 60,
      retry: false,
      enabled: query.length > 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  // Debounced query handler
  const handleQueryChange = useCallback(
    debounce((value: string) => {
      setQuery(value);

      if (value.length <= 3) {
        setShowResult(false);
        setError(value.length > 0 ? "Please insert more than 3 characters" : null);
      }
    }, 500),
    []
  );

  // Handle search click or enter key
  const handleSearch = () => {
    if (query.length > 3) {
      router.push(`/search?q=${query}`, { scroll: false });
      setShowResult(false);
    }
  };

  const handleKeyEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (focusedIndex >= 0 && searchResult[focusedIndex]) {
          router.push(`/products/${searchResult[focusedIndex].urlSlug}`);
          setShowResult(false);
          setFocusedIndex(-1);
        } else {
          handleSearch();
        }
      }
    },
    [focusedIndex, searchResult, query]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResult) return;
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleBlur = () => {
    setShowResult(false);
    setError(null);
    setFocusedIndex(-1);
  };

  // Scroll to focused item
  useEffect(() => {
    if (searchResultRef.current && focusedIndex >= 0) {
      const focusedItem = searchResultRef.current.children[focusedIndex] as HTMLElement;
      focusedItem?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  // Show result when data updates
  useEffect(() => {
    if (searchResult.length > 0) {
      setShowResult(true);
      setError(null);
    } else if (query.length >= 3 && !loading) {
      setShowResult(true);
      setError(null);
    }
  }, [searchResult, query, loading]);

  // Show error if fetch fails
  useEffect(() => {
    if (isError) {
      setError("Something went wrong while searching!");
      setShowResult(false);
    }
  }, [isError]);

  return (
    <div className="relative flex h-10 items-center">
      <Input
        type="search"
        onChange={(e) => handleQueryChange(e.target.value)}
        onKeyDown={(e) => {
          handleKeyEnter(e);
          handleKeyDown(e);
        }}
        onBlur={handleBlur}
        placeholder="Search everything at your stellar shop..."
        aria-label="Search input"
        className="bg-accent/40 focus:border-primary peer right-0 h-full rounded-r-none border-r-0 px-5 text-xs text-black outline-none placeholder:text-xs placeholder:text-gray-400 lg:h-[97%] lg:min-w-[550px]"
      />
      <AppButton
        aria-label="Submit search"
        loading={loading}
        hideElement={loading}
        onClick={handleSearch}
        className="text-primary border-primary bg-primary flex h-full min-w-[50px] items-center rounded-md rounded-l-none border text-2xl text-white lg:px-3"
      >
        <CgSearch />
      </AppButton>

      {/* Error */}
      {query.length >= 1 && error && <SearchResultError message={error} />}

      {/* Loading */}
      {loading && <LoadingSearchResult />}

      {/* Search results */}
      {showResult && query.length >= 3 && searchResult.length > 0 && (
        <div
          ref={searchResultRef}
          className="custom-scrollbar absolute top-[50px] z-10 max-h-[350px] w-full divide-y overflow-hidden overflow-y-scroll rounded-md border bg-white"
          role="listbox"
          aria-label="Search results"
        >
          {searchResult.map((product, i) => (
            <SearchResultItem
              key={i}
              isFocused={i === focusedIndex}
              onMouseEnter={() => setFocusedIndex(i)}
              product={product}
              isDemo={false}
            />
          ))}
        </div>
      )}
      {/* No results */}
      {!loading && showResult && query.length >= 3 && searchResult.length === 0 && <NotFoundResult query={query} />}
    </div>
  );
};

const LoadingSearchResult = () => (
  <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-sm">
    <AiOutlineLoading className="animate-spin" />
    <span>Getting your result...</span>
  </div>
);

const NotFoundResult = ({ query }: { query: string }) => (
  <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-xs md:text-sm">
    <h5 className="text-center text-sm font-medium">No result found for "{query}"</h5>
  </div>
);

const SearchResultError = ({ message }: { message: string }) => (
  <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-xs md:text-sm">
    <h5 className="text-center text-sm font-medium">{message}</h5>
  </div>
);

export default NavSearchBar;
