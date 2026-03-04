import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth/server'
import { adminClient } from '@/lib/supabase/client'
import { getCredits, CREDIT_TIERS } from '@/lib/credits/system'

export async function GET() {
  try {
    const user = await requireUser()
    const credits = await getCredits(user.id)

    const { data: profile } = await adminClient
      .from('user_profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()

    const tier = (profile?.subscription_tier ?? 'free') as keyof typeof CREDIT_TIERS
    const tierInfo = CREDIT_TIERS[tier]

    return NextResponse.json({
      credits,
      tier,
      tier_label: tierInfo.label,
      monthly_limit: tierInfo.credits,
      is_unlimited: tier === 'addiction',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed'
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: 'Sign in to view credits' }, { status: 401 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
