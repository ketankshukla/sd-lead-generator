import React, { useState } from "react";
import { Search, MapPin, Briefcase, Sparkles, AlertCircle } from "lucide-react";
import { BUSINESS_CATEGORIES, SAN_DIEGO_AREAS } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";

export default function SearchPanel({ onSearch, loading, error, apiKey }) {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("All San Diego");
  const [useMock, setUseMock] = useState(!apiKey);

  const handleSearch = () => {
    if (!category) {
      alert("Please select a business category");
      return;
    }
    onSearch(category, area, useMock);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-slate-100">
          Find Businesses Without Websites
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Briefcase className="w-4 h-4" />
            Business Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none
                       transition-all duration-200"
          >
            <option value="">Select a category...</option>
            {BUSINESS_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <MapPin className="w-4 h-4" />
            San Diego Area
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none
                       transition-all duration-200"
          >
            {SAN_DIEGO_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={useMock}
            onChange={(e) => setUseMock(e.target.checked)}
            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 
                       focus:ring-emerald-500/20 focus:ring-offset-0"
          />
          <Sparkles className="w-4 h-4 text-amber-400" />
          Use Demo Data (no API calls)
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={loading || !category}
        className="w-full flex items-center justify-center gap-2 
                   bg-gradient-to-r from-emerald-500 to-cyan-500 
                   hover:from-emerald-600 hover:to-cyan-600
                   disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed
                   text-white font-semibold py-3 px-6 rounded-lg
                   transition-all duration-200 shadow-lg shadow-emerald-500/20"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            Searching...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Search Google Maps
          </>
        )}
      </button>

      {!apiKey && !useMock && (
        <p className="mt-3 text-xs text-amber-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          No API key set. Go to Settings or use Demo Data.
        </p>
      )}
    </div>
  );
}
