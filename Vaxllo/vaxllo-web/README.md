# Vaxllo Web - AI Call Management App

A web version of the Vaxllo mobile app for AI-powered call management. This is a portfolio showcase version with all data mocked.

## Features

- 📱 AI-driven call management interface
- 📞 View call history with transcripts
- 🎙️ AI conversation transcripts
- 🔐 Mocked user authentication
- 📊 Dashboard with statistics and metrics
- ⚙️ Settings for AI assistant configuration
- 🇸🇪 Swedish language interface

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **React Icons** - Icon library
- **CSS Modules** - Styling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CallCard.tsx
│   ├── Loading.tsx
│   ├── Tag.tsx
│   ├── TabLayout.tsx
│   └── ui/              # Button, Input, Layout, Typography
├── pages/               # Main pages/routes
│   ├── Dashboard.tsx
│   ├── Calls.tsx
│   ├── Settings.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Onboarding.tsx
├── lib/
│   ├── mockData.ts      # All mocked data
│   └── store.ts         # Zustand store
├── styles/
│   ├── index.ts         # Design system
│   └── globals.css      # Global CSS
└── types/
    └── index.ts         # TypeScript interfaces
```

## Mock Data

All functionality is mocked for portfolio demonstration:

- **Authentication**: Any email/password combination will work
- **Calls**: Pre-populated with 10 Swedish phone calls
- **Statistics**: Mocked dashboard metrics
- **Settings**: All settings are stored locally

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

This is a portfolio showcase version. All data is mocked and no real API calls are made. The app demonstrates the UI/UX and functionality of the Vaxllo call management system.
