# 🎯 San Diego Lead Generator

A React application that finds local San Diego businesses without websites - perfect for web development lead generation.

## Features

- 🔍 **Search Google Maps** for businesses by category and area
- ❌ **Filter Results** to show only businesses without websites
- 📋 **Save Leads** to Supabase database
- 📊 **Track Status** (New, Contacted, Responded, Not Interested, Converted)
- 📝 **Add Notes** and follow-up dates
- 📥 **Export to CSV** for external use
- 🎨 **Beautiful Dark UI** with glassmorphism design

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **API**: SerpAPI (Google Maps)
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Run locally: `npm start`

## Environment Variables

- `REACT_APP_SUPABASE_URL` - Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anon key
- `REACT_APP_SERPAPI_KEY` - Your SerpAPI key

## License

MIT
