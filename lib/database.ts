import { User, Plant, CareLog } from './types';
import fs from 'fs';
import path from 'path';

// Simple file-based database for demo purposes
// In production, this would be replaced with a real database

const DB_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const PLANTS_FILE = path.join(DB_DIR, 'plants.json');
const CARE_LOGS_FILE = path.join(DB_DIR, 'care-logs.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize empty files if they don't exist
[USERS_FILE, PLANTS_FILE, CARE_LOGS_FILE].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }
});

// Generic database operations
function readData<T>(filePath: string): T[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeData<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// User operations
export function getUserByWallet(walletAddress: string): User | null {
  const users = readData<User>(USERS_FILE);
  return users.find(user => user.walletAddress === walletAddress) || null;
}

export function createUser(user: Omit<User, 'userId' | 'createdAt'>): User {
  const users = readData<User>(USERS_FILE);
  const newUser: User = {
    ...user,
    userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date()
  };
  users.push(newUser);
  writeData(USERS_FILE, users);
  return newUser;
}

export function updateUser(userId: string, updates: Partial<User>): User | null {
  const users = readData<User>(USERS_FILE);
  const index = users.findIndex(user => user.userId === userId);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updates };
  writeData(USERS_FILE, users);
  return users[index];
}

// Plant operations
export function getPlantsByUserId(userId: string): Plant[] {
  const plants = readData<Plant>(PLANTS_FILE);
  return plants.filter(plant => plant.userId === userId);
}

export function getPlantById(plantId: string): Plant | null {
  const plants = readData<Plant>(PLANTS_FILE);
  return plants.find(plant => plant.plantId === plantId) || null;
}

export function createPlant(plant: Omit<Plant, 'plantId'>): Plant {
  const plants = readData<Plant>(PLANTS_FILE);
  const newPlant: Plant = {
    ...plant,
    plantId: `plant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  plants.push(newPlant);
  writeData(PLANTS_FILE, plants);
  return newPlant;
}

export function updatePlant(plantId: string, updates: Partial<Plant>): Plant | null {
  const plants = readData<Plant>(PLANTS_FILE);
  const index = plants.findIndex(plant => plant.plantId === plantId);
  if (index === -1) return null;

  plants[index] = { ...plants[index], ...updates };
  writeData(PLANTS_FILE, plants);
  return plants[index];
}

export function deletePlant(plantId: string): boolean {
  const plants = readData<Plant>(PLANTS_FILE);
  const filteredPlants = plants.filter(plant => plant.plantId !== plantId);
  if (filteredPlants.length === plants.length) return false;

  writeData(PLANTS_FILE, filteredPlants);
  return true;
}

// Care log operations
export function getCareLogsByPlantId(plantId: string): CareLog[] {
  const logs = readData<CareLog>(CARE_LOGS_FILE);
  return logs.filter(log => log.plantId === plantId).sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function createCareLog(log: Omit<CareLog, 'logId'>): CareLog {
  const logs = readData<CareLog>(CARE_LOGS_FILE);
  const newLog: CareLog = {
    ...log,
    logId: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  logs.push(newLog);
  writeData(CARE_LOGS_FILE, logs);
  return newLog;
}

export function getAllPlants(): Plant[] {
  return readData<Plant>(PLANTS_FILE);
}

export function getAllUsers(): User[] {
  return readData<User>(USERS_FILE);
}
