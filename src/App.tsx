import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Lazy-loaded pages
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const ModuleDetailPage = React.lazy(() => import('./pages/ModuleDetailPage'));
const LessonPage = React.lazy(() => import('./pages/LessonPage'));
const QuizPage = React.lazy(() => import('./pages/QuizPage'));
const ForumPage = React.lazy(() => import('./pages/ForumPage'));
const ForumPostDetailPage = React.lazy(() => import('./pages/ForumPostDetailPage'));
const CreateForumPostPage = React.lazy(() => import('./pages/CreateForumPostPage'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Layout>
              <React.Suspense fallback={<div className="flex justify-center items-center h-96">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* Learning routes */}
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/learn/:category" element={<LearnPage />} />
                <Route path="/learn/:category/:moduleId" element={<ModuleDetailPage />} />
                <Route path="/learn/:category/:moduleId/lessons/:lessonId" element={<LessonPage />} />
                <Route path="/learn/:category/:moduleId/quizzes/:quizId" element={<QuizPage />} />
                
                {/* Forum routes */}
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/forum/category/:category" element={<ForumPage />} />
                <Route path="/forum/post/:postId" element={<ForumPostDetailPage />} />
                <Route path="/forum/create" element={<CreateForumPostPage />} />
                
                {/* Resource routes */}
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:category" element={<ResourcesPage />} />
                
                {/* Static pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* 404 and redirects */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </React.Suspense>
          </Layout>
        </DataProvider>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
