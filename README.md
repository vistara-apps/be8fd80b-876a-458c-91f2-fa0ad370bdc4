# PlantPal - Your Plant's Personal Wellness Coach

A Base Mini App that delivers personalized, personality-driven plant care reminders via Celo blockchain messaging.

## Features

- 🌱 **Personalized Plant Care**: Customized reminders based on plant types and schedules
- 🎭 **Personality-Driven Messages**: Choose from 5 unique personalities for your reminders
- 📱 **Celo Integration**: Secure messaging through blockchain technology
- 🔗 **Base Mini App**: Built for Farcaster frames with OnchainKit
- 🎨 **Multi-Theme Support**: 5 beautiful themes including custom PlantPal theme

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network with OnchainKit
- **Styling**: Tailwind CSS with CSS variables
- **TypeScript**: Full type safety
- **Messaging**: Celo blockchain integration

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Add your OnchainKit API key:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── AppShell.tsx    # Main app layout
│   ├── PlantCard.tsx   # Plant display component
│   ├── CareButton.tsx  # Care action buttons
│   └── ...
├── theme-preview/      # Theme preview page
├── globals.css         # Global styles with theme variables
├── layout.tsx          # Root layout
├── page.tsx           # Home page
└── providers.tsx      # OnchainKit provider setup

lib/
├── types.ts           # TypeScript type definitions
├── constants.ts       # App constants and data
└── utils.ts          # Utility functions

```

## Personalities

Choose from 5 unique care reminder personalities:

- 🌻 **Cheery Gardener**: Upbeat and encouraging
- 🔬 **Strict Botanist**: Professional and precise
- 😄 **Humorous Friend**: Funny and entertaining
- 🧘‍♂️ **Zen Master**: Calm and mindful
- 👨‍👩‍👧‍👦 **Plant Parent**: Nurturing and protective

## Themes

- **PlantPal (Default)**: Warm social theme with dark teal and coral
- **Celo**: Black background with yellow accents
- **Solana**: Dark purple with magenta accents
- **Base**: Dark blue with Base blue accents
- **Coinbase**: Dark navy with Coinbase blue

## Plant Database

Includes care information for common houseplants:
- Monstera Deliciosa
- Snake Plant
- Golden Pothos
- Fiddle Leaf Fig
- Peace Lily

## Core Features

### 1. Plant Management
- Add plants with custom names and types
- Track watering and fertilizing schedules
- Log care actions with timestamps

### 2. Smart Reminders
- Automated care reminders based on plant needs
- Personality-driven message generation
- Snooze and completion tracking

### 3. Wallet Integration
- Connect Base wallet for secure messaging
- User identity through OnchainKit
- Celo blockchain message delivery

### 4. Responsive Design
- Mobile-first approach
- Glass morphism UI design
- Smooth animations and transitions

## Development

### Adding New Plants
1. Update `PLANT_DATABASE` in `lib/constants.ts`
2. Add care requirements and tips
3. Update plant emoji mapping in `lib/utils.ts`

### Adding New Personalities
1. Add personality config to `PERSONALITIES` in `lib/constants.ts`
2. Update message generation in `lib/utils.ts`
3. Test with different plant types

### Theme Customization
1. Update CSS variables in `app/globals.css`
2. Add theme option to `ThemeProvider`
3. Test all components with new theme

## Deployment

This app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**

3. **Set environment variables** in your deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
