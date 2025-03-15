import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-display font-bold mb-4">Mālama Health</h3>
            <p className="text-gray-300 text-sm">
              Hoping to eventually empower Hawai'i communities
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-gray-300 hover:text-white transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gray-300 hover:text-white transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Health Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Health Topics</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/learn/diabetes" className="text-gray-300 hover:text-white transition-colors">
                  Diabetes Management
                </Link>
              </li>
              <li>
                <Link to="/learn/heart-health" className="text-gray-300 hover:text-white transition-colors">
                  Heart Health
                </Link>
              </li>
              <li>
                <Link to="/learn/nutrition" className="text-gray-300 hover:text-white transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link to="/learn/mental-health" className="text-gray-300 hover:text-white transition-colors">
                  Mental Health
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:kstewart27@punahou.edu" className="text-gray-300 hover:text-white transition-colors">
                  Email Us
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Mālama Health. Created for {new Date().getFullYear()}  SWITCH x ICSpark Hackathon. This is a demo application.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-gray-300 text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;