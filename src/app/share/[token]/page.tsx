import { adminClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'

type SharePageProps = {
  params: Promise<{ token: string }>
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params

  const { data: link } = await adminClient
    .from('share_links')
    .select('*')
    .eq('token', token)
    .single()

  if (!link) return notFound()

  // Check expiry
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--paper-white, #FFF8F0)' }}>
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
            This gallery link has expired
          </h1>
          <p style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1.2rem' }}>
            Ask the artist&apos;s parent for a new link!
          </p>
        </div>
      </div>
    )
  }

  // Increment views
  await adminClient
    .from('share_links')
    .update({ views: (link.views || 0) + 1 })
    .eq('id', link.id)

  // Get forges
  const forgeIds: string[] = link.forge_ids || []
  let forges: Array<Record<string, unknown>> = []

  if (forgeIds.length > 0) {
    const { data } = await adminClient
      .from('forges')
      .select('*')
      .in('id', forgeIds)
      .eq('status', 'complete')

    forges = data ?? []
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: 'var(--paper-white, #FFF8F0)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
            {link.title || 'Art Gallery'}
          </h1>
          <p style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1.2rem' }}>
            A collection of tiny masterpieces, forged with AI
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--crayon-purple, #7B2D8E)' }}>
            {link.views} views
          </p>
        </div>

        {forges.length === 0 ? (
          <div className="text-center p-12 rounded-lg"
            style={{ background: 'var(--paper-cream, #F5E6D3)', border: '3px solid var(--ink-dark, #2B2D42)' }}>
            <p className="text-xl" style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
              No art yet -- check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forges.map((forge) => (
              <div key={forge.id as string}
                className="rounded-lg overflow-hidden"
                style={{
                  background: 'white',
                  border: '3px solid var(--ink-dark, #2B2D42)',
                  transform: `rotate(${(Math.random() - 0.5) * 2}deg)`,
                  boxShadow: '4px 4px 0 var(--ink-dark, #2B2D42)',
                }}>
                {typeof forge.result_url === 'string' && (
                  <div className="aspect-square bg-zinc-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={forge.result_url as string} alt="Forged art" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-sm font-bold" style={{ fontFamily: 'Gaegu, cursive', color: 'var(--ink-dark, #2B2D42)' }}>
                    Style: {forge.style as string}
                    {forge.is_epic === true && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-white"
                        style={{ background: 'var(--crayon-purple, #7B2D8E)' }}>
                        EPIC
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p style={{ fontFamily: 'Caveat, cursive', color: 'var(--crayon-blue, #457B9D)', fontSize: '1rem' }}>
            Made with Doodie -- turn your kid&apos;s scribbles into art
          </p>
        </div>
      </div>
    </div>
  )
}
