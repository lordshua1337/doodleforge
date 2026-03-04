import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUser } from '@/lib/auth/server'
import { adminClient } from '@/lib/supabase/client'
import crypto from 'crypto'

const ShareSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  forge_ids: z.array(z.string().uuid()).min(1).max(50),
})

export async function GET() {
  try {
    const user = await requireUser()

    const { data: links } = await adminClient
      .from('share_links')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    return NextResponse.json({ links: links ?? [] })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed'
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: 'Sign in to view share links' }, { status: 401 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const body = await request.json()
    const parsed = ShareSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
    }

    // Ownership validation: verify all forge_ids belong to this user
    if (parsed.data.forge_ids.length > 0) {
      const { data: ownedForges } = await adminClient
        .from('forges')
        .select('id')
        .eq('user_id', user.id)
        .in('id', parsed.data.forge_ids)

      const ownedIds = new Set((ownedForges ?? []).map((f) => f.id))
      const unowned = parsed.data.forge_ids.filter((id) => !ownedIds.has(id))

      if (unowned.length > 0) {
        return NextResponse.json(
          { error: 'You can only share your own forges' },
          { status: 403 }
        )
      }
    }

    const token = crypto.randomBytes(16).toString('hex')

    const { data: link, error } = await adminClient
      .from('share_links')
      .insert({
        user_id: user.id,
        token,
        title: parsed.data.title ?? 'My Gallery',
        forge_ids: parsed.data.forge_ids,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ link, share_url: `/share/${token}` }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed'
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: 'Sign in to create share links' }, { status: 401 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
