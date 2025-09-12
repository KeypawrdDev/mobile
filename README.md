# Mobile App with Account Management

A React Native mobile application with tab navigation, featuring a Feed screen and Account management placeholder.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
cd backend
npm install
npm start
```

3. Start the React Native app:
```bash
npx expo start
```

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js
- **Expo CLI**: Install globally with `npm install -g @expo/cli`
- **Development Environment**:
  - **iOS**: Xcode (macOS only) and iOS Simulator
  - **Android**: Android Studio and Android Emulator
  - **Web**: Any modern web browser

### Environment Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mobile
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Start the development servers**:
   
   **Terminal 1 - Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

   **Terminal 2 - Mobile App**:
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**:
   - **iOS Simulator**: Press `i` in the Expo terminal or run `npm run ios`
   - **Android Emulator**: Press `a` in the Expo terminal or run `npm run android`
   - **Web Browser**: Press `w` in the Expo terminal or run `npm run web`

## Project Structure

```
mobile/
├── 📱 Frontend (React Native/Expo)
│   ├── App.tsx                    # Main app entry point
│   ├── src/
│   │   └── api/                   # Screen components & API client
│   │       ├── account_screen.tsx # Account screen component
│   │       ├── client.ts          # API client with platform detection
│   │       └── feed_screen.tsx    # Feed screen with pagination
│   ├── assets/                    # App icons and images
│   │   ├── icon.png
│   │   ├── splash-icon.png
│   │   └── adaptive-icon.png
│   └── Configuration files:
│       ├── package.json           # Frontend dependencies
│       ├── tailwind.config.js     # NativeWind/Tailwind config
│       ├── metro.config.js        # Metro bundler config
│       ├── babel.config.js        # Babel transpiler config
│       └── tsconfig.json          # TypeScript config
│
├── 🖥️ Backend (Node.js/Express)
│   ├── src/
│   │   ├── server.ts              # Express server with API routes
│   │   └── auth.ts                # JWT authentication logic
│   ├── package.json               # Backend dependencies
│   └── tsconfig.json              # TypeScript config
│
└── 📄 Root files
    ├── README.md
    ├── global.css                 # Global styles for NativeWind
    └── nativewind-env.d.ts        # TypeScript declarations
```

## Key Structural Decisions:

**1. Monorepo Structure**: Separate `backend/` and root directories
- Clear separation between mobile app and API server
- Each has its own `package.json` and dependencies

**2. Screen Organization**: All screens in `src/api/` folder
- `feed_screen.tsx` - Main data display with pagination
- `account_screen.tsx` - User account placeholder
- `client.ts` - Centralized API communication

**3. Backend Separation**: Dedicated `backend/src/` folder
- `server.ts` - All API endpoints and middleware
- `auth.ts` - Authentication logic and JWT handling

**4. Configuration at Root**: Shared config files
- `tailwind.config.js` - Styling configuration
- `metro.config.js` - NativeWind integration
- `tsconfig.json` - TypeScript settings

This structure keeps the mobile app and backend clearly separated while maintaining shared configuration files at the root level.

### Available Scripts
- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `cd backend && npm start` - Start the backend server
- `cd backend && npm run dev` - Start backend in development mode

### Troubleshooting
- If you encounter Metro bundler issues, try clearing the cache: `npx expo start --clear`
- For Android issues, ensure Android Studio and emulator are properly configured
- For iOS issues, ensure Xcode and iOS Simulator are installed and updated

## Technical Decisions

### Architecture & Project Structure
- **Monorepo Structure**: Separate `backend/` and root directories for clear separation of concerns between mobile app and API server
- **Expo Framework**: Chosen for rapid development, cross-platform compatibility, and simplified deployment
- **TypeScript**: Used throughout both frontend and backend for type safety and better developer experience

### State Management
- **TanStack Query (React Query)**: Selected for server state management, providing built-in caching, background updates, and optimistic updates
- **React Hooks**: Local component state managed with `useState` for simple UI state
- **No Global State**: Avoided Redux/Zustand complexity since the app currently has minimal shared state

### Styling & UI
- **NativeWind**: Tailwind CSS for React Native, enabling utility-first styling with familiar CSS classes
- **Platform-Specific Styling**: Leverages React Native's platform detection for responsive design
- **Component-Based Architecture**: Reusable components like `PaginationControls` for consistent UI patterns

### API & Backend Design
- **RESTful API**: Express.js backend with clear endpoint structure (`/api/items`, `/api/items/search`)
- **JWT Authentication**: Simple token-based auth with `jsonwebtoken` for stateless authentication
- **CORS Enabled**: Cross-origin requests allowed for web development
- **Pagination Support**: Built-in pagination for scalable data handling

### Data Fetching & Caching
- **Axios HTTP Client**: Configured with platform-specific base URLs (localhost for iOS/web, 10.0.2.2 for Android)
- **Query Key Strategy**: Structured query keys `['items', q, page, limit]` for precise cache invalidation
- **Error Handling**: Comprehensive error boundaries and user feedback for failed requests

### Development Experience
- **Hot Reloading**: Expo's fast refresh for instant development feedback
- **TypeScript Configuration**: Strict typing with shared interfaces between frontend and backend
- **Metro Bundler**: Configured with NativeWind integration for seamless CSS processing
- **Environment Detection**: Automatic API URL configuration based on platform (iOS/Android/Web)

### Security Considerations
- **JWT Secret**: Currently hardcoded (should be moved to environment variables in production)
- **Input Validation**: Basic validation on search queries and pagination parameters
- **CORS Configuration**: Properly configured for development environment

### Performance Optimizations
- **FlatList**: Used for efficient rendering of large item lists
- **Query Caching**: TanStack Query's intelligent caching reduces unnecessary API calls
- **Pagination**: Server-side pagination prevents loading large datasets at once
- **Timeout Configuration**: 10-second API timeout prevents hanging requests
