# Vaxllo

A mobile app for making and receiving calls using Twilio and Supabase.

## Features

- 📱 Make and receive calls
- 📞 View call history
- 🎙️ Record calls
- 🔐 User authentication
- 🌙 Dark mode support
- 📱 Cross-platform (iOS & Android)

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Supabase](https://supabase.com/) - Backend & Authentication
- [Twilio](https://www.twilio.com/) - Voice calls
- [Zustand](https://github.com/pmndrs/zustand) - State management

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [Supabase Account](https://supabase.com/)
- [Twilio Account](https://www.twilio.com/)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaxllo.git
   cd vaxllo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Supabase and Twilio credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_TWILIO_ACCOUNT_SID=your_twilio_account_sid
   EXPO_PUBLIC_TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Follow the instructions in the terminal to run the app on your device or simulator.

## Project Structure

```
app/
├─ +layout.tsx          // Root router layout
├─ (auth)/              // Auth screens
│   ├─ login.tsx
│   ├─ register.tsx
│   └─ reset-password.tsx
├─ (tabs)/              // Main app screens
│   ├─ +layout.tsx      // BottomTab layout
│   ├─ dashboard.tsx    // Latest calls
│   ├─ calls.tsx        // Call history
│   └─ settings.tsx     // User preferences
├─ onboarding/         // Onboarding flow
│   └─ index.tsx
lib/                   // Shared utilities
├─ supabase.ts        // Supabase client
├─ store.ts           // Zustand store
components/           // Reusable components
├─ CallCard.tsx
├─ Tag.tsx
└─ Loading.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
