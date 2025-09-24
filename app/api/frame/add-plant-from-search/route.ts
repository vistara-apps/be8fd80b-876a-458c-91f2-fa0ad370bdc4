import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, createPlant } from '@/lib/database';
import { PLANT_DATABASE } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { address } = untrustedData;
    const { searchParams } = new URL(request.url);
    const plantType = searchParams.get('plantType');

    if (!address || !plantType) {
      return NextResponse.json({ error: 'Address and plant type required' }, { status: 400 });
    }

    // Get user
    const user = getUserByWallet(address);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get plant info
    const plantInfo = PLANT_DATABASE[plantType];
    if (!plantInfo) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    // Create plant
    const plant = createPlant({
      userId: user.userId,
      plantName: plantInfo.name,
      plantType,
      careSchedule: {
        wateringFrequency: plantInfo.wateringFrequency,
        fertilizingFrequency: plantInfo.fertilizingFrequency,
        repottingFrequency: 12 // Default 12 months
      },
      personality: user.plantPreferences[0]?.personality || 'cheery-gardener'
    });

    // Return success frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/success?message=${encodeURIComponent(`Added ${plantInfo.name} to your garden! 🌱`)}&userId=${user.userId}`,
            aspectRatio: '1.91:1'
          },
          buttons: [
            {
              label: 'Log First Care',
              action: 'post',
              target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/care/${plant.plantId}`
            },
            {
              label: 'Add Another Plant',
              action: 'post'
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
    console.error('Add plant from search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
