export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'pending'
export type PlatformType = 'instagram' | 'whatsapp' | 'tiktok' | 'twitter' | 'facebook' | 'youtube' | 'linkedin'
export type SearchStatus = 'pending' | 'processing' | 'completed' | 'failed'
export type ReportType = 'profile' | 'activity' | 'followers' | 'engagement' | 'full'
export type NotificationType = 'info' | 'warning' | 'success' | 'alert'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          country: string
          language: string
          timezone: string
          subscription_tier: SubscriptionTier
          subscription_status: SubscriptionStatus
          subscription_started_at: string | null
          subscription_expires_at: string | null
          daily_searches_used: number
          daily_searches_limit: number
          monthly_reports_used: number
          monthly_reports_limit: number
          last_search_at: string | null
          last_login_at: string | null
          total_searches: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string
          language?: string
          timezone?: string
          subscription_tier?: SubscriptionTier
          subscription_status?: SubscriptionStatus
          subscription_started_at?: string | null
          subscription_expires_at?: string | null
          daily_searches_used?: number
          daily_searches_limit?: number
          monthly_reports_used?: number
          monthly_reports_limit?: number
          last_search_at?: string | null
          last_login_at?: string | null
          total_searches?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string
          language?: string
          timezone?: string
          subscription_tier?: SubscriptionTier
          subscription_status?: SubscriptionStatus
          subscription_started_at?: string | null
          subscription_expires_at?: string | null
          daily_searches_used?: number
          daily_searches_limit?: number
          monthly_reports_used?: number
          monthly_reports_limit?: number
          last_search_at?: string | null
          last_login_at?: string | null
          total_searches?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          tier: SubscriptionTier
          description: string | null
          price_monthly: number
          price_yearly: number | null
          currency: string
          daily_searches: number
          monthly_reports: number
          platforms_access: PlatformType[]
          features: Json
          has_ads: boolean
          has_priority_support: boolean
          has_api_access: boolean
          has_export: boolean
          has_realtime_alerts: boolean
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tier: SubscriptionTier
          description?: string | null
          price_monthly: number
          price_yearly?: number | null
          currency?: string
          daily_searches: number
          monthly_reports: number
          platforms_access: PlatformType[]
          features?: Json
          has_ads?: boolean
          has_priority_support?: boolean
          has_api_access?: boolean
          has_export?: boolean
          has_realtime_alerts?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tier?: SubscriptionTier
          description?: string | null
          price_monthly?: number
          price_yearly?: number | null
          currency?: string
          daily_searches?: number
          monthly_reports?: number
          platforms_access?: PlatformType[]
          features?: Json
          has_ads?: boolean
          has_priority_support?: boolean
          has_api_access?: boolean
          has_export?: boolean
          has_realtime_alerts?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      tracked_profiles: {
        Row: {
          id: string
          user_id: string
          platform: PlatformType
          username: string
          profile_url: string | null
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          followers_count: number | null
          following_count: number | null
          posts_count: number | null
          engagement_rate: number | null
          is_verified: boolean
          is_private: boolean
          last_activity_at: string | null
          last_synced_at: string | null
          nickname: string | null
          notes: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: PlatformType
          username: string
          profile_url?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          posts_count?: number | null
          engagement_rate?: number | null
          is_verified?: boolean
          is_private?: boolean
          last_activity_at?: string | null
          last_synced_at?: string | null
          nickname?: string | null
          notes?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: PlatformType
          username?: string
          profile_url?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          followers_count?: number | null
          following_count?: number | null
          posts_count?: number | null
          engagement_rate?: number | null
          is_verified?: boolean
          is_private?: boolean
          last_activity_at?: string | null
          last_synced_at?: string | null
          nickname?: string | null
          notes?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      searches: {
        Row: {
          id: string
          user_id: string
          platform: PlatformType
          query: string
          search_type: string
          status: SearchStatus
          results_count: number
          results: Json
          ip_address: string | null
          user_agent: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          platform: PlatformType
          query: string
          search_type?: string
          status?: SearchStatus
          results_count?: number
          results?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          platform?: PlatformType
          query?: string
          search_type?: string
          status?: SearchStatus
          results_count?: number
          results?: Json
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          tracked_profile_id: string | null
          report_type: ReportType
          title: string
          summary: string | null
          data: Json
          insights: Json
          status: SearchStatus
          pdf_url: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tracked_profile_id?: string | null
          report_type: ReportType
          title: string
          summary?: string | null
          data?: Json
          insights?: Json
          status?: SearchStatus
          pdf_url?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tracked_profile_id?: string | null
          report_type?: ReportType
          title?: string
          summary?: string | null
          data?: Json
          insights?: Json
          status?: SearchStatus
          pdf_url?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: NotificationType
          title: string
          message: string | null
          action_url: string | null
          is_read: boolean
          read_at: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type?: NotificationType
          title: string
          message?: string | null
          action_url?: string | null
          is_read?: boolean
          read_at?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: NotificationType
          title?: string
          message?: string | null
          action_url?: string | null
          is_read?: boolean
          read_at?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      advertisements: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          video_url: string | null
          click_url: string
          target_tiers: SubscriptionTier[]
          target_countries: string[]
          target_pages: string[]
          start_date: string
          end_date: string | null
          impressions: number
          clicks: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          video_url?: string | null
          click_url: string
          target_tiers?: SubscriptionTier[]
          target_countries?: string[]
          target_pages?: string[]
          start_date?: string
          end_date?: string | null
          impressions?: number
          clicks?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          video_url?: string | null
          click_url?: string
          target_tiers?: SubscriptionTier[]
          target_countries?: string[]
          target_pages?: string[]
          start_date?: string
          end_date?: string | null
          impressions?: number
          clicks?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_search_count: {
        Args: { p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      subscription_tier: SubscriptionTier
      subscription_status: SubscriptionStatus
      platform_type: PlatformType
      search_status: SearchStatus
      report_type: ReportType
      notification_type: NotificationType
    }
  }
}
