const { readData, writeData, generateId } = require('./dataStore');

// Resource model functions
const resourceModel = {
  // Get all resources
  getAll: async () => {
    let resources = await readData('resources.json');
    
    // If no resources exist, create placeholder resources
    if (resources.length === 0) {
      resources = [
        {
          id: generateId(),
          title: 'Health Resource Placeholder 1',
          description: 'This is a placeholder for health resources that would be available in the application.',
          category: 'general',
          tags: ['health', 'resources', 'placeholder']
        },
        {
          id: generateId(),
          title: 'Health Resource Placeholder 2',
          description: 'Another placeholder for health resources that would be available in the application.',
          category: 'general',
          tags: ['health', 'resources', 'placeholder']
        }
      ];
      
      await writeData('resources.json', resources);
    }
    
    return resources;
  },

  // Get resource by ID
  getById: async (id) => {
    const resources = await readData('resources.json');
    return resources.find(resource => resource.id === id);
  },

  // Get resources by category
  getByCategory: async (category) => {
    const resources = await readData('resources.json');
    return resources.filter(resource => resource.category === category);
  },

  // Create resource
  create: async (resourceData) => {
    const resources = await readData('resources.json');
    
    const newResource = {
      id: generateId(),
      ...resourceData,
      createdAt: new Date().toISOString()
    };

    resources.push(newResource);
    await writeData('resources.json', resources);
    
    return newResource;
  },

  // Update resource
  update: async (id, updates) => {
    const resources = await readData('resources.json');
    const index = resources.findIndex(resource => resource.id === id);
    
    if (index === -1) {
      return { error: 'Resource not found' };
    }

    // Update resource
    resources[index] = {
      ...resources[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await writeData('resources.json', resources);
    return resources[index];
  },

  // Delete resource
  delete: async (id) => {
    const resources = await readData('resources.json');
    const filteredResources = resources.filter(resource => resource.id !== id);
    
    if (filteredResources.length === resources.length) {
      return { error: 'Resource not found' };
    }

    await writeData('resources.json', filteredResources);
    return { success: true };
  }
};

module.exports = resourceModel;