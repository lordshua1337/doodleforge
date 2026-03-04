import { adminClient } from '@/lib/supabase/client'

export const CREDIT_TIERS = {
  free: { label: 'Free', credits: 3, price: 0 },
  dip: { label: 'Dip', credits: 15, price: 499 },
  binge: { label: 'Binge', credits: 50, price: 1299 },
  addiction: { label: 'Addiction', credits: -1, price: 2999 }, // -1 = unlimited
} as const

export type CreditTier = keyof typeof CREDIT_TIERS

export async function getCredits(userId: string): Promise<number> {
  const { data } = await adminClient
    .from('user_profiles')
    .select('credits_remaining, subscription_tier')
    .eq('id', userId)
    .single()

  if (!data) return 0

  // Unlimited for addiction tier
  if (data.subscription_tier === 'addiction') return 999

  return data.credits_remaining
}

export async function useCredit(userId: string, forgeId: string, isEpic: boolean): Promise<boolean> {
  const cost = isEpic ? 2 : 1

  const { data: profile } = await adminClient
    .from('user_profiles')
    .select('credits_remaining, subscription_tier')
    .eq('id', userId)
    .single()

  if (!profile) return false

  // Unlimited tier bypasses
  if (profile.subscription_tier === 'addiction') {
    await adminClient.from('credit_ledger').insert({
      user_id: userId,
      amount: -cost,
      balance_after: 999,
      transaction_type: 'use',
      description: `${isEpic ? 'EPIC ' : ''}Forge generation (unlimited tier)`,
      forge_id: forgeId,
    })
    return true
  }

  if (profile.credits_remaining < cost) return false

  const newBalance = profile.credits_remaining - cost

  const { error } = await adminClient
    .from('user_profiles')
    .update({ credits_remaining: newBalance })
    .eq('id', userId)

  if (error) return false

  await adminClient.from('credit_ledger').insert({
    user_id: userId,
    amount: -cost,
    balance_after: newBalance,
    transaction_type: 'use',
    description: `${isEpic ? 'EPIC ' : ''}Forge generation`,
    forge_id: forgeId,
  })

  return true
}

export async function grantCredits(
  userId: string,
  amount: number,
  type: 'grant' | 'purchase' | 'bonus' | 'refund',
  description: string
): Promise<number> {
  const { data: profile } = await adminClient
    .from('user_profiles')
    .select('credits_remaining')
    .eq('id', userId)
    .single()

  if (!profile) return 0

  const newBalance = profile.credits_remaining + amount

  await adminClient
    .from('user_profiles')
    .update({ credits_remaining: newBalance })
    .eq('id', userId)

  await adminClient.from('credit_ledger').insert({
    user_id: userId,
    amount,
    balance_after: newBalance,
    transaction_type: type,
    description,
  })

  return newBalance
}
