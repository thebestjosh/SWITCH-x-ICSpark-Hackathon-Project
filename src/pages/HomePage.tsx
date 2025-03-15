import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n/TranslationContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
      } 
    }
  };
  
  // Define features with translations
  const featureData = [
    {
      titleKey: 'home.features.tailoredEducation',
      descriptionKey: 'home.features.tailoredEducationDesc',
      icon: '🏝️',
      link: '/learn'
    },
    {
      titleKey: 'home.features.interactiveModules',
      descriptionKey: 'home.features.interactiveModulesDesc',
      icon: '🧐',
      link: '/learn'
    },
    {
      titleKey: 'home.features.communityForum',
      descriptionKey: 'home.features.communityForumDesc',
      icon: '👥',
      link: '/forum'
    },
    {
      titleKey: 'home.features.resourceDirectory',
      descriptionKey: 'home.features.resourceDirectoryDesc',
      icon: '🔍',
      link: '/resources'
    },
    {
      titleKey: 'home.features.educationalContent',
      descriptionKey: 'home.features.educationalContentDesc',
      icon: '📚',
      link: '/learn'
    },
    {
      titleKey: 'home.features.trackingTools',
      descriptionKey: 'home.features.trackingToolsDesc',
      icon: '📊',
      link: '/dashboard'
    }
  ];
  
  // Map to features with translations applied
  // For now we'll use these as fallbacks until we add these keys to the translation files
  const features = featureData.map(feature => ({
    title: t(feature.titleKey) === feature.titleKey ? 
      (feature.titleKey === 'home.features.tailoredEducation' ? 'Tailored Health Education' :
       feature.titleKey === 'home.features.interactiveModules' ? 'Interactive Learning Modules' :
       feature.titleKey === 'home.features.communityForum' ? 'Community Forum' :
       feature.titleKey === 'home.features.resourceDirectory' ? 'Health Resources Directory' :
       feature.titleKey === 'home.features.educationalContent' ? 'Educational Resources' :
       'Health Tracking Tools') : t(feature.titleKey),
    description: t(feature.descriptionKey) === feature.descriptionKey ? 
      (feature.descriptionKey === 'home.features.tailoredEducationDesc' ? 'Learn more about relevant health education tailored for Hawai`i residents. Learn more' :
       feature.descriptionKey === 'home.features.interactiveModulesDesc' ? 'Engage with easy-to-understand modules on diabetes, heart health, and nutrition.' :
       feature.descriptionKey === 'home.features.communityForumDesc' ? 'Connect with others. Share experiences, get support from your community.' :
       feature.descriptionKey === 'home.features.resourceDirectoryDesc' ? 'Find local health services, community programs, and support groups near you.' :
       feature.descriptionKey === 'home.features.educationalContentDesc' ? 'Access educational content about various health topics and conditions.' :
       'Monitor your progress with simple tools designed for your health needs.') : t(feature.descriptionKey),
    icon: feature.icon,
    link: feature.link
  }));
  
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="text-white py-20 relative"
        style={{
          backgroundImage: `url(${require('../assets/images/hero-background.svg').default})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/learn">
                <Button size="lg">{t('home.startJourney')}</Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button variant="outline" size="lg" className="bg-white text-primary border-white">
                    {t('auth.signUp')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-display font-bold mb-4 text-gray-800">
              {t('home.featuredModules')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.communityDesc')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <Link to={feature.link} className="block h-full">
                  <Card hoverable className="h-full flex flex-col">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 flex-grow">{feature.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Information Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold mb-4 text-gray-800">
              {t('resources.resourceDirectory')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.exploreResources')}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold mb-6">Ready to start your health journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community today and access relevant health resources designed for Hawai`i.
            </p>
            <div className="flex justify-center">
              {!isAuthenticated && (
                <Link to="/register">
                  <Button size="lg" style={{ backgroundColor: '#FFFFFF', color: '#50ac54' }} className="hover:bg-gray-100">
                    Create Free Account
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/dashboard">
                  <Button size="lg" style={{ backgroundColor: 'white', color: '#50ac54' }} className="hover:bg-gray-100">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;