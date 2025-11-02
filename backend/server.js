const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import the job connector you created earlier
const { getJobs } = require("./services/jobConnector");

const app = express();
app.use(cors());
app.use(express.json());

// simple healthcheck
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Jobs route: /api/jobs?q=developer
app.get("/api/jobs", async (req, res) => {
  try {
    const query = req.query.q || "software developer";
    const page = parseInt(req.query.page || "1", 10) || 1;
    const jobs = await getJobs(query, page);
    res.json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    console.error("Error in /api/jobs:", err);
    res.status(500).json({ success: false, error: err.message || "server error" });
  }
});

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
