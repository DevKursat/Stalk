'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Heart, 
  MessageCircle, 
  Eye, 
  Video,
  Image,
  Clock,
  TrendingUp,
  Moon,
  Sun,
  AlertTriangle,
  Filter,
  Play
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'like' | 'comment' | 'view' | 'story_view'
  targetUsername: string
  targetAvatar: string
  contentType: 'image' | 'video' | 'story' | 'reel'
  timestamp: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  comment?: string
}

interface ActivityTrackerProps {
  username: string
  activities?: ActivityItem[]
  isPremium?: boolean
}

// Demo data - şüpheli aktiviteler
const demoActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'like',
    targetUsername: 'guzel_kiz_istanbul',
    targetAvatar: '👩‍🦰',
    contentType: 'image',
    timestamp: '02:34',
    timeOfDay: 'night',
  },
  {
    id: '2',
    type: 'comment',
    targetUsername: 'fitness_queen',
    targetAvatar: '💪',
    contentType: 'image',
    timestamp: '02:15',
    timeOfDay: 'night',
    comment: '🔥🔥🔥',
  },
  {
    id: '3',
    type: 'story_view',
    targetUsername: 'gizli_hesap_x',
    targetAvatar: '🔒',
    contentType: 'story',
    timestamp: '01:45',
    timeOfDay: 'night',
  },
  {
    id: '4',
    type: 'like',
    targetUsername: 'model_ayse',
    targetAvatar: '👗',
    contentType: 'reel',
    timestamp: '01:20',
    timeOfDay: 'night',
  },
  {
    id: '5',
    type: 'view',
    targetUsername: 'dans_krali',
    targetAvatar: '💃',
    contentType: 'video',
    timestamp: '23:55',
    timeOfDay: 'night',
  },
  {
    id: '6',
    type: 'like',
    targetUsername: 'beach_photos',
    targetAvatar: '🏖️',
    contentType: 'image',
    timestamp: '18:30',
    timeOfDay: 'evening',
  },
  {
    id: '7',
    type: 'comment',
    targetUsername: 'komik_videolar',
    targetAvatar: '😂',
    contentType: 'video',
    timestamp: '15:20',
    timeOfDay: 'afternoon',
    comment: 'Çok komik 😂',
  },
  {
    id: '8',
    type: 'story_view',
    targetUsername: 'eski_sevgili',
    targetAvatar: '💔',
    contentType: 'story',
    timestamp: '03:10',
    timeOfDay: 'night',
  },
]

export function ActivityTracker({ 
  username, 
  activities = demoActivities,
  isPremium = false 
}: ActivityTrackerProps) {
  const [filter, setFilter] = useState<'all' | 'like' | 'comment' | 'view'>('all')
  const [showNightOnly, setShowNightOnly] = useState(false)

  const filteredActivities = activities.filter(activity => {
    if (filter === 'like' && activity.type !== 'like') return false
    if (filter === 'comment' && activity.type !== 'comment') return false
    if (filter === 'view' && activity.type !== 'view' && activity.type !== 'story_view') return false
    if (showNightOnly && activity.timeOfDay !== 'night') return false
    return true
  })

  const stats = {
    totalLikes: activities.filter(a => a.type === 'like').length,
    totalComments: activities.filter(a => a.type === 'comment').length,
    totalViews: activities.filter(a => a.type === 'view' || a.type === 'story_view').length,
    nightActivity: activities.filter(a => a.timeOfDay === 'night').length,
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart
      case 'comment': return MessageCircle
      case 'view': return Eye
      case 'story_view': return Eye
      default: return Activity
    }
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'reel': return Play
      case 'story': return Clock
      default: return Image
    }
  }

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'night': return Moon
      case 'morning': return Sun
      default: return Sun
    }
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Aktivite Takibi
            <Badge variant="danger" className="ml-2 animate-pulse">
              <Moon className="w-3 h-3 mr-1" />
              {stats.nightActivity} gece aktivitesi
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Activity Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilter('like')}
            className={cn(
              "p-3 rounded-xl text-center cursor-pointer transition-all",
              filter === 'like' 
                ? "bg-red-500/20 border border-red-500/40" 
                : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
            )}
          >
            <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.totalLikes}</p>
            <p className="text-xs text-gray-400">Beğeni</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilter('comment')}
            className={cn(
              "p-3 rounded-xl text-center cursor-pointer transition-all",
              filter === 'comment' 
                ? "bg-blue-500/20 border border-blue-500/40" 
                : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
            )}
          >
            <MessageCircle className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.totalComments}</p>
            <p className="text-xs text-gray-400">Yorum</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilter('view')}
            className={cn(
              "p-3 rounded-xl text-center cursor-pointer transition-all",
              filter === 'view' 
                ? "bg-purple-500/20 border border-purple-500/40" 
                : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
            )}
          >
            <Eye className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.totalViews}</p>
            <p className="text-xs text-gray-400">İzleme</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowNightOnly(!showNightOnly)}
            className={cn(
              "p-3 rounded-xl text-center cursor-pointer transition-all",
              showNightOnly 
                ? "bg-orange-500/20 border border-orange-500/40" 
                : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
            )}
          >
            <Moon className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-white">{stats.nightActivity}</p>
            <p className="text-xs text-gray-400">Gece</p>
          </motion.div>
        </div>

        {/* Night Activity Warning */}
        {stats.nightActivity > 3 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <div className="flex-1">
              <p className="text-orange-400 text-sm font-medium">Şüpheli Gece Aktivitesi!</p>
              <p className="text-gray-400 text-xs">
                @{username} gece 00:00-05:00 arasında {stats.nightActivity} aktivite gerçekleştirdi
              </p>
            </div>
          </motion.div>
        )}

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => { setFilter('all'); setShowNightOnly(false); }}
          >
            Tümü
          </Button>
          <Button 
            variant={showNightOnly ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setShowNightOnly(!showNightOnly)}
          >
            <Moon className="w-3 h-3 mr-1" />
            Sadece Gece
          </Button>
        </div>

        {/* Activity List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type)
              const ContentIcon = getContentIcon(activity.contentType)
              const TimeIcon = getTimeIcon(activity.timeOfDay)
              const isNight = activity.timeOfDay === 'night'
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl",
                    "hover:bg-gray-800/50 transition-colors",
                    isNight && "border border-orange-500/20 bg-orange-500/5"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                      {activity.targetAvatar}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                      activity.type === 'like' && "bg-red-500",
                      activity.type === 'comment' && "bg-blue-500",
                      (activity.type === 'view' || activity.type === 'story_view') && "bg-purple-500"
                    )}>
                      <ActivityIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm">
                        <span className="text-gray-400">@{activity.targetUsername}</span>
                        {activity.type === 'like' && " beğendi"}
                        {activity.type === 'comment' && " yorum yaptı"}
                        {activity.type === 'view' && " izledi"}
                        {activity.type === 'story_view' && " hikaye izledi"}
                      </p>
                      {isNight && (
                        <Moon className="w-3 h-3 text-orange-400" />
                      )}
                    </div>
                    {activity.comment && (
                      <p className="text-gray-500 text-xs truncate">"{activity.comment}"</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <ContentIcon className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500 capitalize">{activity.contentType}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className={cn(
                    "text-right px-2 py-1 rounded",
                    isNight && "bg-orange-500/20"
                  )}>
                    <p className={cn(
                      "text-sm font-mono",
                      isNight ? "text-orange-400" : "text-gray-400"
                    )}>
                      {activity.timestamp}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Bu kriterlere uygun aktivite bulunamadı</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityTracker
