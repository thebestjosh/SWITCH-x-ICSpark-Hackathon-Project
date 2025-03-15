import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { formatRelativeTime, truncateText } from '../utils/helpers';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { 
    learningModules, 
    notifications, 
    quizResults,
    markNotificationAsRead,
    isLoading: dataLoading 
  } = useData();
  
  const [dashboardStats, setDashboardStats] = useState({
    modulesCompleted: 0,
    quizzesTaken: 0,
    averageScore: 0,
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not authenticated and not loading, redirect to login
    if (!isAuthenticated && !authLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  useEffect(() => {
    if (quizResults.length > 0) {
      const totalScore = quizResults.reduce((sum, result) => sum + result.score, 0);
      
      setDashboardStats({
        modulesCompleted: learningModules.filter(module => 
          module.completedBy.includes(user?.id || '')
        ).length,
        quizzesTaken: quizResults.length,
        averageScore: Math.round(totalScore / quizResults.length),
      });
    }
  }, [quizResults, learningModules, user]);
  
  const handleNotificationClick = (notificationId: string, linkUrl?: string) => {
    markNotificationAsRead(notificationId);
    if (linkUrl) {
      navigate(linkUrl);
    }
  };
  
  if (authLoading || dataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800">
            Aloha, {user?.name || 'Friend'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to your health journey dashboard. Here's a summary of your progress.
          </p>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        >
          <Card className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {dashboardStats.modulesCompleted}
            </div>
            <div className="text-gray-600">Modules Completed</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {dashboardStats.quizzesTaken}
            </div>
            <div className="text-gray-600">Quizzes Taken</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {dashboardStats.averageScore}%
            </div>
            <div className="text-gray-600">Average Quiz Score</div>
          </Card>
        </motion.div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
                <Link to="/learn">
                  <Button variant="text" size="sm">View All</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {learningModules.slice(0, 3).map((module) => (
                  <div 
                    key={module.id} 
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{module.title}</h3>
                      <p className="text-sm text-gray-600">{truncateText(module.description, 80)}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-3">{module.estimatedMinutes} min</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {module.category.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                      </div>
                    </div>
                    <Link to={`/learn/${module.category}/${module.id}`}>
                      <Button size="sm">Continue</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          
          {/* Notifications Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                <Button variant="text" size="sm">Mark All Read</Button>
              </div>
              
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
                      }`}
                      onClick={() => handleNotificationClick(notification.id, notification.linkUrl)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No notifications yet</p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;