# Mobile App with Account Management

A React Native mobile application with tab navigation, featuring a Feed screen and Account management placeholder.

## Features

- **Feed Screen**: Displays paginated items with search functionality
- **Account Screen**: Placeholder for user account management
- **Tab Navigation**: Bottom tab navigation between screens
- **NativeWind Styling**: Modern UI with Tailwind CSS classes
- **React Query**: Data fetching and caching

## Project Structure

```
mobile/
├── App.tsx                 # Main app with tab navigation
├── src/api/
│   ├── feed_screen.tsx     # Feed screen with search and pagination
│   ├── account_screen.tsx  # Account management placeholder
│   └── client.ts          # API client for data fetching
├── backend/               # Express.js backend server
└── assets/               # App icons and images
```

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

## Account Management & Authentication Implementation Guide

### Current State
The Account screen is currently a **placeholder** with basic UI components. No authentication system is implemented - this is intentional for development purposes.

### How to Implement User Accounts & Authentication

#### 1. Authentication Architecture Overview

**Recommended Flow:**
```
User Login → JWT Token → Secure Storage → Protected API Calls
```

#### 2. Key Implementation Steps

**Step 1: Set up Authentication Context**
```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
```

**Step 2: Implement Secure Token Storage**
- Use `@react-native-async-storage/async-storage` for token persistence
- Consider `react-native-keychain` for enhanced security
- Implement automatic token refresh

**Step 3: Create Protected Routes**
```typescript
// src/components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingScreen />;
  if (!user) return <LoginScreen />;
  
  return children;
};
```

#### 3. User Account Management Features

**Core Features to Implement:**
- User registration and login
- Profile editing and management
- Password change functionality
- Account deletion (GDPR compliance)
- Data export capabilities

**User Data Structure:**
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 4. Data Persistence Strategy

**Local Storage Approach:**
- Store user preferences and settings locally
- Cache user data for offline access
- Implement data synchronization when online

**Backend Integration:**
- Create user authentication endpoints
- Implement profile management APIs
- Set up secure data synchronization

**Database Schema (PostgreSQL Example):**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User sessions for JWT management
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. Security Implementation

**Authentication Security:**
- Use bcrypt for password hashing
- Implement JWT with short expiration times
- Use refresh tokens for session management
- Add rate limiting on authentication endpoints

**Data Protection:**
- Encrypt sensitive user data
- Implement proper CORS policies
- Use HTTPS for all API communications
- Regular security audits

#### 6. Recommended Libraries

**Authentication & Storage:**
- `@react-native-async-storage/async-storage` - Token storage
- `react-native-keychain` - Secure credential storage
- `jwt-decode` - JWT token handling

**Forms & Validation:**
- `react-hook-form` - Form management
- `yup` or `zod` - Schema validation

**State Management:**
- `@tanstack/react-query` - Server state (already implemented)
- `zustand` - Lightweight client state management

#### 7. Implementation Phases

**Phase 1: Basic Authentication**
- Set up authentication context
- Implement login/logout functionality
- Add protected routes

**Phase 2: User Management**
- User profile editing
- Password management
- Account settings

**Phase 3: Advanced Features**
- Data export/import
- Account deletion
- Advanced privacy controls

**Phase 4: Security & Compliance**
- Security audit
- Privacy compliance (GDPR)
- Performance optimization

### Development Notes

- The Account screen is intentionally kept as a placeholder
- Use NativeWind for consistent styling (already configured)
- React Query handles server state management
- Backend runs on Express.js with TypeScript
- Focus on security and user privacy from the start

### Next Steps for Developers

1. **Start with Authentication Context** - Set up the basic auth state management
2. **Implement Login/Logout** - Create the core authentication flow
3. **Add Protected Routes** - Secure the app's navigation
4. **Build User Profile** - Replace the placeholder with real functionality
5. **Add Security Features** - Implement proper token management and validation

This approach allows developers to understand the complete authentication implementation strategy while keeping the current app functional with placeholder components.
```

This README focuses on providing clear guidance for developers on how to implement authentication and user management, while emphasizing that the current Account screen is intentionally a placeholder. It gives practical steps, code examples, and implementation phases without requiring immediate implementation.



