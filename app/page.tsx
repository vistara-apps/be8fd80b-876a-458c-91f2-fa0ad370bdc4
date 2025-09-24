'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { PlantCard } from './components/PlantCard';
import { WalletConnection, UserProfile } from './components/WalletConnection';
import { PersonalitySelector } from './components/PersonalitySelector';
import { ReminderText } from './components/ReminderText';
import { Plant, PersonalityType, ReminderMessage } from '@/lib/types';
import { generateReminderMessage, isCareDue } from '@/lib/utils';
import { PLANT_DATABASE } from '@/lib/constants';
import { Plus, Search, Bell } from 'lucide-react';
import { useAccount } from 'wagmi';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType>('cheery-gardener');
  const [reminders, setReminders] = useState<ReminderMessage[]>([]);

  useEffect(() => {
    if (isConnected && address) {
      // Load user's plants from API
      fetch(`/api/plants?address=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data.plants) {
            setPlants(data.plants);

            // Generate reminders for plants that need care
            const newReminders: ReminderMessage[] = [];
            data.plants.forEach((plant: Plant) => {
              if (plant.lastWatered && isCareDue(plant.lastWatered, plant.careSchedule.wateringFrequency)) {
                newReminders.push({
                  plantName: plant.plantName,
                  actionType: 'watering',
                  personality: plant.personality,
                  message: generateReminderMessage(plant.plantName, 'watering', plant.personality),
                  timestamp: new Date()
                });
              }
              if (plant.lastFertilized && isCareDue(plant.lastFertilized, plant.careSchedule.fertilizingFrequency)) {
                newReminders.push({
                  plantName: plant.plantName,
                  actionType: 'fertilizing',
                  personality: plant.personality,
                  message: generateReminderMessage(plant.plantName, 'fertilizing', plant.personality),
                  timestamp: new Date()
                });
              }
            });
            setReminders(newReminders);
          }
        })
        .catch(error => {
          console.error('Failed to load plants:', error);
          setPlants([]);
          setReminders([]);
        });
    } else {
      setPlants([]);
      setReminders([]);
    }
  }, [isConnected, address]);

  const handleAddPlant = () => {
    setShowAddPlant(true);
  };

  const handleReminderAction = (action: 'completed' | 'snoozed') => {
    // Handle reminder action
    console.log('Reminder action:', action);
    setReminders([]); // Clear reminders for demo
  };

  if (!isConnected) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🌱</div>
            <h1 className="text-3xl font-bold text-fg mb-2">
              Welcome to PlantPal
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              Your plant's personal wellness coach, delivered by text
            </p>
          </div>
          
          <WalletConnection />
          
          <div className="grid gap-4 mt-8">
            <div className="glass-card p-4">
              <h3 className="font-semibold text-fg mb-2">🌿 Personalized Care</h3>
              <p className="text-sm text-text-secondary">
                Get customized reminders based on your plant types and care preferences
              </p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold text-fg mb-2">🎭 Choose Your Personality</h3>
              <p className="text-sm text-text-secondary">
                From cheery gardener to zen master - pick the voice that motivates you
              </p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold text-fg mb-2">📱 Celo-Powered Messages</h3>
              <p className="text-sm text-text-secondary">
                Secure, reliable reminders delivered through blockchain technology
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (showPersonalitySelector) {
    return (
      <AppShell 
        title="Choose Personality" 
        showBackButton 
        onBack={() => setShowPersonalitySelector(false)}
      >
        <PersonalitySelector
          selectedPersonality={selectedPersonality}
          onSelect={(personality) => {
            setSelectedPersonality(personality);
            setShowPersonalitySelector(false);
          }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      actions={
        <div className="flex items-center gap-2">
          <UserProfile />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-3">🌱</div>
          <h1 className="text-2xl font-bold text-fg mb-2">
            Hey Green Thumb!
          </h1>
          <p className="text-text-secondary">
            Your plants are looking forward to your care today
          </p>
        </div>

        {/* Active Reminders */}
        {reminders.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-fg">Active Reminders</h2>
            </div>
            {reminders.map((reminder, index) => (
              <ReminderText
                key={index}
                reminder={reminder}
                onAction={handleReminderAction}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleAddPlant}
            className="glass-card p-4 hover:bg-opacity-90 transition-all duration-200 text-center"
          >
            <Plus className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm font-medium text-fg">Add Plant</span>
          </button>
          <button
            onClick={() => setShowPersonalitySelector(true)}
            className="glass-card p-4 hover:bg-opacity-90 transition-all duration-200 text-center"
          >
            <div className="text-2xl mb-2">🎭</div>
            <span className="text-sm font-medium text-fg">Personality</span>
          </button>
        </div>

        {/* My Plants */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-fg">My Plants</h2>
            <button className="text-sm text-primary hover:text-accent transition-colors duration-200">
              View All
            </button>
          </div>
          
          {plants.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <div className="text-4xl mb-4">🪴</div>
              <h3 className="text-lg font-semibold text-fg mb-2">No plants yet</h3>
              <p className="text-text-secondary mb-4">
                Add your first plant to start receiving care reminders
              </p>
              <button
                onClick={handleAddPlant}
                className="btn-primary"
              >
                Add Your First Plant
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.plantId}
                  plant={plant}
                  onClick={() => console.log('Plant clicked:', plant.plantName)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Plant Database Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-fg">Plant Care Guide</h2>
            <button className="text-sm text-primary hover:text-accent transition-colors duration-200">
              <Search className="w-4 h-4 inline mr-1" />
              Search Plants
            </button>
          </div>
          
          <div className="grid gap-3">
            {Object.entries(PLANT_DATABASE).slice(0, 3).map(([key, plant]) => (
              <div key={key} className="glass-card p-4 hover:bg-opacity-90 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌿</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-fg">{plant.name}</h4>
                    <p className="text-sm text-text-secondary">
                      Water every {plant.wateringFrequency} days • {plant.careLevel} care
                    </p>
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${plant.careLevel === 'low' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      plant.careLevel === 'medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                      'bg-red-500 bg-opacity-20 text-red-400'}
                  `}>
                    {plant.careLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
