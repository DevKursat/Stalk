'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sidebar, Header, AdBanner } from '@/components/layout'
import { SearchBox, SearchResults } from '@/components/search'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { useUserStore } from '@/lib/store'
import { Clock, TrendingUp } from 'lucide-react'

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

const trendingProfiles = [
  { username: 'elonmusk', platform: 'twitter', change: '+5.2%' },
  { username: 'cristiano', platform: 'instagram', change: '+3.1%' },
  { username: 'charlidamelio', platform: 'tiktok', change: '+8.7%' },
  { username: 'mrbeast', platform: 'youtube', change: '+4.5%' },
]

const recentSearches = [
  { username: 'therock', platform: 'instagram', time: '2 saat önce' },
  { username: 'kimkardashian', platform: 'instagram', time: '5 saat önce' },
  { username: 'billgates', platform: 'twitter', time: '1 gün önce' },
]

export default function SearchPage() {
  const { user, setUser } = useUserStore()

  useEffect(() => {
    if (!user) {
      setUser(mockUser)
    }
  }, [user, setUser])

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          title="Profil Ara" 
          description="Kullanıcı adı ile sosyal medya profillerini analiz edin"
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
          <SearchBox />

          {/* Search Results */}
          <SearchResults />

          {/* Sidebar Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            {/* Trending Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Trend Profiller
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {profile.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">@{profile.username}</p>
                        <p className="text-gray-500 text-sm capitalize">{profile.platform}</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-medium">{profile.change}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Son Aramalarınız
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={search.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {search.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">@{search.username}</p>
                        <p className="text-gray-500 text-sm capitalize">{search.platform}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{search.time}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Ad */}
          {user?.subscription_tier === 'free' && (
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
