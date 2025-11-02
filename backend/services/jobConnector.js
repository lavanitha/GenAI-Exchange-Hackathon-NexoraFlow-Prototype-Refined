const fetch = require("node-fetch");
require("dotenv").config();

const API_HOST = "jsearch.p.rapidapi.com";
const API_KEY = process.env.RAPIDAPI_KEY;

async function getJobs(query = "software developer", pages = 1) {
  const url = `https://${API_HOST}/search?query=${encodeURIComponent(query)}&num_pages=${pages}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST
    },
    timeout: 30000
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("API error " + res.status);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    return [];
  }
}

module.exports = { getJobs };
