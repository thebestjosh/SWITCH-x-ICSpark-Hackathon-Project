import { Resource } from '../types';

export const mockResources: Resource[] = [
  // Diabetes resources
  {
    id: 'resource1',
    title: 'Diabetes Education Program',
    description: 'Free diabetes education workshops focused on culturally appropriate management strategies for Native Hawaiians and Pacific Islanders',
    category: 'diabetes',
    phone: '(808) 733-9211',
    tags: ['diabetes', 'education', 'workshops', 'free']
  },
  {
    id: 'resource2',
    title: 'Traditional Foods for Diabetes Management Guide',
    description: 'A comprehensive guide to incorporating traditional Hawaiian and Pacific Islander foods into a diabetes-friendly diet',
    category: 'diabetes',
    tags: ['diabetes', 'nutrition', 'traditional-foods', 'guide']
  },
  {
    id: 'resource3',
    title: 'Diabetes Support Group',
    description: 'Monthly support group for people with diabetes and their families, with a focus on cultural approaches to health',
    category: 'diabetes',
    phone: '(808) 733-9220',
    tags: ['diabetes', 'support-group', 'community']
  },
  
  // Heart health resources
  {
    id: 'resource4',
    title: 'Heart Health Screening Program',
    description: 'Free heart health screenings offered at community centers across the islands',
    category: 'heart-health',
    phone: '(808) 555-3456',
    tags: ['heart-health', 'screening', 'prevention', 'free']
  },
  {
    id: 'resource5',
    title: 'Traditional Movement Classes',
    description: 'Classes combining traditional Hawaiian dance and movement for heart health, including hula and other cultural practices',
    category: 'heart-health',
    phone: '(808) 586-4400',
    tags: ['heart-health', 'exercise', 'traditional-activities', 'hula']
  },
  {
    id: 'resource6',
    title: 'Heart-Healthy Hawaiian Cooking Classes',
    description: 'Learn to prepare traditional Hawaiian dishes with modifications for heart health',
    category: 'heart-health',
    phone: '(808) 586-4400',
    tags: ['heart-health', 'nutrition', 'cooking-classes', 'traditional-foods']
  },
  
  // Nutrition resources
  {
    id: 'resource7',
    title: 'Traditional Foods Nutrition Guide',
    description: 'Nutritional information and preparation tips for traditional Hawaiian foods',
    category: 'nutrition',
    tags: ['nutrition', 'traditional-foods', 'guide']
  },
  {
    id: 'resource8',
    title: 'Community Garden Program',
    description: 'Join a community garden to grow traditional crops like taro, sweet potatoes, and traditional vegetables',
    category: 'nutrition',
    phone: '(808) 586-4400',
    tags: ['nutrition', 'gardening', 'traditional-foods', 'community']
  },
  {
    id: 'resource9',
    title: 'Farmers Markets Directory',
    description: 'Find local farmers markets featuring traditional Hawaiian produce and foods',
    category: 'nutrition',
    tags: ['nutrition', 'local-food', 'farmers-markets', 'traditional-foods']
  },
  
  // Mental health resources
  {
    id: 'resource10',
    title: 'Cultural Approaches to Stress Management',
    description: 'Workshops on traditional Hawaiian practices for mental wellness, including hoʻoponopono and other cultural approaches',
    category: 'mental-health',
    phone: '(808) 586-4400',
    tags: ['mental-health', 'stress-management', 'traditional-practices', 'workshops']
  },
  {
    id: 'resource11',
    title: 'Nature Therapy Program',
    description: 'Guided nature experiences based on traditional Hawaiian connections to land and sea for mental health benefits',
    category: 'mental-health',
    phone: '(808) 586-4400',
    tags: ['mental-health', 'nature-therapy', 'traditional-practices']
  },
  {
    id: 'resource12',
    title: 'Cultural Healing Practitioners Directory',
    description: 'Find practitioners of traditional Hawaiian healing arts focused on mental and emotional wellbeing',
    category: 'mental-health',
    tags: ['mental-health', 'traditional-healing', 'practitioners']
  },
  
  // Physical activity resources
  {
    id: 'resource13',
    title: 'Traditional Hawaiian Movement Classes',
    description: 'Various classes teaching traditional physical activities, including hula, outrigger canoeing, and other cultural practices',
    category: 'physical-activity',
    phone: '(808) 586-4400',
    tags: ['physical-activity', 'traditional-activities', 'classes']
  },
  {
    id: 'resource14',
    title: 'Ocean Activities for Health',
    description: 'Programs connecting participants with traditional ocean activities like swimming, surfing, and paddling for physical health',
    category: 'physical-activity',
    phone: '(808) 586-4400',
    tags: ['physical-activity', 'ocean-activities', 'traditional-practices']
  },
  
  // General resources
  {
    id: 'resource15',
    title: 'Healthcare Services for Underserved Communities',
    description: 'Low-cost healthcare services specifically designed for Native Hawaiian and Pacific Islander communities',
    category: 'general',
    phone: '(808) 586-4400',
    tags: ['healthcare-access', 'low-cost', 'community-services']
  },
  {
    id: 'resource16',
    title: 'Language Translation Services',
    description: 'Health information services for Pacific Islander communities',
    category: 'general',
    phone: '(808) 586-4400',
    tags: ['language-services', 'translation', 'accessibility']
  },
  {
    id: 'resource17',
    title: 'Healthcare Transportation Program',
    description: 'Transportation assistance to medical appointments for residents of rural and underserved areas',
    category: 'general',
    phone: '(808) 555-3456',
    tags: ['transportation', 'healthcare-access', 'rural-services']
  }
];