import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/TranslationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatCategory, calculateQuizScore } from '../utils/helpers';
import { LearningModule, Quiz, QuizQuestion } from '../types';
import ReactMarkdown from 'react-markdown';

interface QuizState {
  currentQuestionIndex: number;
  selectedOptions: Record<string, string>;
  showResults: boolean;
  correctAnswers: number;
}

const QuizPage: React.FC = () => {
  const { category, moduleId, quizId } = useParams<{ 
    category: string; 
    moduleId: string; 
    quizId: string;
  }>();
  
  const { user } = useAuth();
  const { learningModules, isLoading, saveQuizResult } = useData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [module, setModule] = useState<LearningModule | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptions: {},
    showResults: false,
    correctAnswers: 0
  });
  
  useEffect(() => {
    if (!isLoading && moduleId && quizId) {
      const foundModule = learningModules.find(m => m.id === moduleId);
      
      if (foundModule) {
        setModule(foundModule);
        
        const foundQuiz = foundModule.quizzes.find(q => q.id === quizId);
        if (foundQuiz) {
          setQuiz(foundQuiz);
        } else {
          // Quiz not found, redirect to module page
          navigate(`/learn/${category}/${moduleId}`);
        }
      } else {
        // Module not found, redirect to learn page
        navigate('/learn');
      }
    }
  }, [isLoading, moduleId, quizId, learningModules, navigate, category]);
  
  const handleOptionSelect = (questionId: string, optionId: string) => {
    setQuizState(prev => ({
      ...prev,
      selectedOptions: {
        ...prev.selectedOptions,
        [questionId]: optionId
      }
    }));
  };
  
  const goToNextQuestion = () => {
    if (quiz && quizState.currentQuestionIndex < quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Calculate results
      let correctCount = 0;
      
      if (quiz) {
        quiz.questions.forEach(question => {
          if (quizState.selectedOptions[question.id] === question.correctOptionId) {
            correctCount++;
          }
        });
      }
      
      setQuizState(prev => ({
        ...prev,
        showResults: true,
        correctAnswers: correctCount
      }));
      
      // Save quiz result if user is logged in
      if (user && quiz) {
        const score = calculateQuizScore(correctCount, quiz.questions.length);
        
        saveQuizResult({
          userId: user.id,
          quizId: quiz.id,
          moduleId: moduleId,
          score,
          correctAnswers: correctCount,
          totalQuestions: quiz.questions.length,
          completedAt: new Date().toISOString()
        });
      }
    }
  };
  
  const goToPreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };
  
  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedOptions: {},
      showResults: false,
      correctAnswers: 0
    });
  };
  
  const finishQuiz = () => {
    navigate(`/learn/${category}/${moduleId}`);
  };
  
  if (isLoading || !module || !quiz) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const selectedOption = quizState.selectedOptions[currentQuestion.id];
  const score = calculateQuizScore(quizState.correctAnswers, quiz.questions.length);
  
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
          <span className="text-gray-700">{quiz.title}</span>
        </motion.nav>
        
        {/* Quiz Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-display font-bold text-gray-800 mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600 mb-4">
            {quiz.description}
          </p>
          
          {!quizState.showResults && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {t('quiz.title')} {quizState.currentQuestionIndex + 1} {t('quiz.outOf')} {quiz.questions.length}
              </span>
            </div>
          )}
          
          {!quizState.showResults && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          )}
        </motion.div>
        
        {/* Quiz Content */}
        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card>
            {!quizState.showResults ? (
              <div>
                <div className="text-xl font-bold text-gray-800 mb-6">
                  <ReactMarkdown>
                    {currentQuestion.questionText}
                  </ReactMarkdown>
                </div>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedOption === option.id 
                          ? 'border-primary bg-primary-light bg-opacity-10' 
                          : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                      }`}
                      onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                          selectedOption === option.id 
                            ? 'border-primary' 
                            : 'border-gray-300'
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <span className={selectedOption === option.id ? 'text-gray-900 font-medium' : 'text-gray-700'}>
                          {option.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('quiz.results')}</h2>
                  <p className="text-gray-600 mb-6">
                    {t('quiz.score')}: {quizState.correctAnswers} {t('quiz.outOf')} {quiz.questions.length} {t('quiz.questions')}.
                  </p>
                  
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-1 mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={score >= 70 ? '#4CAF50' : score >= 40 ? '#FF9800' : '#EF4444'}
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 - (282.7 * score) / 100}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{score}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg font-medium mb-2">
                    {score >= 70 
                      ? '🎉 Great job!' 
                      : score >= 40 
                        ? '👍 Good effort!' 
                        : '💪 Keep learning!'}
                  </p>
                  <p className="text-gray-600">
                    {score >= 70 
                      ? 'You have a good understanding of this topic.' 
                      : score >= 40 
                        ? 'You\'re making progress. Review the lessons and try again.' 
                        : 'Take some time to review the lessons before trying again.'}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{t('quiz.questions')}</h3>
                  <div className="space-y-6">
                    {quiz.questions.map((question, index) => (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <div className="font-medium text-gray-800 mb-3">
                          {index + 1}. <ReactMarkdown>{question.questionText}</ReactMarkdown>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {question.options.map((option) => {
                            const isSelected = quizState.selectedOptions[question.id] === option.id;
                            const isCorrect = question.correctOptionId === option.id;
                            
                            let optionClass = 'text-gray-700';
                            if (isSelected && isCorrect) {
                              optionClass = 'text-green-700 font-medium';
                            } else if (isSelected && !isCorrect) {
                              optionClass = 'text-red-700 font-medium';
                            } else if (isCorrect) {
                              optionClass = 'text-green-700 font-medium';
                            }
                            
                            return (
                              <div key={option.id} className="flex items-start">
                                <div className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${
                                  isSelected && isCorrect
                                    ? 'text-green-500'
                                    : isSelected && !isCorrect
                                      ? 'text-red-500'
                                      : isCorrect
                                        ? 'text-green-500'
                                        : 'text-gray-400'
                                }`}>
                                  {isSelected && isCorrect && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                  {isSelected && !isCorrect && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  )}
                                  {!isSelected && isCorrect && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={optionClass}>
                                  {option.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                          <p className="font-medium text-gray-700 mb-1">{t('quiz.explanation')}:</p>
                          <div className="text-gray-600">
                            <ReactMarkdown>{question.explanation}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          {!quizState.showResults ? (
            <>
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={quizState.currentQuestionIndex === 0}
              >
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('quiz.previous')}
              </Button>
              
              <Button 
                variant="primary" 
                onClick={goToNextQuestion}
                disabled={!selectedOption}
              >
                {quizState.currentQuestionIndex < quiz.questions.length - 1 ? (
                  <>
                    {t('quiz.next')}
                    <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                ) : (
                  t('quiz.submit')
                )}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={restartQuiz}
              >
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('quiz.retake')}
              </Button>
              
              <Button 
                variant="primary" 
                onClick={finishQuiz}
              >
                {t('quiz.finish')}
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;