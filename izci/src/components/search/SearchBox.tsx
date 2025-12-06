'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Instagram, MessageCircle, Video, Twitter, Facebook, Youtube, Linkedin, Loader2, AlertCircle, Lock } from 'lucide-react'
import { Button, Input, Card, Badge } from '@/components/ui'
import { cn, getPlatformColor, generateMockData } from '@/lib/utils'
import { useSearchStore, useUserStore } from '@/lib/store'
import type { PlatformType } from '@/types/database'

const platforms: { id: PlatformType; name: string; icon: React.ElementType; color: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-purple-500 via-pink-500 to-orange-500' },
  { id: 'tiktok', name: 'TikTok', icon: Video, color: 'from-black to-gray-800' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-500' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-green-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800' },
]

const tierAccess: Record<string, PlatformType[]> = {
  free: ['instagram'],
  basic: ['instagram', 'tiktok'],
  premium: ['instagram', 'tiktok', 'twitter', 'youtube'],
  enterprise: ['instagram', 'whatsapp', 'tiktok', 'twitter', 'facebook', 'youtube', 'linkedin'],
}

export function SearchBox() {
  const { user } = useUserStore()
  const { query, platform, isSearching, setQuery, setPlatform, setSearching, setResults } = useSearchStore()
  const [error, setError] = useState<string | null>(null)
  
  const userTier = user?.subscription_tier || 'free'
  const allowedPlatforms = tierAccess[userTier] || tierAccess.free
  const remainingSearches = (user?.daily_searches_limit || 3) - (user?.daily_searches_used || 0)

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Lütfen bir kullanıcı adı girin')
      return
    }

    if (remainingSearches <= 0) {
      setError('Günlük arama limitinize ulaştınız. Premium\'a yükseltin!')
      return
    }

    setError(null)
    setSearching(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock results
    const mockResults = [
      {
        id: '1',
        username: query,
        display_name: query.charAt(0).toUpperCase() + query.slice(1),
        platform,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}`,
        ...generateMockData(),
      },
      {
        id: '2',
        username: query + '_official',
        display_name: query.charAt(0).toUpperCase() + query.slice(1) + ' Official',
        platform,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}_official`,
        ...generateMockData(),
      },
      {
        id: '3',
        username: query + '_real',
        display_name: 'The Real ' + query.charAt(0).toUpperCase() + query.slice(1),
        platform,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${query}_real`,
        ...generateMockData(),
      },
    ]

    setResults(mockResults)
    setSearching(false)
  }

  return (
    <Card className="overflow-visible" glow>
      {/* Platform Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {platforms.map((p) => {
          const isAllowed = allowedPlatforms.includes(p.id)
          const isSelected = platform === p.id
          
          return (
            <motion.button
              key={p.id}
              whileHover={isAllowed ? { scale: 1.05 } : undefined}
              whileTap={isAllowed ? { scale: 0.95 } : undefined}
              onClick={() => isAllowed && setPlatform(p.id)}
              disabled={!isAllowed}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
                isSelected && isAllowed && `bg-gradient-to-r ${p.color} text-white shadow-lg`,
                !isSelected && isAllowed && 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                !isAllowed && 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              )}
            >
              <p.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{p.name}</span>
              {!isAllowed && (
                <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-500" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Search Input */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="Kullanıcı adı veya numara girin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            leftIcon={<Search className="w-5 h-5" />}
            error={error || undefined}
          />
        </div>
        <Button
          onClick={handleSearch}
          isLoading={isSearching}
          disabled={isSearching || remainingSearches <= 0}
          className="min-w-[120px]"
        >
          {isSearching ? 'Aranıyor...' : 'Ara'}
        </Button>
      </div>

      {/* Search Info */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <span>Kalan arama:</span>
          <Badge variant={remainingSearches > 0 ? 'info' : 'danger'}>
            {remainingSearches} / {user?.daily_searches_limit || 3}
          </Badge>
        </div>
        
        {userTier === 'free' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 text-sm"
          >
            Premium ile sınırsız arama yapın →
          </motion.p>
        )}
      </div>
    </Card>
  )
}
