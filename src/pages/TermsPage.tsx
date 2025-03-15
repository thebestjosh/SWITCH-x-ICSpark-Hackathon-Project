import React from 'react';
import { motion } from 'framer-motion';

const TermsPage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Last updated: March 15, 2024
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Welcome to Malama Health</h2>
            <p>
              These Terms of Service govern your use of the Malama Health application. By accessing or using our application, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the application.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Use of Our Application</h2>
            <p>
              Malama Health provides health education resources and community features designed to improve health literacy. Our content is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              You may use our application for personal, non-commercial purposes. You must not use our application in any way that causes, or may cause, damage to the application or impairment of the availability or accessibility of the application.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">User Content</h2>
            <p>
              Our application allows you to post, link, store, share, and otherwise make available certain information, text, graphics, or other material in forums and community features. You are responsible for the content you post and must not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Intellectual Property</h2>
            <p>
              The application and its original content, features, and functionality are and will remain the exclusive property of Malama Health and its licensors. The application is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Disclaimers</h2>
            <p>
              Your use of our application is at your sole risk. The application is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Limitation of Liability</h2>
            <p>
              In no event shall Malama Health, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the application.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-6">
              <a href="mailto:jzhang27@punahou.edu" className="text-primary hover:underline">jzhang27@punahou.edu</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;