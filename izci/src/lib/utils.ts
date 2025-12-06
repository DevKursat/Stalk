import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diff = now.getTime() - target.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Az önce'
  if (minutes < 60) return `${minutes} dakika önce`
  if (hours < 24) return `${hours} saat önce`
  if (days < 7) return `${days} gün önce`
  
  return formatDate(date)
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    instagram: 'from-purple-500 via-pink-500 to-orange-500',
    whatsapp: 'from-green-500 to-green-600',
    tiktok: 'from-black to-gray-800',
    twitter: 'from-blue-400 to-blue-500',
    facebook: 'from-blue-600 to-blue-700',
    youtube: 'from-red-500 to-red-600',
    linkedin: 'from-blue-700 to-blue-800',
  }
  return colors[platform] || 'from-gray-500 to-gray-600'
}

export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    instagram: '📸',
    whatsapp: '💬',
    tiktok: '🎵',
    twitter: '🐦',
    facebook: '👥',
    youtube: '▶️',
    linkedin: '💼',
  }
  return icons[platform] || '🌐'
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateMockData() {
  const randomFollowers = Math.floor(Math.random() * 1000000) + 1000
  const randomFollowing = Math.floor(Math.random() * 5000) + 100
  const randomPosts = Math.floor(Math.random() * 2000) + 10
  const engagementRate = (Math.random() * 10 + 1).toFixed(2)
  
  return {
    followers_count: randomFollowers,
    following_count: randomFollowing,
    posts_count: randomPosts,
    engagement_rate: parseFloat(engagementRate),
    is_verified: Math.random() > 0.9,
    is_private: Math.random() > 0.7,
  }
}
