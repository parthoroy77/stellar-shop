"use client";
import { Input } from "@repo/ui";
import { debounce } from "@repo/utils/functions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import AppButton from "../ui/app-button";
import SearchResultItem from "./search-result-item";

const mockSearchResults = (query: string) => {
  return query ? Array.from({ length: 5 }) : [];
};

const NavSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleQueryChange = useCallback(
    debounce((value: string) => {
      setQuery(value);
      if (value) {
        setLoading(true);
        const searchResults = mockSearchResults(value);
        console.log(searchResults.length);
        setResults(searchResults);
        setLoading(false);
        setShowResult(true);
      } else {
        setResults([]);
      }
    }, 500),
    []
  );

  const handleSearchClick = () => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="relative flex h-[45px] items-center">
      <Input
        type="search"
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={() => setShowResult((prev) => !prev)}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Search everything at your stellar shop..."
        aria-label="Search input"
        className="bg-accent/40 focus:border-primary peer right-0 h-full rounded-r-none border-r-0 px-5 text-xs text-black outline-none placeholder:text-xs placeholder:text-gray-400 lg:h-[97%] lg:min-w-[550px]"
      />
      <AppButton
        hideElement={loading}
        loading={loading}
        aria-label="Submit search"
        className={`text-primary border-primary bg-primary flex h-full min-w-[50px] items-center rounded-md rounded-l-none border text-2xl text-white lg:px-3 ${loading && "text-xl"}`}
        onClick={handleSearchClick}
      >
        <CgSearch />
      </AppButton>

      {loading && (
        <div className="custom-scrollbar absolute top-[50px] z-10 flex max-h-[350px] w-full items-center justify-center gap-3 rounded-md border bg-white py-3">
          <AiOutlineLoading className="animate-spin" />
          <span>Getting your result...</span>
        </div>
      )}

      {!loading && showResult && (
        <div className="custom-scrollbar absolute top-[50px] z-10 max-h-[350px] w-full divide-y overflow-hidden overflow-y-scroll rounded-md border bg-white *:px-5 *:py-3">
          {results.length > 0 ? results.map((_, i) => <SearchResultItem key={i} />) : <NotFoundResult query={query} />}
        </div>
      )}
    </div>
  );
};

const NotFoundResult = ({ query }: { query: string }) => {
  return <h5 className="text-center text-sm font-medium">No result found for "{query}"</h5>;
};

export default NavSearchBar;
