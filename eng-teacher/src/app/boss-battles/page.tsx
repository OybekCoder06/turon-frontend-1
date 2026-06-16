'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Sword,
  Play,
  Trophy,
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

interface BossBattle {
  id: number;
  name: string;
  type: string;
  description: string;
  difficulty: number;
  icon: string;
  rewards: number;
  requirements?: string;
  completed: boolean;
  bestScore?: number;
}

const bossBattles: BossBattle[] = [
  {
    id: 1,
    name: 'Airport Conversation',
    type: 'AIRPORT_CONVERSATION',
    description: 'Navigate through an airport using English. Book flights, ask for directions, and handle common travel situations.',
    difficulty: 2,
    icon: '✈️',
    rewards: 100,
    completed: false,
  },
  {
    id: 2,
    name: 'Job Interview',
    type: 'JOB_INTERVIEW',
    description: 'Prepare for and complete a professional job interview. Answer questions about your experience and skills.',
    difficulty: 3,
    icon: '💼',
    rewards: 150,
    requirements: 'Complete 5 missions',
    completed: false,
  },
  {
    id: 3,
    name: 'IELTS Speaking Test',
    type: 'IELTS_SPEAKING_TEST',
    description: 'Take a full IELTS speaking exam simulation. Part 1: Interview, Part 2: Cue card, Part 3: Discussion.',
    difficulty: 4,
    icon: '📚',
    rewards: 200,
    requirements: 'Reach Level 5',
    completed: true,
    bestScore: 7.5,
  },
  {
    id: 4,
    name: 'Business Meeting',
    type: 'BUSINESS_MEETING',
    description: 'Lead and participate in a corporate business meeting. Present ideas, negotiate, and handle complex discussions.',
    difficulty: 4,
    icon: '📊',
    rewards: 200,
    requirements: 'Complete Job Interview',
    completed: false,
  },
  {
    id: 5,
    name: 'Debate Challenge',
    type: 'DEBATE',
    description: 'Engage in a structured debate. Present arguments, counterarguments, and defend your position professionally.',
    difficulty: 5,
    icon: '🎤',
    rewards: 250,
    requirements: 'Reach Level 8',
    completed: false,
  },
  {
    id: 6,
    name: 'Restaurant Interaction',
    type: 'RESTAURANT',
    description: 'Order food, make reservations, and handle dining situations. Practice restaurant English in a realistic scenario.',
    difficulty: 1,
    icon: '🍽️',
    rewards: 80,
    completed: false,
  },
];

const getDifficultyColor = (difficulty: number) => {
  if (difficulty <= 2) return 'from-green-500 to-green-600';
  if (difficulty <= 3) return 'from-yellow-500 to-yellow-600';
  if (difficulty <= 4) return 'from-orange-500 to-orange-600';
  return 'from-red-500 to-red-600';
};

const getDifficultyLabel = (difficulty: number) => {
  if (difficulty <= 2) return 'Easy';
  if (difficulty <= 3) return 'Medium';
  if (difficulty <= 4) return 'Hard';
  return 'Extreme';
};

export default function BossBattlesPage() {
  const { data: session, status } = useSession();
  const [selectedBattle, setSelectedBattle] = useState<BossBattle | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  const handleStartBattle = (battle: BossBattle) => {
    setSelectedBattle(battle);
    setIsPlaying(true);
  };

  const handleBackToBattles = () => {
    setIsPlaying(false);
    setSelectedBattle(null);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 md:ml-64 max-w-6xl mx-auto">
        {!isPlaying ? (
          <>
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                <Sword className="w-8 h-8 text-red-400" />
                Boss Battles
              </h1>
              <p className="text-slate-400">Challenge yourself with real-world speaking scenarios</p>
            </motion.div>

            {/* Battles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bossBattles.map((battle, i) => (
                <motion.div
                  key={battle.id}
                  className={`rounded-2xl overflow-hidden cursor-pointer group ${
                    battle.requirements && !battle.completed
                      ? 'opacity-60 pointer-events-none'
                      : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() => !battle.requirements && handleStartBattle(battle)}
                >
                  <div className={`bg-gradient-to-br ${getDifficultyColor(battle.difficulty)} p-6 relative`}>
                    {/* Lock Icon */}
                    {battle.requirements && !battle.completed && (
                      <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/30">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                    )}

                    {/* Completed Badge */}
                    {battle.completed && (
                      <div className="absolute top-3 right-3 p-2 rounded-lg bg-green-500 text-white">
                        <Trophy className="w-5 h-5" />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="text-5xl mb-4">{battle.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">{battle.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{battle.description}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{battle.difficulty} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>+{battle.rewards} XP</span>
                      </div>
                    </div>

                    {/* Best Score */}
                    {battle.completed && battle.bestScore && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-white/80 text-xs">Best Score</p>
                        <p className="text-lg font-bold text-white">{battle.bestScore}/10.0</p>
                      </div>
                    )}

                    {/* Requirements */}
                    {battle.requirements && !battle.completed && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-xs text-white/80">Unlock: {battle.requirements}</p>
                      </div>
                    )}

                    {/* Button */}
                    {!battle.requirements || battle.completed ? (
                      <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        {battle.completed ? 'Retry' : 'Start'}
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { label: 'Completed', value: '1 / 6', icon: Trophy },
                { label: 'Best Overall Score', value: '7.5 / 10.0', icon: Star },
                { label: 'Total XP Earned', value: '200 XP', icon: Sword },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                    <stat.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </>
        ) : selectedBattle ? (
          // Battle Playing View
          <motion.div
            className="rounded-3xl bg-slate-800/50 border border-slate-700/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Battle Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  {selectedBattle.icon} {selectedBattle.name}
                </h2>
                <p className="text-slate-400">Challenge in progress...</p>
              </div>
              <button
                onClick={handleBackToBattles}
                className="px-6 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Exit Battle
              </button>
            </div>

            {/* Battle Content */}
            <div className="space-y-8 min-h-96">
              {/* Scenario Description */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <h3 className="text-lg font-bold text-white mb-3">Scenario</h3>
                <p className="text-slate-300 leading-relaxed">
                  {selectedBattle.description}
                </p>
              </div>

              {/* Dialog Example */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Scene</h3>
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-slate-600 text-white px-4 py-2 rounded-lg max-w-xs">
                      <p className="text-sm font-medium">AI: {selectedBattle.name}</p>
                      <p className="text-sm mt-1">Good morning! Welcome. How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                      <p className="text-sm">Your response here...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Your Response</label>
                <textarea
                  placeholder="Type or speak your response..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                  Submit Response
                </button>
                <button className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg transition">
                  Record Voice
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
