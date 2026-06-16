# TeacherAI - Architecture Documentation

## System Overview

TeacherAI is a modern, full-stack web application built with Next.js 15, designed to provide an interactive English learning experience through AI-powered conversations, voice practice, and gamified learning.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Next.js Frontend (React Components + TypeScript)     │   │
│  │ - Dashboard, Chat, Speaking, Books, Games, etc       │   │
│  │ - Framer Motion Animations                           │   │
│  │ - Tailwind CSS Styling                               │   │
│  │ - Zustand State Management                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
        HTTP/REST Requests      WebSocket (Future)
                │                       │
┌───────────────┴───────────────────────┴──────────────────────┐
│                   API Layer                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Next.js API Routes (Serverless Functions)           │   │
│  │ ├─ /api/auth/* - Authentication                     │   │
│  │ ├─ /api/chat/* - Chat endpoints                     │   │
│  │ ├─ /api/voice/* - Voice processing                  │   │
│  │ ├─ /api/user/* - User management                    │   │
│  │ ├─ /api/game/* - Game endpoints                     │   │
│  │ └─ /api/admin/* - Admin endpoints                   │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
    Database    AI APIs    External Services
        │           │           │
```

## Architecture Layers

### 1. Presentation Layer

**Technologies:**
- React 18 with Next.js 15
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI components

**Key Components:**
```
src/
├── app/                 # Next.js App Router
│   ├── dashboard/      # Main dashboard
│   ├── chat/           # Chat interface
│   ├── speak/          # Voice speaking arena
│   ├── books/          # Books library
│   ├── games/          # Game center
│   ├── leaderboard/    # Leaderboard
│   ├── missions/       # Daily missions
│   └── boss-battles/   # Boss battles
├── components/         # Reusable components
│   ├── common/         # Shared (Header, Sidebar)
│   ├── chat/           # Chat-specific
│   ├── dashboard/      # Dashboard-specific
│   ├── games/          # Game components
│   └── voice/          # Voice components
├── store/              # Zustand stores
│   ├── useAuthStore
│   ├── useChatStore
│   ├── useVoiceStore
│   └── useUIStore
└── hooks/              # Custom React hooks
```

### 2. Business Logic Layer

**API Routes (Next.js Serverless Functions)**

```
src/app/api/
├── auth/
│   ├── register        # User registration
│   ├── login           # Email login
│   └── [..nextauth]    # NextAuth.js routes
├── chat/
│   ├── message         # Chat message handling
│   ├── analyze         # Grammar analysis
│   └── history         # Get conversation history
├── voice/
│   ├── transcribe      # Speech-to-text
│   └── synthesize      # Text-to-speech
├── user/
│   ├── profile         # Get/update user
│   ├── stats           # Get user statistics
│   └── xp-log          # XP earning log
├── game/
│   ├── score           # Save game score
│   └── results         # Get game results
└── admin/
    ├── users           # Manage users
    ├── analytics       # Platform analytics
    └── content         # Manage content
```

### 3. Data Layer

**Database Schema**

```
PostgreSQL
├── Users
│   ├── Profile info
│   ├── Learning stats (XP, level, rank)
│   └── Last activity
├── Conversations
│   ├── Chat history
│   └── Messages with feedback
├── Books
│   ├── Study materials
│   ├── Categories
│   └── Progress tracking
├── Achievements
│   ├── Unlock requirements
│   └── User unlocks
├── Missions
│   ├── Daily/weekly tasks
│   └── Completion status
├── Games
│   ├── Game types
│   └── User scores
├── BossBattles
│   ├── Battle scenarios
│   └── User results
└── Gamification
    ├── XP logs
    ├── Leaderboard
    └── Streaks
```

**ORM: Prisma**
- Type-safe database access
- Auto-generated migrations
- Query optimization

### 4. External Services

```
┌─────────────────────────────────────────────┐
│        Third-Party Services                  │
├─────────────────────────────────────────────┤
│ OpenAI API                                  │
│ ├─ GPT-4 for AI teacher responses          │
│ ├─ Whisper for speech-to-text              │
│ └─ TTS for pronunciation audio             │
│                                             │
│ Google OAuth                                │
│ └─ Social login integration                │
│                                             │
│ Web Audio API                              │
│ └─ Client-side audio processing            │
└─────────────────────────────────────────────┘
```

## Data Flow

### Chat Conversation Flow

```
User Input
    ↓
[Chat Component]
    ↓
POST /api/chat/message
    ↓
[Message Processing]
    ├─ Save user message to DB
    ├─ Call OpenAI API
    ├─ Analyze grammar (AI response)
    └─ Save assistant message
    ↓
Update Chat Store (Zustand)
    ↓
Re-render Chat Component
    ↓
User sees response with feedback
```

### Voice Speaking Flow

```
[Start Recording]
    ↓
[Audio Waveform Visualization]
    ↓
[Stop Recording]
    ↓
POST /api/voice/transcribe
    ↓
[Whisper API]
    ↓
Get Transcript
    ↓
POST /api/chat/analyze (for feedback)
    ↓
[Display Results]
├─ Grammar Score
├─ Pronunciation Score
├─ Fluency Score
└─ Improvement Suggestions
    ↓
Award XP & Update Stats
```

### Gamification Flow

```
User Action (Speaking, Reading, Game)
    ↓
POST /api/user/xp-log
    ↓
Calculate & Award XP
    ↓
Update User Level/Rank
    ↓
Check Achievement Unlock
    ↓
Update Leaderboard Entry
    ↓
Display Notifications & Rewards
```

## Authentication Flow

```
User Registration
    ↓
POST /api/auth/register
    ├─ Validate input
    ├─ Hash password (bcrypt)
    ├─ Create user in DB
    └─ Create leaderboard entry
    ↓
Redirect to Login

User Login
    ↓
POST /api/auth/[...nextauth]
    ├─ Validate credentials
    ├─ Generate JWT token
    └─ Create session
    ↓
Redirect to Dashboard

User Session Management
    ├─ JWT token in cookies
    ├─ 30-day expiration
    └─ Refresh on access
```

## State Management

**Zustand Stores:**

1. **useAuthStore**
   - Current user info
   - Authentication status
   - Error messages

2. **useChatStore**
   - Conversations list
   - Current conversation
   - Messages
   - Loading state

3. **useVoiceStore**
   - Recording status
   - Audio level
   - Transcript
   - Processing status

4. **useUIStore**
   - Theme (light/dark)
   - Sidebar open/closed
   - Toast notifications

## Performance Optimization

### Frontend Optimization
- Code splitting with Next.js dynamic imports
- Image optimization with Next/Image
- CSS-in-JS with Tailwind (JIT compilation)
- Component lazy loading

### Backend Optimization
- Database indexing on frequently queried fields
- Query optimization with Prisma
- API response caching (Cache-Control headers)
- Connection pooling for database

### Caching Strategy
```
Client Cache
├─ Browser cache (static assets)
├─ Service Worker (offline support)
└─ Local Storage (user preferences)

Server Cache
├─ Redis (optional, for sessions)
├─ Database query cache
└─ API response caching
```

## Security Architecture

### Authentication & Authorization
- NextAuth.js for session management
- JWT tokens for stateless auth
- Password hashing with bcrypt
- Google OAuth2 integration

### Data Protection
- HTTPS/TLS encryption
- SQL injection prevention (Prisma)
- XSS protection (React escaping)
- CORS configuration
- Rate limiting on API endpoints

### API Security
```
Request → [Rate Limiter] → [Auth Check] → [Validation] → [Process] → Response
                                ↓
                        Return 401 if unauthorized
```

## Deployment Architecture

### Development Environment
```
Local Machine
├─ Next.js Dev Server (npm run dev)
├─ PostgreSQL (Docker)
└─ Environment Variables (.env.local)
```

### Production Environment

**Option 1: Vercel (Recommended)**
```
GitHub → Vercel Edge Network
    ↓
├─ Automatic deployments
├─ Edge functions for API
├─ Serverless PostgreSQL
└─ Built-in monitoring
```

**Option 2: Docker + Self-Hosted**
```
Docker Registry
    ↓
VPS Server
├─ Docker Container (App)
├─ PostgreSQL Container
└─ Nginx Reverse Proxy
```

## Monitoring & Logging

### Logging Strategy
```
Client Logging
├─ Error tracking (Sentry)
├─ Performance monitoring (Vercel Analytics)
└─ User analytics (Custom events)

Server Logging
├─ API request/response logs
├─ Database query logs
├─ Error logs (stderr)
└─ Application logs (stdout)
```

### Monitoring Tools
- **Uptime Monitoring**: Uptime Robot
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics, New Relic
- **Logging**: CloudWatch, ELK Stack

## API Design

### RESTful Endpoints

**Naming Convention:**
```
GET    /api/resource              # List all
POST   /api/resource              # Create
GET    /api/resource/:id          # Get one
PUT    /api/resource/:id          # Update
DELETE /api/resource/:id          # Delete
```

**Response Format:**
```json
{
  "success": true/false,
  "data": { ... },
  "error": "error message (if any)",
  "message": "success message (if any)"
}
```

### Authentication Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## Database Relationships

```
User
├─ 1:N Conversations
├─ 1:N Messages
├─ 1:N Achievements
├─ 1:N XPLogs
├─ 1:N Missions
├─ 1:N GameScores
├─ 1:N BossBattleResults
└─ 1:1 LeaderboardEntry

Conversation
└─ 1:N Messages

Book
└─ 1:N FavoriteBooks

BossBattle
└─ 1:N BossBattleResults
```

## Technology Rationale

| Component | Technology | Why? |
|-----------|-----------|------|
| Frontend Framework | Next.js 15 | SSR, SSG, API routes, excellent DX |
| Styling | Tailwind CSS | Utility-first, fast development |
| Animations | Framer Motion | Smooth, performant animations |
| State Management | Zustand | Lightweight, easy to use |
| ORM | Prisma | Type-safe, excellent migration support |
| Auth | NextAuth.js | Flexible, supports multiple providers |
| UI Components | Shadcn UI | Accessible, customizable |
| Language | TypeScript | Type safety, better DX |
| AI | OpenAI APIs | Best-in-class language models |

## Future Improvements

1. **WebSocket Integration**
   - Real-time chat updates
   - Multiplayer games
   - Live leaderboard updates

2. **Machine Learning**
   - Personalized learning paths
   - Pronunciation analysis
   - Content recommendations

3. **Mobile Apps**
   - React Native app
   - Offline learning
   - Push notifications

4. **Advanced Features**
   - Video conversations
   - Group study sessions
   - Corporate training packages

## Development Workflow

```
Feature Development
    ↓
├─ Create feature branch
├─ Implement changes
├─ Write tests
├─ Submit PR
├─ Code review
└─ Merge to main
    ↓
Automatic Deployment
    ├─ Build & test
    ├─ Deploy to staging
    └─ Deploy to production
```

## Documentation Standards

- TSDoc comments for functions
- README for each module
- API documentation in comments
- Architecture decisions in ADRs (Architecture Decision Records)

---

**Last Updated:** 2024
**Version:** 1.0
