// Setup the Express.js server and connect to MongoDB
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Require dotenv package
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the API server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running at  http://localhost:${PORT}`);
  });
});