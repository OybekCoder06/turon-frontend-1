'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Users,
  Trophy,
  Flame,
  Clock,
  Medal,
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  speakingTime: number;
  level: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'Alex Chen', avatar: '👨‍💻', xp: 5230, streak: 45, speakingTime: 12300, level: 12 },
  { rank: 2, name: 'Maria Garcia', avatar: '👩‍💼', xp: 4890, streak: 38, speakingTime: 11200, level: 11 },
  { rank: 3, name: 'James Wilson', avatar: '👨‍🎓', xp: 4650, streak: 32, speakingTime: 10500, level: 10 },
  { rank: 4, name: 'Emma Brown', avatar: '👩‍🎨', xp: 4320, streak: 28, speakingTime: 9800, level: 10 },
  { rank: 5, name: 'David Lee', avatar: '👨‍🏫', xp: 4120, streak: 25, speakingTime: 9200, level: 9 },
  { rank: 6, name: 'Sophie Martin', avatar: '👩‍💻', xp: 3980, streak: 22, speakingTime: 8900, level: 9 },
  { rank: 7, name: 'Michael Zhang', avatar: '👨‍💼', xp: 3750, streak: 20, speakingTime: 8400, level: 8 },
  { rank: 8, name: 'Lisa Anderson', avatar: '👩‍🎓', xp: 3600, streak: 18, speakingTime: 8100, level: 8 },
  { rank: 9, name: 'Carlos Rodriguez', avatar: '👨‍🎨', xp: 3450, streak: 15, speakingTime: 7700, level: 7 },
  { rank: 10, name: 'Nina Patel', avatar: '👩‍💼', xp: 3280, streak: 12, speakingTime: 7300, level: 7 },
];

type LeaderboardType = 'xp' | 'streak' | 'speaking-time';

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('xp');

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    if (leaderboardType === 'xp') return b.xp - a.xp;
    if (leaderboardType === 'streak') return b.streak - a.streak;
    if (leaderboardType === 'speaking-time') return b.speakingTime - a.speakingTime;
    return 0;
  });

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 md:ml-64 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Weekly Leaderboard
          </h1>
          <p className="text-slate-400">See how you compare with other learners</p>
        </motion.div>

        {/* Leaderboard Type Selector */}
        <motion.div
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { type: 'xp' as LeaderboardType, icon: Trophy, label: 'Top XP' },
            { type: 'streak' as LeaderboardType, icon: Flame, label: 'Top Streak' },
            { type: 'speaking-time' as LeaderboardType, icon: Clock, label: 'Most Speaking Time' },
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => setLeaderboardType(item.type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                leaderboardType === item.type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-700/50 bg-slate-900/50">
            <div className="col-span-1 text-slate-400 text-sm font-semibold">Rank</div>
            <div className="col-span-5 text-slate-400 text-sm font-semibold">User</div>
            <div className="col-span-2 text-slate-400 text-sm font-semibold">Level</div>
            <div className="col-span-4 text-slate-400 text-sm font-semibold">
              {leaderboardType === 'xp' && 'XP'}
              {leaderboardType === 'streak' && '🔥 Streak'}
              {leaderboardType === 'speaking-time' && 'Speaking Time'}
            </div>
          </div>

          {/* Table Rows */}
          {sortedLeaderboard.map((user, i) => (
            <motion.div
              key={user.rank}
              className={`grid grid-cols-12 gap-4 p-6 border-b border-slate-700/50 hover:bg-slate-700/20 transition ${
                user.rank <= 3 ? 'bg-slate-800/30' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                <span className="text-2xl">{getMedalEmoji(user.rank)}</span>
              </div>

              {/* User Info */}
              <div className="col-span-5 flex items-center gap-3">
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">Level {user.level}</p>
                </div>
              </div>

              {/* Level */}
              <div className="col-span-2 flex items-center">
                <div className="flex items-center gap-2">
                  <Medal className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold text-white">{user.level}</span>
                </div>
              </div>

              {/* Main Stat */}
              <div className="col-span-4 flex items-center">
                <div className="text-right w-full">
                  <p className="font-bold text-lg text-white">
                    {leaderboardType === 'xp' && `${user.xp.toLocaleString()} XP`}
                    {leaderboardType === 'streak' && `${user.streak} days`}
                    {leaderboardType === 'speaking-time' && formatTime(user.speakingTime)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Your Stats */}
        {session?.user && (
          <motion.div
            className="mt-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm text-slate-400 mb-2">Your Position</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">👤</span>
                <div>
                  <p className="text-xl font-bold text-white">{session.user.name}</p>
                  <p className="text-sm text-slate-400">Rank: #27 • Level: 7</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Your XP</p>
                <p className="text-3xl font-bold text-white">2,450</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
