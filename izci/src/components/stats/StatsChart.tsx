'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ChartData {
  name: string
  [key: string]: string | number
}

interface StatsChartProps {
  title: string
  data: ChartData[]
  dataKeys: { key: string; color: string; name: string }[]
  type?: 'line' | 'area'
  height?: number
  className?: string
}

export function StatsChart({ 
  title, 
  data, 
  dataKeys, 
  type = 'area', 
  height = 300,
  className 
}: StatsChartProps) {
  const ChartComponent = type === 'area' ? AreaChart : LineChart
  const DataComponent = type === 'area' ? Area : Line

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ChartComponent data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {dataKeys.map((dk) => (
                <linearGradient key={dk.key} id={`color${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={dk.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '12px',
                color: '#fff',
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-gray-300">{value}</span>}
            />
            {dataKeys.map((dk) => (
              type === 'area' ? (
                <Area
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color${dk.key})`}
                />
              ) : (
                <Line
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color}
                  strokeWidth={2}
                  dot={{ fill: dk.color, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: dk.color }}
                />
              )
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Mock data generator for demos
export function generateMockChartData(days: number = 7): ChartData[] {
  const data: ChartData[] = []
  const baseFollowers = 10000
  const baseEngagement = 5

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    data.push({
      name: date.toLocaleDateString('tr-TR', { weekday: 'short' }),
      takipci: Math.floor(baseFollowers + Math.random() * 500 * (days - i)),
      etkilesim: +(baseEngagement + Math.random() * 2).toFixed(1),
      gonderi: Math.floor(Math.random() * 5) + 1,
    })
  }

  return data
}
