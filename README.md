# Pokémon Scarlet/Violet (SV) in-game time clock app

**Just a clock app for Pokémon Scarlet/Violet (SV) user.**

**It is also an experimental project where the code for all three platforms (Web, Android, and iOS) is composed entirely in React Native.**

In-game time for Pokémon Scarlett/Violet repeats every 72 minutes: day, dusk, night.  
That In-game time clock will start running once player have completed the tutorial.

This in-game time cannot be accurately known even in-game, but this app can help you to know approximate in-game time.

You can access web version here: https://pokemon-sv-clock.vercel.app/

If you wish to access the iOS/Android version, sorry, access is currently closed.

But if you really want access the iOS/Android version, let me know your email and I'll send you an invitation.


## Development

At first, need to install Node.js >= 16.

```bash
npm i
npm run start
```

You can check your app in a web browser or in the simulator of iOS/Android OS.

Please check here for deatils:

- https://reactnative.dev/docs/environment-setup
- https://docs.expo.dev/get-started/installation/

## Building Native App

You can build the app by just entering commands.

```bash
npm run build:android
npm run build:ios
```

Please check following for more details:

- https://docs.expo.dev/build/introduction/

### Android

```bash
npm run login
npm run build:android
npm run submit:android
```

### iOS

```bash
npm run login
npm run build:ios
npm run submit:ios
```

## Building Web App

```bash
npm run build:web
```

Please check following for more details:

- https://docs.expo.dev/distribution/publishing-websites/

