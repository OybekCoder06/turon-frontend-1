import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/utils/auth';
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { conversationId, content, teacherMode } = await request.json();

    if (!content || !conversationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify conversation belongs to user
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== user.id) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        userId: user.id,
        role: 'user',
        content,
      },
    });

    // TODO: Call OpenAI API for response
    // For now, simulate a response
    const aiResponse = generateMockResponse(content);

    // Save assistant message
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId,
        userId: user.id,
        role: 'assistant',
        content: aiResponse.reply,
        grammarMistakes: JSON.stringify(aiResponse.grammarMistakes),
        suggestions: JSON.stringify(aiResponse.suggestions),
      },
    });

    // Award XP for conversation
    await prisma.xpLog.create({
      data: {
        userId: user.id,
        amount: 10,
        reason: 'speaking',
        description: 'Participated in chat conversation',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        userMessage,
        assistantMessage,
        grammarFeedback: aiResponse.grammarMistakes,
        suggestions: aiResponse.suggestions,
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// Mock response generator (replace with actual OpenAI API call)
function generateMockResponse(userMessage: string) {
  return {
    reply: `That's a great sentence! I like how you expressed that. Keep practicing!`,
    grammarMistakes: [
      {
        type: 'tense',
        text: 'user message fragment',
        correction: 'corrected form',
        severity: 'minor',
      },
    ],
    suggestions: [
      {
        original: 'user phrase',
        suggested: 'better phrase',
        reason: 'more natural expression',
      },
    ],
  };
}
