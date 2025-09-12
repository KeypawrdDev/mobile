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
cd backend && npm install

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
- **Performance**: Redis caching
- **Monitoring**: Error tracking, performance monitoring

## CI/CD Pipeline

### Overview
GitHub Actions pipeline that automatically tests, builds, and deploys both mobile app and backend.

### Main Workflow
```yaml
# Workflow name that appears in GitHub Actions
name: CI/CD Pipeline

# When to trigger this workflow
on: 
  # Trigger on pushes to main or develop branches
  push:
    branches: [main, develop]
  # Trigger on pull requests targeting main branch
  pull_request:
    branches: [main]

# Define the jobs to run
jobs:
  # Frontend continuous integration job
  frontend-ci:
    # Run on Ubuntu Linux virtual machine
    runs-on: ubuntu-latest
    steps:
      # Download the source code from GitHub repository
      - uses: actions/checkout@v4
      # Install Node.js runtime environment
      - uses: actions/setup-node@v4
      # Install project dependencies (faster than npm install)
      - run: npm ci
      # Check TypeScript code for errors without generating files
      - run: npx tsc --noEmit
      # Run frontend test suite
      - run: npm test
      # Build web version of the app for deployment
      - run: npx expo export --platform web

  # Backend continuous integration job
  backend-ci:
    # Run on Ubuntu Linux virtual machine
    runs-on: ubuntu-latest
    steps:
      # Download the source code from GitHub repository
      - uses: actions/checkout@v4
      # Install Node.js runtime environment
      - uses: actions/setup-node@v4
      # Install backend dependencies in backend folder
      - run: cd backend && npm ci
      # Run backend test suite
      - run: cd backend && npm test
      # Build Docker container image for backend
      - run: docker build -t backend ./backend

  # Mobile app build job
  mobile-build:
    # Run on macOS (required for iOS builds)
    runs-on: macos-latest
    # Wait for frontend-ci job to complete successfully first
    needs: [frontend-ci]
    steps:
      # Download the source code from GitHub repository
      - uses: actions/checkout@v4
      # Install Expo CLI globally for building mobile apps
      - run: npm install -g @expo/cli
      # Build iOS app using Expo Application Services
      - run: eas build --platform ios --non-interactive
      # Build Android app using Expo Application Services
      - run: eas build --platform android --non-interactive

  # Backend deployment job
  backend-deploy:
    # Run on Ubuntu Linux virtual machine
    runs-on: ubuntu-latest
    # Wait for backend-ci job to complete successfully first
    needs: [backend-ci]
    # Only run if pushing to main branch (production deployment)
    if: github.ref == 'refs/heads/main'
    steps:
      # Placeholder step for actual deployment commands
      - name: Deploy to Production
        run: echo "Deploy backend to production"
```

**Key Points:**
- **Sequential flow**: frontend-ci → mobile-build, backend-ci → backend-deploy
- **Platform-specific**: macOS for mobile builds, Ubuntu for others
- **Conditional deployment**: Only deploys from main branch
- **Quality gates**: TypeScript check and tests before builds

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

