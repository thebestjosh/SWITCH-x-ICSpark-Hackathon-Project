const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// GET all resources
router.get('/', resourceController.getAllResources);

// GET resource by ID
router.get('/:id', resourceController.getResourceById);

// GET resources by category
router.get('/category/:category', resourceController.getResourcesByCategory);

// POST create resource
router.post('/', resourceController.createResource);

// PUT update resource
router.put('/:id', resourceController.updateResource);

// DELETE resource
router.delete('/:id', resourceController.deleteResource);

module.exports = router;