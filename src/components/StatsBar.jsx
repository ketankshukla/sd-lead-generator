import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  MessageCircle,
  UserCheck,
  UserX,
  TrendingUp,
  Clock,
  Search,
} from "lucide-react";
import { searchHistoryApi } from "../lib/supabase";
import { formatDateTime } from "../utils/helpers";

export default function StatsBar({ stats }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await searchHistoryApi.getAll();
      setSearchHistory(history || []);
    } catch (err) {
      console.error("Failed to load search history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const statCards = [
    {
      label: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "text-slate-300",
      bg: "bg-slate-500/20",
    },
    {
      label: "New",
      value: stats.new,
      icon: UserPlus,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: MessageCircle,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
    },
    {
      label: "Responded",
      value: stats.responded,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/20",
    },
    {
      label: "Converted",
      value: stats.converted,
      icon: UserCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    },
    {
      label: "Not Interested",
      value: stats.not_interested,
      icon: UserX,
      color: "text-rose-400",
      bg: "bg-rose-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          📊 Lead Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
              >
                <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-100">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Conversion Rate
          </h3>
          <span className="text-3xl font-bold text-emerald-400">
            {stats.conversionRate}%
          </span>
        </div>

        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.conversionRate, 100)}%` }}
          />
        </div>

        <p className="text-sm text-slate-400 mt-2">
          {stats.converted} converted out of {stats.total} total leads
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-cyan-400" />
          Recent Searches
        </h3>

        {loadingHistory ? (
          <p className="text-slate-500 text-sm">Loading...</p>
        ) : searchHistory.length === 0 ? (
          <p className="text-slate-500 text-sm">No search history yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchHistory.slice(0, 10).map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
              >
                <div>
                  <p className="text-sm text-slate-200">{search.query}</p>
                  <p className="text-xs text-slate-500">
                    {formatDateTime(search.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">
                    {search.results_count} found
                  </p>
                  <p className="text-xs text-emerald-400">
                    {search.leads_found} without site
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
