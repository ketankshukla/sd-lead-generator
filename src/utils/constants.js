export const BUSINESS_CATEGORIES = [
  "Restaurants",
  "Auto Repair",
  "Hair Salons",
  "Barber Shops",
  "Dentists",
  "Plumbers",
  "Electricians",
  "HVAC Services",
  "Landscaping",
  "Cleaning Services",
  "Pet Grooming",
  "Veterinarians",
  "Bakeries",
  "Coffee Shops",
  "Gyms & Fitness",
  "Yoga Studios",
  "Martial Arts",
  "Chiropractors",
  "Massage Therapy",
  "Accountants",
  "Tax Services",
  "Real Estate Agents",
  "Insurance Agents",
  "Tutoring Services",
  "Music Lessons",
  "Photography Studios",
  "Florists",
  "Dry Cleaners",
  "Nail Salons",
  "Tattoo Shops",
  "Auto Detailing",
  "Towing Services",
  "Moving Companies",
  "Storage Facilities",
  "Dog Training",
  "Day Care",
  "Senior Care",
  "Home Health Care",
  "Legal Services",
  "Notary Services",
];

export const LOCATIONS = {
  // WEST VIRGINIA - #1 lowest website adoption
  "Charleston, WV": { lat: 38.3498, lng: -81.6326, state: "WV" },
  "Huntington, WV": { lat: 38.4192, lng: -82.4452, state: "WV" },
  "Morgantown, WV": { lat: 39.6295, lng: -79.9559, state: "WV" },
  "Parkersburg, WV": { lat: 39.2667, lng: -81.5615, state: "WV" },
  "Wheeling, WV": { lat: 40.064, lng: -80.7209, state: "WV" },
  "Beckley, WV": { lat: 37.7782, lng: -81.1882, state: "WV" },

  // KENTUCKY - #2 lowest
  "Louisville, KY": { lat: 38.2527, lng: -85.7585, state: "KY" },
  "Lexington, KY": { lat: 38.0406, lng: -84.5037, state: "KY" },
  "Bowling Green, KY": { lat: 36.9685, lng: -86.4808, state: "KY" },
  "Owensboro, KY": { lat: 37.7719, lng: -87.1112, state: "KY" },
  "Covington, KY": { lat: 39.0837, lng: -84.5086, state: "KY" },
  "Paducah, KY": { lat: 37.0834, lng: -88.6, state: "KY" },

  // MISSISSIPPI - #3 lowest
  "Jackson, MS": { lat: 32.2988, lng: -90.1848, state: "MS" },
  "Gulfport, MS": { lat: 30.3674, lng: -89.0928, state: "MS" },
  "Biloxi, MS": { lat: 30.396, lng: -88.8853, state: "MS" },
  "Hattiesburg, MS": { lat: 31.3271, lng: -89.2903, state: "MS" },
  "Meridian, MS": { lat: 32.3643, lng: -88.7037, state: "MS" },
  "Tupelo, MS": { lat: 34.2576, lng: -88.7034, state: "MS" },

  // IOWA - #4 lowest
  "Des Moines, IA": { lat: 41.5868, lng: -93.625, state: "IA" },
  "Cedar Rapids, IA": { lat: 41.9779, lng: -91.6656, state: "IA" },
  "Davenport, IA": { lat: 41.5236, lng: -90.5776, state: "IA" },
  "Sioux City, IA": { lat: 42.4963, lng: -96.4049, state: "IA" },
  "Waterloo, IA": { lat: 42.4928, lng: -92.3426, state: "IA" },
  "Dubuque, IA": { lat: 42.5006, lng: -90.6646, state: "IA" },

  // ALASKA - #5 lowest
  "Anchorage, AK": { lat: 61.2181, lng: -149.9003, state: "AK" },
  "Fairbanks, AK": { lat: 64.8378, lng: -147.7164, state: "AK" },
  "Juneau, AK": { lat: 58.3019, lng: -134.4197, state: "AK" },
  "Sitka, AK": { lat: 57.0531, lng: -135.33, state: "AK" },
  "Ketchikan, AK": { lat: 55.3422, lng: -131.6461, state: "AK" },

  // NORTH DAKOTA - #6 lowest
  "Fargo, ND": { lat: 46.8772, lng: -96.7898, state: "ND" },
  "Bismarck, ND": { lat: 46.8083, lng: -100.7837, state: "ND" },
  "Grand Forks, ND": { lat: 47.9253, lng: -97.0329, state: "ND" },
  "Minot, ND": { lat: 48.2325, lng: -101.2963, state: "ND" },
  "Williston, ND": { lat: 48.147, lng: -103.618, state: "ND" },

  // SOUTH CAROLINA - #7 lowest
  "Columbia, SC": { lat: 34.0007, lng: -81.0348, state: "SC" },
  "Charleston, SC": { lat: 32.7765, lng: -79.9311, state: "SC" },
  "Greenville, SC": { lat: 34.8526, lng: -82.394, state: "SC" },
  "Myrtle Beach, SC": { lat: 33.6891, lng: -78.8867, state: "SC" },
  "Spartanburg, SC": { lat: 34.9496, lng: -81.932, state: "SC" },
  "Florence, SC": { lat: 34.1954, lng: -79.7626, state: "SC" },

  // SOUTH DAKOTA - #8 lowest
  "Sioux Falls, SD": { lat: 43.5446, lng: -96.7311, state: "SD" },
  "Rapid City, SD": { lat: 44.0805, lng: -103.231, state: "SD" },
  "Aberdeen, SD": { lat: 45.4647, lng: -98.4865, state: "SD" },
  "Brookings, SD": { lat: 44.3114, lng: -96.7984, state: "SD" },
  "Watertown, SD": { lat: 44.8994, lng: -97.1151, state: "SD" },

  // VERMONT - #9 lowest
  "Burlington, VT": { lat: 44.4759, lng: -73.2121, state: "VT" },
  "Rutland, VT": { lat: 43.6106, lng: -72.9726, state: "VT" },
  "Montpelier, VT": { lat: 44.2601, lng: -72.5754, state: "VT" },
  "Barre, VT": { lat: 44.197, lng: -72.502, state: "VT" },
  "Bennington, VT": { lat: 42.8781, lng: -73.1968, state: "VT" },

  // DELAWARE - #10 lowest
  "Wilmington, DE": { lat: 39.7391, lng: -75.5398, state: "DE" },
  "Dover, DE": { lat: 39.1582, lng: -75.5244, state: "DE" },
  "Newark, DE": { lat: 39.6837, lng: -75.7497, state: "DE" },
  "Middletown, DE": { lat: 39.4496, lng: -75.7163, state: "DE" },

  // ARKANSAS - Also low adoption
  "Little Rock, AR": { lat: 34.7465, lng: -92.2896, state: "AR" },
  "Fort Smith, AR": { lat: 35.3859, lng: -94.3985, state: "AR" },
  "Fayetteville, AR": { lat: 36.0626, lng: -94.1574, state: "AR" },
  "Springdale, AR": { lat: 36.1867, lng: -94.1288, state: "AR" },
  "Jonesboro, AR": { lat: 35.8423, lng: -90.7043, state: "AR" },
  "Pine Bluff, AR": { lat: 34.2284, lng: -92.0032, state: "AR" },

  // NEW MEXICO - Rural areas
  "Albuquerque, NM": { lat: 35.0844, lng: -106.6504, state: "NM" },
  "Las Cruces, NM": { lat: 32.3199, lng: -106.7637, state: "NM" },
  "Santa Fe, NM": { lat: 35.687, lng: -105.9378, state: "NM" },
  "Roswell, NM": { lat: 33.3943, lng: -104.523, state: "NM" },
  "Farmington, NM": { lat: 36.7281, lng: -108.2187, state: "NM" },

  // MAINE - Rural New England
  "Portland, ME": { lat: 43.6591, lng: -70.2568, state: "ME" },
  "Bangor, ME": { lat: 44.8016, lng: -68.7712, state: "ME" },
  "Lewiston, ME": { lat: 44.1004, lng: -70.2148, state: "ME" },
  "Augusta, ME": { lat: 44.3106, lng: -69.7795, state: "ME" },

  // MONTANA - Very rural
  "Billings, MT": { lat: 45.7833, lng: -108.5007, state: "MT" },
  "Missoula, MT": { lat: 46.8721, lng: -113.994, state: "MT" },
  "Great Falls, MT": { lat: 47.4942, lng: -111.2833, state: "MT" },
  "Bozeman, MT": { lat: 45.677, lng: -111.0429, state: "MT" },
  "Helena, MT": { lat: 46.5891, lng: -112.0391, state: "MT" },

  // WYOMING - Most rural state
  "Cheyenne, WY": { lat: 41.14, lng: -104.8202, state: "WY" },
  "Casper, WY": { lat: 42.8501, lng: -106.3252, state: "WY" },
  "Laramie, WY": { lat: 41.3114, lng: -105.5911, state: "WY" },
  "Gillette, WY": { lat: 44.2911, lng: -105.5022, state: "WY" },
  "Rock Springs, WY": { lat: 41.5875, lng: -109.2029, state: "WY" },

  // Keep San Diego as an option
  "San Diego, CA": { lat: 32.7157, lng: -117.1611, state: "CA" },
};

// Group locations by state for the dropdown
export const STATES = [
  { name: "West Virginia", code: "WV", rank: 1 },
  { name: "Kentucky", code: "KY", rank: 2 },
  { name: "Mississippi", code: "MS", rank: 3 },
  { name: "Iowa", code: "IA", rank: 4 },
  { name: "Alaska", code: "AK", rank: 5 },
  { name: "North Dakota", code: "ND", rank: 6 },
  { name: "South Carolina", code: "SC", rank: 7 },
  { name: "South Dakota", code: "SD", rank: 8 },
  { name: "Vermont", code: "VT", rank: 9 },
  { name: "Delaware", code: "DE", rank: 10 },
  { name: "Arkansas", code: "AR", rank: 11 },
  { name: "New Mexico", code: "NM", rank: 12 },
  { name: "Maine", code: "ME", rank: 13 },
  { name: "Montana", code: "MT", rank: 14 },
  { name: "Wyoming", code: "WY", rank: 15 },
  { name: "California", code: "CA", rank: 99 },
];

// Legacy - kept for compatibility
export const SAN_DIEGO_AREAS = Object.keys(LOCATIONS);

export const LEAD_STATUSES = [
  { value: "new", label: "New", color: "bg-emerald-500" },
  { value: "contacted", label: "Contacted", color: "bg-cyan-500" },
  { value: "responded", label: "Responded", color: "bg-amber-500" },
  { value: "not_interested", label: "Not Interested", color: "bg-rose-500" },
  { value: "converted", label: "Converted", color: "bg-purple-500" },
];

export const STATUS_COLORS = {
  new: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  contacted: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  responded: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  not_interested: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  converted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};
