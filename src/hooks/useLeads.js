import { useState, useCallback, useEffect } from "react";
import { leadsApi } from "../lib/supabase";

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (filter === "all") {
        data = await leadsApi.getAll();
      } else {
        data = await leadsApi.getByStatus(filter);
      }

      setLeads(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const saveLead = useCallback(async (lead) => {
    try {
      const saved = await leadsApi.create(lead);
      setLeads((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      if (err.code === "23505") {
        throw new Error("This business has already been saved");
      }
      throw err;
    }
  }, []);

  const saveLeads = useCallback(async (newLeads) => {
    try {
      const saved = await leadsApi.createMany(newLeads);
      setLeads((prev) => [...saved, ...prev]);
      return saved;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateLead = useCallback(async (id, updates) => {
    try {
      const updated = await leadsApi.update(id, updates);
      setLeads((prev) => prev.map((lead) => (lead.id === id ? updated : lead)));
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteLead = useCallback(async (id) => {
    try {
      await leadsApi.delete(id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteLeads = useCallback(async (ids) => {
    try {
      await leadsApi.deleteMany(ids);
      setLeads((prev) => prev.filter((lead) => !ids.includes(lead.id)));
    } catch (err) {
      throw err;
    }
  }, []);

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    responded: leads.filter((l) => l.status === "responded").length,
    not_interested: leads.filter((l) => l.status === "not_interested").length,
    converted: leads.filter((l) => l.status === "converted").length,
    conversionRate:
      leads.length > 0
        ? (
            (leads.filter((l) => l.status === "converted").length /
              leads.length) *
            100
          ).toFixed(1)
        : 0,
  };

  return {
    leads,
    loading,
    error,
    filter,
    setFilter,
    saveLead,
    saveLeads,
    updateLead,
    deleteLead,
    deleteLeads,
    refetch: fetchLeads,
    stats,
  };
}
