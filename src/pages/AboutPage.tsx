import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Josh Zhang',
      role: 'Coder',
      bio: 'Dedicated to bringing accessible health information to underserved communities in Hawaiʻi.',
      image: require('../assets/images/team/josh.svg').default
    },
    {
      name: 'Kai Stewart',
      role: 'Coder',
      bio: 'Focused on developing engaging and accessible user interfaces for health education.',
      image: require('../assets/images/team/kai.svg').default
    },
    {
      name: 'Julian Williams',
      role: 'Coder',
      bio: 'Specializes in creating interactive learning modules and community forum features.',
      image: require('../assets/images/team/julian.svg').default
    }
  ];

  return (
    <div className="py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            About Mālama Health
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We hope to improve access to information about healthcare and spread awareness
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <Card>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Access to Information</h3>
                <p className="text-gray-600">
                  We believe that accesss to information is one of the most important aspects of education for healthcare
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;