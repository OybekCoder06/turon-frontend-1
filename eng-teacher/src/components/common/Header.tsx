'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Home,
  MessageCircle,
  Zap,
  BookOpen,
  Gamepad2,
  Target,
  Sword,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageCircle, label: 'AI Chat', href: '/chat' },
    { icon: Zap, label: 'Speaking Arena', href: '/speak' },
    { icon: BookOpen, label: 'Books', href: '/books' },
    { icon: Gamepad2, label: 'Games', href: '/games' },
    { icon: Target, label: 'Missions', href: '/missions' },
    { icon: Sword, label: 'Boss Battles', href: '/boss-battles' },
    { icon: Users, label: 'Leaderboard', href: '/leaderboard' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur z-40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 overflow-y-auto z-50 ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">TeacherAI</span>
            {isOpen && (
              <button onClick={onClose} className="ml-auto md:hidden">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  pathname === href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-slate-700 my-6" />

          {/* User Profile */}
          {session?.user && (
            <div className="space-y-4">
              <div className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-400">Logged in as</p>
                <p className="text-sm font-semibold text-white truncate">{session.user.name}</p>
              </div>

              {/* Settings */}
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </Link>

              {/* Logout */}
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export function Header() {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 md:left-64 bg-slate-900/80 border-b border-slate-700/50 backdrop-blur z-40">
        <div className="px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          {/* User Info */}
          {session?.user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{session.user.name}</p>
                <p className="text-xs text-slate-400">{session.user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name} className="w-full h-full rounded-lg" />
                ) : (
                  <span className="text-white font-semibold">{session.user.name?.[0]}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
