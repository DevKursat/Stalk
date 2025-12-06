'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card } from '@/components/ui'
import { cn, formatNumber } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  color?: 'purple' | 'pink' | 'blue' | 'green' | 'orange' | 'red'
}

const colors = {
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
}

export function StatCard({ title, value, change, changeLabel, icon, color = 'purple' }: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  const isNeutral = !change || change === 0

  return (
    <Card hover className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className={cn(
        'absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20',
        `bg-gradient-to-br ${colors[color]}`
      )} />

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
            `bg-gradient-to-br ${colors[color]} bg-opacity-20`
          )}>
            {icon}
          </div>
        )}

        {/* Title */}
        <p className="text-sm text-gray-400 mb-1">{title}</p>

        {/* Value */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          {typeof value === 'number' ? formatNumber(value) : value}
        </motion.p>

        {/* Change */}
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {isPositive && <TrendingUp className="w-4 h-4 text-green-400" />}
            {isNegative && <TrendingDown className="w-4 h-4 text-red-400" />}
            {isNeutral && <Minus className="w-4 h-4 text-gray-400" />}
            <span className={cn(
              'text-sm font-medium',
              isPositive && 'text-green-400',
              isNegative && 'text-red-400',
              isNeutral && 'text-gray-400'
            )}>
              {isPositive && '+'}{change}%
            </span>
            {changeLabel && (
              <span className="text-sm text-gray-500">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
