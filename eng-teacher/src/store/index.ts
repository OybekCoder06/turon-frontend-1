import { create } from 'zustand';
import { User, Conversation, Message, TeacherMode } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface ChatStore {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  setConversations: (conversations: Conversation[]) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsLoading: (loading: boolean) => void;
  clear: () => void;
}

interface VoiceStore {
  isRecording: boolean;
  audioLevel: number;
  transcript: string;
  isProcessing: boolean;
  setIsRecording: (recording: boolean) => void;
  setAudioLevel: (level: number) => void;
  setTranscript: (transcript: string) => void;
  setIsProcessing: (processing: boolean) => void;
  reset: () => void;
}

interface UIStore {
  theme: 'light' | 'dark';
  isSidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  setConversations: (conversations) => set({ conversations }),
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  clear: () =>
    set({
      conversations: [],
      currentConversation: null,
      messages: [],
    }),
}));

export const useVoiceStore = create<VoiceStore>((set) => ({
  isRecording: false,
  audioLevel: 0,
  transcript: '',
  isProcessing: false,
  setIsRecording: (recording) => set({ isRecording: recording }),
  setAudioLevel: (level) => set({ audioLevel: level }),
  setTranscript: (transcript) => set({ transcript }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  reset: () =>
    set({
      isRecording: false,
      audioLevel: 0,
      transcript: '',
      isProcessing: false,
    }),
}));

export const useUIStore = create<UIStore>((set) => ({
  theme: 'dark',
  isSidebarOpen: true,
  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}));
