const { readData, writeData, generateId } = require('./dataStore');
const fs = require('fs').promises;
const path = require('path');

// Load default learning modules from JSON if available
const loadDefaultModules = async () => {
  try {
    const defaultModulesPath = path.join(__dirname, '../data/defaultLearningModules.json');
    const data = await fs.readFile(defaultModulesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading default learning modules:', error);
    return [];
  }
};

// Learning module model functions
const learningModel = {
  // Get all learning modules
  getAll: async () => {
    let modules = await readData('learningModules.json');
    
    // If no modules exist, load defaults if available
    if (modules.length === 0) {
      const defaultModules = await loadDefaultModules();
      
      if (defaultModules.length > 0) {
        modules = defaultModules;
        await writeData('learningModules.json', modules);
      } else {
        // Create simple placeholder if no defaults
        modules = [
          {
            id: generateId(),
            title: 'Introduction to Health Literacy',
            description: 'An overview of health literacy concepts and why they matter.',
            category: 'general',
            difficulty: 'beginner',
            estimatedMinutes: 15,
            lessons: [
              {
                id: generateId(),
                title: 'What is Health Literacy?',
                content: 'Health literacy is the degree to which individuals have the capacity to obtain, process, and understand basic health information and services needed to make appropriate health decisions.'
              }
            ],
            quizzes: [],
            completedBy: []
          }
        ];
        
        await writeData('learningModules.json', modules);
      }
    }
    
    return modules;
  },

  // Get module by ID
  getById: async (id) => {
    const modules = await readData('learningModules.json');
    return modules.find(module => module.id === id);
  },

  // Get modules by category
  getByCategory: async (category) => {
    const modules = await readData('learningModules.json');
    return modules.filter(module => module.category === category);
  },

  // Create module
  create: async (moduleData) => {
    const modules = await readData('learningModules.json');
    
    const newModule = {
      id: generateId(),
      ...moduleData,
      lessons: moduleData.lessons || [],
      quizzes: moduleData.quizzes || [],
      completedBy: [],
      createdAt: new Date().toISOString()
    };

    modules.push(newModule);
    await writeData('learningModules.json', modules);
    
    return newModule;
  },

  // Update module
  update: async (id, updates) => {
    const modules = await readData('learningModules.json');
    const index = modules.findIndex(module => module.id === id);
    
    if (index === -1) {
      return { error: 'Module not found' };
    }

    // Update module
    modules[index] = {
      ...modules[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await writeData('learningModules.json', modules);
    return modules[index];
  },

  // Delete module
  delete: async (id) => {
    const modules = await readData('learningModules.json');
    const filteredModules = modules.filter(module => module.id !== id);
    
    if (filteredModules.length === modules.length) {
      return { error: 'Module not found' };
    }

    await writeData('learningModules.json', filteredModules);
    return { success: true };
  },

  // Add lesson to module
  addLesson: async (moduleId, lessonData) => {
    const modules = await readData('learningModules.json');
    const index = modules.findIndex(module => module.id === moduleId);
    
    if (index === -1) {
      return { error: 'Module not found' };
    }

    const newLesson = {
      id: generateId(),
      ...lessonData,
      createdAt: new Date().toISOString()
    };

    modules[index].lessons.push(newLesson);
    modules[index].updatedAt = new Date().toISOString();

    await writeData('learningModules.json', modules);
    return newLesson;
  },

  // Add quiz to module
  addQuiz: async (moduleId, quizData) => {
    const modules = await readData('learningModules.json');
    const index = modules.findIndex(module => module.id === moduleId);
    
    if (index === -1) {
      return { error: 'Module not found' };
    }

    const newQuiz = {
      id: generateId(),
      ...quizData,
      createdAt: new Date().toISOString()
    };

    modules[index].quizzes.push(newQuiz);
    modules[index].updatedAt = new Date().toISOString();

    await writeData('learningModules.json', modules);
    return newQuiz;
  },

  // Mark module as completed by user
  markAsCompleted: async (moduleId, userId) => {
    const modules = await readData('learningModules.json');
    const index = modules.findIndex(module => module.id === moduleId);
    
    if (index === -1) {
      return { error: 'Module not found' };
    }

    // Avoid duplicates
    if (!modules[index].completedBy.includes(userId)) {
      modules[index].completedBy.push(userId);
      await writeData('learningModules.json', modules);
    }
    
    return modules[index];
  }
};

module.exports = learningModel;