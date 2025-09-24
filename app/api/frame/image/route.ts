import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from 'canvas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'main';
    const userId = searchParams.get('userId');
    const message = searchParams.get('message');
    const hasPlants = searchParams.get('hasPlants') === 'true';
    const plantName = searchParams.get('plantName');
    const plantType = searchParams.get('plantType');
    const plantId = searchParams.get('plantId');
    const query = searchParams.get('query');
    const results = searchParams.get('results');
    const count = searchParams.get('count');

    // Create canvas
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0f2027');
    gradient.addColorStop(1, '#203a43');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Set text properties
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Generate image based on type
    switch (type) {
      case 'main':
        drawMainImage(ctx, hasPlants);
        break;
      case 'success':
        drawSuccessImage(ctx, message || 'Success!');
        break;
      case 'care-options':
        drawCareOptionsImage(ctx, plantName || 'Plant');
        break;
      case 'search-results':
        drawSearchResultsImage(ctx, query || '', results || '0');
        break;
      case 'add-plant':
        drawAddPlantImage(ctx);
        break;
      case 'plants':
        drawPlantsImage(ctx, count || '0');
        break;
      case 'care':
        drawCareImage(ctx);
        break;
      case 'plant-info':
        drawPlantInfoImage(ctx, plantName || 'Plant', plantType || 'unknown');
        break;
      default:
        drawMainImage(ctx, false);
    }

    // Convert to buffer
    const buffer = canvas.toBuffer('image/png');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}

function drawMainImage(ctx: any, hasPlants: boolean) {
  // Title
  ctx.font = 'bold 48px Arial';
  ctx.fillText('🌱 PlantPal', 600, 150);

  // Subtitle
  ctx.font = '32px Arial';
  ctx.fillText('Your plant\'s personal wellness coach', 600, 200);

  // Description
  ctx.font = '24px Arial';
  ctx.fillText(hasPlants ? 'Manage your garden with care reminders' : 'Start your plant care journey today', 600, 280);

  // Features
  ctx.font = '20px Arial';
  const features = [
    '• Personalized care reminders',
    '• Plant database & identification',
    '• Customizable personalities',
    '• Celo-powered messaging'
  ];

  features.forEach((feature, index) => {
    ctx.fillText(feature, 600, 350 + index * 30);
  });
}

function drawSuccessImage(ctx: any, message: string) {
  // Success icon
  ctx.font = '72px Arial';
  ctx.fillText('✅', 600, 150);

  // Message
  ctx.font = 'bold 36px Arial';
  const lines = message.split('!');
  lines.forEach((line, index) => {
    ctx.fillText(line.trim(), 600, 250 + index * 50);
  });

  // Encouragement
  ctx.font = '24px Arial';
  ctx.fillText('Keep up the great work!', 600, 450);
}

function drawCareOptionsImage(ctx: any, plantName: string) {
  // Plant emoji
  ctx.font = '64px Arial';
  ctx.fillText('🪴', 600, 120);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillText(`Care for ${plantName}`, 600, 200);

  // Options
  ctx.font = '28px Arial';
  const options = [
    '💧 Water • 🌱 Fertilize',
    '🪴 Repot • ✂️ Prune'
  ];

  options.forEach((option, index) => {
    ctx.fillText(option, 600, 280 + index * 40);
  });

  // Instruction
  ctx.font = '20px Arial';
  ctx.fillText('Choose what care your plant needs today', 600, 400);
}

function drawSearchResultsImage(ctx: any, query: string, results: string) {
  // Search icon
  ctx.font = '64px Arial';
  ctx.fillText('🔍', 600, 120);

  // Title
  ctx.font = 'bold 36px Arial';
  ctx.fillText('Plant Search Results', 600, 200);

  // Query
  ctx.font = '24px Arial';
  ctx.fillText(`Searching for: "${query}"`, 600, 250);

  // Results
  ctx.font = '28px Arial';
  const resultCount = parseInt(results);
  if (resultCount > 0) {
    ctx.fillText(`Found ${resultCount} plant${resultCount > 1 ? 's' : ''}`, 600, 320);
    ctx.font = '20px Arial';
    ctx.fillText('Click a plant to learn more about its care', 600, 370);
  } else {
    ctx.fillText('No plants found', 600, 320);
    ctx.font = '20px Arial';
    ctx.fillText('Try a different search term', 600, 370);
  }
}

function drawAddPlantImage(ctx: any) {
  // Plant emoji
  ctx.font = '64px Arial';
  ctx.fillText('🌱', 600, 120);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillText('Add a New Plant', 600, 200);

  // Instructions
  ctx.font = '24px Arial';
  ctx.fillText('Enter your plant\'s name and type', 600, 260);
  ctx.fillText('We\'ll set up care reminders for you!', 600, 300);

  // Examples
  ctx.font = '20px Arial';
  ctx.fillText('Examples: "Monstera", "Snake Plant", "Pothos"', 600, 360);
}

function drawPlantsImage(ctx: any, count: string) {
  // Plants emoji
  ctx.font = '64px Arial';
  ctx.fillText('🌿', 600, 120);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillText('Your Garden', 600, 200);

  // Count
  ctx.font = '32px Arial';
  const plantCount = parseInt(count);
  ctx.fillText(`${plantCount} plant${plantCount !== 1 ? 's' : ''} in your collection`, 600, 260);

  // Message
  ctx.font = '24px Arial';
  ctx.fillText('Keep them healthy and happy!', 600, 320);
}

function drawCareImage(ctx: any) {
  // Care emoji
  ctx.font = '64px Arial';
  ctx.fillText('💚', 600, 120);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillText('Plant Care Time', 600, 200);

  // Message
  ctx.font = '28px Arial';
  ctx.fillText('Your plants are ready for some love!', 600, 280);

  // Instruction
  ctx.font = '20px Arial';
  ctx.fillText('Choose a plant to log care for', 600, 340);
}

function drawPlantInfoImage(ctx: any, plantName: string, plantType: string) {
  // Plant emoji
  ctx.font = '64px Arial';
  ctx.fillText('🌿', 600, 120);

  // Title
  ctx.font = 'bold 40px Arial';
  ctx.fillText(plantName, 600, 200);

  // Plant type
  ctx.font = '24px Arial';
  ctx.fillText(`Type: ${plantType.replace('-', ' ')}`, 600, 250);

  // Care info
  ctx.font = '20px Arial';
  const careInfo = [
    '• Water regularly',
    '• Provide adequate light',
    '• Use proper soil',
    '• Monitor for pests'
  ];

  careInfo.forEach((info, index) => {
    ctx.fillText(info, 600, 320 + index * 30);
  });

  // Instruction
  ctx.font = '18px Arial';
  ctx.fillText('Add this plant to start receiving care reminders!', 600, 480);
}
