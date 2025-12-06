'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Eye, 
  FileText, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Zap,
} from 'lucide-react'
import { Sidebar, Header, AdBanner } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { StatCard } from '@/components/stats/StatCard'
import { StatsChart, generateMockChartData } from '@/components/stats/StatsChart'
import { useUserStore } from '@/lib/store'
import { formatRelativeTime } from '@/lib/utils'

// Mock user data for demo
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

const recentSearches = [
  { username: '@elonmusk', platform: 'twitter', time: '2 saat önce' },
  { username: '@therock', platform: 'instagram', time: '5 saat önce' },
  { username: '@mrbeast', platform: 'youtube', time: '1 gün önce' },
]

const quickActions = [
  { icon: Search, label: 'Yeni Arama', href: '/search', color: 'from-purple-500 to-pink-500' },
  { icon: Eye, label: 'Takip Et', href: '/tracked', color: 'from-blue-500 to-cyan-500' },
  { icon: FileText, label: 'Rapor Oluştur', href: '/reports', color: 'from-green-500 to-emerald-500' },
  { icon: Bell, label: 'Uyarılar', href: '/notifications', color: 'from-orange-500 to-yellow-500' },
]

export default function DashboardPage() {
  const { user, setUser } = useUserStore()

  useEffect(() => {
    // Set mock user for demo
    if (!user) {
      setUser(mockUser)
    }
  }, [user, setUser])

  const chartData = generateMockChartData(7)

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          title="Dashboard" 
          description="Hoş geldiniz! İşte hesabınızın özeti."
        />

        <main className="flex-1 p-6 overflow-auto">
          {/* Ad Banner for Free Users */}
          {user?.subscription_tier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <AdBanner />
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickActions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative overflow-hidden rounded-xl p-4
                  bg-gradient-to-br ${action.color}
                  text-white shadow-lg
                `}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <action.icon className="w-8 h-8 mb-2" />
                <p className="font-semibold">{action.label}</p>
              </motion.a>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Toplam Arama"
              value={user?.total_searches || 15}
              change={12}
              changeLabel="bu hafta"
              icon={<Search className="w-5 h-5 text-purple-400" />}
              color="purple"
            />
            <StatCard
              title="Takip Edilen"
              value={8}
              change={3}
              changeLabel="yeni"
              icon={<Eye className="w-5 h-5 text-pink-400" />}
              color="pink"
            />
            <StatCard
              title="Raporlar"
              value={user?.monthly_reports_used || 0}
              icon={<FileText className="w-5 h-5 text-blue-400" />}
              color="blue"
            />
            <StatCard
              title="Kalan Arama"
              value={`${(user?.daily_searches_limit || 3) - (user?.daily_searches_used || 1)}`}
              icon={<Clock className="w-5 h-5 text-green-400" />}
              color="green"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <StatsChart
                title="Haftalık Aktivite"
                data={chartData}
                dataKeys={[
                  { key: 'takipci', color: '#a855f7', name: 'Takipçi' },
                  { key: 'etkilesim', color: '#ec4899', name: 'Etkileşim %' },
                ]}
                type="area"
              />
            </div>

            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle>Son Aramalar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={search.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {search.username[1].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{search.username}</p>
                        <p className="text-gray-500 text-sm">{search.platform}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{search.time}</span>
                  </motion.div>
                ))}

                <Button variant="ghost" className="w-full mt-2">
                  Tümünü Gör
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade Banner for Free Users */}
          {user?.subscription_tier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Premium&apos;a Yükselt</h3>
                      <p className="text-gray-400">Sınırsız arama ve tüm platformlara erişim</p>
                    </div>
                  </div>
                  <Button>
                    Planları Gör
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
