'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Giriş yapılırken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">İzci</span>
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card glow className="p-8">
            <h1 className="text-2xl font-bold text-white mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-400 mb-6">Hesabınıza giriş yapın</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                label="E-posta"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              <Input
                type="password"
                label="Şifre"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="rounded bg-gray-800 border-gray-700" />
                  Beni hatırla
                </label>
                <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                  Şifremi unuttum
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Giriş Yap
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

            {/* Demo Login Button */}
            <Button
              type="button"
              variant="secondary"
              className="w-full mb-4"
              onClick={handleDemoLogin}
            >
              Demo Hesabı ile Dene
            </Button>

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
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium">
                Ücretsiz Kayıt Ol
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
