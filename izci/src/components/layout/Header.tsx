'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, Moon, Sun } from 'lucide-react'
import { useUIStore, useUserStore } from '@/lib/store'
import { Avatar, Badge, Button } from '@/components/ui'

interface HeaderProps {
  title?: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const { theme, setTheme } = useUIStore()
  const { user } = useUserStore()

  return (
    <header className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              {title}
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm mt-1"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Quick Search */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700 transition-colors"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Hızlı arama...</span>
            <kbd className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">⌘K</kbd>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* User Menu */}
          {user && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 pl-4 border-l border-gray-800 cursor-pointer"
            >
              <Avatar src={user.avatar_url} alt={user.full_name || ''} size="sm" status="online" />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">{user.full_name || 'Kullanıcı'}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
