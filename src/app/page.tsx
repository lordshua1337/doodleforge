import Link from "next/link";

const WALL_OF_SHAME_PREVIEW = [
  {
    original: "Crayon stick figures under a yellow sun",
    kidSays: "That's our family at the beach!",
    parentThinks: "Why does Daddy have 7 fingers and no neck?",
    artist: "Emma, age 5",
    style: "Oil Painting",
  },
  {
    original: "Green blob with legs and teeth",
    kidSays: "It's a T-Rex, obviously!",
    parentThinks: "It's giving... avocado with anger issues",
    artist: "Liam, age 4",
    style: "Photorealistic",
  },
  {
    original: "Cat with triangle ears and whiskers",
    kidSays: "It's Mr. Whiskers!",
    parentThinks: "Mr. Whiskers looks like he's plotting a murder",
    artist: "Noah, age 5",
    style: "Anime",
  },
];

const STYLES = [
  { name: "Oil Painting", icon: "P", color: "#E63946" },
  { name: "Watercolor", icon: "W", color: "#457B9D" },
  { name: "Anime", icon: "A", color: "#7B2D8E" },
  { name: "Cyberpunk", icon: "C", color: "#E63946" },
  { name: "Pop Art", icon: "!", color: "#FFD166", textColor: "#2B2D42" },
  { name: "Pixel Art", icon: "#", color: "#06D6A0" },
  { name: "Studio Ghibli", icon: "G", color: "#457B9D" },
  { name: "Photorealistic", icon: "R", color: "#E63946" },
  { name: "Stained Glass", icon: "S", color: "#7B2D8E" },
  { name: "Cartoon", icon: "T", color: "#FFD166", textColor: "#2B2D42" },
  { name: "Pencil Sketch", icon: "E", color: "#6C757D" },
  { name: "EPIC MODE", icon: "!!", color: "#7B2D8E" },
];

const CARD_ROTATIONS = [-1.5, 0.8, -0.5];
const TAPE_COLORS = ["rgba(230,57,70,0.15)", "rgba(69,123,157,0.15)", "rgba(123,45,142,0.15)"];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="d-hero">
        <div className="d-container-sm" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <span className="d-badge">
              <span className="d-badge-dot" />
              your kid drew something. we fixed it.
            </span>
          </div>

          <h1 className="d-heading d-heading-xl" style={{ marginBottom: 24 }}>
            YOU CAN&apos;T<br />
            <span className="text-rainbow">THROW IT AWAY.</span>
          </h1>

          <p style={{ maxWidth: 560, margin: "0 auto 12px", fontFamily: "var(--font-accent)", fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.4, color: "#6C757D" }}>
            Your kid worked really hard on that&hellip; whatever it is.
          </p>
          <p className="d-body" style={{ maxWidth: 520, margin: "0 auto 32px" }}>
            Upload the drawing and we&apos;ll turn it into real artwork, store it forever,
            and free your house from the growing paper museum.
            We&apos;ll also include some wildly irresponsible parenting advice.
          </p>

          <div className="d-btn-row">
            <Link href="/create" className="d-btn-primary glow-cta">Upload a Drawing</Link>
            <Link href="/gallery" className="d-btn-secondary">See What We&apos;ve Done</Link>
          </div>

          <p className="d-body-xs" style={{ marginTop: 32, fontFamily: "var(--font-accent)", fontSize: 16 }}>
            3 free forges. No credit card. We promise.
          </p>
        </div>
      </section>

      {/* ── WALL OF SHAME (the magic -- show it first) ── */}
      <section style={{ padding: "64px 0", background: "#D4E8F0" }}>
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-red" style={{ fontFamily: "var(--font-accent)", fontSize: 18 }}>the wall of shame</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 16 }}>Actual things children drew.</h2>
            <p className="d-body" style={{ maxWidth: 440, margin: "0 auto" }}>
              Real submissions. Real delusion. We love these kids. We just couldn&apos;t hang the originals.
            </p>
          </div>
          <div className="d-grid d-grid-3">
            {WALL_OF_SHAME_PREVIEW.map((item, i) => (
              <div
                key={i}
                className="d-shame-card"
                style={{ transform: `rotate(${CARD_ROTATIONS[i]}deg)` }}
              >
                <div className="d-shame-top" style={{ background: TAPE_COLORS[i] }}>
                  <p style={{ fontSize: 15, fontStyle: "italic", color: "#6C757D", lineHeight: 1.6, textAlign: "center", marginBottom: 16 }}>
                    &ldquo;{item.original}&rdquo;
                  </p>
                  <span className="d-pill d-pill-coral">The original</span>
                </div>
                <div className="d-shame-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="d-bubble">
                    <div className="d-bubble-avatar" style={{ background: "#FFD166", color: "#2B2D42" }}>K</div>
                    <div>
                      <p className="d-bubble-label">Kid says</p>
                      <p style={{ fontSize: 14, lineHeight: 1.4, color: "#2B2D42" }}>&ldquo;{item.kidSays}&rdquo;</p>
                    </div>
                  </div>
                  <div className="d-bubble">
                    <div className="d-bubble-avatar" style={{ background: "#7B2D8E", color: "#fff" }}>P</div>
                    <div>
                      <p className="d-bubble-label">Parent thinks</p>
                      <p style={{ fontSize: 14, lineHeight: 1.4, color: "#6C757D", fontStyle: "italic" }}>&ldquo;{item.parentThinks}&rdquo;</p>
                    </div>
                  </div>
                </div>
                <div className="d-shame-footer">
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#06D6A0", fontFamily: "var(--font-accent)" }}>Fixed it</p>
                    <p style={{ fontSize: 13, color: "#ADB5BD", marginTop: 2 }}>{item.style} -- {item.artist}</p>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(6,214,160,0.15)", border: "2px solid #2B2D42", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-center" style={{ marginTop: 40 }}>
            <Link href="/gallery" className="d-btn-secondary">See All Submissions</Link>
          </div>
        </div>
      </section>

      {/* ── CRAYON DIVIDER ── */}
      <div className="d-divider-gradient" />

      {/* ── THREE PILLARS ── */}
      <section style={{ padding: "64px 0", background: "#FFF8F0" }}>
        <div className="d-container">
          <div className="d-grid d-grid-3">
            {[
              {
                title: "FORGE IT",
                desc: "Upload the scribble. Pick a style. Get art you can actually hang up.",
                color: "#E63946",
                bg: "#E6394615",
                href: "/create",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                ),
                rotate: -2,
              },
              {
                title: "VAULT IT",
                desc: "Stop throwing away memories, you monster. Scan it, save it, done.",
                color: "#457B9D",
                bg: "#457B9D15",
                href: "/vault",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#457B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                  </svg>
                ),
                rotate: 1,
              },
              {
                title: "SURVIVE IT",
                desc: "Parenting advice from people who are also faking it.",
                color: "#7B2D8E",
                bg: "#7B2D8E15",
                href: "/advice",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B2D8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
                rotate: -1,
              },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="craft-card d-card-hover"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transform: `rotate(${p.rotate}deg)`,
                  ["--card-rotate" as string]: p.rotate,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    background: p.bg,
                    border: "2px solid #2B2D42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#2B2D42", marginBottom: 8 }}>
                  {p.title}
                </h3>
                <p className="d-body" style={{ fontSize: 14 }}>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "64px 0", background: "#FFF8F0" }}>
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-purple" style={{ fontFamily: "var(--font-accent)", fontSize: 18 }}>how it works</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 16 }}>Three steps. Zero art skill.</h2>
          </div>
          <div className="d-grid d-grid-3" style={{ gap: 32 }}>
            {[
              {
                step: "1",
                title: "Kid draws... something",
                desc: "Take a photo of the drawing. Upload it. We accept all levels of artistic crime.",
                color: "#E63946",
                rotate: -1,
              },
              {
                step: "2",
                title: "AI figures out what it is",
                desc: "Pick a style. Oil painting? Anime? We have 12 ways to make it not look like a potato.",
                color: "#457B9D",
                rotate: 1,
              },
              {
                step: "3",
                title: "Now it's art. You're welcome.",
                desc: "Download, print, frame. Take full credit. We won't tell.",
                color: "#06D6A0",
                rotate: -0.5,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="craft-card"
                style={{
                  textAlign: "center",
                  transform: `rotate(${item.rotate}deg)`,
                  ["--card-rotate" as string]: item.rotate,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 6,
                    background: item.color,
                    border: "3px solid #2B2D42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "2px 2px 0px #2B2D42",
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#2B2D42", marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p className="d-body" style={{ fontSize: 14 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "64px 0", background: "#F5E6D3", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-green" style={{ fontFamily: "var(--font-accent)", fontSize: 18 }}>what parents say</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 16 }}>Real parents. Real reactions.</h2>
          </div>
          <div className="d-grid d-grid-3" style={{ gap: 20 }}>
            {[
              { quote: "My mother-in-law cried when she saw the oil painting version of my son's stick figure family portrait. Best $0 I ever spent.", name: "Jessica M.", detail: "Mom of 2", color: "#E63946" },
              { quote: "My 4-year-old thinks he's a 'real artist' now because his dinosaur looks like concept art from Jurassic Park.", name: "David K.", detail: "Dad of 1", color: "#457B9D" },
              { quote: "I have 3 Doodie prints framed in my living room. Guests always ask where I got them. I point at my 5-year-old.", name: "Sarah T.", detail: "Mom of 3", color: "#7B2D8E" },
              { quote: "Turned my daughter's crayon cat into an anime character. She asked if the cat was 'famous now.' I said yes.", name: "Mike R.", detail: "Dad of 2", color: "#06D6A0" },
              { quote: "Used this for my classroom end-of-year gifts. Every parent got a transformed version. The school newsletter featured us.", name: "Ms. Thompson", detail: "2nd Grade Teacher", color: "#FFD166" },
              { quote: "My son drew our house. The AI made it look like a Miyazaki film. It's his phone wallpaper now. He's 6.", name: "Rachel P.", detail: "Mom of 2", color: "#E63946" },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "3px solid #2B2D42",
                  borderRadius: 8,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transform: `rotate(${(i % 3 - 1) * 0.8}deg)`,
                }}
              >
                <div>
                  <div style={{ height: 4, width: 40, borderRadius: 2, marginBottom: 16, background: t.color }} />
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#2B2D42", marginBottom: 20 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: t.color,
                    border: "2px solid #2B2D42",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    color: t.color === "#FFD166" ? "#2B2D42" : "#fff",
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#2B2D42" }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "#ADB5BD", fontFamily: "var(--font-accent)" }}>{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STYLE STRIP ── */}
      <section style={{ padding: "64px 0", background: "#FFF8F0", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-blue" style={{ fontFamily: "var(--font-accent)", fontSize: 18 }}>art styles</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 16 }}>Make it look intentional.</h2>
            <p className="d-body">12 styles that turn &ldquo;what is that&rdquo; into &ldquo;where did you buy that?&rdquo;</p>
          </div>
          <div className="d-grid d-grid-4">
            {STYLES.map((s) => (
              <Link key={s.name} href="/create" className="d-style-tile" style={{ textDecoration: "none" }}>
                <div className="d-style-icon" style={{ background: s.color, color: s.textColor || "#fff" }}>{s.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: "#2B2D42" }}>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "80px 0", background: "#E63946", borderTop: "4px solid #2B2D42" }}>
        <div className="d-container-sm d-center">
          <h2
            className="d-heading d-heading-lg"
            style={{ color: "#fff", marginBottom: 16, lineHeight: 1.2 }}
          >
            STOP LYING ABOUT THE BLOB ON YOUR FRIDGE
          </h2>
          <p style={{ fontFamily: "var(--font-accent)", fontSize: 22, color: "rgba(255,255,255,0.85)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.3 }}>
            You know that thing your kid drew? The one you smile at every morning while quietly wondering what it is?
            Upload it. We&apos;ll handle the rest.
          </p>
          <Link
            href="/create"
            className="glow-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 48px",
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              background: "#fff",
              color: "#E63946",
              border: "3px solid #2B2D42",
              boxShadow: "4px 4px 0px #2B2D42",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
          >
            Upload a Drawing
          </Link>
          <p style={{ fontFamily: "var(--font-accent)", fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 24 }}>
            No signup. No credit card. Just upload the blob and see what happens.
          </p>
        </div>
      </section>
    </>
  );
}
