import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPreferences } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  notificationsEnabled: true,
  darkMode: false,
  fontSize: 'medium',
  language: 'en',
};

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
  name: 'Demo User',
  language: 'en',
  preferences: defaultPreferences,
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updatePreferences: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from authAPI
    const storedUser = authAPI.getCurrentUser();
    
    if (storedUser) {
      setUser(storedUser);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Call backend API
      const result = await authAPI.login({ email, password });
      
      if (result.user && result.token) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Call backend API
      const result = await authAPI.register({
        username,
        email,
        password,
        name
      });
      
      if (result.user && result.token) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authAPI.logout();
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (user) {
      try {
        // Call backend API
        const updatedUserData = await authAPI.updatePreferences(user.id, preferences);
        
        if (updatedUserData) {
          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              ...preferences,
            },
          };
          
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error updating preferences:', error);
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout,
        updatePreferences 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};