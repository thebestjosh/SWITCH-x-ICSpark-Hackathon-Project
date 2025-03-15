import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import enTranslations from './en.json';
import hawTranslations from './haw.json';

// Define supported languages
export type Language = 'en' | 'haw';

// Translation context type
interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string }[];
}

// Create context
const TranslationContext = createContext<TranslationContextType>({
  t: () => '',
  language: 'en',
  setLanguage: () => {},
  availableLanguages: [
    { code: 'en', name: 'English' },
    { code: 'haw', name: 'Hawaiian (ʻŌlelo Hawaiʻi)' }
  ],
});

// Translation provider props
interface TranslationProviderProps {
  children: ReactNode;
}

// Translation provider component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { user, updatePreferences } = useAuth();
  const [language, setLanguage] = useState<Language>('en');
  
  // Load translations
  const translations: Record<Language, Record<string, any>> = {
    en: enTranslations,
    haw: hawTranslations,
  };

  // Available languages
  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'haw' as Language, name: 'Hawaiian (ʻŌlelo Hawaiʻi)' }
  ];
  
  // Initialize language from user preferences if available
  useEffect(() => {
    if (user?.preferences?.language) {
      const userLang = user.preferences.language as Language;
      if (userLang === 'en' || userLang === 'haw') {
        setLanguage(userLang);
      }
    }
  }, [user]);

  // Function to change language
  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    
    // Update user preferences if logged in
    if (user) {
      try {
        await updatePreferences({ language: lang });
      } catch (error) {
        console.error('Error updating language preference:', error);
      }
    }
    
    // Store in localStorage as fallback
    localStorage.setItem('language', lang);
  };

  // Translation function
  const translate = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let translation: any = translations[language];
    
    // Navigate through the nested keys
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key itself if not found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof translation === 'string' ? translation : key;
  };

  return (
    <TranslationContext.Provider value={{ 
      t: translate, 
      language, 
      setLanguage: changeLanguage,
      availableLanguages 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translations
export const useTranslation = () => useContext(TranslationContext);