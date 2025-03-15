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
import { learningAPI, forumAPI, resourcesAPI, quizAPI, authAPI } from '../services/api';

interface DataContextType {
  learningModules: LearningModule[];
  forumPosts: ForumPost[];
  resources: Resource[];
  notifications: Notification[];
  quizResults: QuizResult[];
  likedPosts: Set<string>;
  likedComments: Map<string, Set<string>>;
  isLoading: boolean;
  addForumPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'views'>) => void;
  addForumComment: (postId: string, comment: {content: string, authorId: string, authorName: string}) => void;
  likeForumPost: (postId: string) => void;
  likeForumComment: (postId: string, commentId: string) => void;
  saveQuizResult: (result: Omit<QuizResult, 'id'>) => void;
  getModulesByCategory: (category: HealthCategory) => LearningModule[];
  getResourcesByCategory: (category: HealthCategory | 'general') => Resource[];
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteUserAccount: (userId: string) => void;
}

const DataContext = createContext<DataContextType>({
  learningModules: [],
  forumPosts: [],
  resources: [],
  notifications: [],
  quizResults: [],
  likedPosts: new Set<string>(),
  likedComments: new Map<string, Set<string>>(),
  isLoading: true,
  addForumPost: () => {},
  addForumComment: () => {},
  likeForumPost: () => {},
  likeForumComment: () => {},
  saveQuizResult: () => {},
  getModulesByCategory: () => [],
  getResourcesByCategory: () => [],
  markNotificationAsRead: () => {},
  markAllNotificationsAsRead: () => {},
  deleteUserAccount: () => {},
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
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set<string>());
  const [likedComments, setLikedComments] = useState<Map<string, Set<string>>>(new Map<string, Set<string>>());
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize with real data from backend API
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Get learning modules from API
        const modulesData = await learningAPI.getAllModules();
        setLearningModules(modulesData);
        
        // Get forum posts from API
        const forumData = await forumAPI.getAllPosts();
        setForumPosts(forumData);
        
        // Get resources from API
        const resourcesData = await resourcesAPI.getAllResources();
        setResources(resourcesData);
        
        // Load notifications from localStorage or generate demo ones
        let savedNotifications;
        try {
          const savedNotificationsStr = localStorage.getItem('notifications');
          if (savedNotificationsStr) {
            savedNotifications = JSON.parse(savedNotificationsStr);
          }
        } catch (error) {
          console.error('Error parsing saved notifications:', error);
        }
        
        if (savedNotifications && savedNotifications.length > 0) {
          setNotifications(savedNotifications);
        } else {
          // Generate demo notifications
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
          localStorage.setItem('notifications', JSON.stringify(mockNotifications));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Handle errors gracefully
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const addForumPost = async (post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'views'>) => {
    try {
      const newPost = await forumAPI.createPost(post);
      setForumPosts(currentPosts => [newPost, ...currentPosts]);
    } catch (error) {
      console.error('Error adding forum post:', error);
    }
  };
  
  const addForumComment = async (postId: string, comment: {content: string, authorId: string, authorName: string}) => {
    try {
      const updatedPost = await forumAPI.addComment(postId, comment);
      
      setForumPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  const likeForumPost = async (postId: string) => {
    // Only allow liking if the user hasn't already liked this post
    if (likedPosts.has(postId)) {
      return;
    }
    
    try {
      const updatedPost = await forumAPI.likePost(postId);
      
      // Update forum posts state
      setForumPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === postId ? updatedPost : post
        )
      );
      
      // Track that this post has been liked
      setLikedPosts(prev => {
        const updated = new Set(prev);
        updated.add(postId);
        return updated;
      });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const likeForumComment = async (postId: string, commentId: string) => {
    // Check if this comment has already been liked
    const postComments = likedComments.get(postId);
    if (postComments && postComments.has(commentId)) {
      return;
    }
    
    try {
      // This would need a backend API endpoint to like comments
      // For now, we'll update the state locally
      setForumPosts(currentPosts => {
        return currentPosts.map(post => {
          if (post.id === postId) {
            const updatedComments = post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.likes + 1
                };
              }
              return comment;
            });
            
            return {
              ...post,
              comments: updatedComments
            };
          }
          return post;
        });
      });
      
      // Track that this comment has been liked
      setLikedComments(prev => {
        const updated = new Map(prev);
        if (!updated.has(postId)) {
          updated.set(postId, new Set<string>());
        }
        updated.get(postId)!.add(commentId);
        return updated;
      });
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };
  
  const saveQuizResult = async (result: Omit<QuizResult, 'id'>) => {
    try {
      // Submit quiz result to backend using quizAPI
      const newResult = await quizAPI.submitQuizResult(result);
      
      // Update local state with new quiz result
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
        linkUrl: result.moduleId ? `/learn/${getModuleCategory(result.moduleId)}/${result.moduleId}` : undefined
      };
      
      setNotifications(prev => [...prev, newNotification]);
      
      // If score is passing (>=70%), module completion is handled on the backend
      // But we still need to update our local state
      if (result.score >= 70 && result.moduleId) {
        // Get updated module to refresh the completedBy array
        const updatedModule = await learningAPI.getModuleById(result.moduleId);
        
        // Update local state to reflect the module completion
        setLearningModules(prevModules => 
          prevModules.map(module => 
            module.id === result.moduleId ? updatedModule : module
          )
        );
      }
      
      return newResult;
    } catch (error) {
      console.error('Error saving quiz result:', error);
      throw error;
    }
  };
  
  // Helper to get module category by id
  const getModuleCategory = (moduleId: string): string => {
    const module = learningModules.find(m => m.id === moduleId);
    return module?.category || 'general';
  };
  
  const getModulesByCategory = (category: HealthCategory): LearningModule[] => {
    return learningModules.filter(module => module.category === category);
  };
  
  const getResourcesByCategory = (category: HealthCategory | 'general'): Resource[] => {
    return resources.filter(resource => resource.category === category);
  };
  
  const markNotificationAsRead = (notificationId: string) => {
    // Update local state
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
    
    // Save to localStorage as fallback
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    );
    
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };
  
  const markAllNotificationsAsRead = async () => {
    try {
      // Update local state with new notifications where all are read
      const updatedNotifications = notifications.map(notification => ({ 
        ...notification, 
        read: true 
      }));
      
      // Save to state
      setNotifications(updatedNotifications);
      
      // Ideally, this would be saved to the backend
      // We could create a notification API endpoint to update this
      // For now, we'll save it to localStorage as a fallback
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  const deleteUserAccount = async (userId: string) => {
    try {
      // Send delete request to the backend
      const response = await authAPI.deleteAccount(userId);
      
      if (response.success) {
        // Clear local state
        setQuizResults(prev => prev.filter(result => result.userId !== userId));
        setNotifications(prev => prev.filter(notification => notification.userId !== userId));
        
        // Update forum posts to show [Deleted User] instead of author name
        setForumPosts(prev => prev.map(post => {
          if (post.authorId === userId) {
            return {
              ...post,
              authorName: '[Deleted User]'
            };
          }
          
          // Also update comments by this user
          if (post.comments.some(comment => comment.authorId === userId)) {
            return {
              ...post,
              comments: post.comments.map(comment => 
                comment.authorId === userId 
                  ? { ...comment, authorName: '[Deleted User]' } 
                  : comment
              )
            };
          }
          
          return post;
        }));
        
        // Remove localStorage data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
      throw error;
    }
  };
  
  return (
    <DataContext.Provider 
      value={{
        learningModules,
        forumPosts,
        resources,
        notifications,
        quizResults,
        likedPosts,
        likedComments,
        isLoading,
        addForumPost,
        addForumComment,
        likeForumPost,
        likeForumComment,
        saveQuizResult,
        getModulesByCategory,
        getResourcesByCategory,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteUserAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};