'use client';

import { Plant } from '@/lib/types';
import { getDaysUntilNextCare, getCareStatusColor, getPlantEmoji, formatDate } from '@/lib/utils';
import { Droplets, Leaf, Calendar } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onClick?: () => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  const wateringDaysUntil = plant.lastWatered 
    ? getDaysUntilNextCare(plant.lastWatered, plant.careSchedule.wateringFrequency)
    : 0;
  
  const fertilizingDaysUntil = plant.lastFertilized
    ? getDaysUntilNextCare(plant.lastFertilized, plant.careSchedule.fertilizingFrequency)
    : 0;

  const nextWateringColor = getCareStatusColor(wateringDaysUntil);
  const nextFertilizingColor = getCareStatusColor(fertilizingDaysUntil);

  return (
    <div 
      className="plant-card cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">
            {getPlantEmoji(plant.plantType)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fg">{plant.plantName}</h3>
            <p className="text-sm text-text-secondary capitalize">
              {plant.plantType.replace('-', ' ')}
            </p>
          </div>
        </div>
        <div className="text-xs text-text-secondary">
          {plant.personality.replace('-', ' ')}
        </div>
      </div>

      <div className="space-y-3">
        {/* Watering Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-text-secondary">Watering</span>
          </div>
          <div className={`text-sm font-medium ${nextWateringColor}`}>
            {wateringDaysUntil === 0 ? 'Due now!' : 
             wateringDaysUntil === 1 ? 'Tomorrow' : 
             `${wateringDaysUntil} days`}
          </div>
        </div>

        {/* Fertilizing Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-sm text-text-secondary">Fertilizing</span>
          </div>
          <div className={`text-sm font-medium ${nextFertilizingColor}`}>
            {fertilizingDaysUntil === 0 ? 'Due now!' : 
             fertilizingDaysUntil === 1 ? 'Tomorrow' : 
             `${fertilizingDaysUntil} days`}
          </div>
        </div>

        {/* Last Care */}
        {plant.lastWatered && (
          <div className="flex items-center justify-between pt-2 border-t border-white border-opacity-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text-secondary">Last watered</span>
            </div>
            <span className="text-xs text-text-secondary">
              {formatDate(plant.lastWatered)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
