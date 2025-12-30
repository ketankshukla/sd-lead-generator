import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const leadsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getByStatus(status) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(lead) {
    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async createMany(leads) {
    const { data, error } = await supabase.from("leads").insert(leads).select();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from("leads")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) throw error;
  },

  async deleteMany(ids) {
    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (error) throw error;
  },
};

export const searchHistoryApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return data;
  },

  async create(search) {
    const { data, error } = await supabase
      .from("search_history")
      .insert([search])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export const settingsApi = {
  async get(key) {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", key)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return data?.value;
  },

  async set(key, value) {
    const { data, error } = await supabase
      .from("settings")
      .upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      )
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase.from("settings").select("*");
    if (error) throw error;
    return data;
  },
};
