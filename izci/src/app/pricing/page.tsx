'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Check, 
  Crown, 
  Zap, 
  Shield, 
  Clock,
  BarChart3,
  Bell,
  Download,
  Users,
  Headphones,
  Code,
  Star,
} from 'lucide-react'
import { Sidebar, Header } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { useUserStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const mockUser = {
  id: 'demo-user',
  email: 'demo@izci.app',
  full_name: 'Demo Kullanıcı',
  avatar_url: null,
  phone: null,
  country: 'TR',
  language: 'tr',
  timezone: 'Europe/Istanbul',
  subscription_tier: 'free' as const,
  subscription_status: 'active' as const,
  subscription_started_at: null,
  subscription_expires_at: null,
  daily_searches_used: 1,
  daily_searches_limit: 3,
  monthly_reports_used: 0,
  monthly_reports_limit: 1,
  last_search_at: new Date().toISOString(),
  last_login_at: new Date().toISOString(),
  total_searches: 15,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const plans = [
  {
    id: 'free',
    name: 'Ücretsiz',
    description: 'Başlangıç için ideal',
    price: { monthly: 0, yearly: 0 },
    features: [
      { icon: Clock, text: 'Günlük 3 arama' },
      { icon: Shield, text: 'Sadece Instagram' },
      { icon: BarChart3, text: 'Temel metrikler' },
      { icon: Users, text: 'Aylık 1 rapor' },
    ],
    limitations: [
      'Reklam destekli',
      'Sınırlı analitik',
      'E-posta desteği yok',
    ],
    cta: 'Mevcut Plan',
    popular: false,
    color: 'gray',
  },
  {
    id: 'basic',
    name: 'Temel',
    description: 'Bireysel kullanıcılar için',
    price: { monthly: 49.99, yearly: 479.99 },
    features: [
      { icon: Clock, text: 'Günlük 20 arama' },
      { icon: Shield, text: 'Instagram + TikTok' },
      { icon: BarChart3, text: 'Detaylı metrikler' },
      { icon: Users, text: 'Aylık 10 rapor' },
      { icon: Download, text: 'PDF export' },
    ],
    limitations: [],
    cta: 'Temel Başla',
    popular: false,
    color: 'blue',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Profesyoneller için',
    price: { monthly: 149.99, yearly: 1439.99 },
    features: [
      { icon: Clock, text: 'Günlük 100 arama' },
      { icon: Shield, text: '4 platform erişimi' },
      { icon: BarChart3, text: 'Gelişmiş analitik' },
      { icon: Users, text: 'Aylık 50 rapor' },
      { icon: Bell, text: 'Anlık uyarılar' },
      { icon: Download, text: 'PDF & Excel export' },
      { icon: Headphones, text: 'Öncelikli destek' },
    ],
    limitations: [],
    cta: 'Premium Al',
    popular: true,
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    description: 'Ajanslar ve işletmeler için',
    price: { monthly: 499.99, yearly: 4799.99 },
    features: [
      { icon: Clock, text: 'Sınırsıza yakın arama' },
      { icon: Shield, text: 'Tüm platformlar' },
      { icon: BarChart3, text: 'Tam analitik suite' },
      { icon: Users, text: 'Aylık 500 rapor' },
      { icon: Bell, text: 'Gelişmiş uyarılar' },
      { icon: Code, text: 'API erişimi' },
      { icon: Headphones, text: '7/24 VIP destek' },
      { icon: Star, text: 'White-label seçeneği' },
    ],
    limitations: [],
    cta: 'İletişime Geç',
    popular: false,
    color: 'orange',
  },
]

const faqs = [
  {
    q: 'Ücretsiz plan ne kadar süre kullanılabilir?',
    a: 'Ücretsiz plan süresiz olarak kullanılabilir. Daha fazla özellik için istediğiniz zaman yükseltebilirsiniz.',
  },
  {
    q: 'Ödeme yöntemleri nelerdir?',
    a: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Kurumsal müşteriler için fatura kesiyoruz.',
  },
  {
    q: 'İstediğim zaman iptal edebilir miyim?',
    a: 'Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal tarihine kadar tüm özelliklere erişmeye devam edersiniz.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Tüm verileriniz şifrelenerek saklanır. KVKK ve GDPR uyumlu güvenlik önlemleri uyguluyoruz.',
  },
]

export default function PricingPage() {
  const { user, setUser } = useUserStore()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    if (!user) {
      setUser(mockUser)
    }
  }, [user, setUser])

  const currentPlan = user?.subscription_tier || 'free'

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          title="Abonelik Planları" 
          description="İhtiyacınıza uygun planı seçin"
        />

        <main className="flex-1 p-6 overflow-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={cn('text-sm', billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500')}>
              Aylık
            </span>
            <button
              onClick={() => setBillingPeriod(bp => bp === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-gray-800 rounded-full p-1"
            >
              <motion.div
                animate={{ x: billingPeriod === 'yearly' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-purple-500 rounded-full"
              />
            </button>
            <span className={cn('text-sm', billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500')}>
              Yıllık
              <Badge variant="success" size="sm" className="ml-2">2 Ay Bedava</Badge>
            </span>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {plans.map((plan, index) => {
              const isCurrentPlan = currentPlan === plan.id
              const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge variant="premium">
                        <Crown className="w-3 h-3 mr-1" /> En Popüler
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={cn(
                      'h-full',
                      plan.popular && 'border-purple-500 ring-2 ring-purple-500/20',
                      isCurrentPlan && 'border-green-500/50'
                    )}
                    glow={plan.popular}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-gray-400 text-sm">{plan.description}</p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">
                          ₺{price.toFixed(0)}
                        </span>
                        {price > 0 && (
                          <span className="text-gray-500">
                            /{billingPeriod === 'monthly' ? 'ay' : 'yıl'}
                          </span>
                        )}
                      </div>
                      {billingPeriod === 'yearly' && price > 0 && (
                        <p className="text-gray-500 text-sm mt-1">
                          (₺{(price / 12).toFixed(0)}/ay)
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-center gap-2 text-sm">
                          <feature.icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-300">{feature.text}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="w-4 h-4 flex items-center justify-center">•</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isCurrentPlan ? 'secondary' : plan.popular ? 'primary' : 'outline'}
                      className="w-full"
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? (
                        <>
                          <Check className="w-4 h-4 mr-1" /> Mevcut Plan
                        </>
                      ) : (
                        plan.cta
                      )}
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Features Comparison */}
          <Card className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Özellik Karşılaştırması</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Özellik</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Ücretsiz</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Temel</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Premium</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Kurumsal</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Günlük Arama', values: ['3', '20', '100', 'Sınırsız'] },
                    { feature: 'Platform Erişimi', values: ['1', '2', '4', 'Tümü'] },
                    { feature: 'Aylık Rapor', values: ['1', '10', '50', '500'] },
                    { feature: 'Anlık Uyarılar', values: [false, false, true, true] },
                    { feature: 'PDF Export', values: [false, true, true, true] },
                    { feature: 'API Erişimi', values: [false, false, false, true] },
                    { feature: 'Öncelikli Destek', values: [false, false, true, true] },
                    { feature: 'White-label', values: [false, false, false, true] },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-gray-800/50">
                      <td className="py-3 px-4 text-white">{row.feature}</td>
                      {row.values.map((value, i) => (
                        <td key={i} className="text-center py-3 px-4">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-600">—</span>
                            )
                          ) : (
                            <span className="text-gray-300">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* FAQ */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="font-medium text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
