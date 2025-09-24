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

    const { inputText, address } = untrustedData;

    if (!inputText || !address) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // Get user
    const user = getUserByWallet(address);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse plant input (format: "Plant Name - Type" or just "Plant Name")
    const plantInput = inputText.trim();
    let plantName = plantInput;
    let plantType = 'unknown';

    // Try to match with known plants
    const matchedPlant = Object.entries(PLANT_DATABASE).find(([key, plant]) =>
      plant.name.toLowerCase().includes(plantInput.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(plantInput.toLowerCase())
    );

    if (matchedPlant) {
      plantType = matchedPlant[0];
      plantName = matchedPlant[1].name;
    }

    // Create plant
    const plant = createPlant({
      userId: user.userId,
      plantName,
      plantType,
      careSchedule: PLANT_DATABASE[plantType] ? {
        wateringFrequency: PLANT_DATABASE[plantType].wateringFrequency,
        fertilizingFrequency: PLANT_DATABASE[plantType].fertilizingFrequency,
        repottingFrequency: 12 // Default 12 months
      } : {
        wateringFrequency: 7, // Default weekly
        fertilizingFrequency: 30, // Default monthly
        repottingFrequency: 12
      },
      personality: user.plantPreferences[0]?.personality || 'cheery-gardener'
    });

    // Return success frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/success?message=${encodeURIComponent(`Added ${plantName} to your garden! 🌱`)}&userId=${user.userId}`,
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
    console.error('Add plant API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
