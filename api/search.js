export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, apiKey } = req.body;

    const key =
      apiKey || process.env.SERPAPI_KEY || process.env.REACT_APP_SERPAPI_KEY;

    if (!key) {
      return res.status(400).json({ error: "API key is required" });
    }

    const params = new URLSearchParams({
      engine: "google_maps",
      q: query,
      ll: "@32.7157,-117.1611,12z",
      type: "search",
      api_key: key,
    });

    const url = `https://serpapi.com/search.json?${params}`;
    console.log("SerpAPI URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SerpAPI error:", response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log("SerpAPI response keys:", Object.keys(data));
    console.log("local_results count:", data.local_results?.length || 0);

    // Filter businesses without websites
    const noWebsiteBusinesses = (data.local_results || [])
      .filter((biz) => !biz.website && !biz.links?.website)
      .map((biz) => ({
        name: biz.title,
        address: biz.address,
        phone: biz.phone,
        category: biz.type,
        rating: biz.rating,
        review_count: biz.reviews,
        place_id: biz.place_id,
        latitude: biz.gps_coordinates?.latitude,
        longitude: biz.gps_coordinates?.longitude,
        city: "San Diego",
        state: "CA",
        search_query: query,
        source: "serpapi",
      }));

    return res.status(200).json({
      results: noWebsiteBusinesses,
      totalResults: data.local_results?.length || 0,
      noWebsiteCount: noWebsiteBusinesses.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return res.status(500).json({ error: error.message || "Search failed" });
  }
}
