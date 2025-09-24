export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  plantPreferences: PlantPreference[];
  createdAt: Date;
}

export interface Plant {
  plantId: string;
  userId: string;
  plantName: string;
  plantType: string;
  careSchedule: CareSchedule;
  lastWatered?: Date;
  lastFertilized?: Date;
  personality: PersonalityType;
  imageUrl?: string;
}

export interface CareLog {
  logId: string;
  plantId: string;
  actionType: 'watered' | 'fertilized' | 'repotted' | 'pruned';
  timestamp: Date;
  notes?: string;
}

export interface CareSchedule {
  wateringFrequency: number; // days
  fertilizingFrequency: number; // days
  repottingFrequency: number; // months
}

export interface PlantPreference {
  plantType: string;
  careLevel: 'low' | 'medium' | 'high';
  personality?: PersonalityType;
}

export type PersonalityType = 
  | 'cheery-gardener'
  | 'strict-botanist' 
  | 'humorous-friend'
  | 'zen-master'
  | 'plant-parent';

export interface PersonalityConfig {
  id: PersonalityType;
  name: string;
  description: string;
  sampleMessage: string;
  emoji: string;
}

export interface PlantDatabase {
  [key: string]: {
    name: string;
    scientificName: string;
    careLevel: 'low' | 'medium' | 'high';
    wateringFrequency: number;
    fertilizingFrequency: number;
    lightRequirement: 'low' | 'medium' | 'high';
    tips: string[];
  };
}

export interface ReminderMessage {
  plantName: string;
  actionType: 'watering' | 'fertilizing' | 'repotting';
  personality: PersonalityType;
  message: string;
  timestamp: Date;
}
