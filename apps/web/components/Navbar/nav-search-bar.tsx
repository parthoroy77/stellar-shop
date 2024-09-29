"use client";
import { useSearch } from "@/hooks/use-search";
import { Input } from "@repo/ui";
import { debounce } from "@repo/utils/functions";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import AppButton from "../ui/app-button";
import SearchResultItem from "./search-result-item";

const NavSearchBar = () => {
  const { error, loading, query, searchResult, setQuery, showResult, setShowResult, setError } = useSearch();
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const searchResultRef = useRef<HTMLDivElement | null>(null);

  const handleQueryChange = debounce((value: string) => {
    if (value.length >= 3) {
      setQuery(value);
    }
  }, 500);

  const handleSearch = () => {
    if (query.length > 3) {
      router.push(`/search?q=${query}`, { scroll: false });
      setShowResult(false);
    }
  };

  const handleKeyEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleBlur = () => {
    setShowResult(false);
    setError(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      // Move focus down
      setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, searchResult.length - 1));
    } else if (e.key === "ArrowUp") {
      // Move focus up
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      // Navigate to the selected item
      const selectedItem = searchResult[focusedIndex];
      if (selectedItem) {
        router.push(`/products/${selectedItem.id}`);
        setShowResult(false);
        setFocusedIndex(-1);
        searchResultRef.current = null;
      }
    }
  };

  // Scroll to the focused item
  useEffect(() => {
    if (searchResultRef.current && focusedIndex >= 0) {
      const focusedItem = searchResultRef.current.children[focusedIndex] as HTMLElement;
      focusedItem?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  return (
    <div className="relative flex h-[45px] items-center">
      <Input
        type="search"
        onKeyDown={(e) => {
          handleKeyEnter(e);
          handleKeyDown(e);
        }}
        onBlur={handleBlur}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Search everything at your stellar shop..."
        aria-label="Search input"
        className="bg-accent/40 focus:border-primary peer right-0 h-full rounded-r-none border-r-0 px-5 text-xs text-black outline-none placeholder:text-xs placeholder:text-gray-400 lg:h-[97%] lg:min-w-[550px]"
      />
      <AppButton
        aria-label="Submit search"
        loading={loading}
        hideElement={loading}
        onClick={handleSearch}
        className={`text-primary border-primary bg-primary flex h-full min-w-[50px] items-center rounded-md rounded-l-none border text-2xl text-white lg:px-3`}
      >
        <CgSearch />
      </AppButton>

      {/* Search Result Error */}
      {query.length >= 1 && error && <SearchResultError message={error} />}

      {/* Loading Result */}
      {loading && <LoadingSearchResult />}

      {/* Search result items */}
      {showResult && query.length >= 3 && searchResult.length > 0 && (
        <div
          ref={searchResultRef}
          className="custom-scrollbar absolute top-[50px] z-10 max-h-[350px] w-full divide-y overflow-hidden overflow-y-scroll rounded-md border bg-white"
          role="listbox"
          aria-label="Search results"
        >
          {searchResult.map((_product, i) => (
            <SearchResultItem
              key={i}
              isFocused={i === focusedIndex} // Pass down focus state
              onMouseEnter={() => setFocusedIndex(i)}
            />
          ))}
        </div>
      )}
      {showResult && query.length >= 3 && searchResult.length === 0 && <NotFoundResult query={query} />}
    </div>
  );
};

const LoadingSearchResult = () => {
  return (
    <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-sm">
      <AiOutlineLoading className="animate-spin" />
      <span>Getting your result...</span>
    </div>
  );
};

const NotFoundResult = ({ query }: { query: string }) => {
  if (query.length <= 1) {
    return;
  }
  return (
    <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-xs md:text-sm">
      <h5 className="text-center text-sm font-medium">No result found for "{query}"</h5>
    </div>
  );
};
const SearchResultError = ({ message }: { message: string }) => {
  return (
    <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3 text-xs md:text-sm">
      <h5 className="text-center text-sm font-medium">{message}</h5>
    </div>
  );
};

export default NavSearchBar;
