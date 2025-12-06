'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Phone, 
  Video,
  Clock,
  Users,
  Heart,
  AlertTriangle,
  Moon,
  Sun,
  TrendingUp,
  ChevronRight,
  Lock,
  Sparkles
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ChatContact {
  id: string
  name: string
  avatar: string
  lastSeen: string
  totalMessages: number
  totalCalls: number
  totalVideoCalls: number
  avgResponseTime: string
  chatFrequency: 'high' | 'medium' | 'low'
  activeHours: string
  isSuspicious: boolean
  relationship?: string
}

interface WhatsAppAnalyzerProps {
  targetPhone?: string
  contacts?: ChatContact[]
  isPremium?: boolean
}

// Demo contacts - şüpheli iletişimler
const demoContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Gizemli Numara 💫',
    avatar: '👤',
    lastSeen: '5 dk önce',
    totalMessages: 2847,
    totalCalls: 45,
    totalVideoCalls: 12,
    avgResponseTime: '30 saniye',
    chatFrequency: 'high',
    activeHours: '23:00 - 03:00',
    isSuspicious: true,
    relationship: 'Bilinmiyor'
  },
  {
    id: '2',
    name: 'İş Arkadaşı Ayşe',
    avatar: '👩‍💼',
    lastSeen: '2 saat önce',
    totalMessages: 1523,
    totalCalls: 28,
    totalVideoCalls: 5,
    avgResponseTime: '2 dakika',
    chatFrequency: 'high',
    activeHours: '09:00 - 18:00',
    isSuspicious: false,
    relationship: 'İş'
  },
  {
    id: '3',
    name: 'Eski Okul Arkadaşı',
    avatar: '🎓',
    lastSeen: '30 dk önce',
    totalMessages: 892,
    totalCalls: 15,
    totalVideoCalls: 8,
    avgResponseTime: '1 dakika',
    chatFrequency: 'medium',
    activeHours: '20:00 - 01:00',
    isSuspicious: true,
    relationship: 'Okul'
  },
  {
    id: '4',
    name: 'Spor Salonu Hoca',
    avatar: '💪',
    lastSeen: '1 gün önce',
    totalMessages: 234,
    totalCalls: 8,
    totalVideoCalls: 0,
    avgResponseTime: '5 dakika',
    chatFrequency: 'low',
    activeHours: '07:00 - 22:00',
    isSuspicious: false,
    relationship: 'Spor'
  },
  {
    id: '5',
    name: 'Gece Kuşu 🦉',
    avatar: '🦉',
    lastSeen: '3 saat önce',
    totalMessages: 1876,
    totalCalls: 32,
    totalVideoCalls: 18,
    avgResponseTime: '45 saniye',
    chatFrequency: 'high',
    activeHours: '00:00 - 05:00',
    isSuspicious: true,
    relationship: 'Bilinmiyor'
  },
]

export function WhatsAppAnalyzer({ 
  targetPhone,
  contacts = demoContacts,
  isPremium = false 
}: WhatsAppAnalyzerProps) {
  const [showSuspicious, setShowSuspicious] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null)

  const filteredContacts = showSuspicious 
    ? contacts.filter(c => c.isSuspicious)
    : contacts

  const totalMessages = contacts.reduce((sum, c) => sum + c.totalMessages, 0)
  const totalCalls = contacts.reduce((sum, c) => sum + c.totalCalls, 0)
  const suspiciousCount = contacts.filter(c => c.isSuspicious).length

  const getFrequencyColor = (freq: string) => {
    switch (freq) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20'
      default: return 'text-gray-400'
    }
  }

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case 'high': return 'Çok Sık'
      case 'medium': return 'Orta'
      case 'low': return 'Az'
      default: return freq
    }
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-400" />
            WhatsApp Analizi
          </CardTitle>
          {!isPremium && (
            <Badge variant="premium" className="animate-pulse">
              <Lock className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
            <MessageCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalMessages.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Toplam Mesaj</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <Phone className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalCalls}</p>
            <p className="text-xs text-gray-400">Toplam Arama</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowSuspicious(!showSuspicious)}
            className={cn(
              "rounded-xl p-4 text-center cursor-pointer transition-all",
              showSuspicious 
                ? "bg-orange-500/20 border border-orange-500/40" 
                : "bg-orange-500/10 border border-orange-500/20"
            )}
          >
            <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-400">{suspiciousCount}</p>
            <p className="text-xs text-gray-400">Şüpheli Kişi</p>
          </motion.div>
        </div>

        {/* Warning Banner */}
        {suspiciousCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center gap-3"
          >
            <Moon className="w-5 h-5 text-orange-400" />
            <div className="flex-1">
              <p className="text-orange-400 text-sm font-medium">Dikkat!</p>
              <p className="text-gray-400 text-xs">
                {suspiciousCount} kişiyle gece saatlerinde yoğun iletişim tespit edildi
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowSuspicious(true)}
            >
              Göster
            </Button>
          </motion.div>
        )}

        {/* Contacts List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {!isPremium ? (
            // Blurred preview for non-premium
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                <Lock className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-white font-medium mb-2">WhatsApp Analizi Kilitli</p>
                <p className="text-gray-400 text-sm text-center mb-4 max-w-xs">
                  Kiminle ne kadar konuştuğunu, gece aktivitelerini ve şüpheli kişileri görmek için Premium'a geç
                </p>
                <Button>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Al
                </Button>
              </div>
              
              {/* Blurred content preview */}
              <div className="space-y-2 filter blur-sm">
                {contacts.slice(0, 3).map(contact => (
                  <div key={contact.id} className="p-3 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-32 mb-1" />
                        <div className="h-3 bg-gray-700 rounded w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Full content for premium users
            filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-all",
                  "hover:bg-gray-800/70",
                  contact.isSuspicious 
                    ? "bg-orange-500/5 border border-orange-500/20" 
                    : "bg-gray-800/50 border border-gray-700"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-2xl">
                      {contact.avatar}
                    </div>
                    {contact.isSuspicious && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium truncate">{contact.name}</p>
                      {contact.isSuspicious && (
                        <Badge variant="danger" className="text-xs py-0">⚠️</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {contact.totalMessages.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {contact.totalCalls}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {contact.totalVideoCalls}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <Badge 
                      className={cn(
                        "text-xs mb-1",
                        getFrequencyColor(contact.chatFrequency)
                      )}
                    >
                      {getFrequencyLabel(contact.chatFrequency)}
                    </Badge>
                    <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                      <Moon className="w-3 h-3" />
                      {contact.activeHours}
                    </p>
                  </div>
                </div>

                {/* Expanded details */}
                {selectedContact?.id === contact.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Ortalama Yanıt Süresi</p>
                        <p className="text-white font-medium">{contact.avgResponseTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Son Görülme</p>
                        <p className="text-white font-medium">{contact.lastSeen}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Aktif Saatler</p>
                        <p className={cn(
                          "font-medium",
                          contact.activeHours.includes('00:') || contact.activeHours.includes('01:') || contact.activeHours.includes('02:') || contact.activeHours.includes('03:')
                            ? "text-orange-400"
                            : "text-white"
                        )}>
                          {contact.activeHours}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">İlişki</p>
                        <p className={cn(
                          "font-medium",
                          contact.relationship === 'Bilinmiyor' ? "text-orange-400" : "text-white"
                        )}>
                          {contact.relationship || 'Bilinmiyor'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default WhatsAppAnalyzer
