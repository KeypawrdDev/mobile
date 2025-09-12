# Mobile App with Account Management

A React Native mobile application with tab navigation, featuring a Feed screen and Account management placeholder.

## Quick Start

### Prerequisites
- Node.js (v16+)
- Expo CLI: `npm install -g @expo/cli`

### Installation
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start development servers
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Mobile App  
npx expo start
```

### Running the App
- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web`

## Project Structure

```
mobile/
├── src/api/              # Screen components & API client
├── backend/src/          # Express server & auth
├── assets/               # App icons
└── Configuration files   # Tailwind, Metro, TypeScript
```

## Tech Stack

- **Frontend**: React Native + Expo, NativeWind, TanStack Query, TypeScript
- **Backend**: Node.js + Express, JWT, CORS

## Key Features

- **Tab Navigation** - Feed and Account screens
- **Pagination** - Server-side pagination with Previous/Next buttons
- **Search** - Real-time search functionality
- **Platform Detection** - Automatic API URL configuration

## Development Environment Setup

### Prerequisites
- **Node.js** (v16+)
- **Expo CLI**: `npm install -g @expo/cli`
- **Development Environment**: Xcode (iOS), Android Studio (Android), or Web browser

### Setup Steps
1. **Clone**: `git clone <repo-url> && cd mobile`
2. **Install**: `npm install && cd backend && npm install && cd ..`
3. **Start backend**: `cd backend && npm start` (runs on `http://localhost:3000`)
4. **Start mobile**: `npx expo start`
5. **Run on device**: Scan QR code with Expo Go app

### Environment Variables
Currently none needed. Production will require:
- `JWT_SECRET` - For token signing
- `DATABASE_URL` - Database connection string
- `API_BASE_URL` - Backend API URL

## Technical Decisions

### Architecture
- **Monorepo Structure**: Separate `backend/` and root directories
- **Expo Framework**: Cross-platform mobile development
- **TypeScript**: Type safety throughout

### State Management
- **TanStack Query**: Server state management with caching
- **React Hooks**: Local component state
- **No Global State**: Minimal shared state

### API Design
- **RESTful API**: Express.js with clear endpoints
- **JWT Authentication**: Token-based auth
- **Pagination**: Server-side pagination

## Further Improvements

### Infinite Scroll Pagination
Replace page-based pagination with `useInfiniteQuery` for automatic loading.

### Database Integration
- Replace in-memory array with PostgreSQL/MySQL
- Add full-text search capabilities

### Complete Authentication
- Add user registration/login screens
- Implement secure token storage
- Add password reset functionality

### Additional Features
- **Security**: Environment variables, rate limiting
- **Performance**: Redis caching, code splitting
- **Monitoring**: Error tracking, performance monitoring

## CI/CD Pipeline

### Overview
GitHub Actions pipeline that automatically tests, builds, and deploys both mobile app and backend.

### Main Workflow
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  frontend-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm test
      - run: npx expo export --platform web

  backend-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: cd backend && npm ci
      - run: cd backend && npm test
      - run: docker build -t backend ./backend

  mobile-build:
    runs-on: macos-latest
    needs: [frontend-ci]
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @expo/cli
      - run: eas build --platform ios --non-interactive
      - run: eas build --platform android --non-interactive

  backend-deploy:
    runs-on: ubuntu-latest
    needs: [backend-ci]
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: echo "Deploy backend to production"
```

### Required Secrets
- `EXPO_TOKEN` - Expo authentication
- `SLACK_WEBHOOK` - Deployment notifications
- `API_URL` - Backend API URL

### Pipeline Benefits
- **Automated Testing**: Catches bugs before production
- **Faster Development**: Quick feedback on changes
- **Reliable Deployments**: Consistent deployment process
- **Team Collaboration**: Clear build status visibility

## Development

### Available Scripts
```bash
npm start              # Start Expo dev server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run in web browser
cd backend && npm start  # Start backend server
```

### Troubleshooting
- Clear Metro cache: `npx expo start --clear`
- Ensure simulators are configured
- Check backend is running on `http://localhost:3000`

## API Endpoints

- `GET /api/items` - Get paginated items
- `GET /api/items/search` - Search items with pagination
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration

## Environment Setup

The app automatically detects platform and configures API URLs:
- **Web/iOS**: `http://localhost:3000`
- **Android**: `http://10.0.2.2:3000`

