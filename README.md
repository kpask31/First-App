# Talent Exchange App

A mobile-first platform for peer-to-peer skill and service trading through a credit-based economy.

## Project Structure

```
First-App/
├── TalentExchange/          # React Native mobile app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # Screen components
│   │   ├── navigation/      # Navigation configuration
│   │   ├── store/           # Redux store and slices
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Images, fonts, etc.
│   └── package.json
└── backend/                 # Node.js Express API
    ├── src/
    │   ├── controllers/     # Route handlers
    │   ├── models/          # MongoDB schemas
    │   ├── routes/          # API route definitions
    │   ├── middleware/      # Express middleware
    │   ├── services/        # Business logic services
    │   └── config/          # Configuration files
    └── package.json
```

## Features Implemented

### ✅ Completed

1. **React Native Project Setup**
   - Navigation with React Navigation 6
   - Redux Toolkit for state management
   - React Native Paper for UI components
   - TypeScript configuration
   - Project structure with proper separation of concerns

2. **Backend API Foundation**
   - Express.js server with TypeScript
   - MongoDB integration with Mongoose
   - Socket.IO for real-time features
   - Authentication middleware
   - Error handling middleware
   - RESTful API structure

3. **Database Models**
   - User model with authentication and profile data
   - Task model for marketplace listings
   - Proposal model for service offerings
   - Transaction model for credit system
   - Message/Conversation models for chat
   - Review model for rating system
   - Notification model for push notifications

### 🔄 In Progress / Planned

1. **User Authentication System**
   - JWT-based authentication
   - Social login (Google, Facebook, Apple)
   - Email/phone verification
   - Password reset functionality

2. **User Profile Management**
   - Profile creation and editing
   - Skill management
   - Portfolio showcase
   - Verification system

3. **Credit System**
   - Escrow functionality
   - Credit transactions
   - Payment processing integration
   - Dispute resolution

4. **Task Marketplace**
   - Task posting and browsing
   - Advanced search and filtering
   - Task status management
   - File attachments

5. **Proposal System**
   - Proposal submission and management
   - Acceptance/decline workflow
   - Negotiation features

6. **Real-time Messaging**
   - In-app chat system
   - File and voice message support
   - Typing indicators
   - Message encryption

7. **Rating & Review System**
   - Mutual rating system
   - Review management
   - Reputation scoring

8. **Push Notifications**
   - Real-time notifications
   - Notification preferences
   - Badge counts

## Technology Stack

### Frontend (React Native)
- **Framework**: React Native 0.81.4
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit
- **UI Library**: React Native Paper
- **HTTP Client**: Fetch API with custom service layer
- **Real-time**: Socket.IO client
- **Language**: TypeScript

### Backend (Node.js)
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- React Native development environment
- iOS Simulator or Android Emulator

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/talent-exchange
JWT_SECRET=your-secret-key
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to mobile app directory:
```bash
cd TalentExchange
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

4. Start Metro bundler:
```bash
npm start
```

5. Run on iOS:
```bash
npm run ios
```

6. Run on Android:
```bash
npm run android
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `GET /api/users/skills` - Get user skills
- `POST /api/users/skills` - Add skill

### Tasks
- `GET /api/tasks` - List tasks with filters
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PATCH /api/tasks/:id` - Update task

### Messages
- `GET /api/messages/conversations` - Get conversations
- `POST /api/messages/conversations` - Create conversation
- `GET /api/messages/conversations/:id/messages` - Get messages

### Notifications
- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/:id/read` - Mark as read

## Database Schema

### Key Collections
- `users` - User profiles and authentication
- `skills` - Available skills catalog
- `tasks` - Marketplace task listings
- `proposals` - Service provider proposals
- `transactions` - Credit system transactions
- `messages` - Chat messages
- `conversations` - Chat conversations
- `reviews` - User ratings and reviews
- `notifications` - Push notifications

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- MongoDB injection protection

## Development Status

This is the foundational implementation of the Talent Exchange app. The core architecture, navigation, and database models are in place. The next phase will focus on implementing the authentication system and core user features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and confidential.