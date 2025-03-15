import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { formatCategory, formatRelativeTime } from '../utils/helpers';
import { ForumPost, ForumComment } from '../types';

const ForumPostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { forumPosts, isLoading, addForumComment, likeForumPost } = useData();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<ForumPost | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');
  
  useEffect(() => {
    if (!isLoading && postId) {
      const foundPost = forumPosts.find(p => p.id === postId);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Post not found, redirect to forum
        navigate('/forum');
      }
    }
  }, [isLoading, postId, forumPosts, navigate]);
  
  const handleLikePost = () => {
    if (post && isAuthenticated) {
      likeForumPost(post.id);
    }
  };
  
  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }
    
    if (!isAuthenticated || !user || !post) {
      return;
    }
    
    addForumComment(post.id, {
      content: commentContent.trim(),
      authorId: user.id,
      authorName: user.name,
    } as any);
    
    setCommentContent('');
    setCommentError('');
  };
  
  if (isLoading || !post) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-sm text-gray-500 mb-6"
        >
          <Link to="/forum" className="hover:text-primary">Forum</Link>
          <span className="mx-2">/</span>
          <Link to={`/forum/category/${post.category}`} className="hover:text-primary">
            {formatCategory(post.category)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
        </motion.nav>
        
        {/* Post Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <h1 className="text-2xl font-display font-bold text-gray-800">{post.title}</h1>
              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                {formatRelativeTime(post.createdAt)}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-light text-white">
                {formatCategory(post.category)}
              </span>
              
              {post.tags.map((tag, i) => (
                <span key={i} className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-600 font-semibold">
                  {post.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{post.authorName}</p>
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <span className="flex items-center mr-4">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {post.comments.length} comment{post.comments.length !== 1 && 's'}
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.views} view{post.views !== 1 && 's'}
                </span>
              </div>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={handleLikePost}
                disabled={!isAuthenticated}
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Like ({post.likes})
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Comments Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Comments ({post.comments.length})
          </h2>
          
          {post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <Card>
                    <div className="flex items-start mb-3">
                      <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-gray-600 font-semibold">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{comment.authorName}</p>
                          <p className="text-xs text-gray-500">{formatRelativeTime(comment.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-11 text-gray-700">
                      {comment.content}
                    </div>
                    
                    <div className="ml-11 mt-2 flex items-center text-xs text-gray-500">
                      <button className="flex items-center hover:text-primary transition-colors">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Like ({comment.likes})
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-center text-gray-500 py-6">
                Be the first to comment on this discussion.
              </p>
            </Card>
          )}
        </motion.div>
        
        {/* Add Comment Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add a Comment</h3>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                      commentError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Share your thoughts or experiences..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  ></textarea>
                  {commentError && (
                    <p className="mt-1 text-sm text-red-600">{commentError}</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" variant="primary">
                    Post Comment
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">You need to be logged in to comment.</p>
                <Link to="/login">
                  <Button variant="primary">Log in to Comment</Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForumPostDetailPage;