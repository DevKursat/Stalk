'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Star, 
  StarOff,
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Filter,
  Grid,
  List,
  MoreVertical,
} from 'lucide-react'
import { Sidebar, Header, AdBanner } from '@/components/layout'
import { Card, Button, Badge, Avatar, Modal, Input } from '@/components/ui'
import { useUserStore, useTrackedProfilesStore } from '@/lib/store'
import { formatNumber, formatRelativeTime, getPlatformIcon } from '@/lib/utils'
import type { PlatformType } from '@/types/database'

// Mock tracked profiles
const mockTrackedProfiles = [
  {
    id: '1',
    user_id: 'demo',
    platform: 'instagram' as PlatformType,
    username: 'therock',
    display_name: 'Dwayne Johnson',
    bio: 'Actor, Producer & CEO',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=therock',
    followers_count: 395000000,
    following_count: 750,
    posts_count: 7500,
    engagement_rate: 2.5,
    is_verified: true,
    is_private: false,
    is_favorite: true,
    last_synced_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_url: null,
    last_activity_at: null,
    nickname: null,
    notes: null,
  },
  {
    id: '2',
    user_id: 'demo',
    platform: 'instagram' as PlatformType,
    username: 'cristiano',
    display_name: 'Cristiano Ronaldo',
    bio: 'Football Legend',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cristiano',
    followers_count: 620000000,
    following_count: 580,
    posts_count: 3500,
    engagement_rate: 3.2,
    is_verified: true,
    is_private: false,
    is_favorite: true,
    last_synced_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_url: null,
    last_activity_at: null,
    nickname: null,
    notes: null,
  },
  {
    id: '3',
    user_id: 'demo',
    platform: 'tiktok' as PlatformType,
    username: 'charlidamelio',
    display_name: 'Charli D\'Amelio',
    bio: 'Dancer & Content Creator',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charli',
    followers_count: 151000000,
    following_count: 1200,
    posts_count: 2800,
    engagement_rate: 5.8,
    is_verified: true,
    is_private: false,
    is_favorite: false,
    last_synced_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_url: null,
    last_activity_at: null,
    nickname: null,
    notes: null,
  },
]

// Mock user
const mockUser = {
  id: 'demo-user',
  email: 'demo@izci.app',
  full_name: 'Demo Kullanıcı',
  avatar_url: null,
  phone: null,
  country: 'TR',
  language: 'tr',
  timezone: 'Europe/Istanbul',
  subscription_tier: 'free' as const,
  subscription_status: 'active' as const,
  subscription_started_at: null,
  subscription_expires_at: null,
  daily_searches_used: 1,
  daily_searches_limit: 3,
  monthly_reports_used: 0,
  monthly_reports_limit: 1,
  last_search_at: new Date().toISOString(),
  last_login_at: new Date().toISOString(),
  total_searches: 15,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default function TrackedPage() {
  const { user, setUser } = useUserStore()
  const { profiles, setProfiles, updateProfile, removeProfile } = useTrackedProfilesStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'favorites'>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      setUser(mockUser)
    }
    if (profiles.length === 0) {
      setProfiles(mockTrackedProfiles)
    }
  }, [user, setUser, profiles.length, setProfiles])

  const filteredProfiles = profiles.filter(p => 
    filter === 'all' || (filter === 'favorites' && p.is_favorite)
  )

  const toggleFavorite = (id: string) => {
    const profile = profiles.find(p => p.id === id)
    if (profile) {
      updateProfile(id, { is_favorite: !profile.is_favorite })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          title="Takip Edilen Profiller" 
          description="Takip ettiğiniz profilleri yönetin ve değişiklikleri izleyin"
        />

        <main className="flex-1 p-6 overflow-auto">
          {/* Ad Banner */}
          {user?.subscription_tier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <AdBanner />
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Tümü ({profiles.length})
              </Button>
              <Button
                variant={filter === 'favorites' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('favorites')}
                leftIcon={<Star className="w-4 h-4" />}
              >
                Favoriler
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Button
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setIsAddModalOpen(true)}
              >
                Profil Ekle
              </Button>
            </div>
          </div>

          {/* Profiles Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover glow className="group">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar src={profile.avatar_url} alt={profile.display_name || ''} size="lg" />
                            <span className="absolute -bottom-1 -right-1 text-lg">
                              {getPlatformIcon(profile.platform)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white">{profile.display_name}</h3>
                              {profile.is_verified && (
                                <Badge variant="info" size="sm">✓</Badge>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">@{profile.username}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(profile.id)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {profile.is_favorite ? (
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          ) : (
                            <StarOff className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                            <Users className="w-3 h-3" />
                          </div>
                          <p className="text-white font-bold">{formatNumber(profile.followers_count || 0)}</p>
                          <p className="text-gray-500 text-xs">Takipçi</p>
                        </div>
                        <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-pink-400 mb-1">
                            <Heart className="w-3 h-3" />
                          </div>
                          <p className="text-white font-bold">{profile.engagement_rate}%</p>
                          <p className="text-gray-500 text-xs">Etkileşim</p>
                        </div>
                        <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                            <MessageCircle className="w-3 h-3" />
                          </div>
                          <p className="text-white font-bold">{formatNumber(profile.posts_count || 0)}</p>
                          <p className="text-gray-500 text-xs">Gönderi</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" /> Detay
                        </Button>
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300"
                          onClick={() => removeProfile(profile.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Last Sync */}
                      <p className="text-gray-500 text-xs mt-3">
                        Son güncelleme: {formatRelativeTime(profile.last_synced_at || new Date().toISOString())}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover className="group">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar src={profile.avatar_url} alt={profile.display_name || ''} size="lg" />
                          <span className="absolute -bottom-1 -right-1 text-lg">
                            {getPlatformIcon(profile.platform)}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white truncate">{profile.display_name}</h3>
                            {profile.is_verified && <Badge variant="info" size="sm">✓</Badge>}
                            {profile.is_favorite && <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />}
                          </div>
                          <p className="text-gray-400 text-sm">@{profile.username}</p>
                        </div>

                        <div className="hidden md:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-white font-bold">{formatNumber(profile.followers_count || 0)}</p>
                            <p className="text-gray-500">Takipçi</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold">{profile.engagement_rate}%</p>
                            <p className="text-gray-500">Etkileşim</p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold">{formatNumber(profile.posts_count || 0)}</p>
                            <p className="text-gray-500">Gönderi</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {filteredProfiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Eye className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Henüz profil eklemediniz</h3>
              <p className="text-gray-400 mb-6">Takip etmek istediğiniz profilleri ekleyin</p>
              <Button onClick={() => setIsAddModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
                İlk Profilini Ekle
              </Button>
            </motion.div>
          )}

          {/* Add Profile Modal */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Profil Ekle"
          >
            <div className="space-y-4">
              <Input
                label="Kullanıcı Adı"
                placeholder="@username"
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                <div className="grid grid-cols-4 gap-2">
                  {['instagram', 'tiktok', 'twitter', 'youtube'].map((platform) => (
                    <button
                      key={platform}
                      className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-1"
                    >
                      <span className="text-xl">{getPlatformIcon(platform)}</span>
                      <span className="text-xs text-gray-400 capitalize">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full">Profili Ekle</Button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  )
}
