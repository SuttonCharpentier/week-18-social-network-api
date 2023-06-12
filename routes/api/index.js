const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thougthRoutes = require('./thoughtRoutes');

// Route to handle all API routes
router.use('/users', userRoutes);
router.use('/thougths', thougthRoutes);

module.exports = router;