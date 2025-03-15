const userModel = require('../models/user');

// User controller functions
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAll();
      
      // Remove sensitive information
      const sanitizedUsers = users.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });
      
      res.json(sanitizedUsers);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await userModel.getById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Remove sensitive information
      const { password, ...safeUser } = user;
      
      res.json(safeUser);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Register new user
  registerUser: async (req, res) => {
    try {
      const { username, email, password, name } = req.body;
      
      // Validate input
      if (!username || !email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      const result = await userModel.create({
        username,
        email,
        password, // In production, hash password before saving
        name,
        language: 'en'
      });
      
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      
      // Remove password from response
      const { user } = result;
      const { password: _, ...safeUser } = user;
      
      res.status(201).json({
        user: safeUser,
        token: result.token
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      
      const result = await userModel.authenticate(email, password);
      
      if (result.error) {
        return res.status(401).json({ error: result.error });
      }
      
      // Remove password from response
      const { user } = result;
      const { password: _, ...safeUser } = user;
      
      res.json({
        user: safeUser,
        token: result.token
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      // In production, verify that user can only update their own data
      const result = await userModel.update(req.params.id, req.body);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      // Remove password from response
      const { password, ...safeUser } = result.user;
      
      res.json(safeUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      // In production, verify that user can only delete their own account
      const result = await userModel.delete(req.params.id);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update user preferences
  updatePreferences: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userModel.getById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Update preferences
      const result = await userModel.update(userId, {
        preferences: {
          ...user.preferences,
          ...req.body
        }
      });
      
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      
      // Remove password from response
      const { password, ...safeUser } = result.user;
      
      res.json(safeUser);
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = userController;