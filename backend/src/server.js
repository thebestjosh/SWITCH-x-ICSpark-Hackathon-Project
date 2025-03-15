const express = require('express');
const cors = require('cors');
const { initializeDataStore } = require('./models/dataStore');
const userRoutes = require('./routes/users');
const forumRoutes = require('./routes/forum');
const resourceRoutes = require('./routes/resources');
const learningRoutes = require('./routes/learning');

// Initialize data store
initializeDataStore();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/learning', learningRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Malama Health API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});