# daily-blog

A simple daily blog mobile/web app built with Expo. This repository contains the source code for a minimal blog app where you can write, edit, and view daily posts. The project uses the Expo managed workflow so it runs on Android, iOS (simulators), and the web.

## Features

- Create, edit, and delete daily blog posts
- Local development with Expo (Android, iOS simulator, web)
- Simple, minimal UI focused on writing and reading

## Tech stack

- Expo (managed workflow)
- React Native
- React Navigation (for app routing)
- Recommended: any backend or persistence layer (e.g., Firebase, REST API, or local storage)

## Prerequisites

- Node.js (16+ recommended)
- npm or Yarn
- Expo CLI (optional but useful): `npm install -g expo-cli`
- Android Studio / Xcode for emulators (optional)

## Install

1. Clone the repository:

```bash
git clone https://github.com/Joshk21758/daily-blog.git
cd daily-blog
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Run locally

Start the Expo development server:

```bash
npm start
# or
yarn start
```

From the Expo dev tools you can:
- Open on Android (emulator or connected device)
- Open on iOS simulator (macOS + Xcode)
- Open in the web browser

Common commands you may also use:

```bash
# Run on Android device/emulator
expo run:android

# Run on iOS simulator (macOS only)
expo run:ios

# Start web preview
expo start --web
```

If you use a custom backend or environment variables, create a `.env` file in the project root (this repository does not include secrets). Example:

```.env
REACT_APP_API_URL=https://api.example.com
```

Make sure to add `.env` to `.gitignore` if it isn't already.

## Project structure (typical)

- `app/` — main app source (file-based routing if using Expo Router)
- `assets/` — images, fonts, and static files
- `package.json` — scripts and dependencies
- `README.md` — this file
