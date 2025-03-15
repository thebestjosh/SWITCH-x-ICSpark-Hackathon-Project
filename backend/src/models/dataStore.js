const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDirectory = path.join(__dirname, '../data');

// Ensure data directory exists
const initializeDataStore = async () => {
  try {
    await fs.mkdir(dataDirectory, { recursive: true });
    
    // Initialize files if they don't exist
    const files = ['users.json', 'forumPosts.json', 'resources.json', 'learningModules.json', 'quizResults.json'];
    
    for (const file of files) {
      const filePath = path.join(dataDirectory, file);
      try {
        await fs.access(filePath);
      } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(filePath, JSON.stringify([]));
      }
    }

    console.log('Data store initialized successfully');
  } catch (error) {
    console.error('Error initializing data store:', error);
  }
};

// Read data from file
const readData = async (filename) => {
  try {
    const data = await fs.readFile(path.join(dataDirectory, filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Write data to file
const writeData = async (filename, data) => {
  try {
    await fs.writeFile(
      path.join(dataDirectory, filename),
      JSON.stringify(data, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
    return false;
  }
};

// Generate a UUID
const generateId = () => uuidv4();

module.exports = {
  initializeDataStore,
  readData,
  writeData,
  generateId
};