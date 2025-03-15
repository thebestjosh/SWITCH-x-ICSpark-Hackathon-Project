import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCategory, truncateText, calculateReadingTime } from '../utils/helpers';
import { HealthCategory } from '../types';

const CATEGORIES: HealthCategory[] = [
  'diabetes',
  'heart-health',
  'nutrition',
  'mental-health',
  'physical-activity',
  'traditional-medicine',
  'preventative-care'
];

const LearnPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { learningModules, isLoading } = useData();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(category);
  const [filteredModules, setFilteredModules] = useState(learningModules);
  
  useEffect(() => {
    setActiveCategory(category);
    
    if (category) {
      setFilteredModules(
        learningModules.filter(module => module.category === category)
      );
    } else {
      setFilteredModules(learningModules);
    }
  }, [category, learningModules]);
  
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
              ? `${formatCategory(activeCategory)} Learning Modules`
              : 'Health Learning Modules'
            }
          </h1>
          <p className="text-gray-600">
            {activeCategory
              ? `Explore resources on ${formatCategory(activeCategory).toLowerCase()} with culturally relevant information.`
              : 'Browse our collection of health topics with culturally tailored information and resources.'
            }
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 overflow-x-auto pb-2"
        >
          <div className="flex space-x-2">
            <Link to="/learn">
              <Button 
                variant={!activeCategory ? 'primary' : 'outline'} 
                size="sm"
              >
                All Topics
              </Button>
            </Link>
            
            {CATEGORIES.map((cat) => (
              <Link key={cat} to={`/learn/${cat}`}>
                <Button 
                  variant={activeCategory === cat ? 'primary' : 'outline'} 
                  size="sm"
                >
                  {formatCategory(cat)}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Modules Grid */}
        {filteredModules.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <Link to={`/learn/${module.category}/${module.id}`} className="block h-full">
                  <Card hoverable className="h-full flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-light text-white mb-2">
                        {formatCategory(module.category)}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{truncateText(module.description, 120)}</p>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-2">{module.estimatedMinutes} min</span>
                        <span>•</span>
                        <span className="ml-2">{module.lessons.length} lessons</span>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs uppercase">
                          {module.difficulty}
                        </span>
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
              No learning modules found for this category
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new content. Please check back later or explore other categories.
            </p>
            <Link to="/learn">
              <Button>View All Categories</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;