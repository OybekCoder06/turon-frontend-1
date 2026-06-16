'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Flame,
  Zap,
  Trophy,
  BookOpen,
  Target,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      // Fetch user stats
      const fetchUserStats = async () => {
        try {
          // This is a placeholder - we'll implement the API endpoint
          setUserStats({
            xp: 1250,
            level: 5,
            rank: 'STUDENT',
            dailyStreak: 7,
            totalSpeakingTime: 3600,
            completedTasks: 15,
            achievements: 8,
          });
        } catch (error) {
          console.error('Error fetching user stats:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserStats();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="text-slate-400">Continue your English learning journey</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: Zap,
                label: 'XP Points',
                value: userStats?.xp || 0,
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Trophy,
                label: 'Level',
                value: userStats?.level || 1,
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Flame,
                label: 'Daily Streak',
                value: `${userStats?.dailyStreak || 0} 🔥`,
                color: 'from-orange-500 to-red-600',
              },
              {
                icon: BookOpen,
                label: 'Speaking Time',
                value: `${Math.floor((userStats?.totalSpeakingTime || 0) / 60)}m`,
                color: 'from-green-500 to-green-600',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className="w-12 h-12 text-white/30" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chat with Teacher */}
            <motion.div
              className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-6 hover:border-blue-500/50 transition cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Chat with Teacher</h3>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Have a conversation with your AI teacher, get grammar corrections and improve your speaking.
              </p>
              <Link href="/chat" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
                Start Chatting <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Speaking Arena */}
            <motion.div
              className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 p-6 hover:border-green-500/50 transition cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Speaking Arena</h3>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎤</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Practice your speaking skills with real-time voice recognition and feedback.
              </p>
              <Link href="/speak" className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold">
                Start Speaking <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Daily Mission */}
            <motion.div
              className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 p-6 hover:border-purple-500/50 transition cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Today's Mission</h3>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Speak for 5 minutes to complete today's mission and earn bonus XP.
              </p>
              <Link href="/missions" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold">
                View Missions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Recent Achievements */}
          <motion.div
            className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Recent Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['First Step', 'Talker', 'Grammarian', '7-Day Streak'].map((achievement, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-slate-700/50 border border-slate-600/50 text-center hover:border-blue-500/50 transition"
                >
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-sm font-semibold text-white">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
