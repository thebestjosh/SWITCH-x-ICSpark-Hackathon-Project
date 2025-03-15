const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// POST register new user
router.post('/register', userController.registerUser);

// POST login user
router.post('/login', userController.loginUser);

// PUT update user
router.put('/:id', userController.updateUser);

// PUT update user preferences
router.put('/:id/preferences', userController.updatePreferences);

// DELETE user
router.delete('/:id', userController.deleteUser);

module.exports = router;