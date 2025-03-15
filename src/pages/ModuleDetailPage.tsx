import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCategory, calculateReadingTime } from '../utils/helpers';
import { LearningModule } from '../types';

const ModuleDetailPage: React.FC = () => {
  const { category, moduleId } = useParams<{ category: string; moduleId: string }>();
  const { learningModules, isLoading } = useData();
  const navigate = useNavigate();
  
  const [module, setModule] = useState<LearningModule | null>(null);
  
  useEffect(() => {
    if (!isLoading && moduleId) {
      const foundModule = learningModules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      } else {
        // Module not found, redirect to the learn page
        navigate('/learn');
      }
    }
  }, [isLoading, moduleId, learningModules, navigate]);
  
  if (isLoading || !module) {
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
          <Link to="/learn" className="hover:text-primary">Learn</Link>
          <span className="mx-2">/</span>
          <Link to={`/learn/${category}`} className="hover:text-primary">
            {formatCategory(category || '')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{module.title}</span>
        </motion.nav>
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-light text-white mb-2">
            {formatCategory(module.category)}
          </span>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            {module.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {module.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{module.estimatedMinutes} minutes</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{module.lessons.length} lessons</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>{module.quizzes.length} quizzes</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="uppercase">{module.difficulty}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Lessons Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lessons</h2>
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              >
                <Link to={`/learn/${category}/${moduleId}/lessons/${lesson.id}`}>
                  <Card hoverable className="p-4 flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-light text-white rounded-full flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{calculateReadingTime(lesson.content)} min read</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Quizzes Section */}
        {module.quizzes.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quizzes</h2>
            <div className="space-y-4">
              {module.quizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <Link to={`/learn/${category}/${moduleId}/quizzes/${quiz.id}`}>
                    <Card hoverable className="p-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-6 h-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="font-medium text-gray-800">{quiz.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{quiz.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{quiz.questions.length} questions</span>
                        <Button variant="primary" size="sm">Take Quiz</Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailPage;