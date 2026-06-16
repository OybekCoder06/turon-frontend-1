'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Gamepad2,
  Play,
  RotateCcw,
  ChevronRight,
  Award,
} from 'lucide-react';

const games = [
  {
    id: 1,
    name: 'Last Letter Challenge',
    description: 'AI says a word, you must respond with a word starting with the last letter.',
    difficulty: 'Easy',
    players: 1250,
    avgScore: 850,
    icon: '🎮',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: 'Vocabulary Rush',
    description: 'Match English words with their definitions as fast as you can.',
    difficulty: 'Medium',
    players: 890,
    avgScore: 720,
    icon: '⚡',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    name: 'Pronunciation Master',
    description: 'Speak words correctly and hear the AI pronounce them back.',
    difficulty: 'Hard',
    players: 650,
    avgScore: 680,
    icon: '🎤',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 4,
    name: 'Grammar Guardian',
    description: 'Find and correct grammar mistakes in sentences.',
    difficulty: 'Medium',
    players: 920,
    avgScore: 760,
    icon: '✍️',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    name: 'Story Builder',
    description: 'Create stories by adding one sentence at a time.',
    difficulty: 'Hard',
    players: 540,
    avgScore: 640,
    icon: '📖',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 6,
    name: 'Idiom Explorer',
    description: 'Learn common idioms and use them in correct contexts.',
    difficulty: 'Medium',
    players: 780,
    avgScore: 700,
    icon: '💭',
    color: 'from-red-500 to-red-600',
  },
];

export default function GamesPage() {
  const { data: session, status } = useSession();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<any>(null);

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  const handlePlayGame = (gameId: number) => {
    setSelectedGame(gameId);
    setIsPlaying(true);
    // Initialize game state
    setGameState({
      score: 0,
      round: 1,
      totalRounds: 10,
    });
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    setGameState(null);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
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

  const currentGame = games.find((g) => g.id === selectedGame);

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
                <Gamepad2 className="w-8 h-8" />
                Game Center
              </h1>
              <p className="text-slate-400">Fun and engaging games to boost your English skills</p>
            </motion.div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  className={`rounded-2xl bg-gradient-to-br ${game.color} p-6 text-white cursor-pointer group hover:shadow-lg hover:shadow-${game.color.split(' ')[0]}/50 transition`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handlePlayGame(game.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{game.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      game.difficulty === 'Easy' ? 'bg-green-500/30' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500/30' :
                      'bg-red-500/30'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{game.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-white/80">Avg. Score</p>
                      <p className="text-lg font-bold">{game.avgScore}</p>
                    </div>
                    <button className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          // Game Playing View
          <motion.div
            className="rounded-3xl bg-slate-800/50 border border-slate-700/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Game Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">{currentGame?.name}</h2>
                <p className="text-slate-400">Round {gameState.round} of {gameState.totalRounds}</p>
              </div>
              <button
                onClick={handleBackToGames}
                className="px-6 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Exit Game
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Progress</span>
                <span className="text-white font-semibold">{gameState.round}/{gameState.totalRounds}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(gameState.round / gameState.totalRounds) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Score */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="text-slate-400">Score</span>
              </div>
              <span className="text-4xl font-bold text-white">{gameState.score}</span>
            </div>

            {/* Game Content - Example for Last Letter Challenge */}
            {currentGame?.id === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-slate-400 mb-4">AI says:</p>
                  <motion.div
                    className="text-6xl font-bold text-blue-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    Apple
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 mb-4">Your turn - start with 'E':</p>
                  <input
                    type="text"
                    placeholder="Type your word..."
                    className="max-w-sm w-full px-6 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 text-center text-2xl"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition">
                    Submit Answer
                  </button>
                  <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg transition">
                    Skip
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
