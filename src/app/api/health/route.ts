import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_service: !!process.env.SUPABASE_SERVICE_KEY,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    replicate: !!process.env.REPLICATE_API_TOKEN,
  }

  const healthy = Object.values(checks).every(Boolean)

  return NextResponse.json({
    status: healthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  })
}
