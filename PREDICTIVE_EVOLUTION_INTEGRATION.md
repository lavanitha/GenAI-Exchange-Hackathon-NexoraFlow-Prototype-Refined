# Predictive Career Evolution Model - Backend Integration Points

## API Endpoints to Connect

1. **Predictive Model API** (`/api/predictions/career-evolution`)
   - POST: Submit inputs (career, experience level, projection window, skills)
   - Returns: Forecasted skill growth, salary projections, job openings data over time
   - TODO: Replace `calculateProjections()` function with API response data

2. **Export Data API** (`/api/predictions/export`)
   - POST: Export simulation data as CSV/JSON/PDF
   - Returns: Downloadable file with current forecast parameters and results
   - TODO: Implement export functionality in `handleExportData()` function

3. **Career Data API** (`/api/careers`)
   - GET: Fetch available career paths with baseline salaries and growth rates
   - Returns: List of careers with market data (demand, openings, salary ranges)
   - TODO: Replace static `careers` array with API data

