import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Input from '../components/ui/Input';
import { formatCategory, formatRelativeTime } from '../utils/helpers';
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

const ForumPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { forumPosts, isLoading } = useData();
  const { isAuthenticated } = useAuth();
  
  const [activeCategory, setActiveCategory] = useState<string | undefined>(category);
  const [filteredPosts, setFilteredPosts] = useState(forumPosts);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setActiveCategory(category);
    
    if (category) {
      setFilteredPosts(
        forumPosts.filter(post => post.category === category)
      );
    } else {
      setFilteredPosts(forumPosts);
    }
  }, [category, forumPosts]);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      if (category) {
        setFilteredPosts(forumPosts.filter(post => post.category === category));
      } else {
        setFilteredPosts(forumPosts);
      }
      return;
    }
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    const searchResults = forumPosts.filter(post => {
      if (category && post.category !== category) return false;
      
      return (
        post.title.toLowerCase().includes(normalizedSearchTerm) ||
        post.content.toLowerCase().includes(normalizedSearchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(normalizedSearchTerm))
      );
    });
    
    setFilteredPosts(searchResults);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
                {activeCategory 
                  ? `${formatCategory(activeCategory)} Discussions`
                  : 'Community Forum'
                }
              </h1>
              <p className="text-gray-600">
                Connect with others and share experiences on your health journey
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <Link to="/forum/create">
                <Button>
                  New Discussion
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="md:flex-grow">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
                <Button 
                  type="submit" 
                  className="ml-2"
                >
                  Search
                </Button>
              </form>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Link to="/forum">
                <Button 
                  variant={!activeCategory ? 'primary' : 'outline'} 
                  size="sm"
                >
                  All
                </Button>
              </Link>
              
              {CATEGORIES.filter(cat => cat !== 'general').map((cat) => (
                <Link key={cat} to={`/forum/category/${cat}`}>
                  <Button 
                    variant={activeCategory === cat ? 'primary' : 'outline'} 
                    size="sm"
                  >
                    {formatCategory(cat)}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Forum Posts */}
        {filteredPosts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                <Link to={`/forum/post/${post.id}`} className="block">
                  <Card hoverable>
                    <div className="flex flex-col sm:flex-row justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                      <div className="text-sm text-gray-500">
                        {formatRelativeTime(post.createdAt)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-light text-white">
                        {formatCategory(post.category || 'general')}
                      </span>
                      
                      {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {post.content && typeof post.content === 'string' && post.content.length > 150 
                        ? post.content.substring(0, 150) + '...' 
                        : post.content || ''
                      }
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">
                          By {post.authorName || 'Anonymous'}
                        </span>
                        <span className="flex items-center mr-4">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments && Array.isArray(post.comments) ? post.comments.length : 0}
                        </span>
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {post.likes || 0}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {post.views || 0} views
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              No discussions found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'No results match your search term. Try different keywords or remove filters.'
                : activeCategory 
                  ? 'There are no discussions in this category yet. Be the first to start a conversation!'
                  : 'There are no discussions yet. Start a conversation to get the community talking!'
              }
            </p>
            <div className="flex justify-center gap-4">
              {searchTerm && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    if (category) {
                      setFilteredPosts(forumPosts.filter(post => post.category === category));
                    } else {
                      setFilteredPosts(forumPosts);
                    }
                  }}
                >
                  Clear Search
                </Button>
              )}
              
              <Link to="/forum/create">
                <Button>New Discussion</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;