import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.bossBattleResult.deleteMany();
  await prisma.gameScore.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.xpLog.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.favoriteBook.deleteMany();
  await prisma.book.deleteMany();
  await prisma.bossBattle.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const hashedPassword = await hash('password123', 12);

  const user1 = await prisma.user.create({
    data: {
      email: 'student@teacherai.com',
      name: 'John Learner',
      password: hashedPassword,
      englishLevel: 'INTERMEDIATE',
      learningGoal: 'SPEAKING',
      xp: 2500,
      level: 5,
      rank: 'STUDENT',
      dailyStreak: 7,
      totalSpeakingTime: 3600,
      completedTasks: 15,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@teacherai.com',
      name: 'Admin User',
      password: hashedPassword,
      englishLevel: 'FLUENT',
      learningGoal: 'BUSINESS_ENGLISH',
      xp: 10000,
      level: 15,
      rank: 'LEADER',
      dailyStreak: 100,
      totalSpeakingTime: 36000,
      completedTasks: 150,
    },
  });

  // Create leaderboard entries
  await prisma.leaderboardEntry.create({
    data: {
      userId: user1.id,
      weeklyXp: 850,
      weeklyStreak: 7,
      weeklySpeakingTime: 3600,
      rank: 27,
    },
  });

  await prisma.leaderboardEntry.create({
    data: {
      userId: user2.id,
      weeklyXp: 2450,
      weeklyStreak: 45,
      weeklySpeakingTime: 12300,
      rank: 1,
    },
  });

  // Create books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: 'Essential Grammar Guide',
        author: 'John Smith',
        category: 'GRAMMAR',
        description: 'Master English grammar with comprehensive examples and exercises.',
        totalPages: 250,
        chapters: 20,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Vocabulary Builder',
        author: 'Sarah Johnson',
        category: 'VOCABULARY',
        description: 'Learn 5000+ English words with usage examples.',
        totalPages: 180,
        chapters: 15,
      },
    }),
    prisma.book.create({
      data: {
        title: 'IELTS Speaking Masterclass',
        author: 'Michael Brown',
        category: 'IELTS',
        description: 'Complete guide to ace the IELTS speaking test.',
        totalPages: 300,
        chapters: 25,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Business English Essentials',
        author: 'Emily Davis',
        category: 'BUSINESS_ENGLISH',
        description: 'English for professional communication and corporate settings.',
        totalPages: 220,
        chapters: 18,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Pronunciation Techniques',
        author: 'Robert Wilson',
        category: 'PRONUNCIATION',
        description: 'Improve your pronunciation with proven techniques.',
        totalPages: 160,
        chapters: 12,
      },
    }),
  ]);

  // Create favorite books for user1
  await prisma.favoriteBook.create({
    data: {
      userId: user1.id,
      bookId: books[0].id,
      currentPage: 100,
      progress: 40,
    },
  });

  // Create conversation
  const conversation = await prisma.conversation.create({
    data: {
      userId: user1.id,
      title: 'Daily English Practice',
      topic: 'General Conversation',
      teacherMode: 'FRIENDLY',
    },
  });

  // Create messages
  await Promise.all([
    prisma.message.create({
      data: {
        conversationId: conversation.id,
        userId: user1.id,
        role: 'user',
        content: 'Hello! How are you today?',
      },
    }),
    prisma.message.create({
      data: {
        conversationId: conversation.id,
        userId: user1.id,
        role: 'assistant',
        content: 'Hello! I\'m doing great, thank you for asking. How can I help you with your English today?',
      },
    }),
  ]);

  // Create achievements
  await Promise.all([
    prisma.achievement.create({
      data: {
        userId: user1.id,
        name: 'First Step',
        description: 'Complete your first conversation',
        icon: '🎯',
        badgeColor: '#3B82F6',
      },
    }),
    prisma.achievement.create({
      data: {
        userId: user1.id,
        name: '7-Day Streak',
        description: 'Learn English for 7 consecutive days',
        icon: '🔥',
        badgeColor: '#F59E0B',
      },
    }),
  ]);

  // Create XP logs
  await Promise.all([
    prisma.xpLog.create({
      data: {
        userId: user1.id,
        amount: 50,
        reason: 'speaking',
        description: 'Spoke for 10 minutes in Speaking Arena',
      },
    }),
    prisma.xpLog.create({
      data: {
        userId: user1.id,
        amount: 30,
        reason: 'mission_complete',
        description: 'Completed daily mission',
      },
    }),
  ]);

  // Create missions
  await Promise.all([
    prisma.mission.create({
      data: {
        userId: user1.id,
        title: 'Speak for 5 Minutes',
        description: 'Use the Speaking Arena to practice for at least 5 minutes',
        type: 'speak',
        targetValue: 300,
        currentValue: 180,
        status: 'IN_PROGRESS',
        reward: 30,
      },
    }),
    prisma.mission.create({
      data: {
        userId: user1.id,
        title: 'Learn 10 New Words',
        description: 'Complete a vocabulary lesson and learn 10 new words',
        type: 'learn_words',
        targetValue: 10,
        currentValue: 10,
        status: 'COMPLETED',
        reward: 25,
        completedAt: new Date(),
      },
    }),
  ]);

  // Create game scores
  await Promise.all([
    prisma.gameScore.create({
      data: {
        userId: user1.id,
        gameType: 'last_letter_challenge',
        score: 850,
        totalQuestions: 10,
        correctAnswers: 9,
      },
    }),
    prisma.gameScore.create({
      data: {
        userId: user1.id,
        gameType: 'vocabulary_rush',
        score: 720,
        totalQuestions: 15,
        correctAnswers: 12,
      },
    }),
  ]);

  // Create boss battles
  const bossBattle = await prisma.bossBattle.create({
    data: {
      name: 'IELTS Speaking Test',
      type: 'IELTS_SPEAKING_TEST',
      description: 'Complete IELTS speaking exam simulation',
      difficulty: 5,
    },
  });

  await prisma.bossBattleResult.create({
    data: {
      userId: user1.id,
      bossBattleId: bossBattle.id,
      status: 'PASSED',
      grammarScore: 85,
      vocabularyScore: 78,
      fluencyScore: 82,
      pronunciationScore: 80,
      totalScore: 81,
      feedback: 'Great performance! Your grammar and fluency are strong. Keep practicing pronunciation.',
      completedAt: new Date(),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`
📊 Created:
  - 2 users
  - 5 books
  - 1 conversation with 2 messages
  - 2 achievements
  - 2 XP logs
  - 2 missions
  - 2 game scores
  - 1 boss battle result

🔑 Test Credentials:
  Email: student@teacherai.com
  Password: password123
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
