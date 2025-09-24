import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet } from '@/lib/database';
import { PLANT_DATABASE } from '@/lib/constants';

export async function POST(request: NextRequest, { params }: { params: Promise<{ plantType: string }> }) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { address } = untrustedData;
    const resolvedParams = await params;
    const { plantType } = resolvedParams;

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
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

    // Return plant info frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/plant-info?plantType=${plantType}&plantName=${encodeURIComponent(plantInfo.name)}`,
            aspectRatio: '1.91:1'
          },
          buttons: [
            {
              label: 'Add to My Plants',
              action: 'post'
            },
            {
              label: 'Back to Search',
              action: 'post'
            },
            {
              label: 'Back to Main',
              action: 'post'
            }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/add-plant-from-search?plantType=${plantType}`
        }
      ]
    });
  } catch (error) {
    console.error('Plant info API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
