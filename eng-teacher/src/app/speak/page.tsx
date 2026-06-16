'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/common/Header';
import {
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  Copy,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SpeakPage() {
  const { data: session, status } = useSession();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }
  }, [status]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const source = audioContextRef.current.createMediaStreamAudioSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyserRef.current = analyser;
      source.connect(analyser);

      setIsRecording(true);
      setRecordingTime(0);
      setTranscript('');
      setFeedback(null);

      // Simulate audio level detection
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(Math.min(100, (average / 255) * 100));
        }
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    } catch (error) {
      toast.error('Microphone access denied');
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsRecording(false);

    // Simulate transcript and feedback
    setTranscript("I'm going to the supermarket tomorrow.");
    setFeedback({
      grammarScore: 85,
      pronunciationScore: 78,
      fluencyScore: 82,
      issues: [
        {
          type: 'grammar',
          text: "I'm going",
          suggestion: 'Could also use "I will go"',
          severity: 'minor',
        },
      ],
    });
  };

  const handleReset = () => {
    setTranscript('');
    setFeedback(null);
    setRecordingTime(0);
    setAudioLevel(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Speaking Arena</h1>
          <p className="text-slate-400">Practice your English speaking and get instant feedback</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recording Area */}
          <motion.div
            className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col items-center justify-center min-h-96">
              {/* Animated Visualizer */}
              <div className="mb-8 flex items-end justify-center gap-1 h-32">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue-500 to-green-500 rounded-full"
                    animate={{
                      height: isRecording ? `${Math.random() * audioLevel * 3}px` : '8px',
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>

              {/* Microphone Button */}
              <motion.button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-32 h-32 rounded-full flex items-center justify-center font-bold text-xl transition-all ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg hover:shadow-blue-500/50 text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? <MicOff className="w-16 h-16" /> : <Mic className="w-16 h-16" />}
              </motion.button>

              {/* Recording Time */}
              {isRecording && (
                <motion.p
                  className="mt-8 text-3xl font-bold text-red-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formatTime(recordingTime)}
                </motion.p>
              )}

              <p className="mt-6 text-slate-400 text-center max-w-sm">
                {isRecording ? 'Speak clearly and naturally. Click the button again when you are done.' : 'Click the microphone button to start recording'}
              </p>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Audio Level */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio Level
              </p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-full"
                  animate={{ width: `${audioLevel}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">{Math.round(audioLevel)}%</p>
            </div>

            {/* Stats */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-lg font-bold text-white font-mono">
                  {formatTime(recordingTime)}
                </p>
              </div>
              <div className="h-px bg-slate-700" />
              <div>
                <p className="text-xs text-slate-400 mb-1">Status</p>
                <p className="text-sm font-semibold text-slate-300">
                  {isRecording ? '🔴 Recording' : '⏹️ Ready'}
                </p>
              </div>
            </div>

            {/* Actions */}
            {(transcript || feedback) && (
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-slate-300 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
            )}
          </motion.div>
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div
            className="mt-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Your Feedback</h3>

            {/* Transcript */}
            <div className="mb-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600/50">
              <p className="text-sm font-semibold text-slate-400 mb-2">What you said:</p>
              <p className="text-lg text-white italic">"{transcript}"</p>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Grammar', score: feedback.grammarScore, icon: '📝' },
                { label: 'Pronunciation', score: feedback.pronunciationScore, icon: '🎤' },
                { label: 'Fluency', score: feedback.fluencyScore, icon: '✨' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50">
                  <p className="text-3xl mb-2">{item.icon}</p>
                  <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                  <p className="text-3xl font-bold text-white">{item.score}%</p>
                </div>
              ))}
            </div>

            {/* Issues */}
            {feedback.issues && feedback.issues.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Areas to improve:
                </p>
                <div className="space-y-3">
                  {feedback.issues.map((issue: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-white">
                            {issue.text}
                          </p>
                          <p className="text-sm text-slate-300 mt-1">
                            {issue.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
