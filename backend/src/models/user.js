const { readData, writeData, generateId } = require('./dataStore');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'malama-health-secret-key'; // In production, use environment variable

// User model functions
const userModel = {
  // Get all users
  getAll: async () => {
    return await readData('users.json');
  },

  // Get user by ID
  getById: async (id) => {
    const users = await readData('users.json');
    return users.find(user => user.id === id);
  },

  // Get user by username or email
  getByCredentials: async (identifier) => {
    const users = await readData('users.json');
    return users.find(user => 
      user.username === identifier || user.email === identifier
    );
  },

  // Create user
  create: async (userData) => {
    const users = await readData('users.json');
    
    // Check if user already exists
    const existingUser = users.find(
      user => user.email === userData.email || user.username === userData.username
    );
    
    if (existingUser) {
      return { error: 'User with this email or username already exists' };
    }

    const newUser = {
      id: generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      preferences: {
        notificationsEnabled: true,
        darkMode: false,
        fontSize: 'medium',
        language: 'en'
      }
    };

    users.push(newUser);
    await writeData('users.json', users);
    
    // Generate token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user: newUser, token };
  },

  // Update user
  update: async (id, updates) => {
    const users = await readData('users.json');
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return { error: 'User not found' };
    }

    // Remove sensitive fields from updates
    const { password, ...safeUpdates } = updates;

    // Update user
    users[index] = {
      ...users[index],
      ...safeUpdates,
      updatedAt: new Date().toISOString()
    };

    await writeData('users.json', users);
    return { user: users[index] };
  },

  // Delete user
  delete: async (id) => {
    const users = await readData('users.json');
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      return { error: 'User not found' };
    }

    await writeData('users.json', filteredUsers);
    return { success: true };
  },

  // Authenticate user and generate token
  authenticate: async (email, password) => {
    const users = await readData('users.json');
    
    // In a real application, password would be hashed
    const user = users.find(user => 
      user.email === email && user.password === password
    );

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  }
};

module.exports = userModel;