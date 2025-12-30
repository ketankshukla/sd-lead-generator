import React, { useState, useEffect } from "react";
import {
  Key,
  MapPin,
  Save,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { settingsApi, supabase } from "../lib/supabase";
import LoadingSpinner from "./LoadingSpinner";

export default function Settings({ apiKey, setApiKey, onApiKeyChange }) {
  const [settings, setSettings] = useState({
    serpapi_key: apiKey || "",
    default_area: "San Diego",
    auto_save: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const allSettings = await settingsApi.getAll();
      const settingsMap = {};
      allSettings?.forEach((s) => {
        settingsMap[s.key] = s.value;
      });

      setSettings((prev) => ({
        ...prev,
        serpapi_key:
          settingsMap.serpapi_key ||
          apiKey ||
          process.env.REACT_APP_SERPAPI_KEY ||
          "",
        default_area: settingsMap.default_area || "San Diego",
        auto_save: settingsMap.auto_save !== "false",
      }));
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await settingsApi.set("serpapi_key", settings.serpapi_key);
      await settingsApi.set("default_area", settings.default_area);
      await settingsApi.set("auto_save", settings.auto_save.toString());

      if (onApiKeyChange) {
        onApiKeyChange(settings.serpapi_key);
      }

      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save settings" });
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleClearData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete ALL leads and search history? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      setSaving(true);

      await supabase
        .from("leads")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase
        .from("search_history")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      setMessage({ type: "success", text: "All data cleared successfully!" });
      window.location.reload();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to clear data" });
      console.error("Failed to clear data:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner text="Loading settings..." />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-1 flex items-center gap-2">
          ⚙️ Settings
        </h2>
        <p className="text-sm text-slate-400">
          Configure your API keys and preferences
        </p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          {message.text}
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Key className="w-4 h-4" />
            SerpAPI Key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={settings.serpapi_key}
              onChange={(e) =>
                setSettings({ ...settings, serpapi_key: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-slate-100
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="Enter your SerpAPI key"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Get your API key from{" "}
            <a
              href="https://serpapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              serpapi.com
            </a>
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <MapPin className="w-4 h-4" />
            Default Search Area
          </label>
          <input
            type="text"
            value={settings.default_area}
            onChange={(e) =>
              setSettings({ ...settings, default_area: e.target.value })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100
                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            placeholder="San Diego"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-200">Auto-save leads</p>
            <p className="text-xs text-slate-500">
              Automatically save leads when searching
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, auto_save: !settings.auto_save })
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings.auto_save ? "bg-emerald-500" : "bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                settings.auto_save ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 
                     bg-gradient-to-r from-emerald-500 to-cyan-500 
                     hover:from-emerald-600 hover:to-cyan-600
                     disabled:from-slate-600 disabled:to-slate-600
                     text-white font-semibold py-3 px-6 rounded-lg
                     transition-all duration-200"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-rose-500/30 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-rose-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Permanently delete all leads and search history. This action cannot be
          undone.
        </p>
        <button
          onClick={handleClearData}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-400 
                     hover:bg-rose-500/30 border border-rose-500/30 rounded-lg 
                     text-sm font-medium transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Clear All Data
        </button>
      </div>
    </div>
  );
}
