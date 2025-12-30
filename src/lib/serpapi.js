export async function searchBusinesses(query, apiKey, location = null) {
  console.log("Searching for:", query, "at location:", location);

  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, apiKey, location }),
  });

  console.log("API response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("API error:", errorData);
    throw new Error(errorData.error || "Search failed");
  }

  const data = await response.json();
  console.log("Search results:", data);

  return data;
}

export function generateMockResults(query) {
  const mockBusinesses = [
    {
      name: "Joe's Auto Repair",
      address: "1234 Main St, San Diego, CA 92101",
      phone: "(619) 555-0101",
      category: "Auto Repair",
      rating: 4.5,
      review_count: 23,
      place_id: "mock_place_1",
      latitude: 32.7157,
      longitude: -117.1611,
      city: "San Diego",
      state: "CA",
      search_query: query,
      source: "mock",
    },
    {
      name: "Maria's Hair Studio",
      address: "5678 Broadway, San Diego, CA 92102",
      phone: "(619) 555-0102",
      category: "Hair Salon",
      rating: 4.8,
      review_count: 45,
      place_id: "mock_place_2",
      latitude: 32.72,
      longitude: -117.15,
      city: "San Diego",
      state: "CA",
      search_query: query,
      source: "mock",
    },
    {
      name: "Pacific Plumbing Co",
      address: "910 Ocean View Dr, San Diego, CA 92103",
      phone: "(619) 555-0103",
      category: "Plumber",
      rating: 4.2,
      review_count: 12,
      place_id: "mock_place_3",
      latitude: 32.73,
      longitude: -117.17,
      city: "San Diego",
      state: "CA",
      search_query: query,
      source: "mock",
    },
    {
      name: "Sunny Day Cleaning",
      address: "222 Palm Ave, San Diego, CA 92104",
      phone: "(619) 555-0104",
      category: "Cleaning Service",
      rating: 4.6,
      review_count: 67,
      place_id: "mock_place_4",
      latitude: 32.74,
      longitude: -117.14,
      city: "San Diego",
      state: "CA",
      search_query: query,
      source: "mock",
    },
    {
      name: "Green Thumb Landscaping",
      address: "333 Garden Rd, San Diego, CA 92105",
      phone: "(619) 555-0105",
      category: "Landscaping",
      rating: 4.9,
      review_count: 89,
      place_id: "mock_place_5",
      latitude: 32.75,
      longitude: -117.13,
      city: "San Diego",
      state: "CA",
      search_query: query,
      source: "mock",
    },
  ];

  return {
    results: mockBusinesses,
    totalResults: 15,
    noWebsiteCount: mockBusinesses.length,
  };
}
