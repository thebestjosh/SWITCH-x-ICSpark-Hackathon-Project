import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  LearningModule, 
  Quiz, 
  ForumPost, 
  Resource, 
  Notification,
  QuizResult,
  HealthCategory
} from '../types';
import { mockLearningModules } from '../utils/mockData';
import { mockForumPosts } from '../utils/mockForumData';
import { mockResources } from '../utils/mockResourceData';

interface DataContextType {
  learningModules: LearningModule[];
  forumPosts: ForumPost[];
  resources: Resource[];
  notifications: Notification[];
  quizResults: QuizResult[];
  isLoading: boolean;
  addForumPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'views'>) => void;
  addForumComment: (postId: string, comment: {content: string, authorId: string, authorName: string}) => void;
  likeForumPost: (postId: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id'>) => void;
  getModulesByCategory: (category: HealthCategory) => LearningModule[];
  getResourcesByCategory: (category: HealthCategory | 'general') => Resource[];
  markNotificationAsRead: (notificationId: string) => void;
}

const DataContext = createContext<DataContextType>({
  learningModules: [],
  forumPosts: [],
  resources: [],
  notifications: [],
  quizResults: [],
  isLoading: true,
  addForumPost: () => {},
  addForumComment: () => {},
  likeForumPost: () => {},
  saveQuizResult: () => {},
  getModulesByCategory: () => [],
  getResourcesByCategory: () => [],
  markNotificationAsRead: () => {},
});

export const useData = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize with mock data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLearningModules(mockLearningModules);
      setForumPosts(mockForumPosts);
      setResources(mockResources);
      
      // Generate some mock notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          userId: '1',
          title: 'Welcome to Malama Health!',
          message: 'Thank you for joining our community. Start your health journey today.',
          type: 'system',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          userId: '1',
          title: 'Quiz Reminder',
          message: 'Don\'t forget to complete the quiz on Diabetes Management.',
          type: 'reminder',
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          linkUrl: '/learn/diabetes/quizzes/1',
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  const addForumPost = (post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'views'>) => {
    const newPost: ForumPost = {
      id: Math.random().toString(36).substring(2, 15),
      ...post,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      likes: 0,
      views: 0,
    };
    
    setForumPosts(prev => [newPost, ...prev]);
  };
  
  const addForumComment = (postId: string, comment: {content: string, authorId: string, authorName: string}) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Math.random().toString(36).substring(2, 15),
          ...comment,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          likes: 0
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };
  
  const likeForumPost = (postId: string) => {
    setForumPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };
  
  const saveQuizResult = (result: Omit<QuizResult, 'id'>) => {
    const newResult = {
      ...result,
      id: Math.random().toString(36).substring(2, 15),
    } as QuizResult;
    
    setQuizResults(prev => [...prev, newResult]);
    
    // Create a notification for completing the quiz
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 15),
      userId: result.userId,
      title: 'Quiz Completed',
      message: `You scored ${result.score}% on your quiz.`,
      type: 'achievement',
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };
  
  const getModulesByCategory = (category: HealthCategory): LearningModule[] => {
    return learningModules.filter(module => module.category === category);
  };
  
  const getResourcesByCategory = (category: HealthCategory | 'general'): Resource[] => {
    return resources.filter(resource => resource.category === category);
  };
  
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };
  
  return (
    <DataContext.Provider 
      value={{
        learningModules,
        forumPosts,
        resources,
        notifications,
        quizResults,
        isLoading,
        addForumPost,
        addForumComment,
        likeForumPost,
        saveQuizResult,
        getModulesByCategory,
        getResourcesByCategory,
        markNotificationAsRead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};