import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Last updated: March 15, 2025
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Introduction</h2>
            <p>
              At Malama Health, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the application, including your name, email address, and profile information. We may also collect usage data such as your interaction with our application features and content preferences.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our application</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Communicate with you about updates, features, and educational content</li>
              <li>Monitor usage patterns and improve our educational resources</li>
            </ul>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Third-Party Services</h2>
            <p>
              Our application may contain links to third-party websites or services that are not owned or controlled by Malama Health. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-6">
              <a href="jzhang27@punahou.edu" className="text-primary hover:underline">jzhang27@punahou.edu</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;