import React, { useState } from "react";
import { Grid3X3, List, Save, CheckCheck } from "lucide-react";
import LeadCard from "./LeadCard";

export default function ResultsGrid({
  results,
  searchStats,
  onSaveLead,
  onSaveAll,
  savedIds = [],
}) {
  const [viewMode, setViewMode] = useState("grid");
  const [savingAll, setSavingAll] = useState(false);

  const handleSaveAll = async () => {
    setSavingAll(true);
    try {
      const unsavedResults = results.filter(
        (r) => !savedIds.includes(r.place_id)
      );
      await onSaveAll(unsavedResults);
    } finally {
      setSavingAll(false);
    }
  };

  const allSaved =
    results.length > 0 && results.every((r) => savedIds.includes(r.place_id));
  const unsavedCount = results.filter(
    (r) => !savedIds.includes(r.place_id)
  ).length;

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Search Results
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 bg-slate-700/50 rounded-lg text-slate-300">
              {searchStats.total} found
            </span>
            <span className="px-2 py-1 bg-rose-500/20 text-rose-400 rounded-lg">
              {searchStats.noWebsite} without websites
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unsavedCount > 0 && (
            <button
              onClick={handleSaveAll}
              disabled={savingAll || allSaved}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 
                         disabled:bg-slate-600 text-white text-sm font-medium rounded-lg 
                         transition-all duration-200"
            >
              {savingAll ? (
                "Saving..."
              ) : allSaved ? (
                <>
                  <CheckCheck className="w-4 h-4" />
                  All Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save All ({unsavedCount})
                </>
              )}
            </button>
          )}

          <div className="flex items-center bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-slate-700 text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-slate-700 text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`
        ${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        }
      `}
      >
        {results.map((result, index) => (
          <LeadCard
            key={result.place_id || index}
            lead={result}
            onSave={onSaveLead}
            isSaved={savedIds.includes(result.place_id)}
          />
        ))}
      </div>
    </div>
  );
}
