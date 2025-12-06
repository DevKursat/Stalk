'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Search,
  Users,
  FileText,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  X,
  Crown,
  TrendingUp,
  Eye,
  Activity,
  Lock,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore, useUserStore } from '@/lib/store'
import { Avatar, Badge } from '@/components/ui'

const menuItems = [
  { href: '/dashboard', icon: Home, label: 'Ana Sayfa' },
  { href: '/analyze', icon: Eye, label: 'Profil Analizi', highlight: true },
  { href: '/search', icon: Search, label: 'Hızlı Arama' },
  { href: '/tracked', icon: Users, label: 'Takip Listesi' },
  { href: '/activity', icon: Activity, label: 'Aktiviteler' },
]

const bottomItems = [
  { href: '/pricing', icon: CreditCard, label: 'Abonelik' },
  { href: '/notifications', icon: Bell, label: 'Bildirimler' },
  { href: '/settings', icon: Settings, label: 'Ayarlar' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isSidebarOpen, toggleSidebar } = useUIStore()
  const { user } = useUserStore()

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg lg:hidden"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -280,
          width: isSidebarOpen ? 280 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen',
          'bg-gray-950/95 backdrop-blur-xl border-r border-gray-800',
          'flex flex-col',
          'lg:relative lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
            >
              <Eye className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              İzci
            </span>
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar src={user.avatar_url} alt={user.full_name || ''} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.full_name || 'Kullanıcı'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={user.subscription_tier === 'free' ? 'default' : 'premium'} 
                    size="sm"
                  >
                    {user.subscription_tier === 'free' && 'Ücretsiz'}
                    {user.subscription_tier === 'basic' && 'Temel'}
                    {user.subscription_tier === 'premium' && (
                      <><Crown className="w-3 h-3" /> Premium</>
                    )}
                    {user.subscription_tier === 'enterprise' && (
                      <><Crown className="w-3 h-3" /> Kurumsal</>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Usage Stats */}
            <div className="mt-3 p-3 bg-gray-900 rounded-lg">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Günlük Arama</span>
                <span>{user.daily_searches_used}/{user.daily_searches_limit}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(user.daily_searches_used / user.daily_searches_limit) * 100}%` 
                  }}
                  className={cn(
                    'h-full rounded-full',
                    user.daily_searches_used >= user.daily_searches_limit 
                      ? 'bg-red-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const isHighlight = 'highlight' in item && item.highlight
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : isHighlight
                        ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/50 hover:from-purple-600/40 hover:to-pink-600/40'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <item.icon className={cn('w-5 h-5', (isActive || isHighlight) && 'text-purple-400')} />
                  <span className="font-medium">{item.label}</span>
                  {isHighlight && !isActive && (
                    <span className="ml-auto text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                      Yeni
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-800 space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
          
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış Yap</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
}
