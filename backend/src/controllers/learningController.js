const learningModel = require('../models/learning');
const userModel = require('../models/user');

// Learning controller functions
const learningController = {
  // Get all learning modules
  getAllModules: async (req, res) => {
    try {
      const modules = await learningModel.getAll();
      res.json(modules);
    } catch (error) {
      console.error('Error getting learning modules:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get module by ID
  getModuleById: async (req, res) => {
    try {
      const module = await learningModel.getById(req.params.id);
      
      if (!module) {
        return res.status(404).json({ error: 'Module not found' });
      }
      
      res.json(module);
    } catch (error) {
      console.error('Error getting module:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get modules by category
  getModulesByCategory: async (req, res) => {
    try {
      const modules = await learningModel.getByCategory(req.params.category);
      res.json(modules);
    } catch (error) {
      console.error('Error getting modules by category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create module
  createModule: async (req, res) => {
    try {
      const { title, description, category, difficulty, estimatedMinutes, lessons, quizzes } = req.body;
      
      // Validate input
      if (!title || !description || !category || !difficulty) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const newModule = await learningModel.create({
        title,
        description,
        category,
        difficulty,
        estimatedMinutes: estimatedMinutes || 0,
        lessons,
        quizzes
      });
      
      res.status(201).json(newModule);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update module
  updateModule: async (req, res) => {
    try {
      const result = await learningModel.update(req.params.id, req.body);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error updating module:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete module
  deleteModule: async (req, res) => {
    try {
      const result = await learningModel.delete(req.params.id);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json({ message: 'Module deleted successfully' });
    } catch (error) {
      console.error('Error deleting module:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Add lesson to module
  addLesson: async (req, res) => {
    try {
      const { title, content, videoUrl, imageUrls } = req.body;
      
      // Validate input
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      
      const result = await learningModel.addLesson(req.params.id, {
        title,
        content,
        videoUrl,
        imageUrls
      });
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding lesson:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Add quiz to module
  addQuiz: async (req, res) => {
    try {
      const { title, description, questions } = req.body;
      
      // Validate input
      if (!title || !description || !questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ error: 'Title, description, and questions are required' });
      }
      
      const result = await learningModel.addQuiz(req.params.id, {
        title,
        description,
        questions
      });
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Mark module as completed
  markAsCompleted: async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const result = await learningModel.markAsCompleted(req.params.id, userId);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      // Update user's progress
      await userModel.updateProgress(userId, {
        completedModules: [req.params.id]
      });
      
      res.json(result);
    } catch (error) {
      console.error('Error marking module as completed:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  // Submit quiz result
  submitQuizResult: async (req, res) => {
    try {
      const { userId, quizId, moduleId, score, correctAnswers, totalQuestions, completedAt } = req.body;
      
      // Validate input
      if (!userId || !quizId || !score) {
        return res.status(400).json({ error: 'User ID, quiz ID, and score are required' });
      }
      
      // Save quiz result
      const result = await learningModel.saveQuizResult({
        userId,
        quizId,
        moduleId,
        score,
        correctAnswers,
        totalQuestions,
        completedAt
      });
      
      // If score is passing (>=70%), mark module as completed
      if (score >= 70 && moduleId) {
        await learningModel.markAsCompleted(moduleId, userId);
        
        // Update user's progress in users.json
        await userModel.updateProgress(userId, {
          completedModules: [moduleId],
          quizResults: [result.id]
        });
      }
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  // Get quiz results by user
  getQuizResultsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      
      const results = await learningModel.getQuizResultsByUser(userId);
      res.json(results);
    } catch (error) {
      console.error('Error getting quiz results:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  // Get quiz results by module
  getQuizResultsByModule: async (req, res) => {
    try {
      const moduleId = req.params.moduleId;
      
      if (!moduleId) {
        return res.status(400).json({ error: 'Module ID is required' });
      }
      
      const results = await learningModel.getQuizResultsByModule(moduleId);
      res.json(results);
    } catch (error) {
      console.error('Error getting quiz results by module:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = learningController;