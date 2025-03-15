import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
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
  
  const features = [
    {
      title: 'Tailored Health Education',
      description: 'Learn more about relevant health education tailored for Hawai`i. ',
      icon: '🏝️',
      link: '/learn'
    },
    {
      title: 'Interactive Learning Modules',
      description: 'Engage with easy-to-understand modules on diabetes, heart health, and nutrition.',
      icon: '🧐',
      link: '/learn'
    },
    {
      title: 'Community Forum',
      description: 'Connect with others. Share experiences, get support from your community.',
      icon: '👥',
      link: '/forum'
    },
    {
      title: 'Health Resources Directory',
      description: 'Find local health services, community programs, and support groups near you.',
      icon: '🔍',
      link: '/resources'
    },
    {
      title: 'Educational Resources',
      description: 'Access educational content about various health topics and conditions.',
      icon: '📚',
      link: '/learn'
    },
    {
      title: 'Health Tracking Tools',
      description: 'Monitor your progress with simple tools designed for your health needs.',
      icon: '📊',
      link: '/dashboard'
    }
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Mālama Your Health Journey
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Culturally relevant health education and tools for Hawaiʻi's communities
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/learn">
                <Button size="lg">Start Learning</Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button variant="outline" size="lg" className="bg-white text-primary border-white">
                    Create Account
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
              Empowering Healthier Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a variety of features designed to improve health literacy while honoring cultural practices and traditions.
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
              Health Education Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a variety of resources to support your health journey.
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
                  <Button size="lg" className="bg-white hover:bg-gray-100">
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