import React, { useState } from "react";
import {
  Search,
  Filter,
  Trash2,
  Edit3,
  Save,
  X,
  Phone,
  MapPin,
  Star,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import ExportButton from "./ExportButton";
import LoadingSpinner from "./LoadingSpinner";
import { LEAD_STATUSES } from "../utils/constants";
import { formatPhone, formatDate } from "../utils/helpers";

export default function SavedLeads({
  leads,
  loading,
  filter,
  setFilter,
  onUpdate,
  onDelete,
  onDeleteMany,
  stats,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter((lead) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        lead.name?.toLowerCase().includes(term) ||
        lead.address?.toLowerCase().includes(term) ||
        lead.phone?.includes(term) ||
        lead.category?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setEditForm({
      status: lead.status,
      notes: lead.notes || "",
      follow_up_date: lead.follow_up_date
        ? lead.follow_up_date.split("T")[0]
        : "",
    });
  };

  const handleSave = async (id) => {
    await onUpdate(id, {
      ...editForm,
      follow_up_date: editForm.follow_up_date || null,
    });
    setEditingId(null);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map((l) => l.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} leads?`)) {
      await onDeleteMany(selectedIds);
      setSelectedIds([]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner text="Loading leads..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-slate-700 text-slate-100"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          All ({stats.total})
        </button>
        {LEAD_STATUSES.map((status) => (
          <button
            key={status.value}
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status.value
                ? "bg-slate-700 text-slate-100"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {status.label} ({stats[status.value] || 0})
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-400 
                         hover:bg-rose-500/30 rounded-lg text-sm font-medium transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedIds.length})
            </button>
          )}
          <ExportButton leads={filteredLeads} />
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg">No leads found</p>
          <p className="text-sm mt-1">
            {filter !== "all"
              ? "Try a different filter"
              : "Start searching to find leads"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500">
            <input
              type="checkbox"
              checked={selectedIds.length === filteredLeads.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500"
            />
            <span>Select all ({filteredLeads.length})</span>
          </div>

          {filteredLeads.map((lead) => {
            const isExpanded = expandedId === lead.id;
            const isEditing = editingId === lead.id;

            return (
              <div
                key={lead.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                           overflow-hidden transition-all duration-200"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds([...selectedIds, lead.id]);
                        } else {
                          setSelectedIds(
                            selectedIds.filter((id) => id !== lead.id)
                          );
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-100 truncate">
                          {lead.name}
                        </h3>
                        <StatusBadge status={lead.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 hover:text-emerald-400"
                          >
                            <Phone className="w-3 h-3" />
                            {formatPhone(lead.phone)}
                          </a>
                        )}
                        {lead.address && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {lead.address}
                          </span>
                        )}
                        {lead.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400" />
                            {lead.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this lead?")) {
                            onDelete(lead.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : lead.id)
                        }
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {(isExpanded || isEditing) && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-700/50">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">
                            Status
                          </label>
                          <select
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                          >
                            {LEAD_STATUSES.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">
                            Follow-up Date
                          </label>
                          <input
                            type="date"
                            value={editForm.follow_up_date}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                follow_up_date: e.target.value,
                              })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">
                            Notes
                          </label>
                          <textarea
                            value={editForm.notes}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                notes: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 resize-none"
                            placeholder="Add notes about this lead..."
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSave(lead.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 
                                       text-white rounded-lg text-sm font-medium"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 
                                       text-slate-200 rounded-lg text-sm font-medium"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-4 text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Added {formatDate(lead.created_at)}
                          </span>
                          {lead.follow_up_date && (
                            <span className="flex items-center gap-1 text-amber-400">
                              <Calendar className="w-3 h-3" />
                              Follow-up: {formatDate(lead.follow_up_date)}
                            </span>
                          )}
                        </div>
                        {lead.notes && (
                          <div className="flex items-start gap-2 text-slate-300">
                            <MessageSquare className="w-3 h-3 mt-1 text-slate-500" />
                            <p>{lead.notes}</p>
                          </div>
                        )}
                        <p className="text-slate-500">
                          Category: {lead.category || "N/A"} | Source:{" "}
                          {lead.source || "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
