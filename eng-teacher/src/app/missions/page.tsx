'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Target,
  CheckCircle,
  Circle,
  AlertCircle,
  Gift,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'speak' | 'learn' | 'conversation' | 'read';
  target: number;
  current: number;
  reward: number;
  status: 'pending' | 'in-progress' | 'completed';
  deadline?: string;
  icon: string;
}

const dailyMissions: Mission[] = [
  {
    id: 1,
    title: 'Speak for 5 Minutes',
    description: 'Use the Speaking Arena to practice for at least 5 minutes',
    type: 'speak',
    target: 300,
    current: 180,
    reward: 30,
    status: 'in-progress',
    deadline: '23:59 today',
    icon: '🎤',
  },
  {
    id: 2,
    title: 'Learn 10 New Words',
    description: 'Complete a vocabulary lesson and learn 10 new words',
    type: 'learn',
    target: 10,
    current: 0,
    reward: 25,
    status: 'pending',
    deadline: '23:59 today',
    icon: '📚',
  },
  {
    id: 3,
    title: 'Have a Conversation',
    description: 'Chat with the AI teacher for at least 10 exchanges',
    type: 'conversation',
    target: 10,
    current: 5,
    reward: 35,
    status: 'in-progress',
    deadline: '23:59 today',
    icon: '💬',
  },
];

const weeklyMissions: Mission[] = [
  {
    id: 4,
    title: 'Read One Book Chapter',
    description: 'Complete reading one chapter from any book in our library',
    type: 'read',
    target: 1,
    current: 0,
    reward: 50,
    status: 'pending',
    deadline: 'Sunday',
    icon: '📖',
  },
  {
    id: 5,
    title: 'Maintain 7-Day Streak',
    description: 'Learn English every day for a week',
    type: 'speak',
    target: 7,
    current: 3,
    reward: 100,
    status: 'in-progress',
    deadline: 'Sunday',
    icon: '🔥',
  },
  {
    id: 6,
    title: 'Play 5 Games',
    description: 'Play any game from Game Center 5 times',
    type: 'learn',
    target: 5,
    current: 2,
    reward: 60,
    status: 'in-progress',
    deadline: 'Sunday',
    icon: '🎮',
  },
];

export default function MissionsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  const missions = activeTab === 'daily' ? dailyMissions : weeklyMissions;

  const getProgressPercentage = (mission: Mission) => {
    return Math.min(100, (mission.current / mission.target) * 100);
  };

  const getMissionStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status === 'in-progress') return <Circle className="w-5 h-5 text-blue-400" />;
    return <Circle className="w-5 h-5 text-slate-400" />;
  };

  const getMissionLink = (mission: Mission) => {
    if (mission.type === 'speak') return '/speak';
    if (mission.type === 'learn') return '/books';
    if (mission.type === 'conversation') return '/chat';
    if (mission.type === 'read') return '/books';
    return '#';
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
            <Target className="w-8 h-8" />
            Daily Missions
          </h1>
          <p className="text-slate-400">Complete missions to earn XP and rewards</p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          className="flex gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { id: 'daily', label: 'Daily Missions' },
            { id: 'weekly', label: 'Weekly Challenges' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'daily' | 'weekly')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Missions List */}
        <div className="space-y-4">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.id}
              className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-blue-500/50 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Icon and Status */}
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{mission.icon}</span>
                  <div className="mt-1">{getMissionStatusIcon(mission.status)}</div>
                </div>

                {/* Mission Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{mission.title}</h3>
                      <p className="text-sm text-slate-400">{mission.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                        <Gift className="w-4 h-4" />
                        +{mission.reward} XP
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <Clock className="w-3 h-3" />
                        {mission.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">
                        Progress: {mission.current}/{mission.target}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {Math.round(getProgressPercentage(mission))}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(mission)}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  {mission.status !== 'completed' && (
                    <Link href={getMissionLink(mission)}>
                      <button className="text-sm px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                        Start
                      </button>
                    </Link>
                  )}
                  {mission.status === 'completed' && (
                    <div className="text-sm text-green-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reward Summary */}
        <motion.div
          className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border border-yellow-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-slate-400 mb-2">Potential Rewards</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-400">Total XP Available Today</p>
              <p className="text-4xl font-bold text-yellow-400">{missions.reduce((sum, m) => sum + m.reward, 0)} XP</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-3xl font-bold text-green-400">{missions.filter(m => m.status === 'completed').length}/{missions.length}</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
