import { ForumPost, ForumComment } from '../types';

// Mock comments for the forum posts
const diabetesComments: ForumComment[] = [
  {
    id: 'comment1',
    content: 'I\'ve been using taro as a replacement for white rice in my meals and it\'s been really helpful for managing my blood sugar. I\'d recommend giving it a try!',
    authorId: 'user2',
    authorName: 'HealthyIslandLife',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
    updatedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    likes: 3
  },
  {
    id: 'comment2',
    content: 'I struggle with finding traditional ingredients where I live. Does anyone know if there are online shops that ship taro or other traditional Hawaiian ingredients?',
    authorId: 'user3',
    authorName: 'DiabetesFighter',
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    updatedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    likes: 1
  },
  {
    id: 'comment3',
    content: 'There are a few online retailers that ship Hawaiian foods. I\'ll send you a direct message with some links I\'ve used in the past.',
    authorId: 'user4',
    authorName: 'IslandNutrition',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 4
  }
];

const heartHealthComments: ForumComment[] = [
  {
    id: 'comment4',
    content: 'I started taking hula classes last month and I\'ve already noticed improvements in my stamina and energy levels. It\'s such a fun way to exercise!',
    authorId: 'user5',
    authorName: 'HeartHealthHawaii',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 7
  },
  {
    id: 'comment5',
    content: 'My cardiologist actually recommended swimming in the ocean as part of my heart health routine. The combination of exercise and being in nature has been so beneficial for both my physical and mental health.',
    authorId: 'user6',
    authorName: 'OceanTherapy',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    likes: 5
  }
];

const nutritionComments: ForumComment[] = [
  {
    id: 'comment6',
    content: 'I\'ve been growing my own taro and sweet potatoes in containers on my lanai. It\'s easier than I thought and so rewarding to harvest your own food!',
    authorId: 'user7',
    authorName: 'GardenGrower',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 12
  },
  {
    id: 'comment7',
    content: 'What size containers do you use for taro? I live in an apartment and would love to try growing some.',
    authorId: 'user8',
    authorName: 'ApartmentFarmer',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 2
  },
  {
    id: 'comment8',
    content: 'I use 5-gallon containers for my taro. They need plenty of room for the roots and consistent moisture. Sweet potatoes can grow in slightly smaller containers.',
    authorId: 'user7',
    authorName: 'GardenGrower',
    createdAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(), // 2.5 days ago
    updatedAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 4
  }
];

const mentalHealthComments: ForumComment[] = [
  {
    id: 'comment9',
    content: 'I\'ve found that practicing hoʻoponopono regularly has really helped me with stress management. The process of reconciliation and forgiveness is so healing.',
    authorId: 'user9',
    authorName: 'PeacefulMind',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 8
  },
  {
    id: 'comment10',
    content: 'Could you share some resources for learning about hoʻoponopono? I\'d like to incorporate it into my mental health routine.',
    authorId: 'user10',
    authorName: 'StressRelief',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 3
  }
];

// Empty forum posts array - no example content
export const mockForumPosts: ForumPost[] = [];