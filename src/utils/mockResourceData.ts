import { Resource } from '../types';

export const mockResources: Resource[] = [

  // Additional health resources
  {
    id: 'waianae-coast-health',
    title: 'Waianae Coast Comprehensive Health Center',
    description: 'Provides comprehensive medical, dental, and mental health services to the communities along Oahu\'s Waianae Coast.',
    category: 'general',
    tags: ['medical', 'dental', 'mental health'],
    address: '87-2070 Farrington Hwy, Wai‘anae, HI 96792',
    phone: '(808) 697-3300',
    url: 'http://www.wcchc.com'
  },
  {
    id: 'aloha-united-way',
    title: 'Aloha United Way',
    description: 'A free, confidential service that connects individuals to health and human services in Hawaii.',
    category: 'general',
    tags: ['non-profit', 'community', 'assistance'],
    address: 'Honolulu, HI 96817',
    phone: '(808) 536-1951',
    url: 'http://www.auw.org'
  },
  {
    id: 'hawaii-health-dept',
    title: 'Hawaii State Department of Health',
    description: 'Provides comprehensive public health services, including disease prevention and health promotion.',
    category: 'general',
    tags: ['public health', 'government', 'disease prevention'],
    address: '1250 Punchbowl St, Honolulu, HI 96813',
    phone: '(808) 586-4400',
    url: 'http://hawaii.gov/health'
  }
];