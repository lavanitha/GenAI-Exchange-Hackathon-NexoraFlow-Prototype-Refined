# Career Twin Simulation - Backend Integration Points

## API Endpoints to Connect

1. **Simulation API** (`/api/simulations/career-twin`)
   - POST: Submit simulation parameters (timeline, resolution, skills)
   - Returns: Career path projections with skill growth, salary, demand data
   - TODO: Replace demo career paths array with API response

2. **Export Snapshot API** (`/api/simulations/export`)
   - POST: Export current simulation state (timeline, resolution, selected careers)
   - Returns: Downloadable file (JSON/PDF)
   - TODO: Implement export functionality in `handleExportSnapshot()`

3. **Career Data API** (`/api/careers`)
   - GET: Fetch available career paths and their details
   - Returns: List of career paths with descriptions, skills, market data
   - TODO: Replace static `careers` array with API data

## Integration Notes

- All simulation calculations (projected skill levels, salary growth) are currently client-side demo logic
- Chart data generation should move to backend for accurate projections
- Modal details view should fetch extended career information from `/api/careers/:id`

