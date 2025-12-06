'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Database, SubscriptionTier, PlatformType } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type TrackedProfile = Database['public']['Tables']['tracked_profiles']['Row']

interface UserState {
  user: Profile | null
  isLoading: boolean
  setUser: (user: Profile | null) => void
  setLoading: (loading: boolean) => void
  updateUser: (updates: Partial<Profile>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'user-storage',
    }
  )
)

interface TrackedProfilesState {
  profiles: TrackedProfile[]
  isLoading: boolean
  setProfiles: (profiles: TrackedProfile[]) => void
  addProfile: (profile: TrackedProfile) => void
  removeProfile: (id: string) => void
  updateProfile: (id: string, updates: Partial<TrackedProfile>) => void
  setLoading: (loading: boolean) => void
}

export const useTrackedProfilesStore = create<TrackedProfilesState>()((set) => ({
  profiles: [],
  isLoading: true,
  setProfiles: (profiles) => set({ profiles, isLoading: false }),
  addProfile: (profile) => set((state) => ({
    profiles: [...state.profiles, profile]
  })),
  removeProfile: (id) => set((state) => ({
    profiles: state.profiles.filter(p => p.id !== id)
  })),
  updateProfile: (id, updates) => set((state) => ({
    profiles: state.profiles.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  setLoading: (isLoading) => set({ isLoading }),
}))

interface SearchState {
  query: string
  platform: PlatformType
  isSearching: boolean
  results: any[]
  setQuery: (query: string) => void
  setPlatform: (platform: PlatformType) => void
  setSearching: (searching: boolean) => void
  setResults: (results: any[]) => void
  reset: () => void
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: '',
  platform: 'instagram',
  isSearching: false,
  results: [],
  setQuery: (query) => set({ query }),
  setPlatform: (platform) => set({ platform }),
  setSearching: (isSearching) => set({ isSearching }),
  setResults: (results) => set({ results }),
  reset: () => set({ query: '', results: [], isSearching: false }),
}))

interface UIState {
  isSidebarOpen: boolean
  isModalOpen: boolean
  modalContent: React.ReactNode | null
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      isModalOpen: false,
      modalContent: null,
      theme: 'dark',
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      openModal: (content) => set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme, isSidebarOpen: state.isSidebarOpen }),
    }
  )
)
