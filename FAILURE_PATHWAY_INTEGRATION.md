# Failure Pathway Forecasting - Backend Integration Points

## API Endpoints to Connect

1. **Risk Model API** (`/api/risk/forecast`): POST role, experience, projection window → returns risk curve data, missing skills, attrition projections. TODO: Replace `calculateRiskData()` simulation with API response in `FailurePathwayForecasting.tsx`.

2. **Reskill Plan API** (`/api/reskill/plan`): GET role-specific reskill plan with steps, duration, difficulty. TODO: Wire `currentRole.reskillPlan` data from backend API instead of static demo.

3. **Export/Download API** (`/api/report/export`): POST forecast parameters → returns downloadable PDF/HTML report. TODO: Implement `handleDownloadReport()` to generate and download report via API or html2canvas.

