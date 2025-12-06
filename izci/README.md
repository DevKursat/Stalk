# 🔍 İzci - Sosyal Medya Analiz Platformu

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase" />
</div>

<br/>

<div align="center">
  <h3>Instagram, TikTok, WhatsApp ve daha fazlası için güçlü sosyal medya analiz aracı</h3>
</div>

---

## ✨ Özellikler

### 🔍 Profil Analizi
- Kullanıcı adı ile kapsamlı profil bilgilerine erişim
- Takipçi, takip, gönderi sayıları
- Etkileşim oranı hesaplama
- Doğrulama ve gizlilik durumu

### 📊 İstatistikler ve Grafikler
- Haftalık/Aylık büyüme grafikleri
- Etkileşim trendleri
- Karşılaştırmalı analizler

### 👁️ Profil Takibi
- Sınırsız profil takibi (Premium)
- Değişiklik bildirimleri
- Favori listeleri

### 📈 Raporlama
- PDF export
- Detaylı analiz raporları
- Otomatik raporlama (Enterprise)

### 🔔 Anlık Uyarılar
- Takipçi değişimleri
- Yeni gönderi bildirimleri
- Bio değişiklikleri

---

## 💳 Abonelik Planları

| Özellik | Ücretsiz | Temel (₺49.99/ay) | Premium (₺149.99/ay) | Kurumsal (₺499.99/ay) |
|---------|----------|-------------------|----------------------|----------------------|
| Günlük Arama | 3 | 20 | 100 | Sınırsız |
| Platformlar | Instagram | Instagram, TikTok | +Twitter, YouTube | Tüm Platformlar |
| Aylık Rapor | 1 | 10 | 50 | 500 |
| PDF Export | ❌ | ✅ | ✅ | ✅ |
| Anlık Uyarılar | ❌ | ❌ | ✅ | ✅ |
| API Erişimi | ❌ | ❌ | ❌ | ✅ |
| Reklamlar | ✅ | ❌ | ❌ | ❌ |

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/DevKursat/Stalk.git
cd Stalk/izci
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Veritabanını Kurun
`supabase-schema.sql` dosyasını Supabase SQL Editor'da çalıştırın.

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 🗄️ Veritabanı Şeması

### Ana Tablolar
- `profiles` - Kullanıcı profilleri ve abonelik bilgileri
- `subscription_plans` - Abonelik planları
- `tracked_profiles` - Takip edilen sosyal medya profilleri
- `searches` - Arama geçmişi
- `reports` - Oluşturulan raporlar
- `notifications` - Bildirimler
- `alerts` - Profil uyarıları
- `advertisements` - Reklam sistemi
- `payments` - Ödeme kayıtları

### Güvenlik
- Row Level Security (RLS) tüm tablolarda aktif
- Kullanıcılar sadece kendi verilerine erişebilir
- KVKK ve GDPR uyumlu

---

## 🎨 Teknoloji Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion
- **State Management:** Zustand
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Charts:** Recharts
- **Icons:** Lucide React

---

## 📱 Sayfalar

### Ana Sayfa
Gradient animasyonlu modern landing page

### Dashboard
Kullanıcı istatistikleri ve hızlı erişim

### Arama Sayfası
Platform seçimi ve sonuç kartları

### Takip Listesi
Grid/List görünüm, favori sistem

### Fiyatlandırma
Abonelik planları karşılaştırması

---

## 🔐 Güvenlik

- Tüm veriler şifrelenerek saklanır
- SSL/TLS ile güvenli bağlantı
- KVKK ve GDPR uyumlu
- Rate limiting ile kötüye kullanım önleme

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🤝 Katkıda Bulunun

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

<div align="center">
  <p>Made with ❤️ in Turkey</p>
  <p>© 2024 İzci. Tüm hakları saklıdır.</p>
</div>
