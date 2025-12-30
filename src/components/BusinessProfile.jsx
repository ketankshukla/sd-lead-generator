import React, { useState } from "react";
import {
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  Tag,
  FileText,
  Download,
  Mail,
  User,
  MessageSquare,
  Image,
  DollarSign,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function BusinessProfile({ lead, onClose, onUpdate }) {
  const [editedLead, setEditedLead] = useState({
    ...lead,
    email: lead.email || "",
    owner_name: lead.owner_name || "",
    notes: lead.notes || "",
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (field, value) => {
    setEditedLead((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedLead);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWebsiteDocument = () => {
    const doc = `
================================================================================
                        BUSINESS PROFILE - WEBSITE BRIEF
================================================================================

BUSINESS INFORMATION
--------------------
Business Name: ${editedLead.name}
Owner Name: ${editedLead.owner_name || "[TO BE OBTAINED]"}
Category: ${editedLead.category || "N/A"}
${
  editedLead.categories?.length > 1
    ? `All Categories: ${editedLead.categories.join(", ")}`
    : ""
}

CONTACT DETAILS
---------------
Phone: ${editedLead.phone || "[TO BE OBTAINED]"}
Email: ${editedLead.email || "[TO BE OBTAINED]"}
Address: ${editedLead.address || "N/A"}
City: ${editedLead.city || "N/A"}, ${editedLead.state || "N/A"}

BUSINESS DESCRIPTION (from Google)
----------------------------------
${editedLead.description || "[No description available - discuss with owner]"}

GOOGLE RATINGS & REVIEWS
------------------------
Rating: ${editedLead.rating ? `${editedLead.rating}/5 stars` : "N/A"}
Review Count: ${editedLead.review_count || 0} reviews
Price Level: ${editedLead.price_level || "N/A"}

BUSINESS HOURS
--------------
${formatOperatingHours(editedLead.operating_hours)}

SERVICES OFFERED
----------------
${formatServiceOptions(editedLead.service_options)}

NOTES & OBSERVATIONS
--------------------
${editedLead.notes || "[Add your notes here after speaking with the owner]"}

================================================================================
                           WEBSITE CREATION CHECKLIST
================================================================================

[ ] Contact owner via phone: ${editedLead.phone || "N/A"}
[ ] Obtain email address
[ ] Discuss business services in detail
[ ] Get list of services/products to feature
[ ] Obtain high-quality photos (or schedule photo session)
[ ] Discuss branding preferences (colors, style)
[ ] Get testimonials/reviews to feature
[ ] Discuss call-to-action (book appointment, call, etc.)
[ ] Agree on pricing and timeline
[ ] Get domain name preference

================================================================================
                              WEBSITE CONTENT IDEAS
================================================================================

SUGGESTED PAGES:
- Home (hero section, brief intro, CTA)
- About Us (owner story, team, mission)
- Services (detailed service descriptions)
- Gallery (photos of work/products)
- Reviews/Testimonials
- Contact (form, map, hours, phone)

SUGGESTED FEATURES:
- Mobile-responsive design
- Click-to-call button
- Google Maps integration
- Contact form
- Social media links
- Google Reviews integration

================================================================================
Generated on: ${new Date().toLocaleString()}
Source: Lead Generator Tool
================================================================================
`.trim();

    return doc;
  };

  const downloadDocument = () => {
    const doc = generateWebsiteDocument();
    const blob = new Blob([doc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editedLead.name.replace(
      /[^a-z0-9]/gi,
      "_"
    )}_Website_Brief.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyDocument = () => {
    const doc = generateWebsiteDocument();
    copyToClipboard(doc);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/80">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-slate-100">
                {editedLead.name}
              </h2>
              <p className="text-sm text-slate-400">{editedLead.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Thumbnail & Basic Info */}
          <div className="flex gap-6">
            {editedLead.thumbnail && (
              <div className="flex-shrink-0">
                <img
                  src={editedLead.thumbnail}
                  alt={editedLead.name}
                  className="w-32 h-32 object-cover rounded-lg border border-slate-600"
                />
              </div>
            )}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rating */}
              {editedLead.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-slate-100 font-semibold">
                    {editedLead.rating}
                  </span>
                  <span className="text-slate-400">
                    ({editedLead.review_count} reviews)
                  </span>
                </div>
              )}

              {/* Price Level */}
              {editedLead.price_level && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-100">
                    {editedLead.price_level}
                  </span>
                </div>
              )}

              {/* Categories */}
              {editedLead.categories?.length > 0 && (
                <div className="flex items-center gap-2 md:col-span-2">
                  <Tag className="w-5 h-5 text-cyan-400" />
                  <div className="flex flex-wrap gap-2">
                    {editedLead.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-sm rounded-lg"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {editedLead.description && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Google Description
              </h3>
              <p className="text-slate-200">{editedLead.description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                {editedLead.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <a
                      href={`tel:${editedLead.phone}`}
                      className="text-slate-200 hover:text-emerald-400"
                    >
                      {editedLead.phone}
                    </a>
                    <button
                      onClick={() => copyToClipboard(editedLead.phone)}
                      className="p-1 hover:bg-slate-600 rounded"
                    >
                      <Copy className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200">{editedLead.address}</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            {editedLead.operating_hours && (
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Business Hours
                </h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(editedLead.operating_hours).map(
                    ([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-slate-400 capitalize">{day}</span>
                        <span className="text-slate-200">{hours}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Service Options */}
          {editedLead.service_options && (
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">
                Service Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(editedLead.service_options)
                  .filter(([_, value]) => value)
                  .map(([service]) => (
                    <span
                      key={service}
                      className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {service.replace(/_/g, " ")}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Manual Entry Fields */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              Additional Information (Manual Entry)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={editedLead.owner_name}
                  onChange={(e) => handleChange("owner_name", e.target.value)}
                  placeholder="Enter owner's name after contact"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={editedLead.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email after contact"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">
                  Notes
                </label>
                <textarea
                  value={editedLead.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Add notes about your conversation, services they want, pricing discussed..."
                  rows={4}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-slate-700 bg-slate-800/80">
          <div className="flex items-center gap-2">
            {editedLead.photos_link && (
              <a
                href={editedLead.photos_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
              >
                <Image className="w-4 h-4" />
                View Photos
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyDocument}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Brief"}
            </button>
            <button
              onClick={downloadDocument}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Brief
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatOperatingHours(hours) {
  if (!hours) return "Hours not available - ask owner";
  return Object.entries(hours)
    .map(
      ([day, time]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${time}`
    )
    .join("\n");
}

function formatServiceOptions(options) {
  if (!options) return "Service options not listed";
  const services = Object.entries(options)
    .filter(([_, value]) => value)
    .map(
      ([service]) =>
        `✓ ${
          service.replace(/_/g, " ").charAt(0).toUpperCase() +
          service.replace(/_/g, " ").slice(1)
        }`
    );
  return services.length > 0
    ? services.join("\n")
    : "No service options listed";
}
