import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { formatCategory } from '../utils/helpers';
import { HealthCategory } from '../types';

const CATEGORIES: (HealthCategory | 'general')[] = [
  'general',
  'diabetes',
  'heart',
  'nutrition',
  'mental-health',
  'physical-activity',
  'traditional-medicine',
  'preventative-care'
];

const CreateForumPostPage: React.FC = () => {
  const { addForumPost } = useData();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: '',
  });
  
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    tags?: string;
  }>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
      tags?: string;
    } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user) return;
    
    setIsSubmitting(true);
    
    // Process tags
    const tagsList = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    try {
      addForumPost({
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category as HealthCategory | 'general',
        authorId: user.id,
        authorName: user.name,
        tags: tagsList,
      });
      
      // Navigate to forum after post is created
      navigate('/forum');
    } catch (error) {
      console.error('Error creating post:', error);
      // In a real app, we would handle the error more gracefully
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect to login via useEffect
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
          <span className="text-gray-700">Create New Post</span>
        </motion.nav>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            Create a New Discussion
          </h1>
          <p className="text-gray-600">
            Share your thoughts, questions, or experiences with the community
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter a descriptive title for your post"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    fullWidth
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {formatCategory(category)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content*
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    placeholder="Share your thoughts, questions, or experiences..."
                    value={formData.content}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                      errors.content ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                    required
                  ></textarea>
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="Enter tags separated by commas (e.g., diabetes, diet, exercise)"
                    value={formData.tags}
                    onChange={handleChange}
                    error={errors.tags}
                    fullWidth
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tags help others find your post. Separate multiple tags with commas.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <Link to="/forum">
                    <Button variant="outline">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateForumPostPage;