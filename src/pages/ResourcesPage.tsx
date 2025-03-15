import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Input from '../components/ui/Input';
import { formatCategory, formatPhoneNumber } from '../utils/helpers';
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

const ResourcesPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { resources, isLoading } = useData();
  
  const [activeCategory, setActiveCategory] = useState<string | undefined>(category);
  const [filteredResources, setFilteredResources] = useState(resources);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setActiveCategory(category);
    
    if (category) {
      setFilteredResources(
        resources.filter(resource => resource.category === category)
      );
    } else {
      setFilteredResources(resources);
    }
  }, [category, resources]);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      if (category) {
        setFilteredResources(resources.filter(resource => resource.category === category));
      } else {
        setFilteredResources(resources);
      }
      return;
    }
    
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    const searchResults = resources.filter(resource => {
      if (category && resource.category !== category) return false;
      
      return (
        resource.title.toLowerCase().includes(normalizedSearchTerm) ||
        resource.description.toLowerCase().includes(normalizedSearchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(normalizedSearchTerm))
      );
    });
    
    setFilteredResources(searchResults);
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
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            {activeCategory 
              ? `${formatCategory(activeCategory)} Resources`
              : 'Health Resources'
            }
          </h1>
          <p className="text-gray-600 mb-6">
            Find local health services and support for your health journey
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="md:flex-grow">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search resources..."
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
              <Link to="/resources">
                <Button 
                  variant={!activeCategory ? 'primary' : 'outline'} 
                  size="sm"
                >
                  All
                </Button>
              </Link>
              
              {CATEGORIES.filter(cat => cat !== 'general').map((cat) => (
                <Link key={cat} to={`/resources/${cat}`}>
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
        
        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                <Card className="h-full flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-light text-white mb-2">
                      {formatCategory(resource.category)}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-2">
                    {resource.address && (
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{resource.address}</span>
                      </div>
                    )}
                    
                    {resource.phone && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`} className="text-sm text-primary hover:underline">
                          {formatPhoneNumber(resource.phone)}
                        </a>
                      </div>
                    )}
                    
                    {resource.url && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <a 
                          href={resource.url.startsWith('http') ? resource.url : `https://${resource.url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
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
              No resources found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'No results match your search term. Try different keywords or remove filters.'
                : activeCategory 
                  ? `We're working on adding more resources for ${formatCategory(activeCategory).toLowerCase()}. Please check back later or explore other categories.`
                  : "We're working on adding more resources. Please check back later."
              }
            </p>
            {searchTerm && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  if (category) {
                    setFilteredResources(resources.filter(resource => resource.category === category));
                  } else {
                    setFilteredResources(resources);
                  }
                }}
              >
                Clear Search
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;