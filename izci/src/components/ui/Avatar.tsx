'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | null
  className?: string
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
}

export function Avatar({ src, alt, fallback, size = 'md', status, className }: AvatarProps) {
  const initials = fallback || alt?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn('relative inline-block', className)}
    >
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className={cn(
            'rounded-full object-cover ring-2 ring-gray-800',
            sizes[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-bold',
            'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
            'ring-2 ring-gray-800',
            sizes[size]
          )}
        >
          {initials}
        </div>
      )}
      
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-gray-900',
            statusColors[status],
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-2.5 h-2.5',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-4 h-4',
          )}
        />
      )}
    </motion.div>
  )
}
