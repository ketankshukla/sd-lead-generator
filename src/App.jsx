import React, { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import ResultsGrid from "./components/ResultsGrid";
import SavedLeads from "./components/SavedLeads";
import StatsBar from "./components/StatsBar";
import Settings from "./components/Settings";
import { useLeads } from "./hooks/useLeads";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [activeTab, setActiveTab] = useState("search");
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_SERPAPI_KEY || "");
  const [savedPlaceIds, setSavedPlaceIds] = useState([]);

  const {
    leads,
    loading: leadsLoading,
    filter,
    setFilter,
    saveLead,
    saveLeads,
    updateLead,
    deleteLead,
    deleteLeads,
    refetch: refetchLeads,
    stats,
  } = useLeads();

  const {
    results,
    loading: searchLoading,
    error: searchError,
    searchStats,
    search,
    clearResults,
  } = useSearch();

  useEffect(() => {
    const placeIds = leads.map((l) => l.place_id).filter(Boolean);
    setSavedPlaceIds(placeIds);
  }, [leads]);

  const handleSearch = useCallback(
    async (category, city, useMock, location) => {
      await search(category, city, apiKey, useMock, location);
    },
    [search, apiKey]
  );

  const handleSaveLead = useCallback(
    async (lead) => {
      try {
        await saveLead(lead);
        setSavedPlaceIds((prev) => [...prev, lead.place_id]);
      } catch (err) {
        alert(err.message || "Failed to save lead");
      }
    },
    [saveLead]
  );

  const handleSaveAllLeads = useCallback(
    async (leadsToSave) => {
      try {
        await saveLeads(leadsToSave);
        const newPlaceIds = leadsToSave.map((l) => l.place_id).filter(Boolean);
        setSavedPlaceIds((prev) => [...prev, ...newPlaceIds]);
      } catch (err) {
        alert(err.message || "Failed to save leads");
      }
    },
    [saveLeads]
  );

  const handleApiKeyChange = useCallback((newKey) => {
    setApiKey(newKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "search" && (
          <div className="space-y-6">
            <SearchPanel
              onSearch={handleSearch}
              loading={searchLoading}
              error={searchError}
              apiKey={apiKey}
            />

            <ResultsGrid
              results={results}
              searchStats={searchStats}
              onSaveLead={handleSaveLead}
              onSaveAll={handleSaveAllLeads}
              savedIds={savedPlaceIds}
            />
          </div>
        )}

        {activeTab === "saved" && (
          <SavedLeads
            leads={leads}
            loading={leadsLoading}
            filter={filter}
            setFilter={setFilter}
            onUpdate={updateLead}
            onDelete={deleteLead}
            onDeleteMany={deleteLeads}
            stats={stats}
          />
        )}

        {activeTab === "stats" && <StatsBar stats={stats} />}

        {activeTab === "settings" && (
          <Settings
            apiKey={apiKey}
            setApiKey={setApiKey}
            onApiKeyChange={handleApiKeyChange}
          />
        )}
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>
          🎯 SD Lead Generator - Find businesses without websites in San Diego
        </p>
      </footer>
    </div>
  );
}

export default App;
