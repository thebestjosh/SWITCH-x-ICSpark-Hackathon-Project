const forumModel = require('../models/forum');
const userModel = require('../models/user');

// Forum controller functions
const forumController = {
  // Get all forum posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await forumModel.getAll();
      res.json(posts);
    } catch (error) {
      console.error('Error getting forum posts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get forum post by ID
  getPostById: async (req, res) => {
    try {
      const post = await forumModel.getById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      // Increment view count
      await forumModel.incrementViews(req.params.id);
      
      // Get updated post with incremented view count
      const updatedPost = await forumModel.getById(req.params.id);
      res.json(updatedPost);
    } catch (error) {
      console.error('Error getting forum post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get forum posts by category
  getPostsByCategory: async (req, res) => {
    try {
      const posts = await forumModel.getByCategory(req.params.category);
      res.json(posts);
    } catch (error) {
      console.error('Error getting forum posts by category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create forum post
  createPost: async (req, res) => {
    try {
      const { title, content, category, authorId, authorName, tags } = req.body;
      
      // Validate input
      if (!title || !content || !category || !authorId || !authorName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const newPost = await forumModel.create({
        title,
        content,
        category,
        authorId,
        authorName,
        tags: tags || []
      });
      
      // Update user's progress to track their forum activity
      await userModel.updateProgress(authorId, {
        forumPosts: [newPost.id]
      });
      
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating forum post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update forum post
  updatePost: async (req, res) => {
    try {
      // In production, verify that user can only update their own posts
      const result = await forumModel.update(req.params.id, req.body);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error updating forum post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete forum post
  deletePost: async (req, res) => {
    try {
      // In production, verify that user can only delete their own posts
      const result = await forumModel.delete(req.params.id);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting forum post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Add comment to forum post
  addComment: async (req, res) => {
    try {
      const { content, authorId, authorName } = req.body;
      
      // Validate input
      if (!content || !authorId || !authorName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const result = await forumModel.addComment(req.params.id, {
        content,
        authorId,
        authorName
      });
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      // Find the comment ID that was just added
      const post = await forumModel.getById(req.params.id);
      const newComment = post.comments[post.comments.length - 1];
      
      // Update user's progress to track their forum activity
      if (newComment) {
        await userModel.updateProgress(authorId, {
          forumComments: [newComment.id]
        });
      }
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Like forum post
  likePost: async (req, res) => {
    try {
      const result = await forumModel.likePost(req.params.id);
      
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = forumController;