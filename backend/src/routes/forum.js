const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// GET all forum posts
router.get('/', forumController.getAllPosts);

// GET forum post by ID
router.get('/:id', forumController.getPostById);

// GET forum posts by category
router.get('/category/:category', forumController.getPostsByCategory);

// POST create forum post
router.post('/', forumController.createPost);

// PUT update forum post
router.put('/:id', forumController.updatePost);

// DELETE forum post
router.delete('/:id', forumController.deletePost);

// POST add comment to forum post
router.post('/:id/comments', forumController.addComment);

// POST like forum post
router.post('/:id/like', forumController.likePost);

module.exports = router;