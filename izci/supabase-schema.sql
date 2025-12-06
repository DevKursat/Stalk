-- =====================================================
-- İZCİ - Sosyal Medya Analiz Platformu
-- Supabase Veritabanı Şeması
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');
CREATE TYPE platform_type AS ENUM ('instagram', 'whatsapp', 'tiktok', 'twitter', 'facebook', 'youtube', 'linkedin');
CREATE TYPE search_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE report_type AS ENUM ('profile', 'activity', 'followers', 'engagement', 'full');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'success', 'alert');

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Extended user profiles
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    country TEXT DEFAULT 'TR',
    language TEXT DEFAULT 'tr',
    timezone TEXT DEFAULT 'Europe/Istanbul',
    
    -- Subscription info
    subscription_tier subscription_tier DEFAULT 'free',
    subscription_status subscription_status DEFAULT 'active',
    subscription_started_at TIMESTAMPTZ,
    subscription_expires_at TIMESTAMPTZ,
    
    -- Usage limits
    daily_searches_used INTEGER DEFAULT 0,
    daily_searches_limit INTEGER DEFAULT 3,
    monthly_reports_used INTEGER DEFAULT 0,
    monthly_reports_limit INTEGER DEFAULT 1,
    
    -- Tracking
    last_search_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    total_searches INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIPTION & PAYMENTS
-- =====================================================

-- Subscription plans
CREATE TABLE public.subscription_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    tier subscription_tier NOT NULL UNIQUE,
    description TEXT,
    
    -- Pricing
    price_monthly DECIMAL(10,2) NOT NULL,
    price_yearly DECIMAL(10,2),
    currency TEXT DEFAULT 'TRY',
    
    -- Limits
    daily_searches INTEGER NOT NULL,
    monthly_reports INTEGER NOT NULL,
    platforms_access platform_type[] NOT NULL,
    
    -- Features
    features JSONB DEFAULT '[]',
    has_ads BOOLEAN DEFAULT true,
    has_priority_support BOOLEAN DEFAULT false,
    has_api_access BOOLEAN DEFAULT false,
    has_export BOOLEAN DEFAULT false,
    has_realtime_alerts BOOLEAN DEFAULT false,
    
    -- Metadata
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment transactions
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    plan_id UUID REFERENCES public.subscription_plans(id),
    
    -- Payment details
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'TRY',
    payment_method TEXT,
    payment_provider TEXT,
    transaction_id TEXT,
    
    -- Status
    status TEXT DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SOCIAL MEDIA TARGETS & SEARCHES
-- =====================================================

-- Tracked social media profiles
CREATE TABLE public.tracked_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Platform info
    platform platform_type NOT NULL,
    username TEXT NOT NULL,
    profile_url TEXT,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    
    -- Metrics (cached)
    followers_count INTEGER,
    following_count INTEGER,
    posts_count INTEGER,
    engagement_rate DECIMAL(5,2),
    
    -- Tracking
    is_verified BOOLEAN DEFAULT false,
    is_private BOOLEAN DEFAULT false,
    last_activity_at TIMESTAMPTZ,
    last_synced_at TIMESTAMPTZ,
    
    -- Nickname for easy reference
    nickname TEXT,
    notes TEXT,
    is_favorite BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, platform, username)
);

-- Search history
CREATE TABLE public.searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Search details
    platform platform_type NOT NULL,
    query TEXT NOT NULL,
    search_type TEXT DEFAULT 'username',
    
    -- Results
    status search_status DEFAULT 'pending',
    results_count INTEGER DEFAULT 0,
    results JSONB DEFAULT '[]',
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- =====================================================
-- REPORTS & ANALYTICS
-- =====================================================

-- Generated reports
CREATE TABLE public.reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    tracked_profile_id UUID REFERENCES public.tracked_profiles(id) ON DELETE SET NULL,
    
    -- Report details
    report_type report_type NOT NULL,
    title TEXT NOT NULL,
    
    -- Content
    summary TEXT,
    data JSONB NOT NULL DEFAULT '{}',
    insights JSONB DEFAULT '[]',
    
    -- Status
    status search_status DEFAULT 'pending',
    
    -- Files
    pdf_url TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Activity snapshots (historical data)
CREATE TABLE public.activity_snapshots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tracked_profile_id UUID REFERENCES public.tracked_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Metrics at this point
    followers_count INTEGER,
    following_count INTEGER,
    posts_count INTEGER,
    engagement_rate DECIMAL(5,2),
    
    -- Activity data
    recent_posts JSONB DEFAULT '[]',
    recent_stories JSONB DEFAULT '[]',
    recent_interactions JSONB DEFAULT '[]',
    
    -- Metadata
    snapshot_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS & ALERTS
-- =====================================================

CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Content
    type notification_type DEFAULT 'info',
    title TEXT NOT NULL,
    message TEXT,
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts for tracked profiles
CREATE TABLE public.alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    tracked_profile_id UUID REFERENCES public.tracked_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Alert config
    alert_type TEXT NOT NULL, -- 'new_post', 'follower_change', 'bio_change', 'story_post', etc.
    threshold_value INTEGER,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMPTZ,
    trigger_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ADVERTISEMENTS
-- =====================================================

CREATE TABLE public.advertisements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Ad content
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    video_url TEXT,
    click_url TEXT NOT NULL,
    
    -- Targeting
    target_tiers subscription_tier[] DEFAULT ARRAY['free']::subscription_tier[],
    target_countries TEXT[] DEFAULT ARRAY['TR'],
    target_pages TEXT[] DEFAULT ARRAY['home', 'search', 'report'],
    
    -- Scheduling
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    
    -- Stats
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ad impressions tracking
CREATE TABLE public.ad_impressions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ad_id UUID REFERENCES public.advertisements(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Tracking
    page TEXT,
    clicked BOOLEAN DEFAULT false,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard)
-- =====================================================

-- Note: Execute these in Supabase SQL Editor or Dashboard

-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('ads', 'ads', true);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracked_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_impressions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Subscription plans - everyone can view
CREATE POLICY "Anyone can view active plans" ON public.subscription_plans FOR SELECT USING (is_active = true);

-- Payments - users can only see their own
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tracked profiles - users can only manage their own
CREATE POLICY "Users can view own tracked profiles" ON public.tracked_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tracked profiles" ON public.tracked_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tracked profiles" ON public.tracked_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tracked profiles" ON public.tracked_profiles FOR DELETE USING (auth.uid() = user_id);

-- Searches - users can only see their own
CREATE POLICY "Users can view own searches" ON public.searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own searches" ON public.searches FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports - users can only see their own
CREATE POLICY "Users can view own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Activity snapshots - through tracked profiles
CREATE POLICY "Users can view snapshots of own profiles" ON public.activity_snapshots FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.tracked_profiles tp WHERE tp.id = tracked_profile_id AND tp.user_id = auth.uid()));

-- Notifications - users can only see their own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Alerts - users can only manage their own
CREATE POLICY "Users can view own alerts" ON public.alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own alerts" ON public.alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own alerts" ON public.alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own alerts" ON public.alerts FOR DELETE USING (auth.uid() = user_id);

-- Advertisements - everyone can view active ads
CREATE POLICY "Anyone can view active ads" ON public.advertisements FOR SELECT USING (is_active = true AND start_date <= NOW() AND (end_date IS NULL OR end_date >= NOW()));

-- Ad impressions - users can insert
CREATE POLICY "Anyone can insert ad impressions" ON public.ad_impressions FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tracked_profiles_updated_at BEFORE UPDATE ON public.tracked_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER advertisements_updated_at BEFORE UPDATE ON public.advertisements FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Reset daily searches at midnight
CREATE OR REPLACE FUNCTION reset_daily_searches()
RETURNS void AS $$
BEGIN
    UPDATE public.profiles
    SET daily_searches_used = 0
    WHERE daily_searches_used > 0;
END;
$$ LANGUAGE plpgsql;

-- Increment search count
CREATE OR REPLACE FUNCTION increment_search_count(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_used INTEGER;
    v_limit INTEGER;
BEGIN
    SELECT daily_searches_used, daily_searches_limit INTO v_used, v_limit
    FROM public.profiles WHERE id = p_user_id;
    
    IF v_used >= v_limit THEN
        RETURN FALSE;
    END IF;
    
    UPDATE public.profiles
    SET 
        daily_searches_used = daily_searches_used + 1,
        total_searches = total_searches + 1,
        last_search_at = NOW()
    WHERE id = p_user_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SEED DATA - Subscription Plans
-- =====================================================

INSERT INTO public.subscription_plans (name, tier, description, price_monthly, price_yearly, daily_searches, monthly_reports, platforms_access, features, has_ads, has_priority_support, has_api_access, has_export, has_realtime_alerts, sort_order) VALUES
('Ücretsiz', 'free', 'Başlangıç için ideal', 0, 0, 3, 1, ARRAY['instagram']::platform_type[], 
 '["Günlük 3 arama", "Aylık 1 rapor", "Sadece Instagram", "Reklam destekli", "Temel metrikler"]'::jsonb, 
 true, false, false, false, false, 1),

('Temel', 'basic', 'Bireysel kullanıcılar için', 49.99, 479.99, 20, 10, ARRAY['instagram', 'tiktok']::platform_type[], 
 '["Günlük 20 arama", "Aylık 10 rapor", "Instagram + TikTok", "Reklamsız deneyim", "Detaylı metrikler", "E-posta desteği"]'::jsonb, 
 false, false, false, true, false, 2),

('Premium', 'premium', 'Profesyoneller için', 149.99, 1439.99, 100, 50, ARRAY['instagram', 'tiktok', 'twitter', 'youtube']::platform_type[], 
 '["Günlük 100 arama", "Aylık 50 rapor", "4 platform erişimi", "Anlık uyarılar", "PDF export", "Öncelikli destek", "Geçmiş analizi"]'::jsonb, 
 false, true, false, true, true, 3),

('Kurumsal', 'enterprise', 'Ajanslar ve işletmeler için', 499.99, 4799.99, 1000, 500, ARRAY['instagram', 'whatsapp', 'tiktok', 'twitter', 'facebook', 'youtube', 'linkedin']::platform_type[], 
 '["Sınırsıza yakın arama", "Aylık 500 rapor", "Tüm platformlar", "API erişimi", "Özel dashboard", "7/24 destek", "Takım yönetimi", "White-label seçeneği"]'::jsonb, 
 false, true, true, true, true, 4);

-- =====================================================
-- SAMPLE ADS
-- =====================================================

INSERT INTO public.advertisements (title, description, image_url, click_url, target_tiers, target_pages) VALUES
('Premium''a Yükselt!', 'Sınırsız arama ve tüm platformlara erişim için hemen yükselt!', '/ads/premium-upgrade.jpg', '/pricing', ARRAY['free', 'basic']::subscription_tier[], ARRAY['home', 'search', 'report']),
('%50 İndirim!', 'Yıllık planlarımızda %50''ye varan indirimler!', '/ads/discount.jpg', '/pricing', ARRAY['free']::subscription_tier[], ARRAY['home', 'search']);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_subscription ON public.profiles(subscription_tier, subscription_status);
CREATE INDEX idx_tracked_profiles_user ON public.tracked_profiles(user_id);
CREATE INDEX idx_tracked_profiles_platform ON public.tracked_profiles(platform, username);
CREATE INDEX idx_searches_user ON public.searches(user_id);
CREATE INDEX idx_searches_created ON public.searches(created_at DESC);
CREATE INDEX idx_reports_user ON public.reports(user_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX idx_activity_snapshots_profile ON public.activity_snapshots(tracked_profile_id, snapshot_date DESC);
CREATE INDEX idx_ads_active ON public.advertisements(is_active, start_date, end_date);

-- Full text search index for searches
CREATE INDEX idx_searches_query ON public.searches USING gin(query gin_trgm_ops);
