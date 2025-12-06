'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, 
  UserMinus, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Filter,
  Search,
  AlertCircle,
  Clock,
  ChevronDown,
  Instagram,
  Twitter
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

interface FollowChange {
  id: string
  username: string
  displayName: string
  avatar: string
  type: 'follow' | 'unfollow'
  timestamp: string
  platform: 'instagram' | 'tiktok' | 'twitter'
  mutualFollowers?: number
  isVerified?: boolean
}

interface FollowTrackerProps {
  targetUsername: string
  changes?: FollowChange[]
  isPremium?: boolean
}

// Demo data - şüpheli aktivite göstergeleri
const demoChanges: FollowChange[] = [
  { 
    id: '1', 
    username: 'gizemli_kiz_99', 
    displayName: 'Gizemli Kız 👀', 
    avatar: '👩', 
    type: 'follow', 
    timestamp: '2 saat önce',
    platform: 'instagram',
    mutualFollowers: 0,
    isVerified: false
  },
  { 
    id: '2', 
    username: 'yakisikli_ahmet', 
    displayName: 'Ahmet Y.', 
    avatar: '👨', 
    type: 'follow', 
    timestamp: '5 saat önce',
    platform: 'instagram',
    mutualFollowers: 3,
    isVerified: false
  },
  { 
    id: '3', 
    username: 'eski_arkadas', 
    displayName: 'Eski Arkadaş', 
    avatar: '🧑', 
    type: 'unfollow', 
    timestamp: '1 gün önce',
    platform: 'instagram',
    mutualFollowers: 15,
    isVerified: false
  },
  { 
    id: '4', 
    username: 'fitness_kocu', 
    displayName: 'Fitness Koçu 💪', 
    avatar: '🏋️', 
    type: 'follow', 
    timestamp: '2 gün önce',
    platform: 'instagram',
    mutualFollowers: 1,
    isVerified: true
  },
  { 
    id: '5', 
    username: 'gece_kusu', 
    displayName: 'Gece Kuşu 🦉', 
    avatar: '🦉', 
    type: 'follow', 
    timestamp: '3 gün önce',
    platform: 'tiktok',
    mutualFollowers: 0,
    isVerified: false
  },
  { 
    id: '6', 
    username: 'model_ayse', 
    displayName: 'Ayşe Model', 
    avatar: '💃', 
    type: 'follow', 
    timestamp: '4 gün önce',
    platform: 'instagram',
    mutualFollowers: 2,
    isVerified: false
  },
  { 
    id: '7', 
    username: 'universite_grubu', 
    displayName: 'Üniversite Arkadaşı', 
    avatar: '🎓', 
    type: 'unfollow', 
    timestamp: '5 gün önce',
    platform: 'twitter',
    mutualFollowers: 8,
    isVerified: false
  },
]

export function FollowTracker({ 
  targetUsername, 
  changes = demoChanges,
  isPremium = false 
}: FollowTrackerProps) {
  const [filter, setFilter] = useState<'all' | 'follow' | 'unfollow'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuspicious, setShowSuspicious] = useState(false)

  const filteredChanges = changes.filter(change => {
    if (filter !== 'all' && change.type !== filter) return false
    if (searchQuery && !change.username.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (showSuspicious && change.mutualFollowers !== 0) return false
    return true
  })

  const follows = changes.filter(c => c.type === 'follow').length
  const unfollows = changes.filter(c => c.type === 'unfollow').length
  const suspicious = changes.filter(c => c.mutualFollowers === 0 && c.type === 'follow').length

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'twitter': return Twitter
      default: return Users
    }
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Takip Değişiklikleri
          </CardTitle>
          <Badge variant="default">
            Son 7 gün
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center cursor-pointer"
            onClick={() => setFilter('follow')}
          >
            <UserPlus className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-400">{follows}</p>
            <p className="text-xs text-gray-400">Yeni Takip</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center cursor-pointer"
            onClick={() => setFilter('unfollow')}
          >
            <UserMinus className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-400">{unfollows}</p>
            <p className="text-xs text-gray-400">Takipten Çıkma</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              "border rounded-xl p-4 text-center cursor-pointer transition-colors",
              showSuspicious 
                ? "bg-orange-500/20 border-orange-500/40" 
                : "bg-orange-500/10 border-orange-500/20"
            )}
            onClick={() => setShowSuspicious(!showSuspicious)}
          >
            <AlertCircle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-400">{suspicious}</p>
            <p className="text-xs text-gray-400">Şüpheli</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tümü
          </Button>
        </div>

        {/* Changes List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredChanges.map((change, index) => {
              const PlatformIcon = getPlatformIcon(change.platform)
              const isSuspicious = change.mutualFollowers === 0 && change.type === 'follow'
              
              return (
                <motion.div
                  key={change.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors",
                    "hover:bg-gray-800/50 cursor-pointer",
                    isSuspicious && "border border-orange-500/30 bg-orange-500/5"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                      change.type === 'follow' 
                        ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20" 
                        : "bg-gradient-to-br from-red-500/20 to-rose-500/20"
                    )}>
                      {change.avatar}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                      change.type === 'follow' ? "bg-green-500" : "bg-red-500"
                    )}>
                      {change.type === 'follow' ? (
                        <ArrowUpRight className="w-3 h-3 text-white" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium truncate">
                        @{change.username}
                      </p>
                      {change.isVerified && (
                        <Badge variant="info" className="text-xs py-0 px-1">✓</Badge>
                      )}
                      {isSuspicious && (
                        <Badge variant="danger" className="text-xs py-0 px-1 animate-pulse">
                          ⚠️ Şüpheli
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <PlatformIcon className="w-3 h-3" />
                      <span>{change.displayName}</span>
                      {change.mutualFollowers !== undefined && (
                        <span className="text-xs">
                          • {change.mutualFollowers} ortak takipçi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-medium",
                      change.type === 'follow' ? "text-green-400" : "text-red-400"
                    )}>
                      {change.type === 'follow' ? 'Takip Etti' : 'Çıkardı'}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {change.timestamp}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredChanges.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Bu kriterlere uygun değişiklik bulunamadı</p>
            </div>
          )}
        </div>

        {/* Premium Alert */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Daha Fazla Geçmiş Görmek İster misin?</p>
                <p className="text-gray-400 text-xs">Premium ile 90 güne kadar geçmiş takip değişikliklerini gör</p>
              </div>
              <Button size="sm">Premium Al</Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default FollowTracker
