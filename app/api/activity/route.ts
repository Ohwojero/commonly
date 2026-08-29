import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100)
  if (error) return NextResponse.json({ error: 'Unable to load activity' }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const supabase = await createClient()
  const { error } = await supabase.from('activity_logs').insert({ event_type: body.eventType, event_name: body.eventName, email: body.email, location: body.location, product_slug: body.productSlug, metadata: body.metadata ?? {} })
  if (error) return NextResponse.json({ error: 'Unable to log activity' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
