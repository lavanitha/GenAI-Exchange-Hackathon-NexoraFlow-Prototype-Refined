const express = require('express');
const router = express.Router();

// Import route modules
const dashboardRoutes = require('./dashboard');
const adviseRoutes = require('./advise');
const communityRoutes = require('./community');
const learningRoutes = require('./learning');
const achievementRoutes = require('./achievement');
const coachingRoutes = require('./coaching');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'NexoraFlow API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount route modules
router.use('/dashboard', dashboardRoutes);
router.use('/advise', adviseRoutes);
router.use('/community', communityRoutes);
router.use('/learning', learningRoutes);
router.use('/achievement', achievementRoutes);
router.use('/coaching', coachingRoutes);

module.exports = router;