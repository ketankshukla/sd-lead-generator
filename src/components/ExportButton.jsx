import React, { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { exportToCSV } from "../utils/exportCSV";

export default function ExportButton({ leads }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = (type) => {
    if (leads.length === 0) {
      alert("No leads to export");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `sd_leads_${timestamp}.csv`;

    if (type === "all") {
      exportToCSV(leads, filename);
    } else if (type === "contact") {
      const contactOnlyLeads = leads.map((l) => ({
        name: l.name,
        phone: l.phone,
        address: l.address,
        category: l.category,
      }));
      exportToCSV(contactOnlyLeads, `sd_leads_contact_${timestamp}.csv`);
    }

    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 
                   text-slate-200 rounded-lg text-sm font-medium transition-all"
      >
        <Download className="w-4 h-4" />
        Export
        <ChevronDown className="w-3 h-3" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div
            className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 
                          rounded-lg shadow-xl z-20 overflow-hidden"
          >
            <button
              onClick={() => handleExport("all")}
              className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Export All Fields
            </button>
            <button
              onClick={() => handleExport("contact")}
              className="w-full px-4 py-2.5 text-left text-sm text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Export Contact Info Only
            </button>
          </div>
        </>
      )}
    </div>
  );
}
