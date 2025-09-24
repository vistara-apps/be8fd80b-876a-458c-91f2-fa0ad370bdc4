import { PersonalityConfig, PlantDatabase } from './types';

export const PERSONALITIES: PersonalityConfig[] = [
  {
    id: 'cheery-gardener',
    name: 'Cheery Gardener',
    description: 'Upbeat and encouraging, always sees the bright side',
    sampleMessage: 'Good morning, sunshine! Your Monstera is ready for its morning drink! 🌱✨',
    emoji: '🌻'
  },
  {
    id: 'strict-botanist',
    name: 'Strict Botanist',
    description: 'Professional and precise, focused on optimal care',
    sampleMessage: 'Attention: Your Monstera requires watering. Soil moisture levels are suboptimal.',
    emoji: '🔬'
  },
  {
    id: 'humorous-friend',
    name: 'Humorous Friend',
    description: 'Funny and relatable, makes plant care entertaining',
    sampleMessage: 'Your Monstera is giving you the silent treatment... probably because it\'s thirsty! 😅',
    emoji: '😄'
  },
  {
    id: 'zen-master',
    name: 'Zen Master',
    description: 'Calm and mindful, connects plant care to inner peace',
    sampleMessage: 'In caring for your Monstera, you care for yourself. Water mindfully. 🧘‍♀️',
    emoji: '🧘‍♂️'
  },
  {
    id: 'plant-parent',
    name: 'Plant Parent',
    description: 'Nurturing and protective, treats plants like family',
    sampleMessage: 'Your little Monstera baby needs some love today! Time for a drink, sweetie! 💚',
    emoji: '👨‍👩‍👧‍👦'
  }
];

export const PLANT_DATABASE: PlantDatabase = {
  'monstera': {
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    careLevel: 'medium',
    wateringFrequency: 7,
    fertilizingFrequency: 30,
    lightRequirement: 'medium',
    tips: [
      'Allow soil to dry between waterings',
      'Provide bright, indirect light',
      'Wipe leaves regularly for dust removal',
      'Support with moss pole for climbing'
    ]
  },
  'snake-plant': {
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    careLevel: 'low',
    wateringFrequency: 14,
    fertilizingFrequency: 60,
    lightRequirement: 'low',
    tips: [
      'Very drought tolerant',
      'Avoid overwatering',
      'Tolerates low light conditions',
      'Perfect for beginners'
    ]
  },
  'pothos': {
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    careLevel: 'low',
    wateringFrequency: 7,
    fertilizingFrequency: 30,
    lightRequirement: 'medium',
    tips: [
      'Very forgiving plant',
      'Can grow in water or soil',
      'Trim regularly to encourage growth',
      'Great for hanging baskets'
    ]
  },
  'fiddle-leaf': {
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    careLevel: 'high',
    wateringFrequency: 7,
    fertilizingFrequency: 21,
    lightRequirement: 'high',
    tips: [
      'Needs consistent watering schedule',
      'Requires bright, indirect light',
      'Sensitive to changes in environment',
      'Wipe leaves weekly'
    ]
  },
  'peace-lily': {
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    careLevel: 'medium',
    wateringFrequency: 5,
    fertilizingFrequency: 30,
    lightRequirement: 'medium',
    tips: [
      'Droops when thirsty',
      'Prefers consistently moist soil',
      'Remove spent flowers',
      'Enjoys humidity'
    ]
  }
};

export const CARE_ACTIONS = [
  { id: 'watered', label: 'Watered', icon: '💧', color: 'text-blue-400' },
  { id: 'fertilized', label: 'Fertilized', icon: '🌱', color: 'text-green-400' },
  { id: 'repotted', label: 'Repotted', icon: '🪴', color: 'text-amber-400' },
  { id: 'pruned', label: 'Pruned', icon: '✂️', color: 'text-purple-400' }
];
