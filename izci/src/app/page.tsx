'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Eye, 
  Search, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Bell, 
  Lock,
  Instagram,
  MessageCircle,
  Video,
  Twitter,
  ChevronRight,
  Star,
  Check,
  ArrowRight,
} from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Search,
    title: 'Detaylı Profil Analizi',
    description: 'Kullanıcı adı ile kapsamlı profil bilgilerine anında erişin',
  },
  {
    icon: BarChart3,
    title: 'Takipçi İstatistikleri',
    description: 'Takipçi artış/azalış trendlerini grafiklerle görüntüleyin',
  },
  {
    icon: Bell,
    title: 'Anlık Uyarılar',
    description: 'Takip ettiğiniz profillerdeki değişikliklerden haberdar olun',
  },
  {
    icon: Shield,
    title: 'Gizlilik Odaklı',
    description: 'Tüm aramalarınız tamamen anonim ve güvenli',
  },
  {
    icon: Zap,
    title: 'Hızlı Sonuçlar',
    description: 'Saniyeler içinde detaylı sonuçlar alın',
  },
  {
    icon: Users,
    title: 'Çoklu Platform',
    description: 'Instagram, TikTok, WhatsApp ve daha fazlası',
  },
]

const platforms = [
  { icon: Instagram, name: 'Instagram', color: 'from-purple-500 to-pink-500' },
  { icon: Video, name: 'TikTok', color: 'from-gray-700 to-gray-900' },
  { icon: MessageCircle, name: 'WhatsApp', color: 'from-green-500 to-green-600' },
  { icon: Twitter, name: 'Twitter', color: 'from-blue-400 to-blue-500' },
]

const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: '/ay',
    description: 'Başlangıç için ideal',
    features: [
      'Günlük 3 arama',
      'Sadece Instagram',
      'Temel metrikler',
      'Reklam destekli',
    ],
    cta: 'Ücretsiz Başla',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₺149',
    period: '/ay',
    description: 'Profesyoneller için',
    features: [
      'Günlük 100 arama',
      '4 platform erişimi',
      'Detaylı analitik',
      'Anlık uyarılar',
      'PDF export',
      'Öncelikli destek',
      'Reklamsız deneyim',
    ],
    cta: 'Premium Al',
    popular: true,
  },
  {
    name: 'Kurumsal',
    price: '₺499',
    period: '/ay',
    description: 'Ajanslar için',
    features: [
      'Sınırsıza yakın arama',
      'Tüm platformlar',
      'API erişimi',
      'White-label',
      'Takım yönetimi',
      '7/24 destek',
    ],
    cta: 'İletişime Geç',
    popular: false,
  },
]

const testimonials = [
  {
    name: 'Ahmet Y.',
    role: 'Sosyal Medya Yöneticisi',
    content: 'Rakip analizi için vazgeçilmez bir araç. Müşterilerime çok daha iyi hizmet verebiliyorum.',
    rating: 5,
  },
  {
    name: 'Zeynep K.',
    role: 'İçerik Üreticisi',
    content: 'Takipçi değişimlerimi anlık takip edebiliyorum. Hangi içeriklerin daha çok ilgi çektiğini görüyorum.',
    rating: 5,
  },
  {
    name: 'Mert D.',
    role: 'Dijital Pazarlamacı',
    content: 'Premium özellikleri gerçekten değer. Yatırımın karşılığını fazlasıyla alıyorum.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen animated-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">İzci</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Özellikler</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Fiyatlar</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Yorumlar</a>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Giriş Yap</Button>
              </Link>
              <Link href="/register">
                <Button>Ücretsiz Başla</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="premium" className="mb-6">
              <Zap className="w-3 h-3" /> Yeni: WhatsApp desteği eklendi!
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Sosyal Medyayı
              <br />
              <span className="gradient-text">Keşfedin</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Instagram, TikTok, WhatsApp ve daha fazlası için güçlü analiz araçları. 
              Profilleri derinlemesine analiz edin, trendleri takip edin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Ücretsiz Deneyin
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Özellikleri Keşfet
                </Button>
              </Link>
            </div>

            {/* Platform Icons */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {platforms.map((platform, i) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center',
                    'bg-gradient-to-br ' + platform.color
                  )}
                >
                  <platform.icon className="w-7 h-7 text-white" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image/Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-xl shadow-2xl glow-purple">
              <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-sm">izci.app/search</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-12 bg-gray-800 rounded-xl flex items-center px-4 gap-3">
                    <Search className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-400">@kullaniciadi</span>
                  </div>
                  <div className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center text-white font-semibold">
                    Ara
                  </div>
                </div>
                
                {/* Mock Result */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">@ornekkullanici</h3>
                      <p className="text-gray-400 text-sm">Örnek Kullanıcı</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">125K</p>
                      <p className="text-gray-500 text-sm">takipçi</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-xl font-bold text-white">342</p>
                      <p className="text-xs text-gray-500">Gönderi</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-xl font-bold text-white">1.2K</p>
                      <p className="text-xs text-gray-500">Takip</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-xl font-bold text-green-400">+5.2%</p>
                      <p className="text-xs text-gray-500">Büyüme</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <p className="text-xl font-bold text-purple-400">8.4%</p>
                      <p className="text-xs text-gray-500">Etkileşim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Güçlü Özellikler</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sosyal medya analizi için ihtiyacınız olan tüm araçlar tek bir platformda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover glow className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Basit Fiyatlandırma</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              İhtiyacınıza uygun planı seçin. İstediğiniz zaman yükseltin veya iptal edin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative rounded-2xl p-8 border',
                  plan.popular 
                    ? 'bg-gradient-to-b from-purple-900/50 to-gray-900 border-purple-500 scale-105'
                    : 'bg-gray-900 border-gray-800'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="premium">En Popüler</Badge>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Kullanıcılarımız Ne Diyor?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Binlerce kullanıcı İzci ile sosyal medyayı daha iyi anlıyor
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
            
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Hemen Başlayın
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Ücretsiz hesap oluşturun ve sosyal medya analizinin gücünü keşfedin
              </p>
              <Link href="/register">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Ücretsiz Hesap Oluştur
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">İzci</span>
            </div>

            <nav className="flex items-center gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
              <a href="#" className="hover:text-white transition-colors">Şartlar</a>
              <a href="#" className="hover:text-white transition-colors">İletişim</a>
            </nav>

            <p className="text-gray-500 text-sm">
              © 2024 İzci. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
