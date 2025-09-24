import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, createUser, getPlantsByUserId, createCareLog, updatePlant } from '@/lib/database';
import { PLANT_DATABASE } from '@/lib/constants';
import { generateReminderMessage } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { buttonIndex, inputText, fid, address } = untrustedData;

    // Get or create user
    let user = getUserByWallet(address);
    if (!user) {
      user = createUser({
        farcasterId: fid?.toString(),
        walletAddress: address,
        plantPreferences: []
      });
    }

    const plants = getPlantsByUserId(user.userId);

    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Connect Wallet / Main Menu
        return getMainFrame(user, plants);

      case 2: // Log Care / Snooze Reminder
        return getCareLoggingFrame(user, plants);

      case 3: // Add Plant
        return getAddPlantFrame(user);

      case 4: // View Plants
        return getPlantsFrame(user, plants);

      case 5: // Search Plants
        return getPlantSearchFrame(user);

      default:
        return getMainFrame(user, plants);
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getMainFrame(user: any, plants: any[]) {
  const hasPlants = plants.length > 0;

  return NextResponse.json({
    frames: [
      {
        version: 'vNext',
        image: {
          src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/main?userId=${user.userId}&hasPlants=${hasPlants}`,
          aspectRatio: '1.91:1'
        },
        buttons: [
          {
            label: hasPlants ? 'Log Care' : 'Add Plant',
            action: 'post'
          },
          {
            label: 'View Plants',
            action: 'post'
          },
          {
            label: 'Search Plants',
            action: 'post'
          }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      }
    ]
  });
}

function getCareLoggingFrame(user: any, plants: any[]) {
  const activePlants = plants.filter(plant => {
    // Check if any care is due
    const now = new Date();
    const wateringDue = plant.lastWatered ?
      (now.getTime() - new Date(plant.lastWatered).getTime()) > (plant.careSchedule.wateringFrequency * 24 * 60 * 60 * 1000) : true;
    const fertilizingDue = plant.lastFertilized ?
      (now.getTime() - new Date(plant.lastFertilized).getTime()) > (plant.careSchedule.fertilizingFrequency * 24 * 60 * 60 * 1000) : true;

    return wateringDue || fertilizingDue;
  });

  return NextResponse.json({
    frames: [
      {
        version: 'vNext',
        image: {
          src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/care?userId=${user.userId}&plants=${activePlants.map(p => p.plantId).join(',')}`,
          aspectRatio: '1.91:1'
        },
        buttons: activePlants.slice(0, 3).map((plant, index) => ({
          label: `Care for ${plant.plantName}`,
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/care/${plant.plantId}`
        })).concat([
          {
            label: 'Back to Main',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
          }
        ]),
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      }
    ]
  });
}

function getAddPlantFrame(user: any) {
  return NextResponse.json({
    frames: [
      {
        version: 'vNext',
        image: {
          src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/add-plant?userId=${user.userId}`,
          aspectRatio: '1.91:1'
        },
        input: {
          text: 'Enter plant name and type (e.g., "Monstera deliciosa")'
        },
        buttons: [
          {
            label: 'Add Plant',
            action: 'post'
          },
          {
            label: 'Back to Main',
            action: 'post'
          }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/add-plant`
      }
    ]
  });
}

function getPlantsFrame(user: any, plants: any[]) {
  return NextResponse.json({
    frames: [
      {
        version: 'vNext',
        image: {
          src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/plants?userId=${user.userId}&count=${plants.length}`,
          aspectRatio: '1.91:1'
        },
        buttons: plants.slice(0, 3).map((plant, index) => ({
          label: plant.plantName,
          action: 'post',
          target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/plant/${plant.plantId}`
        })).concat([
          {
            label: 'Back to Main',
            action: 'post',
            target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
          }
        ]),
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      }
    ]
  });
}

function getPlantSearchFrame(user: any) {
  return NextResponse.json({
    frames: [
      {
        version: 'vNext',
        image: {
          src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/search?userId=${user.userId}`,
          aspectRatio: '1.91:1'
        },
        input: {
          text: 'Search for plant care info...'
        },
        buttons: [
          {
            label: 'Search',
            action: 'post'
          },
          {
            label: 'Back to Main',
            action: 'post'
          }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/search`
      }
    ]
  });
}
