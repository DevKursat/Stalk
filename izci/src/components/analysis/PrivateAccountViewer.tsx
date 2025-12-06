'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, 
  Unlock, 
  Eye, 
  Image, 
  Video, 
  Heart, 
  MessageCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Story {
  id: string
  type: 'image' | 'video'
  thumbnail: string
  timestamp: string
  views?: number
}

interface Post {
  id: string
  type: 'image' | 'video' | 'carousel'
  thumbnail: string
  likes: number
  comments: number
  timestamp: string
}

interface PrivateAccountViewerProps {
  username: string
  isPrivate: boolean
  stories?: Story[]
  posts?: Post[]
  isPremium?: boolean
}

// Demo data
const demoStories: Story[] = [
  { id: '1', type: 'image', thumbnail: '🌅', timestamp: '2 saat önce', views: 234 },
  { id: '2', type: 'video', thumbnail: '🎬', timestamp: '5 saat önce', views: 456 },
  { id: '3', type: 'image', thumbnail: '🍕', timestamp: '8 saat önce', views: 123 },
  { id: '4', type: 'image', thumbnail: '🎉', timestamp: '12 saat önce', views: 89 },
]

const demoPosts: Post[] = [
  { id: '1', type: 'image', thumbnail: '📸', likes: 1234, comments: 56, timestamp: '1 gün önce' },
  { id: '2', type: 'video', thumbnail: '🎥', likes: 2345, comments: 89, timestamp: '3 gün önce' },
  { id: '3', type: 'carousel', thumbnail: '🖼️', likes: 987, comments: 34, timestamp: '1 hafta önce' },
  { id: '4', type: 'image', thumbnail: '🌴', likes: 3456, comments: 123, timestamp: '2 hafta önce' },
  { id: '5', type: 'image', thumbnail: '🎂', likes: 5678, comments: 234, timestamp: '3 hafta önce' },
  { id: '6', type: 'video', thumbnail: '🎵', likes: 1111, comments: 45, timestamp: '1 ay önce' },
]

export function PrivateAccountViewer({ 
  username, 
  isPrivate = true,
  stories = demoStories,
  posts = demoPosts,
  isPremium = false 
}: PrivateAccountViewerProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleUnlock = () => {
    setIsUnlocking(true)
    setTimeout(() => setIsUnlocking(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isPrivate ? (
              <Lock className="w-5 h-5 text-red-400" />
            ) : (
              <Unlock className="w-5 h-5 text-green-400" />
            )}
            Gizli Hesap İçerikleri
          </CardTitle>
          {isPrivate && (
            <Badge variant="premium" className="animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Özellik
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Stories Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              Hikayeler
              <span className="text-gray-500 text-sm">({stories.length})</span>
            </h3>
            <Button variant="ghost" size="sm">
              Tümünü Gör <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => isPremium && setSelectedStory(story)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden cursor-pointer',
                  'bg-gradient-to-br from-purple-600 to-pink-600 p-[2px]',
                  isPremium ? 'hover:scale-105 transition-transform' : ''
                )}
              >
                <div className="w-full h-full bg-gray-900 rounded-xl flex flex-col items-center justify-center relative">
                  {!isPremium && (
                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <Lock className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <span className="text-3xl">{story.thumbnail}</span>
                  <div className="absolute bottom-1 left-1 right-1">
                    <p className="text-[10px] text-gray-400 text-center truncate">{story.timestamp}</p>
                  </div>
                  {story.type === 'video' && (
                    <div className="absolute top-1 right-1">
                      <Video className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Image className="w-4 h-4 text-blue-400" />
              Gönderiler
              <span className="text-gray-500 text-sm">({posts.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => isPremium && setSelectedPost(post)}
                className={cn(
                  'relative aspect-square rounded-lg overflow-hidden cursor-pointer',
                  'bg-gray-800',
                  isPremium ? 'hover:scale-105 transition-transform' : ''
                )}
              >
                {!isPremium && (
                  <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <Lock className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-800 to-gray-900">
                  {post.thumbnail}
                </div>
                
                {/* Overlay with stats */}
                {isPremium && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Heart className="w-4 h-4" />
                      {post.likes.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </div>
                  </div>
                )}

                {post.type === 'video' && (
                  <div className="absolute top-2 right-2">
                    <Video className="w-4 h-4 text-white drop-shadow-lg" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">Gizli İçerikleri Gör</h4>
                <p className="text-gray-400 text-sm">
                  Premium üyelikle @{username} hesabının tüm hikaye ve gönderilerini görüntüleyin
                </p>
              </div>
              <Button onClick={handleUnlock} isLoading={isUnlocking}>
                <Unlock className="w-4 h-4 mr-2" />
                Kilidi Aç
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <span className="text-8xl block mb-4">{selectedStory.thumbnail}</span>
              <p className="text-gray-400">{selectedStory.timestamp}</p>
              {selectedStory.views && (
                <p className="text-gray-500 text-sm mt-2">
                  <Eye className="w-4 h-4 inline mr-1" />
                  {selectedStory.views} görüntülenme
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default PrivateAccountViewer
