export function exportToCSV(leads, filename = "leads.csv") {
  if (!leads || leads.length === 0) {
    alert("No leads to export");
    return;
  }

  const headers = [
    "Name",
    "Address",
    "City",
    "State",
    "Zip Code",
    "Phone",
    "Category",
    "Rating",
    "Reviews",
    "Status",
    "Notes",
    "Created At",
    "Contact Date",
    "Follow Up Date",
  ];

  const rows = leads.map((lead) => [
    lead.name || "",
    lead.address || "",
    lead.city || "",
    lead.state || "",
    lead.zip_code || "",
    lead.phone || "",
    lead.category || "",
    lead.rating || "",
    lead.review_count || "",
    lead.status || "",
    (lead.notes || "").replace(/"/g, '""'),
    lead.created_at || "",
    lead.contact_date || "",
    lead.follow_up_date || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportSelectedFields(leads, fields, filename = "leads.csv") {
  if (!leads || leads.length === 0) {
    alert("No leads to export");
    return;
  }

  const rows = leads.map((lead) =>
    fields.map((field) => {
      const value = lead[field] || "";
      return typeof value === "string" ? value.replace(/"/g, '""') : value;
    })
  );

  const csvContent = [
    fields.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
