const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

// GET all learning modules
router.get('/modules', learningController.getAllModules);

// GET modules by category - must come before :id route to avoid route conflicts
router.get('/modules/category/:category', learningController.getModulesByCategory);

// GET module by ID
router.get('/modules/:id', learningController.getModuleById);

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

// Quiz result routes
router.post('/quiz-results', learningController.submitQuizResult);
router.get('/quiz-results/module/:moduleId', learningController.getQuizResultsByModule);
router.get('/quiz-results/:userId', learningController.getQuizResultsByUser);

module.exports = router;