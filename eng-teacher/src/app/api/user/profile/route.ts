import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils/auth';
import prisma from '@/lib/utils/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        achievements: true,
        leaderboardEntries: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get recent stats
    const stats = {
      xp: user.xp,
      level: user.level,
      rank: user.rank,
      dailyStreak: user.dailyStreak,
      totalSpeakingTime: user.totalSpeakingTime,
      completedTasks: user.completedTasks,
      achievements: user.achievements.length,
    };

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        englishLevel: user.englishLevel,
        learningGoal: user.learningGoal,
        stats,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, avatar, englishLevel, learningGoal } = await request.json();

    const user = await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(englishLevel && { englishLevel }),
        ...(learningGoal && { learningGoal }),
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
