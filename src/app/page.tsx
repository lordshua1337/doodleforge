import Link from "next/link";

const WALL_OF_SHAME_PREVIEW = [
  { original: "Crayon stick figures under a yellow sun", kidSays: "That's our family at the beach!", parentThinks: "Why does Daddy have 7 fingers and no neck?", artist: "Emma, age 5", style: "Oil Painting" },
  { original: "Green blob with legs and teeth", kidSays: "It's a T-Rex, obviously!", parentThinks: "It's giving... avocado with anger issues", artist: "Liam, age 4", style: "Photorealistic" },
  { original: "Cat with triangle ears and whiskers", kidSays: "It's Mr. Whiskers!", parentThinks: "Mr. Whiskers looks like he's plotting a murder", artist: "Noah, age 5", style: "Anime" },
];

const STYLES = [
  { name: "Oil Painting", icon: "P", color: "#FF6B6B" },
  { name: "Watercolor", icon: "W", color: "#60A5FA" },
  { name: "Anime", icon: "A", color: "#F472B6" },
  { name: "Cyberpunk", icon: "C", color: "#A78BFA" },
  { name: "Pop Art", icon: "!", color: "#FBBF24" },
  { name: "Pixel Art", icon: "#", color: "#34D399" },
  { name: "Studio Ghibli", icon: "G", color: "#FB923C" },
  { name: "Photorealistic", icon: "R", color: "#60A5FA" },
];

const PASTEL_BG = [
  "rgba(255,107,107,0.04)",
  "rgba(96,165,250,0.04)",
  "rgba(244,114,182,0.04)",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="d-hero">
        <div className="d-blob" style={{ top: "10%", left: "10%", width: 550, height: 550, background: "rgba(255,107,107,0.08)" }} />
        <div className="d-blob" style={{ bottom: "15%", right: "10%", width: 500, height: 500, background: "rgba(96,165,250,0.08)" }} />
        <div className="d-blob" style={{ top: "35%", left: "55%", width: 400, height: 400, background: "rgba(167,139,250,0.07)", filter: "blur(100px)" }} />

        {/* Drawing decoration - top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 450,
            height: 450,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            opacity: 0.05,
            pointerEvents: "none",
            maskImage: "linear-gradient(135deg, transparent 10%, black 40%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 40%, transparent 80%)",
          }}
        />
        {/* Drawing decoration - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 350,
            height: 350,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom left",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(315deg, transparent 10%, black 40%, transparent 80%)",
          }}
        />

        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div style={{ marginBottom: 32 }}>
            <span className="d-badge">
              <span className="d-badge-dot" />
              AI-Powered Art Intervention
            </span>
          </div>

          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 32 }}>
            Fridge art. <span className="text-rainbow">Gallery upgrade.</span>
          </h1>

          <p className="d-body-lg" style={{ maxWidth: 520, margin: "0 auto 16px" }}>
            Your kid drew something. You lied and said it was great. We actually make it great. Problem solved.
          </p>
          <p className="d-body-sm" style={{ maxWidth: 440, margin: "0 auto 40px" }}>
            Upload the scribble. Pick a style. Get real art. Hang it up. Take credit at Thanksgiving. We won&apos;t tell.
          </p>

          <div className="d-btn-row">
            <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
            <Link href="/gallery" className="d-btn-secondary">See the Evidence</Link>
          </div>

          <p className="d-body-xs" style={{ marginTop: 40 }}>No account needed. No judgment. We&apos;ve seen worse.</p>
        </div>
      </section>

      {/* THREE PILLARS -- neumorphic nav cards */}
      <section className="d-section-accented" style={{ padding: "64px 0", position: "relative" }}>
        <div className="d-container">
          <div className="d-grid d-grid-3">
            {[
              {
                title: "AI Art Transformation",
                desc: "Upload the scribble. AI makes it gallery-worthy. Your kid's vision, minus the skill gap.",
                color: "rgba(255,107,107,0.08)",
                stroke: "#FF6B6B",
                href: "/create",
                path: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
              },
              {
                title: "The Vault",
                desc: "Every drawing, stored forever. No more \"I swear it was in this drawer.\" Scan it, save it, done.",
                color: "rgba(167,139,250,0.08)",
                stroke: "#A78BFA",
                href: "/vault",
                path: <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />,
              },
              {
                title: "Parenting Advice",
                desc: "Terrible advice for every situation. By an AI. That has no children. What could go wrong.",
                color: "rgba(96,165,250,0.08)",
                stroke: "#60A5FA",
                href: "/advice",
                path: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
              },
            ].map((p) => (
              <Link key={p.title} href={p.href} className="neu-card d-card-hover" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 32 }}>
                <div className="d-icon-box d-icon-box-center d-icon-box-hover" style={{ background: p.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={p.stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p.path}</svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>{p.title}</h3>
                <p className="d-body" style={{ fontSize: 14 }}>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WALL OF SHAME PREVIEW -- 3 neumorphic cards */}
      <div className="d-section" style={{ position: "relative" }}>
        {/* Drawing accent behind section */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            width: 300,
            height: 400,
            backgroundImage: "url(/drawings-2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center left",
            opacity: 0.04,
            pointerEvents: "none",
            maskImage: "linear-gradient(90deg, transparent 5%, black 30%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 5%, black 30%, transparent 95%)",
          }}
        />
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-coral">The wall of shame</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Actual things children drew.</h2>
            <p className="d-body" style={{ maxWidth: 440, margin: "0 auto" }}>
              Real submissions. Real delusion. We love these kids. We just couldn&apos;t hang the originals.
            </p>
          </div>
          <div className="d-grid d-grid-3">
            {WALL_OF_SHAME_PREVIEW.map((item, i) => (
              <div key={i} className="neu-card d-card-hover" style={{ overflow: "hidden", padding: 0 }}>
                <div style={{ padding: "48px 32px", background: PASTEL_BG[i], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: 15, fontStyle: "italic", color: "#6B7280", lineHeight: 1.6, textAlign: "center", marginBottom: 20 }}>
                    &ldquo;{item.original}&rdquo;
                  </p>
                  <span className="d-pill d-pill-coral">The original</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(229,231,235,0.5)", padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="d-bubble">
                    <div className="d-bubble-avatar" style={{ background: "rgba(251,191,36,0.15)", color: "#FBBF24" }}>K</div>
                    <div>
                      <p className="d-bubble-label" style={{ color: "#FBBF24" }}>Kid says</p>
                      <p style={{ fontSize: 14, lineHeight: 1.4, color: "#1A1A2E" }}>&ldquo;{item.kidSays}&rdquo;</p>
                    </div>
                  </div>
                  <div className="d-bubble">
                    <div className="d-bubble-avatar" style={{ background: "rgba(167,139,250,0.15)", color: "#A78BFA" }}>P</div>
                    <div>
                      <p className="d-bubble-label" style={{ color: "#A78BFA" }}>Parent thinks</p>
                      <p style={{ fontSize: 14, lineHeight: 1.4, color: "#6B7280", fontStyle: "italic" }}>&ldquo;{item.parentThinks}&rdquo;</p>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(229,231,235,0.5)", padding: "20px 32px", background: "rgba(243,244,246,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#34D399" }}>Fixed it</p>
                    <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>{item.style} -- {item.artist}</p>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-center" style={{ marginTop: 40 }}>
            <Link href="/gallery" className="d-btn-secondary">See All Submissions &rarr;</Link>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="d-section" style={{ position: "relative" }}>
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-lavender">How it works</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Three steps. Zero art skill required.</h2>
            <p className="d-body" style={{ maxWidth: 440, margin: "0 auto" }}>
              We turned &ldquo;complicated AI art&rdquo; into &ldquo;upload and click.&rdquo; You&apos;re welcome.
            </p>
          </div>
          <div className="d-grid d-grid-3" style={{ gap: 32 }}>
            {[
              {
                step: "01",
                title: "Upload the Evidence",
                desc: "Take a photo of the drawing. Or upload it from your camera roll. We accept all levels of artistic crime.",
                color: "#FF6B6B",
                icon: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
              },
              {
                step: "02",
                title: "Pick a Style",
                desc: "Oil painting? Anime? Cyberpunk? Pick how you want the masterpiece to look. We have 12 styles and counting.",
                color: "#A78BFA",
                icon: <><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></>,
              },
              {
                step: "03",
                title: "Witness the Magic",
                desc: "AI transforms the doodle into actual art. Download, print, frame. Take full credit at Thanksgiving dinner.",
                color: "#34D399",
                icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></>,
              },
            ].map((item) => (
              <div key={item.step} className="neu-card d-card-hover" style={{ textAlign: "center", padding: "36px 28px" }}>
                <div className="d-icon-box d-icon-box-center d-icon-box-hover" style={{ width: 64, height: 64, borderRadius: 20, background: `${item.color}12` }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
                  <span className="d-step-number" style={{ background: `${item.color}15`, color: item.color }}>{item.step}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E" }}>{item.title}</h3>
                </div>
                <p className="d-body" style={{ fontSize: 14 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="d-section d-section-surface" style={{ padding: "64px 0" }}>
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-mint">What parents say</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Real parents. Real reactions.</h2>
          </div>
          <div className="d-grid d-grid-3" style={{ gap: 20 }}>
            {[
              {
                quote: "My mother-in-law cried when she saw the oil painting version of my son's stick figure family portrait. Best $0 I ever spent on a gift.",
                name: "Jessica M.",
                detail: "Mom of 2, Ohio",
                color: "#FF6B6B",
              },
              {
                quote: "My 4-year-old thinks he's a 'real artist' now because his dinosaur drawing looks like concept art from Jurassic Park. The confidence boost alone is worth it.",
                name: "David K.",
                detail: "Dad of 1, Austin",
                color: "#A78BFA",
              },
              {
                quote: "I have 3 Doodie prints framed in my living room. Guests always ask where I got them. I just point at my 5-year-old and say 'commissioned.'",
                name: "Sarah T.",
                detail: "Mom of 3, Seattle",
                color: "#60A5FA",
              },
              {
                quote: "Turned my daughter's crayon cat into an anime character. She asked me if the cat was 'famous now.' I said yes. She hasn't stopped drawing since.",
                name: "Mike R.",
                detail: "Dad of 2, Denver",
                color: "#34D399",
              },
              {
                quote: "Used this for my classroom end-of-year gifts. Every parent got a transformed version of their kid's self-portrait. The school newsletter featured us.",
                name: "Ms. Thompson",
                detail: "2nd Grade Teacher, Portland",
                color: "#FBBF24",
              },
              {
                quote: "My son drew our house. The AI made it look like a Miyazaki film. It's his phone wallpaper now. He's 6. He doesn't have a phone. He uses mine.",
                name: "Rachel P.",
                detail: "Mom of 2, Brooklyn",
                color: "#F472B6",
              },
            ].map((t, i) => (
              <div key={i} className="neu-card neu-card-testimonial" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", "--card-accent": t.color } as React.CSSProperties}>
                <div>
                  <div style={{ height: 3, width: 32, borderRadius: 999, marginBottom: 16, background: t.color }} />
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", marginBottom: 20 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${t.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF" }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accent gradient divider */}
      <div className="d-divider-gradient" />

      {/* STYLE STRIP */}
      <div className="d-section d-section-surface">
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sky">Art styles</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Make it look intentional.</h2>
            <p className="d-body">12 styles that turn &ldquo;what is that&rdquo; into &ldquo;where did you buy that?&rdquo;</p>
          </div>
          <div className="d-grid d-grid-4">
            {STYLES.map((s) => (
              <Link key={s.name} href="/create" className="neu-card d-card-hover" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 32, textAlign: "center" }}>
                <div className="d-style-icon" style={{ background: s.color }}>{s.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="d-section" style={{ position: "relative" }}>
        {/* Drawing accent behind CTA */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 350,
            backgroundImage: "url(/drawings-1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.04,
            borderRadius: 24,
            pointerEvents: "none",
          }}
        />
        <div className="d-container-sm d-center" style={{ position: "relative" }}>
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24, lineHeight: 1.2 }}>
            Look. <span style={{ color: "#FF6B6B" }}>The drawing is bad.</span><br />
            <span style={{ color: "#60A5FA" }}>The kid is great.</span> We fix the first part.
          </h2>
          <p className="d-body" style={{ maxWidth: 520, margin: "0 auto 40px" }}>
            You know that thing on the fridge? The one you smile at every morning while quietly wondering what it is?
            Upload it. We&apos;ll handle the rest.
          </p>
          <Link href="/create" className="d-btn-primary glow-cta">Make A Doodie &rarr;</Link>
          <p className="d-body-xs" style={{ marginTop: 24 }}>No signup. No credit card. Just upload the blob and see what happens.</p>
        </div>
      </div>
    </>
  );
}
