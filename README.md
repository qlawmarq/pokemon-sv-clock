# Pokémon Scarlet/Violet (SV) in-game time clock app

**Just a clock app for Pokémon Scarlet/Violet (SV) user.**

In-game time for Pokémon Scarlett/Violet repeats every 72 minutes: day, dusk, night.  
That In-game time clock will start running once player have completed the tutorial.

This in-game time cannot be accurately known even in-game, but this app can help you to know approximate in-game time.

https://pokemon-sv-clock.vercel.app/

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

