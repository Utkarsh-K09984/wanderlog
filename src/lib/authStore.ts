import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;

  // Journal creation states
  description: string;
  setDescription: (desc: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (err: string) => void;

  // Journal list states
  tab: string;
  setTab: (tab: string) => void;
  journals: any[];
  setJournals: (journals: any[]) => void;
  journalsLoading: boolean;
  setJournalsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  // Journal creation
  description: "",
  setDescription: (description) => set({ description }),
  startDate: "",
  setStartDate: (startDate) => set({ startDate }),
  endDate: "",
  setEndDate: (endDate) => set({ endDate }),
  imageFiles: [],
  setImageFiles: (imageFiles) => set({ imageFiles }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: "",
  setError: (error) => set({ error }),

  // Journal list
  tab: "journal",
  setTab: (tab) => set({ tab }),
  journals: [],
  setJournals: (journals) => set({ journals }),
  journalsLoading: false,
  setJournalsLoading: (journalsLoading) => set({ journalsLoading }),
}));
