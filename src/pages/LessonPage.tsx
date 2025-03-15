import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCategory } from '../utils/helpers';
import { LearningModule, Lesson } from '../types';
import ReactMarkdown from 'react-markdown';

const LessonPage: React.FC = () => {
  const { category, moduleId, lessonId } = useParams<{ 
    category: string; 
    moduleId: string; 
    lessonId: string;
  }>();
  
  const { learningModules, isLoading } = useData();
  const navigate = useNavigate();
  
  const [module, setModule] = useState<LearningModule | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  
  useEffect(() => {
    if (!isLoading && moduleId && lessonId) {
      const foundModule = learningModules.find(m => m.id === moduleId);
      
      if (foundModule) {
        setModule(foundModule);
        
        const lessonIndex = foundModule.lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex >= 0) {
          setLesson(foundModule.lessons[lessonIndex]);
          setCurrentLessonIndex(lessonIndex);
        } else {
          // Lesson not found, redirect to module page
          navigate(`/learn/${category}/${moduleId}`);
        }
      } else {
        // Module not found, redirect to learn page
        navigate('/learn');
      }
    }
  }, [isLoading, moduleId, lessonId, learningModules, navigate, category]);
  
  const navigateToPreviousLesson = () => {
    if (module && currentLessonIndex > 0) {
      const previousLesson = module.lessons[currentLessonIndex - 1];
      navigate(`/learn/${category}/${moduleId}/lessons/${previousLesson.id}`);
    }
  };
  
  const navigateToNextLesson = () => {
    if (module && currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1];
      navigate(`/learn/${category}/${moduleId}/lessons/${nextLesson.id}`);
    } else if (module && module.quizzes.length > 0) {
      // If this is the last lesson, navigate to the first quiz
      navigate(`/learn/${category}/${moduleId}/quizzes/${module.quizzes[0].id}`);
    } else {
      // If there are no quizzes, go back to the module page
      navigate(`/learn/${category}/${moduleId}`);
    }
  };
  
  if (isLoading || !module || !lesson) {
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
          <Link to={`/learn/${category}/${moduleId}`} className="hover:text-primary">
            {module.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{lesson.title}</span>
        </motion.nav>
        
        {/* Lesson Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {lesson.title}
            </h1>
            <span className="text-sm text-gray-500">
              Lesson {currentLessonIndex + 1} of {module.lessons.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${((currentLessonIndex + 1) / module.lessons.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>
        
        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="prose max-w-none">
            <ReactMarkdown>
              {lesson.content}
            </ReactMarkdown>
            
            {lesson.imageUrls && lesson.imageUrls.length > 0 && (
              <div className="mt-6 space-y-4">
                {lesson.imageUrls.map((imageUrl, index) => (
                  <div key={index} className="flex justify-center">
                    <img src={imageUrl} alt={`Lesson illustration ${index + 1}`} className="max-w-full h-auto" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
        
        {/* Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between"
        >
          <Button 
            variant="outline" 
            onClick={navigateToPreviousLesson}
            disabled={currentLessonIndex === 0}
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Lesson
          </Button>
          
          <Button 
            variant="primary" 
            onClick={navigateToNextLesson}
          >
            {currentLessonIndex < module.lessons.length - 1 ? (
              <>
                Next Lesson
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              <>
                {module.quizzes.length > 0 ? (
                  <>
                    Start Quiz
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Complete Module
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;