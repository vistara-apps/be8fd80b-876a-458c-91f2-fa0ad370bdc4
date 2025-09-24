import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet, getPlantsByUserId } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    // Get user
    const user = getUserByWallet(address);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get plants
    const plants = getPlantsByUserId(user.userId);

    return NextResponse.json({ plants, user });
  } catch (error) {
    console.error('Get plants API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
