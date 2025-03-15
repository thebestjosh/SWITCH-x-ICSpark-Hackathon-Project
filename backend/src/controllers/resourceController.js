const resourceModel = require('../models/resource');

// Resource controller functions
const resourceController = {
  // Get all resources
  getAllResources: async (req, res) => {
    try {
      const resources = await resourceModel.getAll();
      res.json(resources);
    } catch (error) {
      console.error('Error getting resources:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get resource by ID
  getResourceById: async (req, res) => {
    try {
      const resource = await resourceModel.getById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      res.json(resource);
    } catch (error) {
      console.error('Error getting resource:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get resources by category
  getResourcesByCategory: async (req, res) => {
    try {
      const resources = await resourceModel.getByCategory(req.params.category);
      res.json(resources);
    } catch (error) {
      console.error('Error getting resources by category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create resource
  createResource: async (req, res) => {
    try {
      const { title, description, category, url, phone, address, tags } = req.body;
      
      // Validate input
      if (!title || !description || !category) {
        return res.status(400).json({ error: 'Title, description, and category are required' });
      }
      
      const newResource = await resourceModel.create({
        title,
        description,
        category,
        url,
        phone,
        address,
        tags: tags || []
      });
      
      res.status(201).json(newResource);
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update resource
  updateResource: async (req, res) => {
    try {
      const result = await resourceModel.update(req.params.id, req.body);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error updating resource:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete resource
  deleteResource: async (req, res) => {
    try {
      const result = await resourceModel.delete(req.params.id);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
      console.error('Error deleting resource:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = resourceController;