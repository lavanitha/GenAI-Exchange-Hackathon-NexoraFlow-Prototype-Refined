const { getJobs } = require("./services/jobConnector");

(async () => {
  console.log("Running job fetch test...");
  const jobs = await getJobs("developer jobs in Bangalore", 1);
  console.log("Fetched jobs count:", jobs.length);
  if (jobs.length) console.log("Sample job:", jobs[0]);
})();
