'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

interface AdBannerProps {
  variant?: 'horizontal' | 'vertical' | 'square'
  className?: string
  onClose?: () => void
  closeable?: boolean
}

const mockAds = [
  {
    title: '🚀 Premium\'a Yükselt!',
    description: 'Sınırsız arama ve tüm platformlara erişim',
    cta: 'Hemen Başla',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    title: '🎁 %50 İndirim!',
    description: 'Yıllık planlarda büyük tasarruf',
    cta: 'İndirimi Al',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: '⚡ 7 Gün Ücretsiz Dene',
    description: 'Tüm premium özelliklere eriş',
    cta: 'Ücretsiz Başla',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

export function AdBanner({ variant = 'horizontal', className, onClose, closeable = true }: AdBannerProps) {
  const ad = mockAds[Math.floor(Math.random() * mockAds.length)]
  
  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          'relative overflow-hidden rounded-xl p-4',
          `bg-gradient-to-r ${ad.gradient}`,
          className
        )}
      >
        {closeable && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white">{ad.title}</h3>
            <p className="text-white/80 text-sm">{ad.description}</p>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 border-white/30 hover:bg-white/30">
            {ad.cta}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -left-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      </motion.div>
    )
  }

  if (variant === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          'relative overflow-hidden rounded-xl p-6',
          `bg-gradient-to-b ${ad.gradient}`,
          className
        )}
      >
        {closeable && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <div className="space-y-4">
          <h3 className="font-bold text-white text-xl">{ad.title}</h3>
          <p className="text-white/80">{ad.description}</p>
          <Button variant="secondary" className="w-full bg-white/20 border-white/30 hover:bg-white/30">
            {ad.cta}
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      </motion.div>
    )
  }

  // Square variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative overflow-hidden rounded-xl p-6 aspect-square flex flex-col justify-center items-center text-center',
        `bg-gradient-to-br ${ad.gradient}`,
        className
      )}
    >
      {closeable && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <h3 className="font-bold text-white text-lg mb-2">{ad.title}</h3>
      <p className="text-white/80 text-sm mb-4">{ad.description}</p>
      <Button variant="secondary" size="sm" className="bg-white/20 border-white/30 hover:bg-white/30">
        {ad.cta}
      </Button>

      {/* Decorative */}
      <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
    </motion.div>
  )
}
