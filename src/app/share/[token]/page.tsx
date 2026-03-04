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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF8F0' }}>
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Gaegu, cursive', color: '#2B2D42' }}>
            This gallery link has expired
          </h1>
          <p style={{ fontFamily: 'Caveat, cursive', color: '#457B9D', fontSize: '1.2rem' }}>
            Ask the artist&apos;s parent for a new link!
          </p>
        </div>
      </div>
    )
  }

  // Increment views
  const currentViews = (link.views || 0) + 1
  await adminClient
    .from('share_links')
    .update({ views: currentViews })
    .eq('id', link.id)

  // Get forges with their drawings for before/after display
  const forgeIds: string[] = link.forge_ids || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let forges: Array<Record<string, any>> = []

  if (forgeIds.length > 0) {
    const { data } = await adminClient
      .from('forges')
      .select(`
        id,
        style,
        is_epic,
        result_url,
        created_at,
        drawings (
          original_url,
          file_name
        )
      `)
      .in('id', forgeIds)
      .eq('status', 'complete')

    forges = data ?? []
  }

  // Normalize drawings from array to single object (Supabase returns arrays for joins)
  const normalizedForges = forges.map((f) => {
    const drawings = Array.isArray(f.drawings) ? f.drawings[0] ?? null : f.drawings
    return {
      id: f.id as string,
      style: f.style as string,
      is_epic: f.is_epic as boolean,
      result_url: f.result_url as string | null,
      created_at: f.created_at as string,
      drawings: drawings as { original_url: string; file_name: string | null } | null,
    }
  })

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: '#FFF8F0' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Gaegu, cursive', color: '#2B2D42' }}>
            {link.title || 'Art Gallery'}
          </h1>
          <p style={{ fontFamily: 'Caveat, cursive', color: '#457B9D', fontSize: '1.2rem' }}>
            A collection of tiny masterpieces, forged with AI
          </p>
          <p className="text-xs mt-2" style={{ color: '#7B2D8E' }}>
            {currentViews} {currentViews === 1 ? 'view' : 'views'}
          </p>
        </div>

        {normalizedForges.length === 0 ? (
          <div className="text-center p-12 rounded-lg"
            style={{ background: '#F5E6D3', border: '3px solid #2B2D42' }}>
            <p className="text-xl" style={{ fontFamily: 'Gaegu, cursive', color: '#2B2D42' }}>
              No art yet -- check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalizedForges.map((forge) => (
              <div key={forge.id}
                className="rounded-lg overflow-hidden"
                style={{
                  background: 'white',
                  border: '3px solid #2B2D42',
                  boxShadow: '4px 4px 0 #2B2D42',
                }}>

                {/* Before/After images */}
                {forge.drawings?.original_url && forge.result_url ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* After (main) */}
                    <div className="aspect-square bg-zinc-100 flex items-center justify-center" style={{ position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={forge.result_url} alt="Forged art" className="w-full h-full object-cover" />
                      {forge.is_epic && (
                        <span
                          className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full text-white"
                          style={{ background: '#7B2D8E', border: '1px solid #2B2D42' }}>
                          EPIC
                        </span>
                      )}
                    </div>
                    {/* Before (small) */}
                    <div style={{ padding: '8px 12px', borderTop: '2px solid #E5D5C3', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', border: '2px solid #2B2D42', flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={forge.drawings.original_url} alt="Original drawing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: '#ADB5BD', fontFamily: 'Caveat, cursive' }}>Original drawing</p>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Gaegu, cursive', color: '#2B2D42', textTransform: 'capitalize' }}>
                          {forge.style}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : forge.result_url ? (
                  <>
                    <div className="aspect-square bg-zinc-100 flex items-center justify-center" style={{ position: 'relative' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={forge.result_url} alt="Forged art" className="w-full h-full object-cover" />
                      {forge.is_epic && (
                        <span
                          className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full text-white"
                          style={{ background: '#7B2D8E', border: '1px solid #2B2D42' }}>
                          EPIC
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-bold" style={{ fontFamily: 'Gaegu, cursive', color: '#2B2D42', textTransform: 'capitalize' }}>
                        {forge.style}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="aspect-square flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                    <p style={{ fontFamily: 'Caveat, cursive', color: '#ADB5BD' }}>
                      Processing...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p style={{ fontFamily: 'Caveat, cursive', color: '#457B9D', fontSize: '1rem' }}>
            Made with Doodie -- turn your kid&apos;s scribbles into art
          </p>
        </div>
      </div>
    </div>
  )
}
