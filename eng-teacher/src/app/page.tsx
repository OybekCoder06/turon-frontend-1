'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Zap, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">TeacherAI</span>
            </div>
            <div className="flex gap-4">
              <Link href="/auth/login" className="px-6 py-2 text-sm font-medium hover:text-blue-400 transition">
                Login
              </Link>
              <Link href="/auth/register" className="px-6 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Learn English with AI
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Master English speaking through conversations with an intelligent virtual teacher. Grammar corrections, pronunciation feedback, and real-time learning.
            </p>
            <Link
              href="/auth/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105"
            >
              Start Learning Free
            </Link>
          </motion.div>

          {/* Animated Hero Image Placeholder */}
          <motion.div
            className="mt-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/20 p-8 backdrop-blur"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-400">AI Teacher Demo Video</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Why Choose TeacherAI?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI Teacher',
                description: 'Intelligent conversations with grammar correction',
              },
              {
                icon: Zap,
                title: 'Voice Training',
                description: 'Real-time pronunciation feedback',
              },
              {
                icon: BookOpen,
                title: 'Study Materials',
                description: 'Grammar, vocabulary, IELTS prep books',
              },
              {
                icon: Users,
                title: 'Gamification',
                description: 'Earn XP, climb ranks, compete on leaderboard',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-slate-700/50 border border-slate-600/50 hover:border-blue-500/50 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Master English?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of students already improving their English with TeacherAI
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105"
          >
            Create Account Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2024 TeacherAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
