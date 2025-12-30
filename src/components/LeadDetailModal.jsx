import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  MapPin,
  Star,
  Calendar,
  Save,
  Trash2,
  ExternalLink,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { LEAD_STATUSES } from "../utils/constants";
import { formatPhone, formatDate } from "../utils/helpers";

export default function LeadDetailModal({ lead, onClose, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    status: lead?.status || "new",
    notes: lead?.notes || "",
    follow_up_date: lead?.follow_up_date
      ? lead.follow_up_date.split("T")[0]
      : "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData({
        status: lead.status || "new",
        notes: lead.notes || "",
        follow_up_date: lead.follow_up_date
          ? lead.follow_up_date.split("T")[0]
          : "",
      });
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(lead.id, {
        ...formData,
        follow_up_date: formData.follow_up_date || null,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      await onDelete(lead.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg 
                      shadow-2xl shadow-black/40 max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Lead Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-100">
                  {lead.name}
                </h3>
                <p className="text-slate-400">{lead.category}</p>
              </div>
              <StatusBadge status={lead.status} size="md" />
            </div>

            <div className="space-y-2 text-sm">
              {lead.address && (
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>{lead.address}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <a
                    href={`tel:${lead.phone}`}
                    className="hover:text-emerald-400"
                  >
                    {formatPhone(lead.phone)}
                  </a>
                </div>
              )}
              {lead.rating && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>
                    {lead.rating} ({lead.review_count || 0} reviews)
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Added {formatDate(lead.created_at)}</span>
              </div>
            </div>

            {lead.place_id && (
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${lead.place_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="w-4 h-4" />
                View on Google Maps
              </a>
            )}
          </div>

          <div className="border-t border-slate-700 pt-4 space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100
                           focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                Follow-up Date
              </label>
              <input
                type="date"
                value={formData.follow_up_date}
                onChange={(e) =>
                  setFormData({ ...formData, follow_up_date: e.target.value })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100
                           focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100
                           focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                placeholder="Add notes about this lead..."
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-4 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 
                         text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
