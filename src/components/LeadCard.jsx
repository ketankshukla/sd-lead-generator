import React from "react";
import {
  MapPin,
  Phone,
  Star,
  Tag,
  Plus,
  Check,
  ExternalLink,
} from "lucide-react";
import { formatPhone } from "../utils/helpers";

export default function LeadCard({
  lead,
  onSave,
  isSaved = false,
  saving = false,
}) {
  return (
    <div
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 
                    hover:border-slate-600 transition-all duration-200 shadow-lg shadow-black/10"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-100 truncate">{lead.name}</h3>
          <p className="text-sm text-slate-400 truncate">{lead.category}</p>
        </div>
        <span className="flex-shrink-0 px-2 py-1 bg-rose-500/20 text-rose-400 text-xs font-medium rounded-full border border-rose-500/30">
          ❌ No Website
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {lead.address && (
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <span className="truncate">{lead.address}</span>
          </div>
        )}

        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <a
              href={`tel:${lead.phone}`}
              className="hover:text-emerald-400 transition-colors"
            >
              {formatPhone(lead.phone)}
            </a>
          </div>
        )}

        {lead.rating && (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Star className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              {lead.rating}
              {lead.review_count && (
                <span className="text-slate-500 ml-1">
                  ({lead.review_count} reviews)
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onSave(lead)}
          disabled={isSaved || saving}
          className={`
            flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg
            font-medium text-sm transition-all duration-200
            ${
              isSaved
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Save Lead
            </>
          )}
        </button>

        {lead.place_id && (
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${lead.place_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-all"
            title="View on Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
