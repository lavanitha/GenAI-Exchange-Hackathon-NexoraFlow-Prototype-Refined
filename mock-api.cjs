const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/dashboard', (req, res) => {
  res.json({ data: { message: 'Mock dashboard data' } });
});

app.get('/api/dashboard/metrics', (req, res) => {
  res.json({ data: { users: 123, active: 45 } });
});

app.get('/api/advise/categories', (req, res) => {
  res.json({ data: [
    { id: 'career', name: 'Career Advice', description: 'Career related guidance', icon: 'briefcase' },
    { id: 'learning', name: 'Learning', description: 'Learning related tips', icon: 'book' }
  ]});
});

app.post('/api/advise', (req, res) => {
  res.json({ data: { advice: 'This is mock advice based on your request', request: req.body } });
});

// Generic fallback for any /api routes not matched above
app.use('/api', (req, res) => {
  if (req.method === 'GET') {
    return res.json({ data: {}, path: req.path });
  }
  return res.json({ data: {}, path: req.path, body: req.body });
});

app.listen(PORT, () => {
  console.log(`Mock API server listening on http://localhost:${PORT}`);
});
