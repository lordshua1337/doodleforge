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
      <div className="relative z-10 min-h-screen d-flex d-flex-center" style={{ padding: '0 32px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="d-heading d-heading-lg d-mb-sm">
            This gallery link has expired
          </h1>
          <p className="d-eyebrow d-eyebrow-blue" style={{ marginBottom: 0, fontSize: '1.2rem' }}>
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

  // Normalize drawings from array to single object
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
    <div className="relative z-10 min-h-screen">
      <div className="d-section" style={{ background: '#FFF8F0' }}>
        <div className="d-container-md">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 className="d-heading d-heading-xl d-mb-sm">
              {link.title || 'Art Gallery'}
            </h1>
            <p className="d-eyebrow d-eyebrow-blue" style={{ marginBottom: 8, fontSize: '1.2rem' }}>
              A collection of tiny masterpieces, forged with AI
            </p>
            <p className="d-body-sm" style={{ color: '#7B2D8E' }}>
              {currentViews} {currentViews === 1 ? 'view' : 'views'}
            </p>
          </div>

          {normalizedForges.length === 0 ? (
            <div className="craft-card" style={{ textAlign: 'center', padding: 48 }}>
              <p className="d-heading" style={{ fontSize: 20 }}>
                No art yet -- check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {normalizedForges.map((forge) => (
                <div key={forge.id} className="d-shame-card">
                  {/* Before/After images */}
                  {forge.drawings?.original_url && forge.result_url ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="d-shame-top" style={{ padding: 0, aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={forge.result_url} alt="Forged art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {forge.is_epic && (
                          <span className="d-badge-sm" style={{
                            position: 'absolute', top: 8, right: 8,
                            background: '#7B2D8E', color: '#fff', fontSize: 10,
                          }}>
                            EPIC
                          </span>
                        )}
                      </div>
                      <div className="d-shame-body" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', border: '2px solid #2B2D42', flexShrink: 0 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={forge.drawings.original_url} alt="Original drawing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <p className="d-eyebrow" style={{ marginBottom: 0, fontSize: 11, color: '#ADB5BD' }}>Original drawing</p>
                          <p className="d-heading" style={{ fontSize: 14, marginBottom: 0, textTransform: 'capitalize' }}>
                            {forge.style}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : forge.result_url ? (
                    <>
                      <div className="d-shame-top" style={{ padding: 0, aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={forge.result_url} alt="Forged art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {forge.is_epic && (
                          <span className="d-badge-sm" style={{
                            position: 'absolute', top: 8, right: 8,
                            background: '#7B2D8E', color: '#fff', fontSize: 10,
                          }}>
                            EPIC
                          </span>
                        )}
                      </div>
                      <div className="d-shame-body" style={{ padding: 12 }}>
                        <p className="d-heading" style={{ fontSize: 14, marginBottom: 0, textTransform: 'capitalize' }}>
                          {forge.style}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="d-shame-top" style={{ aspectRatio: '1' }}>
                      <p className="d-eyebrow" style={{ marginBottom: 0, color: '#ADB5BD' }}>
                        Processing...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p className="d-eyebrow d-eyebrow-blue" style={{ marginBottom: 0, fontSize: '1rem' }}>
              Made with Doodie -- turn your kid&apos;s scribbles into art
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
