# 🎯 SAN DIEGO LEAD GENERATOR - COMPLETE BUILD PROMPT FOR WINDSURF

## ⚠️ CRITICAL INSTRUCTIONS - READ FIRST

**DO NOT USE VITE, CREATE-REACT-APP, OR ANY SCAFFOLDING TOOLS.**
These tools have issues with PowerShell on Windows 11. You MUST manually create all files and folder structures.

**STOP AND CONFIRM** before starting: "I understand I must manually create all React project files without using Vite or create-react-app. I will create each file individually."

---

## 📋 PROJECT OVERVIEW

Build a **San Diego Business Lead Generator** - a React application that finds local businesses without websites so I can contact them about creating a website for them. The app will scrape/search Google Maps listings for businesses that show "No website" and collect their contact information.

### Tech Stack:
- **Frontend**: React 18 (manually configured, NO VITE)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel via GitHub
- **Version Control**: GitHub (using gh CLI)

---

## 🎨 DESIGN SPECIFICATIONS

### Color Palette (from fasting.ketanshukla.com):
```
Primary Background: Deep slate/charcoal gradient
- from-slate-950 via-slate-900 to-slate-950
- Hex: #020617 → #0f172a → #020617

Accent Colors:
- Emerald Green: #10b981 (primary actions, success states)
- Cyan/Teal: #06b6d4 (secondary accents, highlights)
- Amber/Gold: #f59e0b (warnings, ratings, stars)
- Rose/Pink: #f43f5e (delete actions, "no website" badges)
- Purple: #a855f7 (converted status, premium features)

Text Colors:
- Primary Text: #f8fafc (slate-50)
- Secondary Text: #94a3b8 (slate-400)
- Muted Text: #64748b (slate-500)

Card/Container Backgrounds:
- bg-slate-800/50 with backdrop-blur-sm
- Border: border-slate-700/50
```

### Typography:
- Font Family: Inter (Google Fonts) - clean, modern, highly readable
- Headings: font-bold, tracking-tight
- Body: font-normal
- Small/Labels: text-sm, text-slate-400

### Design Elements:
- **Glassmorphism**: Use backdrop-blur-sm with semi-transparent backgrounds
- **Subtle Gradients**: Gradient text for headings, gradient buttons
- **Rounded Corners**: rounded-xl for cards, rounded-lg for buttons/inputs
- **Shadows**: shadow-xl shadow-black/20 for depth
- **Emojis**: Use strategically for visual appeal:
  - 🔍 Search
  - 📍 Location
  - 📞 Phone
  - 💼 Business
  - ⭐ Rating
  - 📋 Saved Leads
  - ✅ Success
  - ❌ No Website
  - 📧 Contact
  - 💰 Converted
  - ⚙️ Settings
  - 📊 Stats
  - 🚀 Deploy/Launch

### UI Components Style:
- **Buttons**: Gradient backgrounds (emerald to cyan), hover:opacity-90, transition-all
- **Inputs**: bg-slate-800 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20
- **Cards**: bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl
- **Status Badges**: Pill-shaped with appropriate colors per status

---

## 📁 PROJECT STRUCTURE - CREATE MANUALLY

```
sd_lead_generator/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchPanel.jsx
│   │   ├── ResultsGrid.jsx
│   │   ├── LeadCard.jsx
│   │   ├── SavedLeads.jsx
│   │   ├── LeadDetailModal.jsx
│   │   ├── Settings.jsx
│   │   ├── StatsBar.jsx
│   │   ├── ExportButton.jsx
│   │   ├── StatusBadge.jsx
│   │   └── LoadingSpinner.jsx
│   ├── hooks/
│   │   ├── useLeads.js
│   │   ├── useSupabase.js
│   │   └── useSearch.js
│   ├── lib/
│   │   ├── supabase.js
│   │   └── serpapi.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── exportCSV.js
│   ├── App.jsx
│   └── index.jsx
├── .env.local
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## 🗄️ SUPABASE DATABASE SCHEMA

**✅ TABLES ALREADY CREATED AND VERIFIED IN SUPABASE - DO NOT RUN THIS SQL AGAIN.**

The following tables already exist in the database. This SQL is included for reference only:

### Table: leads
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Business Information
  name TEXT NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'San Diego',
  state TEXT DEFAULT 'CA',
  zip_code TEXT,
  phone TEXT,
  category TEXT,
  
  -- Google Maps Data
  place_id TEXT UNIQUE,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  
  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'responded', 'not_interested', 'converted')),
  notes TEXT,
  contact_date TIMESTAMP WITH TIME ZONE,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  
  -- Source Tracking
  search_query TEXT,
  source TEXT DEFAULT 'serpapi'
);

-- Index for faster queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_category ON leads(category);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

### Table: search_history
```sql
CREATE TABLE search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  query TEXT NOT NULL,
  category TEXT,
  area TEXT,
  results_count INTEGER DEFAULT 0,
  leads_found INTEGER DEFAULT 0
);
```

### Table: settings
```sql
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES 
  ('serpapi_key', ''),
  ('default_area', 'San Diego'),
  ('auto_save', 'true');
```

### Row Level Security (RLS):
For now, disable RLS for simplicity (this is a personal tool):
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE search_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
```

**✅ CONFIRMED: All 3 tables (leads, search_history, settings) exist and are ready. RLS is disabled. Proceed directly to building the React app.**

---

## 🔧 CORE FEATURES TO IMPLEMENT

### 1. Search Functionality
- **Category Dropdown**: 30+ business categories (Restaurants, Auto Repair, Hair Salons, Plumbers, etc.)
- **Area Dropdown**: San Diego neighborhoods (Downtown, La Jolla, Pacific Beach, Hillcrest, North Park, Chula Vista, etc.)
- **Custom Search**: Free-text search override
- **API Integration**: SerpAPI Google Maps endpoint
- **Filter Results**: Only show businesses WITHOUT websites

### 2. Lead Management
- **Save Leads**: Individual or bulk save to Supabase
- **Status Tracking**: New → Contacted → Responded → Not Interested → Converted
- **Notes**: Add/edit notes for each lead
- **Follow-up Dates**: Set reminder dates
- **Delete**: Remove unwanted leads

### 3. Search Results Display
- **Grid/List View**: Toggle between views
- **Lead Cards**: Show name, address, phone, category, rating
- **No Website Badge**: Red badge indicator
- **Quick Save Button**: One-click save

### 4. Saved Leads Management
- **Filter by Status**: Filter buttons for each status
- **Sort Options**: By date, name, status, rating
- **Inline Editing**: Edit status and notes without modal
- **Bulk Actions**: Export selected, delete selected

### 5. Export Functionality
- **CSV Export**: Download leads as CSV
- **Custom Fields**: Choose which fields to export
- **Filter Export**: Export only filtered results

### 6. Settings Panel
- **API Key Management**: Store SerpAPI key securely
- **Default Preferences**: Default search area, auto-save toggle
- **Data Management**: Clear all data option

### 7. Statistics Dashboard
- **Total Leads**: Count by status
- **Conversion Rate**: Calculated percentage
- **Search History**: Recent searches with results count
- **Charts**: Optional - simple bar chart of status distribution

---

## 📝 BUSINESS CATEGORIES LIST

```javascript
export const BUSINESS_CATEGORIES = [
  'Restaurants',
  'Auto Repair',
  'Hair Salons',
  'Barber Shops',
  'Dentists',
  'Plumbers',
  'Electricians',
  'HVAC Services',
  'Landscaping',
  'Cleaning Services',
  'Pet Grooming',
  'Veterinarians',
  'Bakeries',
  'Coffee Shops',
  'Gyms & Fitness',
  'Yoga Studios',
  'Martial Arts',
  'Chiropractors',
  'Massage Therapy',
  'Accountants',
  'Tax Services',
  'Real Estate Agents',
  'Insurance Agents',
  'Tutoring Services',
  'Music Lessons',
  'Photography Studios',
  'Florists',
  'Dry Cleaners',
  'Nail Salons',
  'Tattoo Shops',
  'Auto Detailing',
  'Towing Services',
  'Moving Companies',
  'Storage Facilities',
  'Dog Training',
  'Day Care',
  'Senior Care',
  'Home Health Care',
  'Legal Services',
  'Notary Services'
];
```

## 📍 SAN DIEGO AREAS LIST

```javascript
export const SAN_DIEGO_AREAS = [
  'All San Diego',
  'Downtown San Diego',
  'La Jolla',
  'Pacific Beach',
  'Ocean Beach',
  'Mission Beach',
  'Mission Valley',
  'Hillcrest',
  'North Park',
  'South Park',
  'Gaslamp Quarter',
  'Little Italy',
  'Bankers Hill',
  'University Heights',
  'Normal Heights',
  'Kensington',
  'City Heights',
  'College Area',
  'Clairemont',
  'Kearny Mesa',
  'Mira Mesa',
  'Scripps Ranch',
  'Rancho Bernardo',
  'Carmel Valley',
  'Del Mar',
  'Solana Beach',
  'Encinitas',
  'Carlsbad',
  'Oceanside',
  'Vista',
  'San Marcos',
  'Escondido',
  'Poway',
  'Santee',
  'El Cajon',
  'La Mesa',
  'Lemon Grove',
  'Spring Valley',
  'Chula Vista',
  'National City',
  'Imperial Beach',
  'Coronado',
  'Point Loma',
  'Bay Park',
  'Linda Vista'
];
```

---

## 🔌 API INTEGRATION CODE

### SerpAPI Google Maps Search:
```javascript
// src/lib/serpapi.js
export async function searchBusinesses(query, apiKey) {
  const params = new URLSearchParams({
    engine: 'google_maps',
    q: query,
    ll: '@32.7157,-117.1611,12z', // San Diego coordinates
    type: 'search',
    api_key: apiKey
  });

  const response = await fetch(
    `https://serpapi.com/search.json?${params}`
  );
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  const data = await response.json();
  
  // Filter businesses without websites
  const noWebsiteBusinesses = (data.local_results || [])
    .filter(biz => !biz.website && !biz.links?.website)
    .map(biz => ({
      name: biz.title,
      address: biz.address,
      phone: biz.phone,
      category: biz.type,
      rating: biz.rating,
      review_count: biz.reviews,
      place_id: biz.place_id,
      latitude: biz.gps_coordinates?.latitude,
      longitude: biz.gps_coordinates?.longitude
    }));
  
  return noWebsiteBusinesses;
}
```

### Supabase Client:
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Lead operations
export const leadsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async getByStatus(status) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async create(lead) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async createMany(leads) {
    const { data, error } = await supabase
      .from('leads')
      .insert(leads)
      .select();
    if (error) throw error;
    return data;
  },
  
  async update(id, updates) {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async delete(id) {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
```

---

## 📦 PACKAGE.JSON

```json
{
  "name": "sd-lead-generator",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

---

## 🌐 ENVIRONMENT VARIABLES

### .env.local (DO NOT COMMIT)
```
REACT_APP_SUPABASE_URL=https://zxpuwzdvahotmogqkpnw.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4cHV3emR2YWhvdG1vZ3FrcG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjE0OTcsImV4cCI6MjA4MjY5NzQ5N30.Y-RdfO8znKwd6CdFK3mff4n4mMNMcqCPJV7ZugLOb8w
REACT_APP_SERPAPI_KEY=2f6e21827eec5ba3386b2505bee72fba34dfdf8340b6c59e77691ecd591f899a
```

**⚠️ IMPORTANT: Use these EXACT values. All API keys are provided - no user input needed for environment variables.**

### .env.example (COMMIT THIS)
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_SERPAPI_KEY=
```

### .gitignore MUST INCLUDE:
```
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.*.local

# Private information - IMPORTANT!
private_info/

# Build output
build/
dist/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**⚠️ CRITICAL: The `private_info/` folder exists in the root directory and contains sensitive data. It MUST be added to .gitignore to prevent it from being pushed to GitHub.**

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Initialize Git & Create GitHub Repo
```powershell
# Navigate to project folder
cd sd_lead_generator

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: San Diego Lead Generator"

# Create GitHub repo using gh CLI
gh repo create sd-lead-generator --public --source=. --remote=origin --push
```

### Step 2: Deploy to Vercel
```powershell
# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Step 3: Set Environment Variables in Vercel
```powershell
# Or do this via Vercel dashboard
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY
vercel env add REACT_APP_SERPAPI_KEY
```

---

## ✅ COMPLETION CHECKLIST

Before considering this complete, verify:

- [ ] All files created manually (no Vite/CRA)
- [ ] Tailwind CSS configured and working
- [ ] Supabase tables created with correct schema
- [ ] Supabase client connecting successfully
- [ ] Search functionality works with demo data
- [ ] Leads can be saved to Supabase
- [ ] Leads can be updated (status, notes)
- [ ] Leads can be deleted
- [ ] CSV export works
- [ ] Settings panel saves API key
- [ ] GitHub repo created and code pushed
- [ ] Vercel deployment successful
- [ ] Environment variables set in Vercel
- [ ] Production site loads correctly
- [ ] All styling matches the design spec (dark theme, gradients, glassmorphism)

---

## 🎯 FINAL NOTES

1. **Test with Demo Data First**: Before using SerpAPI (which has limited free calls), test all functionality with mock data.

2. **Error Handling**: Implement proper error handling for API failures, network issues, and database errors.

3. **Loading States**: Show loading spinners during API calls and database operations.

4. **Responsive Design**: Ensure the app works well on mobile devices.

5. **Accessibility**: Use proper ARIA labels and ensure keyboard navigation works.

---

## 🏁 START BUILDING

Begin by:
1. Creating the folder structure
2. Creating package.json
3. Installing dependencies with `npm install`
4. Creating tailwind.config.js and postcss.config.js
5. Creating the public/index.html file
6. Creating src/index.jsx and src/App.jsx
7. Building components one by one
8. Setting up Supabase connection
9. Testing locally
10. Deploying to Vercel

**Remember: CREATE ALL FILES MANUALLY. Do not use any scaffolding tools.**

Good luck! 🚀
