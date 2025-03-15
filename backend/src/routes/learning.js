const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

// GET all learning modules
router.get('/modules', learningController.getAllModules);

// GET module by ID
router.get('/modules/:id', learningController.getModuleById);

// GET modules by category
router.get('/modules/category/:category', learningController.getModulesByCategory);

// POST create module
router.post('/modules', learningController.createModule);

// PUT update module
router.put('/modules/:id', learningController.updateModule);

// DELETE module
router.delete('/modules/:id', learningController.deleteModule);

// POST add lesson to module
router.post('/modules/:id/lessons', learningController.addLesson);

// POST add quiz to module
router.post('/modules/:id/quizzes', learningController.addQuiz);

// POST mark module as completed
router.post('/modules/:id/complete', learningController.markAsCompleted);

module.exports = router;