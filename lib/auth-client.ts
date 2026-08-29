'use client'

import { createClient } from '@/lib/supabase/client'

export const supabase = typeof window === 'undefined' ? null : createClient()
