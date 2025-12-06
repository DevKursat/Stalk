'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, Mail, Lock, User, ArrowRight, Github, Chrome, Check } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (!agreeTerms) {
      setError('Kullanım şartlarını kabul etmelisiniz')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (error) throw error
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    'Günlük 3 ücretsiz arama',
    'Instagram profil analizi',
    'Temel metrikler ve istatistikler',
    'Reklam destekli kullanım',
  ]

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />

      <div className="w-full max-w-4xl relative">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Benefits Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex flex-col justify-center"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold gradient-text">İzci</span>
            </Link>

            <h2 className="text-3xl font-bold text-white mb-4">
              Sosyal medyayı
              <br />
              <span className="gradient-text">keşfetmeye başlayın</span>
            </h2>

            <p className="text-gray-400 mb-8">
              Ücretsiz hesap oluşturun ve hemen aramaya başlayın
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Register Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card glow className="p-8">
              <div className="md:hidden text-center mb-6">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">İzci</span>
                </Link>
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">Hesap Oluştur</h1>
              <p className="text-gray-400 mb-6">Ücretsiz başlayın, sonra yükseltin</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  name="fullName"
                  label="Ad Soyad"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  leftIcon={<User className="w-5 h-5" />}
                  required
                />

                <Input
                  name="email"
                  type="email"
                  label="E-posta"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  leftIcon={<Mail className="w-5 h-5" />}
                  required
                />

                <Input
                  name="password"
                  type="password"
                  label="Şifre"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  leftIcon={<Lock className="w-5 h-5" />}
                  required
                />

                <Input
                  name="confirmPassword"
                  type="password"
                  label="Şifre Tekrar"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  leftIcon={<Lock className="w-5 h-5" />}
                  required
                />

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <label className="flex items-start gap-3 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 rounded bg-gray-800 border-gray-700"
                  />
                  <span>
                    <Link href="/terms" className="text-purple-400 hover:underline">
                      Kullanım Şartları
                    </Link>
                    {' '}ve{' '}
                    <Link href="/privacy" className="text-purple-400 hover:underline">
                      Gizlilik Politikası
                    </Link>
                    &apos;nı kabul ediyorum
                  </span>
                </label>

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Ücretsiz Kayıt Ol
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-500">veya</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" leftIcon={<Chrome className="w-5 h-5" />}>
                  Google
                </Button>
                <Button variant="outline" leftIcon={<Github className="w-5 h-5" />}>
                  GitHub
                </Button>
              </div>

              <p className="text-center text-gray-400 text-sm mt-6">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Giriş Yap
                </Link>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
