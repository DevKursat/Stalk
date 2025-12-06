'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Heart, Users, MessageCircle, Plus, ExternalLink, Shield, Lock, CheckCircle } from 'lucide-react'
import { Card, Button, Avatar, Badge } from '@/components/ui'
import { SearchResultSkeleton } from '@/components/ui/Skeleton'
import { cn, formatNumber, getPlatformIcon } from '@/lib/utils'
import { useSearchStore, useUserStore } from '@/lib/store'

interface SearchResult {
  id: string
  username: string
  display_name: string
  platform: string
  avatar_url: string
  followers_count: number
  following_count: number
  posts_count: number
  engagement_rate: number
  is_verified: boolean
  is_private: boolean
}

export function SearchResults() {
  const { results, isSearching, platform } = useSearchStore()
  const { user } = useUserStore()

  if (isSearching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6"
      >
        <SearchResultSkeleton />
      </motion.div>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">
        {results.length} Sonuç Bulundu
      </h3>

      <AnimatePresence mode="popLayout">
        {results.map((result: SearchResult, index: number) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="group">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar src={result.avatar_url} alt={result.display_name} size="lg" />
                  <span className="absolute -bottom-1 -right-1 text-lg">
                    {getPlatformIcon(result.platform)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white truncate">{result.display_name}</h4>
                    {result.is_verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                    {result.is_private && (
                      <Badge variant="warning" size="sm">
                        <Lock className="w-3 h-3" /> Gizli
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">@{result.username}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium">{formatNumber(result.followers_count)}</span>
                      <span className="text-gray-500">takipçi</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium">{formatNumber(result.following_count)}</span>
                      <span className="text-gray-500">takip</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">{formatNumber(result.posts_count)}</span>
                      <span className="text-gray-500">gönderi</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">{result.engagement_rate}%</span>
                      <span className="text-gray-500">etkileşim</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Takibe Al
                  </Button>
                  <Button size="sm" variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
                    Detaylar
                  </Button>
                </div>
              </div>

              {/* Premium Features Preview (Blurred for free users) */}
              {user?.subscription_tier === 'free' && (
                <div className="relative mt-4 pt-4 border-t border-gray-800">
                  <div className="filter blur-sm pointer-events-none">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Son Aktivite</p>
                        <p className="text-white font-medium">2 saat önce</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hikaye Sayısı</p>
                        <p className="text-white font-medium">5 aktif</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trend Durumu</p>
                        <p className="text-green-400 font-medium">↑ Yükseliyor</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                    <Button size="sm" variant="primary" leftIcon={<Shield className="w-4 h-4" />}>
                      Premium ile Aç
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
