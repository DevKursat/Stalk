'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sidebar, Header, AdBanner } from '@/components/layout'
import { 
  PrivateAccountViewer, 
  FollowTracker, 
  ActivityTracker, 
  WhatsAppAnalyzer 
} from '@/components/analysis'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from '@/components/ui'
import { useUserStore } from '@/lib/store'
import { 
  Search, 
  Instagram, 
  MessageCircle, 
  Eye,
  AlertTriangle,
  Sparkles,
  User,
  Lock,
  Activity,
  Users,
  Video
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock user data
const mockUser = {
  id: 'demo-user',
  email: 'demo@izci.app',
  full_name: 'Demo Kullanıcı',
  avatar_url: null,
  phone: null,
  country: 'TR',
  language: 'tr',
  timezone: 'Europe/Istanbul',
  subscription_tier: 'premium' as const,
  subscription_status: 'active' as const,
  subscription_started_at: null,
  subscription_expires_at: null,
  daily_searches_used: 5,
  daily_searches_limit: 100,
  monthly_reports_used: 3,
  monthly_reports_limit: 50,
  last_search_at: new Date().toISOString(),
  last_login_at: new Date().toISOString(),
  total_searches: 45,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock profile data
const mockProfile = {
  username: 'hedef_kullanici',
  displayName: 'Hedef Kullanıcı',
  platform: 'instagram',
  isPrivate: true,
  followers: 1234,
  following: 567,
  posts: 89,
  bio: '✨ Life is beautiful ✨',
  isVerified: false,
  avatar: '👤',
}

type TabType = 'overview' | 'private' | 'follows' | 'activity' | 'whatsapp'

const tabs: { id: TabType; label: string; icon: React.ElementType; premium?: boolean }[] = [
  { id: 'overview', label: 'Genel Bakış', icon: User },
  { id: 'private', label: 'Gizli İçerikler', icon: Lock, premium: true },
  { id: 'follows', label: 'Takip/Çıkarma', icon: Users },
  { id: 'activity', label: 'Aktivite', icon: Activity },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, premium: true },
]

export default function AnalyzePage() {
  const { user, setUser } = useUserStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  useEffect(() => {
    if (!user) {
      setUser(mockUser)
    }
  }, [user, setUser])

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setHasResult(true)
    }, 1500)
  }

  const isPremium = user?.subscription_tier === 'premium' || user?.subscription_tier === 'enterprise'

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          title="Profil Analizi" 
          description="Sevgilinin profilini detaylıca analiz et"
        />

        <main className="flex-1 p-6 overflow-auto">
          {/* Ad Banner */}
          {user?.subscription_tier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <AdBanner variant="horizontal" />
            </motion.div>
          )}

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="@kullaniciadi girin..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 text-lg"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch}
                    isLoading={isSearching}
                    className="min-w-[140px]"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Analiz Et
                  </Button>
                </div>

                {/* Platform selector */}
                <div className="flex gap-2 mt-4">
                  {[
                    { icon: Instagram, name: 'Instagram', color: 'from-purple-500 to-pink-500', active: true },
                    { icon: Video, name: 'TikTok', color: 'from-gray-600 to-gray-800', active: false },
                    { icon: MessageCircle, name: 'WhatsApp', color: 'from-green-500 to-green-600', active: false },
                  ].map((platform) => (
                    <motion.button
                      key={platform.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                        platform.active 
                          ? `bg-gradient-to-r ${platform.color} text-white` 
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      )}
                    >
                      <platform.icon className="w-4 h-4" />
                      {platform.name}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          {hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Profile Header */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                        {mockProfile.avatar}
                      </div>
                      {mockProfile.isPrivate && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">@{mockProfile.username}</h2>
                        {mockProfile.isPrivate && (
                          <Badge variant="danger">
                            <Lock className="w-3 h-3 mr-1" />
                            Gizli Hesap
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{mockProfile.bio}</p>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-xl font-bold text-white">{mockProfile.posts}</p>
                          <p className="text-sm text-gray-500">Gönderi</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">{mockProfile.followers.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Takipçi</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-white">{mockProfile.following}</p>
                          <p className="text-sm text-gray-500">Takip</p>
                        </div>
                      </div>
                    </div>

                    {/* Alert */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <p className="text-orange-400 font-medium">Şüpheli Aktivite</p>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Son 24 saatte 3 yeni takip ve gece aktivitesi tespit edildi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap",
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.premium && !isPremium && (
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="grid gap-6">
                {activeTab === 'overview' && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FollowTracker targetUsername={mockProfile.username} isPremium={isPremium} />
                    <ActivityTracker username={mockProfile.username} isPremium={isPremium} />
                  </div>
                )}

                {activeTab === 'private' && (
                  <PrivateAccountViewer 
                    username={mockProfile.username} 
                    isPrivate={mockProfile.isPrivate}
                    isPremium={isPremium}
                  />
                )}

                {activeTab === 'follows' && (
                  <FollowTracker targetUsername={mockProfile.username} isPremium={isPremium} />
                )}

                {activeTab === 'activity' && (
                  <ActivityTracker username={mockProfile.username} isPremium={isPremium} />
                )}

                {activeTab === 'whatsapp' && (
                  <WhatsAppAnalyzer isPremium={isPremium} />
                )}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!hasResult && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                <Eye className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Profil Analizi Başlat</h3>
              <p className="text-gray-400 text-center max-w-md mb-6">
                Merak ettiğin kişinin kullanıcı adını gir ve detaylı analiz raporunu gör. 
                Gizli hesaplar, takip değişiklikleri, aktiviteler ve daha fazlası...
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  Gizli hesap içerikleri
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Takip değişiklikleri
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  Beğeni & yorumlar
                </span>
              </div>
            </motion.div>
          )}

          {/* Bottom Ad */}
          {user?.subscription_tier === 'free' && hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <AdBanner variant="horizontal" />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
