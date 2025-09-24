import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet } from '@/lib/database';
import { PLANT_DATABASE } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const { inputText, address } = untrustedData;

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    // Get user
    const user = getUserByWallet(address);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Search plants
    const searchTerm = inputText?.toLowerCase() || '';
    const matchingPlants = Object.entries(PLANT_DATABASE)
      .filter(([key, plant]) =>
        plant.name.toLowerCase().includes(searchTerm) ||
        plant.scientificName.toLowerCase().includes(searchTerm) ||
        plant.tips.some(tip => tip.toLowerCase().includes(searchTerm))
      )
      .slice(0, 3); // Limit to 3 results

    // Return search results frame
    return NextResponse.json({
      frames: [
        {
          version: 'vNext',
          image: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image/search-results?query=${encodeURIComponent(searchTerm)}&results=${matchingPlants.length}&userId=${user.userId}`,
            aspectRatio: '1.91:1'
          },
          buttons: matchingPlants.length > 0
            ? matchingPlants.map(([key, plant], index) => ({
                label: plant.name,
                action: 'post',
                target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/plant-info/${key}`
              })).concat([
                {
                  label: 'Back to Main',
                  action: 'post',
                  target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
                }
              ])
            : [
                {
                  label: 'Try Different Search',
                  action: 'post',
                  target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
                },
                {
                  label: 'Back to Main',
                  action: 'post',
                  target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
                }
              ],
          postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
        }
      ]
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
