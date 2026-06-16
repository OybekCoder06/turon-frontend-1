# TeacherAI - AI-Powered English Learning Platform

A production-ready web application for learning English through conversations with an intelligent virtual teacher. Built with Next.js 15, TypeScript, PostgreSQL, and OpenAI APIs.

## 🌟 Features

### Core Features
- **AI Teacher Chat**: Real-time conversations with grammar corrections and feedback
- **Voice Speaking Arena**: Practice pronunciation with audio waveform visualization
- **Teacher Books Library**: Curated study materials with progress tracking
- **Vocabulary Games**: Engaging games like "Last Letter Challenge"
- **Daily Missions**: XP rewards system with achievement tracking
- **Boss Battles**: AI-powered speaking exams (IELTS, job interviews, etc.)
- **Gamification**: XP system, ranks, achievements, daily streaks
- **Leaderboard**: Compete with other learners globally
- **Admin Panel**: Manage users, content, and analytics

### Gamification System
- **XP Points**: 5 XP for 1 min speaking, 10 XP for reading, 20 XP for game wins, 30 XP for mission completion
- **Rank System**: 8 ranks from Guest to Leader
- **Daily Streaks**: Track consecutive learning days with 🔥 indicators
- **Achievements**: Unlock badges for milestones and accomplishments

## 🛠 Technical Stack

### Frontend
- **Next.js 15** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Shadcn UI** - Accessible components
- **NextAuth.js** - Authentication

### Backend
- **Next.js API Routes** - Serverless functions
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database abstraction layer
- **Node.js** - Runtime

### AI & Voice
- **OpenAI GPT-4** - AI teacher responses
- **OpenAI Whisper** - Speech-to-text
- **OpenAI TTS** - Text-to-speech
- **Web Audio API** - Audio waveform visualization

### Deployment
- **Docker** - Containerization
- **Vercel** - Hosting & deployment
- **PostgreSQL** - Cloud database

## 📁 Project Structure

```
eng-teacher/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── chat/          # Chat endpoints
│   │   │   ├── voice/         # Voice processing
│   │   │   ├── user/          # User management
│   │   │   └── admin/         # Admin endpoints
│   │   ├── auth/              # Auth pages (login, register)
│   │   ├── dashboard/         # Main dashboard
│   │   ├── chat/              # Chat page
│   │   ├── speak/             # Voice speaking arena
│   │   ├── books/             # Books library
│   │   ├── games/             # Game center
│   │   ├── missions/          # Daily missions
│   │   ├── boss-battles/      # Boss battles
│   │   ├── leaderboard/       # Leaderboard
│   │   ├── admin/             # Admin panel
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── auth/              # Auth components
│   │   ├── chat/              # Chat components
│   │   ├── common/            # Shared components (Header, Sidebar)
│   │   ├── dashboard/         # Dashboard components
│   │   ├── games/             # Game components
│   │   └── voice/             # Voice components
│   ├── lib/
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── store/                 # Zustand stores
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── public/                    # Static assets
├── .env.example               # Environment variables example
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
├── postcss.config.js          # PostCSS config
└── package.json               # Dependencies

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- OpenAI API key
- Google OAuth credentials (optional)

### 1. Clone & Install

```bash
cd eng-teacher
npm install
# or
yarn install
```

### 2. Environment Setup

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/teacherai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Application
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Seed database with test data
npx prisma db seed
```

### 4. Development

```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000

## 📦 Production Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy (automatic on push)

```bash
vercel deploy
```

### Option 2: Docker

1. Build image:
```bash
docker build -t teacherai .
```

2. Run container:
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e OPENAI_API_KEY="..." \
  teacherai
```

### Option 3: Traditional VPS

1. SSH into server
2. Clone repository
3. Install dependencies
4. Setup environment variables
5. Run migrations
6. Start with PM2:

```bash
npm install -g pm2
pm2 start "npm run start" --name "teacherai"
pm2 save
pm2 startup
```

## 🗄 Database Schema

### Key Models

#### User
- Profile information (name, email, avatar)
- Learning stats (XP, level, rank)
- Achievements and progress tracking

#### Conversation & Message
- Chat history with AI teacher
- Grammar analysis and feedback
- Audio transcriptions

#### Book
- Study materials with categories
- PDF viewing capability
- Progress tracking

#### Mission
- Daily and weekly challenges
- XP rewards
- Status tracking

#### Achievement
- Unlock badges and rewards
- Progress indicators
- User accomplishments

#### Gamification
- XPLog: Track XP earning
- GameScore: Game results
- LeaderboardEntry: Weekly rankings
- BossBattleResult: Exam scores

## 🔐 Authentication

### Login Methods
1. **Email/Password**: Traditional registration
2. **Google OAuth**: One-click sign-in

### Session Management
- JWT-based sessions
- 30-day expiration
- Secure HTTP-only cookies

## 🤖 AI Integration

### Chat with Teacher

```typescript
// Example API call
POST /api/chat/message
{
  "conversationId": "...",
  "message": "I go to school yesterday",
  "teacherMode": "friendly"
}

// Response
{
  "reply": "Good try! The correct form is 'went' not 'go'...",
  "grammarFeedback": [{...}],
  "suggestions": [{...}]
}
```

### Speech Processing

```typescript
// Speech-to-Text
POST /api/voice/transcribe
FormData: { audio: Blob }

// Text-to-Speech
POST /api/voice/synthesize
{ "text": "Hello, how are you?" }
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Email login
- `POST /api/auth/[...nextauth]` - NextAuth routes

### Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/conversations` - Get chat history
- `POST /api/chat/analyze-grammar` - Analyze grammar

### Voice
- `POST /api/voice/transcribe` - Speech-to-text
- `POST /api/voice/synthesize` - Text-to-speech

### User
- `GET /api/user/profile` - Get user data
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get learning stats
- `POST /api/user/xp-log` - Log XP earning

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/analytics` - Platform analytics
- `POST /api/admin/books` - Manage books
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: #2563EB (Blue)
- **Secondary**: #0F172A (Dark Blue)
- **Accent**: #22C55E (Green)
- **Background**: Gradient dark theme

### Design System
- Responsive mobile-first design
- Dark mode by default
- Smooth animations with Framer Motion
- Glass-morphism effects
- Accessible WCAG 2.1 compliant

## 📈 Monitoring & Analytics

### Key Metrics to Track
- User engagement (daily active users)
- Average session duration
- Feature usage statistics
- Learning progress metrics
- XP distribution analysis

### Logging
- Server-side logs in CloudWatch
- Client-side error tracking
- API performance metrics

## 🔧 Maintenance

### Database Backups
```bash
# Weekly backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Monitoring Commands
```bash
# Check database status
npx prisma studio

# View logs
vercel logs teacherai

# Database optimization
npx prisma db execute --stdin < optimize.sql
```

## 📝 Development Guidelines

### Code Standards
- Use TypeScript strictly
- Follow ESLint rules
- Write meaningful comments
- Keep components under 300 lines
- Use descriptive variable names

### Commit Messages
```
feat: Add feature description
fix: Fix bug description
docs: Documentation changes
refactor: Code refactoring
test: Add tests
```

### Testing
```bash
npm run test
npm run test:watch
npm run test:coverage
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check connection string
# Verify PostgreSQL is running
# Test connection: psql $DATABASE_URL
```

### OpenAI API Issues
- Verify API key is valid
- Check rate limits
- Ensure account has credits

### Authentication Problems
- Clear cookies and session
- Verify NEXTAUTH_SECRET is set
- Check OAuth credentials

## 📄 License

MIT License - See LICENSE file

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues and questions:
- GitHub Issues: [Create issue](https://github.com/yourrepo/issues)
- Email: support@teacherai.com
- Documentation: https://docs.teacherai.com

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core authentication
- ✅ AI chat interface
- ✅ Voice speaking arena
- ✅ Basic gamification

### Phase 2 (Next)
- Group learning sessions
- Mobile app (React Native)
- Video conversation
- Advanced analytics

### Phase 3 (Future)
- AI-powered lesson planning
- Peer-to-peer teaching
- Corporate training packages
- Certification programs

## 🙏 Acknowledgments

- OpenAI for GPT-4, Whisper, and TTS APIs
- Vercel for hosting platform
- Prisma for ORM excellence
- Tailwind CSS for styling
- Framer Motion for animations

---

**Built with ❤️ for English learners worldwide**
