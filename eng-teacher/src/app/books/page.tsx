'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  BookOpen,
  Search,
  Filter,
  Heart,
  Star,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const books = [
  {
    id: 1,
    title: 'Essential Grammar Guide',
    author: 'John Smith',
    category: 'GRAMMAR',
    coverImage: '📘',
    rating: 4.8,
    reviews: 245,
    progress: 45,
  },
  {
    id: 2,
    title: 'Vocabulary Builder',
    author: 'Sarah Johnson',
    category: 'VOCABULARY',
    coverImage: '📕',
    rating: 4.6,
    reviews: 189,
    progress: 0,
  },
  {
    id: 3,
    title: 'IELTS Speaking Masterclass',
    author: 'Michael Brown',
    category: 'IELTS',
    coverImage: '📙',
    rating: 4.9,
    reviews: 312,
    progress: 60,
  },
  {
    id: 4,
    title: 'Business English for Professionals',
    author: 'Emily Davis',
    category: 'BUSINESS_ENGLISH',
    coverImage: '📗',
    rating: 4.7,
    reviews: 156,
    progress: 0,
  },
  {
    id: 5,
    title: 'Pronunciation Techniques',
    author: 'Robert Wilson',
    category: 'PRONUNCIATION',
    coverImage: '📓',
    rating: 4.5,
    reviews: 98,
    progress: 20,
  },
  {
    id: 6,
    title: 'Travel English Conversations',
    author: 'Lisa Anderson',
    category: 'SPEAKING',
    coverImage: '📔',
    rating: 4.4,
    reviews: 142,
    progress: 0,
  },
];

const categoryColors: { [key: string]: string } = {
  GRAMMAR: 'from-blue-500 to-blue-600',
  VOCABULARY: 'from-purple-500 to-purple-600',
  IELTS: 'from-green-500 to-green-600',
  SPEAKING: 'from-orange-500 to-orange-600',
  PRONUNCIATION: 'from-pink-500 to-pink-600',
  BUSINESS_ENGLISH: 'from-indigo-500 to-indigo-600',
};

export default function BooksPage() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
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
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Teacher Books Library
          </h1>
          <p className="text-slate-400">Explore our collection of English learning materials</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['GRAMMAR', 'VOCABULARY', 'IELTS', 'SPEAKING', 'PRONUNCIATION'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, i) => (
            <motion.div
              key={book.id}
              className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Cover Image */}
              <div className={`relative h-48 bg-gradient-to-br ${categoryColors[book.category]} p-6 flex items-center justify-center`}>
                <span className="text-6xl">{book.coverImage}</span>
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-white mb-1 truncate">{book.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{book.author}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">{book.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({book.reviews} reviews)</span>
                </div>

                {/* Progress */}
                {book.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Progress</span>
                      <span className="text-xs font-semibold text-white">{book.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-full" style={{ width: `${book.progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Button */}
                <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                  {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No books found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
