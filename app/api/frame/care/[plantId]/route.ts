import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, getPlantById, createCareLog, updatePlant } from '@/lib/database';

export async function POST(request: NextRequest, { params }: { params: Promise<{ plantId: string }> }) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { buttonIndex, address } = untrustedData;
    const resolvedParams = await params;
    const { plantId } = resolvedParams;

    // Get user and plant
    const user = getUserByWallet(address);
    const plant = getPlantById(plantId);

    if (!user || !plant || plant.userId !== user.userId) {
      return NextResponse.json({ error: 'Plant not found or access denied' }, { status: 404 });
    }

    // Determine care action based on button index
    let actionType: 'watered' | 'fertilized' | 'repotted' | 'pruned';
    let actionLabel: string;

    switch (buttonIndex) {
      case 1:
        actionType = 'watered';
        actionLabel = 'Watered';
        break;
      case 2:
        actionType = 'fertilized';
        actionLabel = 'Fertilized';
        break;
      case 3:
        actionType = 'repotted';
        actionLabel = 'Repotted';
        break;
      case 4:
        actionType = 'pruned';
        actionLabel = 'Pruned';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Create care log
    const careLog = createCareLog({
      plantId,
      actionType,
      timestamp: new Date(),
      notes: `${actionLabel} ${plant.plantName}`
    });

    // Update plant's last care date
    const updates: any = {};
    if (actionType === 'watered') {
      updates.lastWatered = new Date();
    } else if (actionType === 'fertilized') {
      updates.lastFertilized = new Date();
    }

    if (Object.keys(updates).length > 0) {
      updatePlant(plantId, updates);
    }

    // Return success frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/success?message=${encodeURIComponent(`Great job! ${actionLabel} ${plant.plantName} 🌱`)}&userId=${user.userId}`,
            aspectRatio: '1.91:1'
          },
          buttons: [
            {
              label: 'Log More Care',
              action: 'post'
            },
            {
              label: 'View Plant',
              action: 'post',
              target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/plant/${plantId}`
            },
            {
              label: 'Back to Main',
              action: 'post'
            }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
        }
      ]
    });
  } catch (error) {
    console.error('Care logging API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint to show care options for a specific plant
export async function GET(request: NextRequest, { params }: { params: Promise<{ plantId: string }> }) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    const resolvedParams = await params;
    const { plantId } = resolvedParams;

    // Get user and plant
    const user = getUserByWallet(address);
    const plant = getPlantById(plantId);

    if (!user || !plant || plant.userId !== user.userId) {
      return NextResponse.json({ error: 'Plant not found or access denied' }, { status: 404 });
    }

    // Return care options frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/care-options?plantId=${plantId}&plantName=${encodeURIComponent(plant.plantName)}`,
            aspectRatio: '1.91:1'
          },
          buttons: [
            {
              label: '💧 Water',
              action: 'post'
            },
            {
              label: '🌱 Fertilize',
              action: 'post'
            },
            {
              label: '🪴 Repot',
              action: 'post'
            },
            {
              label: '✂️ Prune',
              action: 'post'
            }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/care/${plantId}`
        }
      ]
    });
  } catch (error) {
    console.error('Care options API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
