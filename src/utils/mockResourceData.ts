import { Resource } from '../types';

export const mockResources: Resource[] = [
  // General health resources
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
  },
  // Diabetes resources
  {
    id: 'diabetes-resource-1',
    title: 'Diabetes Management Center',
    description: 'Provides education and support for people living with diabetes.',
    category: 'diabetes',
    tags: ['diabetes', 'management', 'education'],
    address: '123 Diabetes Rd, Honolulu, HI 96814',
    phone: '(808) 555-1234',
    url: 'http://diabetesmanagement.org'
  },
  {
    id: 'diabetes-resource-2',
    title: 'Hawaiian Diabetes Association',
    description: 'Non-profit organization focusing on raising awareness and supporting diabetes research.',
    category: 'diabetes',
    tags: ['non-profit', 'research', 'diabetes'],
    address: '456 Health St, Honolulu, HI 96815',
    phone: '(808) 555-5678',
    url: 'http://hawaiidiabetes.org'
  },
  // Heart resources
  {
    id: 'heart-resource-1',
    title: 'Heart Health Institute',
    description: 'Focuses on prevention and treatment of heart diseases.',
    category: 'heart',
    tags: ['heart health', 'prevention', 'treatment'],
    address: '789 Cardio Blvd, Honolulu, HI 96816',
    phone: '(808) 555-9876',
    url: 'http://hearthealth.org'
  },
  {
    id: 'heart-resource-2',
    title: 'Hawaiian Heart Foundation',
    description: 'Supports research and education to reduce heart disease in Hawaii.',
    category: 'heart',
    tags: ['research', 'heart disease', 'education'],
    address: '1010 Heart Rd, Honolulu, HI 96817',
    phone: '(808) 555-6543',
    url: 'http://hawaiianheart.org'
  },
  // Nutrition resources
  {
    id: 'nutrition-resource-1',
    title: 'Hawaiian Nutrition Center',
    description: 'Provides nutrition counseling and dietary support for local communities.',
    category: 'nutrition',
    tags: ['nutrition', 'dietary', 'counseling'],
    address: '202 Nutrition St, Honolulu, HI 96818',
    phone: '(808) 555-1122',
    url: 'http://hawaiinutrition.org'
  },
  {
    id: 'nutrition-resource-2',
    title: 'Healthy Hawaii Nutrition Program',
    description: 'Offers free nutrition classes to help individuals make healthier food choices.',
    category: 'nutrition',
    tags: ['nutrition', 'education', 'health'],
    address: '303 Healthy Rd, Honolulu, HI 96819',
    phone: '(808) 555-3344',
    url: 'http://healthyhawaiinutrition.org'
  },
  // Mental Health resources
  {
    id: 'mental-health-resource-1',
    title: 'Mental Health Hawaii',
    description: 'Provides mental health services for individuals and families.',
    category: 'mental-health',
    tags: ['mental health', 'therapy', 'support'],
    address: '404 Mind St, Honolulu, HI 96820',
    phone: '(808) 555-7788',
    url: 'http://mentalhealthhawaii.org'
  },
  {
    id: 'mental-health-resource-2',
    title: 'Hawaii Crisis Counseling',
    description: 'Offers immediate assistance for those in crisis or experiencing mental health distress.',
    category: 'mental-health',
    tags: ['counseling', 'crisis', 'support'],
    address: '505 Wellness Ave, Honolulu, HI 96821',
    phone: '(808) 555-4433',
    url: 'http://hawaiicrisis.org'
  },
  // Physical Activity resources
  {
    id: 'physical-activity-resource-1',
    title: 'Hawaii Fitness Center',
    description: 'Promotes physical fitness and wellness through exercise programs.',
    category: 'physical-activity',
    tags: ['fitness', 'exercise', 'wellness'],
    address: '606 Workout Ln, Honolulu, HI 96822',
    phone: '(808) 555-2233',
    url: 'http://hawaiifitness.org'
  },
  {
    id: 'physical-activity-resource-2',
    title: 'Hawaii Active Living Program',
    description: 'Encourages healthy living and regular physical activity through community-based programs.',
    category: 'physical-activity',
    tags: ['active living', 'physical activity', 'community'],
    address: '707 Move St, Honolulu, HI 96823',
    phone: '(808) 555-9988',
    url: 'http://hawaiiactiveliving.org'
  },
  // Traditional Medicine resources
  {
    id: 'traditional-medicine-resource-1',
    title: 'Hawaii Traditional Healing Center',
    description: 'Offers traditional Hawaiian healing practices for holistic wellness.',
    category: 'traditional-medicine',
    tags: ['Hawaiian healing', 'holistic', 'wellness'],
    address: '808 Healing Rd, Honolulu, HI 96824',
    phone: '(808) 555-6677',
    url: 'http://hawaiianhealing.org'
  },
  {
    id: 'traditional-medicine-resource-2',
    title: 'Pacific Islander Healing Center',
    description: 'Combines indigenous practices and modern medicine for mental and physical well-being.',
    category: 'traditional-medicine',
    tags: ['healing', 'traditional medicine', 'island culture'],
    address: '909 Peace Ave, Honolulu, HI 96825',
    phone: '(808) 555-3322',
    url: 'http://pacificislandhealing.org'
  },
  // Preventative Care resources
  {
    id: 'preventative-care-resource-1',
    title: 'Hawaii Preventative Care Clinic',
    description: 'Focuses on preventative measures for common chronic diseases.',
    category: 'preventative-care',
    tags: ['preventative care', 'health screenings', 'chronic disease'],
    address: '1010 Preventative St, Honolulu, HI 96826',
    phone: '(808) 555-7755',
    url: 'http://hawaiipreventativecare.org'
  },
  {
    id: 'preventative-care-resource-2',
    title: 'Hawaii Wellness Initiative',
    description: 'A community-based program to encourage early health screenings and preventative practices.',
    category: 'preventative-care',
    tags: ['wellness', 'health screenings', 'preventative measures'],
    address: '1111 Healthy St, Honolulu, HI 96827',
    phone: '(808) 555-2233',
    url: 'http://hawaiiwellness.org'
  }
];