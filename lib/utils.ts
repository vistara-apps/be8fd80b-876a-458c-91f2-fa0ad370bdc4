import { PersonalityType, ReminderMessage } from './types';
import { PERSONALITIES } from './constants';

export function generateReminderMessage(
  plantName: string,
  actionType: 'watering' | 'fertilizing' | 'repotting',
  personality: PersonalityType
): string {
  const personalityConfig = PERSONALITIES.find(p => p.id === personality);
  
  const messages = {
    'cheery-gardener': {
      watering: [
        `Good morning! Your ${plantName} is ready for its refreshing drink! 🌱✨`,
        `Time to hydrate your beautiful ${plantName}! It's going to love you for it! 💚`,
        `Your ${plantName} is calling for water! Let's give it some love! 🌿💧`
      ],
      fertilizing: [
        `Your ${plantName} is ready for some nutritious food! Time to fertilize! 🌱🍽️`,
        `Feed time for your gorgeous ${plantName}! It's going to grow so beautifully! ✨`,
        `Your ${plantName} deserves a nutritious meal today! Fertilizer time! 🌿💚`
      ],
      repotting: [
        `Your ${plantName} has outgrown its home! Time for a bigger, better pot! 🪴✨`,
        `Moving day for your ${plantName}! Let's give it more room to flourish! 🌱`,
        `Your ${plantName} is ready for an upgrade! Repotting time! 🏠➡️🏡`
      ]
    },
    'strict-botanist': {
      watering: [
        `Attention: ${plantName} requires immediate hydration. Soil moisture levels are suboptimal.`,
        `Watering protocol initiated for ${plantName}. Maintain consistent moisture levels.`,
        `${plantName} hydration schedule: NOW. Ensure proper drainage post-watering.`
      ],
      fertilizing: [
        `Nutrient supplementation required for ${plantName}. Apply fertilizer according to specifications.`,
        `${plantName} fertilization cycle due. Maintain optimal nutrient balance.`,
        `Feeding protocol for ${plantName}: Execute immediately for optimal growth.`
      ],
      repotting: [
        `${plantName} root system assessment: Repotting required. Upgrade container size.`,
        `Container capacity exceeded for ${plantName}. Immediate repotting necessary.`,
        `${plantName} spatial requirements: Current pot insufficient. Repot immediately.`
      ]
    },
    'humorous-friend': {
      watering: [
        `Your ${plantName} is giving you the silent treatment... probably because it's thirsty! 😅`,
        `${plantName} just slid into your DMs asking for water! Don't leave it on read! 💧`,
        `Your ${plantName} is looking at you like "Really? Still no water?" 😏`
      ],
      fertilizing: [
        `Your ${plantName} is hangry! Time for some plant food before it gets grumpy! 🍽️`,
        `${plantName} sent a formal complaint about the lack of nutrients. Better feed it! 📝`,
        `Your ${plantName} is on a hunger strike until you fertilize it! 🌱😤`
      ],
      repotting: [
        `Your ${plantName} is feeling cramped! It's basically living in a studio apartment! 🏠`,
        `${plantName} needs more space than a New York apartment! Time to repot! 🗽`,
        `Your ${plantName} is doing plant yoga but there's no room to stretch! Bigger pot needed! 🧘‍♀️`
      ]
    },
    'zen-master': {
      watering: [
        `In caring for your ${plantName}, you care for yourself. Water mindfully. 🧘‍♀️`,
        `The ${plantName} teaches patience. Today, it asks for water. Listen deeply. 💧`,
        `As you nourish your ${plantName} with water, nourish your soul with presence. 🌿`
      ],
      fertilizing: [
        `Your ${plantName} seeks nourishment, as do we all. Feed with intention. 🌱`,
        `The cycle of growth continues. Your ${plantName} awaits its nutrients. 🔄`,
        `In feeding your ${plantName}, you participate in the dance of life. 💚`
      ],
      repotting: [
        `Your ${plantName} has outgrown its boundaries. Growth requires space. 🪴`,
        `Like us, your ${plantName} needs room to expand. Repot with mindfulness. 🌱`,
        `The ${plantName} whispers of new beginnings. A larger pot awaits. ✨`
      ]
    },
    'plant-parent': {
      watering: [
        `Your little ${plantName} baby needs some love today! Time for a drink, sweetie! 💚`,
        `${plantName} is looking up at you with those cute little leaves! Water time! 🌿👶`,
        `Your precious ${plantName} is thirsty! Let's take care of our green baby! 💧`
      ],
      fertilizing: [
        `Time to feed your beautiful ${plantName} child! Growing plants need their vitamins! 🍼`,
        `Your ${plantName} baby is ready for dinner! Fertilizer time, little one! 🌱`,
        `Our sweet ${plantName} needs its nutrients to grow big and strong! 💪`
      ],
      repotting: [
        `Your ${plantName} baby has grown so much! Time for a bigger home! 🏠➡️🏡`,
        `Look how big our ${plantName} has gotten! It needs more room to play! 🌱`,
        `Your precious ${plantName} is ready for its next growth phase! New pot time! 🪴`
      ]
    }
  };

  const personalityMessages = messages[personality];
  if (!personalityMessages) return `Time to ${actionType.replace('ing', '')} your ${plantName}!`;
  
  const actionMessages = personalityMessages[actionType];
  if (!actionMessages) return `Time to ${actionType.replace('ing', '')} your ${plantName}!`;
  
  return actionMessages[Math.floor(Math.random() * actionMessages.length)];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

export function getDaysUntilNextCare(lastCareDate: Date, frequency: number): number {
  const now = new Date();
  const nextCareDate = new Date(lastCareDate);
  nextCareDate.setDate(nextCareDate.getDate() + frequency);
  
  const diffTime = nextCareDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}

export function isCareDue(lastCareDate: Date, frequency: number): boolean {
  return getDaysUntilNextCare(lastCareDate, frequency) === 0;
}

export function getPlantEmoji(plantType: string): string {
  const emojiMap: { [key: string]: string } = {
    'monstera': '🌿',
    'snake-plant': '🐍',
    'pothos': '🌱',
    'fiddle-leaf': '🌳',
    'peace-lily': '🕊️',
    'default': '🪴'
  };
  
  return emojiMap[plantType] || emojiMap.default;
}

export function getCareStatusColor(daysUntil: number): string {
  if (daysUntil === 0) return 'text-red-400';
  if (daysUntil <= 1) return 'text-amber-400';
  if (daysUntil <= 3) return 'text-yellow-400';
  return 'text-green-400';
}
