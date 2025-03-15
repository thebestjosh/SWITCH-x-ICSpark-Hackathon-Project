import { LearningModule, Quiz, QuizQuestion, Lesson, HealthCategory } from '../types';
import { generateUniqueId } from './helpers';

// Mock quiz for diabetes module
const diabetesQuiz: Quiz = {
  id: 'quiz1',
  title: 'Understanding Diabetes',
  description: 'Test your knowledge about diabetes management and care',
  questions: [
    {
      id: 'q1',
      questionText: 'What is the main hormone that regulates blood sugar levels?',
      options: [
        { id: 'a', text: 'Estrogen' },
        { id: 'b', text: 'Insulin' },
        { id: 'c', text: 'Testosterone' },
        { id: 'd', text: 'Adrenaline' }
      ],
      correctOptionId: 'b',
      explanation: 'Insulin is the hormone produced by the pancreas that regulates blood sugar by helping glucose enter your body\'s cells.'
    },
    {
      id: 'q2',
      questionText: 'Which of these is NOT a common symptom of diabetes?',
      options: [
        { id: 'a', text: 'Increased thirst' },
        { id: 'b', text: 'Frequent urination' },
        { id: 'c', text: 'Weight gain' },
        { id: 'd', text: 'Blurred vision' }
      ],
      correctOptionId: 'c',
      explanation: 'Weight loss, not weight gain, is often a symptom of uncontrolled diabetes because the body cannot use glucose properly as an energy source.'
    },
    {
      id: 'q3',
      questionText: 'Which traditional Hawaiian food is a good choice for people with diabetes?',
      options: [
        { id: 'a', text: 'Poi (fermented taro)' },
        { id: 'b', text: 'Haupia (coconut pudding)' },
        { id: 'c', text: 'Kalua pig with rice' },
        { id: 'd', text: 'Malasadas (Portuguese donuts)' }
      ],
      correctOptionId: 'a',
      explanation: 'Poi made from taro has a lower glycemic index compared to white rice or bread, making it a better choice for blood sugar management.'
    }
  ]
};

// Mock lessons for diabetes module
const diabetesLessons: Lesson[] = [
  {
    id: 'lesson1',
    title: 'What is Diabetes?',
    content: `
# Understanding Diabetes

Diabetes is a chronic health condition that affects how your body turns food into energy. Most of the food you eat is broken down into sugar (glucose) and released into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let the blood sugar into your body's cells for use as energy.

With diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should. When there isn't enough insulin or cells stop responding to insulin, too much blood sugar stays in your bloodstream. Over time, this can cause serious health problems, such as heart disease, vision loss, and kidney disease.

## Types of Diabetes

There are three main types of diabetes:

1. **Type 1 Diabetes**: The body does not produce insulin. This is usually diagnosed in children and young adults.

2. **Type 2 Diabetes**: The body does not use insulin properly (insulin resistance). This is the most common type of diabetes.

3. **Gestational Diabetes**: This develops in some women during pregnancy and usually resolves after delivery, but increases risk of type 2 diabetes later.

## Understanding Traditional Hawaiian Approaches to Diabetes Management

This video discusses traditional Hawaiian approaches to managing diabetes, incorporating local foods and cultural practices.

## Risk Factors in Hawaiian Communities

People of Native Hawaiian, Pacific Islander, and Filipino descent have higher rates of diabetes compared to many other ethnic groups. Some factors that contribute to this include:

- Genetic factors
- Dietary changes from traditional foods to modern Western diets
- Less physical activity
- Limited access to healthcare in some communities
- Social determinants of health

## Prevention and Management

Many cases of type 2 diabetes can be prevented or managed through:

- Healthy eating habits, including traditional foods like taro, sweet potatoes, and fresh fish
- Regular physical activity
- Maintaining a healthy weight
- Regular health check-ups
    `,
    imageUrls: ['/assets/images/diabetes-infographic.png'],
    videoEmbeds: [
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/Txqe_CAD43c?si=92SsKomckLXXZz5h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    ]
  },
  {
    id: 'lesson2',
    title: 'Managing Diabetes with Traditional Foods',
    content: `
# Traditional Hawaiian Foods for Diabetes Management

Incorporating traditional Hawaiian foods into your diet can help manage diabetes while honoring cultural practices. Many traditional foods have a lower glycemic index than modern processed foods, making them excellent choices for blood sugar management.

## Beneficial Traditional Foods

### Taro (Kalo)
- **Nutritional Benefits**: High in fiber, vitamin E, B vitamins, and potassium
- **Glycemic Impact**: Lower glycemic index than white rice or potatoes
- **How to Use**: Poi (mashed fermented taro), steamed taro, or taro leaves in stews

### Sweet Potato (ʻUala)
- **Nutritional Benefits**: Rich in fiber, vitamins A and C, and antioxidants
- **Glycemic Impact**: Contains complex carbohydrates that release sugar slowly
- **How to Use**: Baked, steamed, or in stews

### Fish and Seafood
- **Nutritional Benefits**: High-quality protein, omega-3 fatty acids
- **Glycemic Impact**: No carbohydrates, won't raise blood sugar
- **How to Use**: Poke (raw fish salad), grilled fish, or fish soup

### Seaweed (Limu)
- **Nutritional Benefits**: Rich in iodine, calcium, and antioxidants
- **Glycemic Impact**: Very low in carbohydrates
- **How to Use**: Add to soups, poke, or salads

## Sample Meal Plan

### Breakfast:
- Small bowl of poi with a sprinkle of ground kukui nut
- Slice of papaya

### Lunch:
- Poke bowl with brown rice (small portion)
- Side of seaweed salad
- Sliced cucumber and tomato

### Dinner:
- Steamed fish with herbs
- Baked sweet potato
- Steamed taro leaves (lūʻau)

### Snacks:
- Fresh fruit (small portions)
- Raw vegetables
- Small handful of nuts

## Balancing Traditional and Modern Foods

While traditional foods offer many benefits, it's important to:

- Control portion sizes, especially of starchy foods
- Balance carbohydrates throughout the day
- Include physical activity as part of your daily routine
- Work with healthcare providers to monitor blood sugar levels

Remember that traditional Hawaiian lifestyles also included significant physical activity through farming, fishing, and other daily activities, which is an important component of diabetes management.
    `,
    imageUrls: ['/assets/images/traditional-foods.png']
  }
];

// Mock diabetes module
const diabetesModule: LearningModule = {
  id: 'module1',
  title: 'Diabetes Management',
  description: 'Learn about diabetes prevention and management with a focus on tradaitional Hawaiian approaches to health and nutrition.',
  category: 'diabetes',
  difficulty: 'beginner',
  estimatedMinutes: 4,
  lessons: diabetesLessons,
  quizzes: [diabetesQuiz],
  completedBy: []
};

// Mock heart health quiz
const heartHealthQuiz: Quiz = {
  id: 'quiz2',
  title: 'Heart Health Basics',
  description: 'Test your knowledge about heart health and cardiovascular disease prevention',
  questions: [
    {
      id: 'q1',
      questionText: 'Which of these is a major risk factor for heart disease?',
      options: [
        { id: 'a', text: 'High blood pressure' },
        { id: 'b', text: 'Low cholesterol' },
        { id: 'c', text: 'Drinking plenty of water' },
        { id: 'd', text: 'Eating fresh fruits' }
      ],
      correctOptionId: 'a',
      explanation: 'High blood pressure is a major risk factor for heart disease as it damages the arteries over time.'
    },
    {
      id: 'q2',
      questionText: 'Which of these activities is best for heart health?',
      options: [
        { id: 'a', text: 'Watching TV' },
        { id: 'b', text: 'Playing video games' },
        { id: 'c', text: 'Regular walking or swimming' },
        { id: 'd', text: 'Occasional stretching' }
      ],
      correctOptionId: 'c',
      explanation: 'Regular aerobic exercise like walking, swimming, or dancing strengthens the heart and improves circulation.'
    },
    {
      id: 'q3',
      questionText: 'Which traditional Hawaiian activity is excellent for heart health?',
      options: [
        { id: 'a', text: 'Hula dancing' },
        { id: 'b', text: 'Lei making' },
        { id: 'c', text: 'Storytelling' },
        { id: 'd', text: 'Playing ukulele' }
      ],
      correctOptionId: 'a',
      explanation: 'Hula dancing is an excellent aerobic exercise that increases heart rate, improves circulation, and builds endurance.'
    }
  ]
};

// Mock heart health lessons
const heartHealthLessons: Lesson[] = [
  {
    id: 'lesson3',
    title: 'Understanding Heart Health',
    content: `
# Heart Health Basics

Heart disease is the leading cause of death in Hawaii and across the United States. Understanding how the heart works and what factors affect heart health is the first step in prevention.

## How Your Heart Works

Your heart is a muscle about the size of your fist. It works as a pump, sending blood throughout your body to deliver oxygen and nutrients to your cells. The heart has four chambers and a system of valves that keep blood flowing in the right direction.

When your heart beats, it completes one full cardiac cycle. This includes:
- Filling with blood (diastole)
- Contracting to push blood out (systole)

## Common Heart Problems

Several conditions can affect heart health:

1. **Coronary Artery Disease**: Narrowing of the arteries that supply blood to the heart
2. **Heart Attack**: When blood flow to part of the heart is blocked
3. **Heart Failure**: When the heart can't pump blood effectively
4. **Arrhythmia**: Irregular heartbeat
5. **Valve Disease**: Problems with the heart valves opening or closing properly

## Risk Factors in Hawaiian Communities

Some heart disease risk factors affect Hawaiian and Pacific Islander communities at higher rates:
- Diabetes
- High blood pressure
- Obesity
- Limited access to healthcare
- Traditional diets changing to include more processed foods

## Signs of Heart Problems

Know these warning signs:
- Chest pain or discomfort
- Shortness of breath
- Pain in the arms, back, neck, or jaw
- Nausea or lightheadedness
- Fatigue

**If you experience these symptoms, seek medical help immediately.**
    `,
    imageUrls: ['/assets/images/heart-anatomy.png']
  },
  {
    id: 'lesson4',
    title: 'Traditional Approaches to Heart Health',
    content: `
# Traditional Hawaiian Approaches to Heart Health

Traditional Hawaiian health practices focus on balance between the body, mind, spirit, and community. Many traditional practices can support heart health in ways that align with modern medical understanding.

## Physical Activities for Heart Health

### Hula
Hula dancing is both culturally significant and excellent for cardiovascular health:
- Provides rhythmic aerobic exercise
- Improves circulation
- Builds endurance
- Helps maintain healthy weight

### Ocean Activities
Traditional ocean activities support heart health through exercise and stress reduction:
- Swimming
- Paddling (outrigger canoe)
- Surfing
- Fishing

## Traditional Foods for Heart Health

Many traditional Hawaiian foods support heart health:

### Fish and Seafood
- Rich in omega-3 fatty acids
- Low in saturated fat
- Provides protein without the cholesterol of red meat

### Fruit and Vegetables
- Mountain apple (ʻōhiʻa ʻai)
- Breadfruit (ʻulu)
- Sweet potato (ʻuala)
- Coconut (in moderation)
- Seaweed (limu)

### Cooking Methods
Traditional cooking methods like steaming food in an earth oven (imu) use less added fat and preserve nutrients.

## Holistic Wellness Practices

### Hoʻoponopono (Conflict Resolution)
- Reduces stress through reconciliation
- Promotes emotional well-being
- Strengthens social connections

### Lomi Lomi (Massage)
- Improves circulation
- Reduces stress
- Promotes relaxation

## Integrating Traditional and Modern Approaches

For optimal heart health, consider:
- Consuming traditional foods while limiting processed foods
- Participating in cultural physical activities
- Managing stress through traditional practices
- Regular check-ups with healthcare providers
- Taking prescribed medications as directed

By honoring traditional practices while utilizing modern healthcare, you can create a comprehensive approach to heart health.
    `,
    imageUrls: ['/assets/images/traditional-activities.png']
  }
];

// Mock heart health module
const heartHealthModule: LearningModule = {
  id: 'module2',
  title: 'Heart Health Essentials',
  description: 'Learn about heart disease prevention and management with a focus on traditional and cultural approaches to cardiovascular health.',
  category: 'heart',
  difficulty: 'beginner',
  estimatedMinutes: 6,
  lessons: heartHealthLessons,
  quizzes: [heartHealthQuiz],
  completedBy: []
};

// Mock nutrition quiz
const nutritionQuiz: Quiz = {
  id: 'quiz3',
  title: 'Nutrition Fundamentals',
  description: 'Test your knowledge about nutrition basics and healthy eating patterns',
  questions: [
    {
      id: 'q1',
      questionText: 'Which food group should take up the largest portion of your meal according to the healthy plate model?',
      options: [
        { id: 'a', text: 'Proteins' },
        { id: 'b', text: 'Grains' },
        { id: 'c', text: 'Vegetables' },
        { id: 'd', text: 'Fruits' }
      ],
      correctOptionId: 'c',
      explanation: 'Vegetables should fill half your plate as they provide essential nutrients with few calories.'
    },
    {
      id: 'q2',
      questionText: 'Which of these is a good source of healthy fats?',
      options: [
        { id: 'a', text: 'Fried chicken' },
        { id: 'b', text: 'Avocados' },
        { id: 'c', text: 'White bread' },
        { id: 'd', text: 'Soda' }
      ],
      correctOptionId: 'b',
      explanation: 'Avocados contain monounsaturated fats that are heart-healthy and beneficial for overall health.'
    },
    {
      id: 'q3',
      questionText: 'Which traditional Hawaiian food is high in fiber?',
      options: [
        { id: 'a', text: 'Taro (kalo)' },
        { id: 'b', text: 'Spam' },
        { id: 'c', text: 'White rice' },
        { id: 'd', text: 'Coconut oil' }
      ],
      correctOptionId: 'a',
      explanation: 'Taro is high in fiber, which aids digestion, helps maintain steady blood sugar, and contributes to heart health.'
    }
  ]
};

// Mock nutrition lessons
const nutritionLessons: Lesson[] = [
  {
    id: 'lesson5',
    title: 'Nutrition Basics',
    content: `
# Nutrition Fundamentals

Good nutrition is essential for overall health and can help prevent or manage many chronic diseases common in Hawaii, such as diabetes, heart disease, and obesity. Understanding the basics of nutrition can help you make healthier food choices.

## Macronutrients

### Carbohydrates
- Main source of energy for the body
- Found in grains, fruits, vegetables, and dairy
- Choose complex carbohydrates (whole grains, vegetables) over simple carbohydrates (sugar, white bread)

### Proteins
- Essential for building and repairing tissues
- Found in meat, fish, eggs, dairy, legumes, and nuts
- Traditional Hawaiian protein sources include fish, chicken, and plant proteins like taro leaves

### Fats
- Necessary for brain health, hormone production, and nutrient absorption
- Choose healthy fats (fish, nuts, avocados, olive oil) over saturated and trans fats
- Limit coconut oil despite its cultural significance as it's high in saturated fat

## Micronutrients

### Vitamins
- Essential for various bodily functions
- Water-soluble (B vitamins, C) and fat-soluble (A, D, E, K)
- Many local fruits are excellent sources of vitamins

### Minerals
- Needed for bone health, fluid balance, and other functions
- Includes calcium, potassium, iron, and many others
- Seafood and green vegetables are good mineral sources

## The Healthy Plate Model

For balanced meals:
- Fill half your plate with vegetables and fruits
- Fill one quarter with lean proteins
- Fill one quarter with whole grains or starchy vegetables
- Add a small amount of healthy fat
- Choose water as your primary beverage

## Reading Nutrition Labels

When shopping, check:
- Serving size
- Calories per serving
- Nutrient content, especially:
  - Sodium (aim for less)
  - Fiber (aim for more)
  - Added sugars (aim for less)
  - Protein content
    `,
    imageUrls: ['/assets/images/healthy-plate.png']
  },
  {
    id: 'lesson6',
    title: 'Traditional Foods and Modern Nutrition',
    content: `
# Blending Traditional Foods with Modern Nutrition

Traditional Hawaiian foods offer excellent nutritional value and can be incorporated into a modern healthy diet. Understanding both traditional wisdom and current nutritional science helps create balanced eating patterns.

## Nutritional Value of Traditional Foods

### Taro (Kalo)
- Rich in fiber, vitamins B and C, and minerals
- Lower glycemic index than white rice or potatoes
- Considered a sacred plant in Hawaiian culture

### Sweet Potato (ʻUala)
- High in vitamins A and C
- Good source of fiber
- Contains antioxidants

### Breadfruit (ʻUlu)
- High in fiber and potassium
- Contains resistant starch that feeds beneficial gut bacteria
- More nutritious than imported starches

### Fish and Seafood
- Excellent protein source
- Rich in omega-3 fatty acids
- Contains important minerals like iodine

### Seaweed (Limu)
- Rich in iodine, calcium, and iron
- Contains unique antioxidants
- Low in calories

## Adapting Traditional Meals for Modern Health Needs

### Instead of white rice, try:
- Poi (fermented taro paste)
- Steamed taro chunks
- Mashed sweet potato
- Brown rice (as a non-traditional but healthier alternative)

### Healthier protein options:
- Fresh fish instead of processed meats
- Chicken prepared with less sodium
- Plant proteins like beans when appropriate

### Cooking methods:
- Steam or bake instead of frying
- Use less salt, incorporate herbs and spices
- Control portion sizes while maintaining variety

## Practical Meal Ideas

### Breakfast:
- Taro pancakes with fresh fruit
- Papaya with yogurt and honey
- Smoothie with local fruits and vegetables

### Lunch:
- Poke bowl with brown rice, fresh fish, seaweed, and vegetables
- Sweet potato and taro salad with fresh greens
- Fish soup with vegetables

### Dinner:
- Steamed fish with sweet potato and green vegetables
- Chicken lūʻau (taro leaf stew) with small portion of complex carbs
- Vegetable stir-fry with a small portion of protein

### Snacks:
- Fresh local fruits
- Small handful of nuts
- Vegetable sticks

## Finding Balance

- Honor cultural food traditions
- Incorporate nutritional principles from modern science
- Focus on whole foods rather than processed options
- Consider both physical and spiritual nourishment from food
    `,
    imageUrls: ['/assets/images/traditional-meal.png']
  }
];

// Mock nutrition module
const nutritionModule: LearningModule = {
  id: 'module3',
  title: 'Nutrition and Traditional Foods',
  description: 'Learn about balanced nutrition with an emphasis on traditional Hawaiian foods and their health benefits.',
  category: 'nutrition',
  difficulty: 'beginner',
  estimatedMinutes: 5,
  lessons: nutritionLessons,
  quizzes: [nutritionQuiz],
  completedBy: []
};

// Export combined mock data
export const mockLearningModules: LearningModule[] = [
  diabetesModule,
  heartHealthModule,
  nutritionModule
];