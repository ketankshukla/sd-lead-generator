import { useState, useCallback } from "react";
import { searchBusinesses, generateMockResults } from "../lib/serpapi";
import { searchHistoryApi } from "../lib/supabase";
import { generateSearchQuery } from "../utils/helpers";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearch, setLastSearch] = useState(null);
  const [searchStats, setSearchStats] = useState({ total: 0, noWebsite: 0 });

  const search = useCallback(
    async (category, city, apiKey, useMock = false, location = null) => {
      try {
        setLoading(true);
        setError(null);
        setResults([]);

        const query = `${category} in ${city}`;
        setLastSearch({ category, city, query });

        let searchResult;

        if (useMock || !apiKey) {
          searchResult = generateMockResults(query);
        } else {
          searchResult = await searchBusinesses(query, apiKey, location);
        }

        setResults(searchResult.results);
        setSearchStats({
          total: searchResult.totalResults,
          noWebsite: searchResult.noWebsiteCount,
        });

        try {
          await searchHistoryApi.create({
            query,
            category,
            area: city,
            results_count: searchResult.totalResults,
            leads_found: searchResult.noWebsiteCount,
          });
        } catch (historyErr) {
          console.warn("Failed to save search history:", historyErr);
        }

        return searchResult;
      } catch (err) {
        setError(err.message || "Search failed. Please try again.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setLastSearch(null);
    setSearchStats({ total: 0, noWebsite: 0 });
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    lastSearch,
    searchStats,
    search,
    clearResults,
  };
}
