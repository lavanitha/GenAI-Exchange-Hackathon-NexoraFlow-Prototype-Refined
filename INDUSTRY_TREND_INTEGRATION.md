# Industry Trend Feed - Backend Integration Points

## API Endpoints to Connect

1. **Trends API** (`/api/trends/roles`): Fetch trending roles with filters (industry, location, experience). Returns role data with openings, salaries, companies. TODO: Replace `allRoles` demo data with API response in `IndustryTrendFeed.tsx`.

2. **Subscribe Endpoint** (`/api/trends/subscribe`): POST email subscription for trend alerts. TODO: Wire `handleSubscribeSubmit()` to send subscription to backend API.

3. **Job Openings API** (`/api/trends/openings`): Get detailed job listings for a role/company. TODO: Replace mock job listings in modals with real API data.

4. **Export API** (`/api/trends/export`): Export trend data as CSV/JSON. TODO: Add export functionality to "Get Updates" button.

