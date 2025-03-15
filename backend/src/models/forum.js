const { readData, writeData, generateId } = require('./dataStore');

// Forum model functions
const forumModel = {
  // Get all forum posts
  getAll: async () => {
    return await readData('forumPosts.json');
  },

  // Get forum post by ID
  getById: async (id) => {
    const posts = await readData('forumPosts.json');
    return posts.find(post => post.id === id);
  },

  // Get forum posts by category
  getByCategory: async (category) => {
    const posts = await readData('forumPosts.json');
    return posts.filter(post => post.category === category);
  },

  // Create forum post
  create: async (postData) => {
    const posts = await readData('forumPosts.json');
    
    const newPost = {
      id: generateId(),
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      likes: 0,
      views: 0
    };

    posts.push(newPost);
    await writeData('forumPosts.json', posts);
    
    return newPost;
  },

  // Update forum post
  update: async (id, updates) => {
    const posts = await readData('forumPosts.json');
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) {
      return { error: 'Post not found' };
    }

    // Update post
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await writeData('forumPosts.json', posts);
    return posts[index];
  },

  // Delete forum post
  delete: async (id) => {
    const posts = await readData('forumPosts.json');
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) {
      return { error: 'Post not found' };
    }

    await writeData('forumPosts.json', filteredPosts);
    return { success: true };
  },

  // Add comment to forum post
  addComment: async (postId, commentData) => {
    const posts = await readData('forumPosts.json');
    const index = posts.findIndex(post => post.id === postId);
    
    if (index === -1) {
      return { error: 'Post not found' };
    }

    const newComment = {
      id: generateId(),
      ...commentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0
    };

    posts[index].comments.push(newComment);
    posts[index].updatedAt = new Date().toISOString();

    await writeData('forumPosts.json', posts);
    return newComment;
  },

  // Like forum post
  likePost: async (postId) => {
    const posts = await readData('forumPosts.json');
    const index = posts.findIndex(post => post.id === postId);
    
    if (index === -1) {
      return { error: 'Post not found' };
    }

    posts[index].likes += 1;
    await writeData('forumPosts.json', posts);
    
    return posts[index];
  },

  // Increment view count
  incrementViews: async (postId) => {
    const posts = await readData('forumPosts.json');
    const index = posts.findIndex(post => post.id === postId);
    
    if (index === -1) {
      return { error: 'Post not found' };
    }

    posts[index].views += 1;
    await writeData('forumPosts.json', posts);
    
    return posts[index];
  }
};

module.exports = forumModel;