import Link from "next/link";
import { ParentingAdvice } from "@/components/parenting-advice";

const WALL_OF_SHAME = [
  { original: "Crayon stick figures under a yellow sun", kidSays: "That's our family at the beach!", parentThinks: "Why does Daddy have 7 fingers and no neck?", artist: "Emma, age 5", style: "Oil Painting" },
  { original: "Green blob with legs and teeth", kidSays: "It's a T-Rex, obviously!", parentThinks: "It's giving... avocado with anger issues", artist: "Liam, age 4", style: "Photorealistic" },
  { original: "Blue and red house with smoke from chimney", kidSays: "That's where we live!", parentThinks: "We live in a trapezoid with a chimney that violates building codes", artist: "Sophia, age 6", style: "Watercolor" },
  { original: "Cat with triangle ears and whiskers", kidSays: "It's Mr. Whiskers!", parentThinks: "Mr. Whiskers looks like he's plotting a murder", artist: "Noah, age 5", style: "Anime" },
  { original: "Rainbow with clouds on both sides", kidSays: "I made it for you, Mommy!", parentThinks: "The rainbow is square. How is a rainbow square.", artist: "Olivia, age 3", style: "Cyberpunk" },
  { original: "Dad with really long arms and tiny legs", kidSays: "That's you, Daddy!", parentThinks: "Apparently I'm a human T-Rex having an existential crisis", artist: "Ethan, age 5", style: "Pop Art" },
];

const HARD_TRUTHS = [
  { lie: "\"Wow, that's amazing!\"", truth: "You said that about a brown circle. Your kid isn't fooled. They know it's a brown circle too.", icon: "T", color: "#FF6B6B" },
  { lie: "\"Let's put it on the fridge!\"", truth: "The fridge is full. You're stacking art on top of art. It's structurally unsound. Something will fall.", icon: "F", color: "#A78BFA" },
  { lie: "\"You're such an artist!\"", truth: "False expectations lead to art school. Art school leads to debt. Debt leads to them moving back in. Think about it.", icon: "A", color: "#60A5FA" },
  { lie: "\"I'll keep it forever!\"", truth: "You threw away 4 drawings last Tuesday when they weren't looking. We both know it. Stop lying to yourself.", icon: "K", color: "#F472B6" },
];

const PRICING_TIERS = [
  { name: "The Dip", price: "$4.99", desc: "One transformation. Just to see if we're legit.", features: ["1 AI transformation", "3 style options", "High-res download", "Print-ready file"], popular: false },
  { name: "The Binge", price: "$12.99", desc: "Five transformations. You will use all of them in one sitting.", features: ["5 AI transformations", "All 8 styles unlocked", "High-res downloads", "Print-ready files", "Priority processing"], popular: true },
  { name: "The Addiction", price: "$29.99/mo", desc: "Unlimited. For the parent who has a problem.", features: ["Unlimited transformations", "All styles, forever", "High-res downloads", "Print-ready files", "Priority processing", "Commercial license", "API access"], popular: false },
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

const PASTEL_BG = ["rgba(255,107,107,0.04)", "rgba(96,165,250,0.04)", "rgba(167,139,250,0.04)", "rgba(52,211,153,0.04)", "rgba(251,191,36,0.04)", "rgba(244,114,182,0.04)"];
const VAULT_COLORS = ["#FF6B6B", "#60A5FA", "#A78BFA", "#34D399", "#FBBF24"];
const VAULT_DAYS = ["M", "T", "W", "T", "F"];
const VAULT_ITEMS = ["Monday blob", "Tuesday scribble", "Wednesday... cat?", "Thursday masterpiece", "Friday abstract"];

function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>;
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", paddingTop: 80, paddingBottom: 80 }}>
        <div className="d-blob" style={{ top: "15%", left: "15%", width: 500, height: 500, background: "rgba(255,107,107,0.07)" }} />
        <div className="d-blob" style={{ bottom: "20%", right: "15%", width: 450, height: 450, background: "rgba(96,165,250,0.07)" }} />
        <div className="d-blob" style={{ top: "40%", left: "55%", width: 350, height: 350, background: "rgba(167,139,250,0.06)", filter: "blur(100px)" }} />

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
            <Link href="/create" className="d-btn-primary">Upload a Doodle &rarr;</Link>
            <Link href="/gallery" className="d-btn-secondary">See the Evidence</Link>
          </div>

          <p className="d-body-xs" style={{ marginTop: 40 }}>No account needed. No judgment. We&apos;ve seen worse.</p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="d-section-surface" style={{ padding: "64px 0" }}>
        <div className="d-container">
          <div className="d-grid d-grid-3">
            {[
              { title: "AI Art Transformation", desc: "Upload the scribble. AI makes it gallery-worthy. Your kid's vision, minus the skill gap.", color: "rgba(255,107,107,0.08)", stroke: "#FF6B6B", path: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></> },
              { title: "The Vault", desc: "Every drawing, stored forever. No more \"I swear it was in this drawer.\" Scan it, save it, never feel guilty again.", color: "rgba(167,139,250,0.08)", stroke: "#A78BFA", path: <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /> },
              { title: "Parenting Advice", desc: "Terrible advice for every parenting situation. By an AI. That has no children. What could go wrong.", color: "rgba(96,165,250,0.08)", stroke: "#60A5FA", path: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></> },
            ].map((p) => (
              <div key={p.title} className="d-card d-card-sm d-card-center">
                <div className="d-icon-box d-icon-box-center" style={{ background: p.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={p.stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p.path}</svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>{p.title}</h3>
                <p className="d-body" style={{ fontSize: 14 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div className="d-section">
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-lavender">How it works</p>
            <h2 className="d-heading d-heading-lg">Three steps. Zero talent required.</h2>
            <p className="d-body" style={{ marginTop: 16 }}>(Yours or theirs. We don&apos;t discriminate.)</p>
          </div>
          <div className="d-grid d-grid-3">
            <StepCard step="01" title="Upload the evidence" desc="Snap a photo of whatever your kid made. The crumpled thing on the fridge. The napkin doodle. The crayon mural on your rental wall that you're definitely not getting the deposit back for." color="#FF6B6B" icon={<UploadIcon />} />
            <StepCard step="02" title="Pick a style" desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's 30-second scribble reborn as something that took a real artist 40 hours." color="#60A5FA" icon={<PaletteIcon />} />
            <StepCard step="03" title="Receive actual art" desc="Our AI transforms it into something you'd actually hang above the couch. Same composition, same vibe, 1000x more frameable. Your kid gets hyped. You get wall art. Grandma cries." color="#34D399" icon={<FrameIcon />} />
          </div>
        </div>
      </div>

      {/* THE INTERVENTION */}
      <div className="d-section">
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sky">The intervention</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Stop lying to your children.</h2>
            <p className="d-body" style={{ maxWidth: 520, margin: "0 auto" }}>
              Every parent does it. You look at a blob, say &ldquo;wow, beautiful!&rdquo; and stick it on the fridge. Here&apos;s what that&apos;s actually costing you.
            </p>
          </div>
          <div className="d-grid d-grid-2">
            {HARD_TRUTHS.map((item) => (
              <div key={item.lie} className="d-truth-card">
                <div className="d-flex d-items-center d-gap" style={{ marginBottom: 20 }}>
                  <div className="d-icon-box-sm d-icon-box-inline" style={{ background: item.color, width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{item.icon}</span>
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E" }}>{item.lie}</p>
                </div>
                <p className="d-body">{item.truth}</p>
              </div>
            ))}
          </div>
          <div className="d-center" style={{ marginTop: 40 }}>
            <p className="d-body-sm">Or -- and hear us out -- you could just upload the drawing and let AI make it actually good. Then everyone&apos;s happy and nobody needs therapy.</p>
          </div>
        </div>
      </div>

      {/* WALL OF SHAME */}
      <div className="d-section d-section-surface">
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-coral">The wall of shame</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Actual things children drew.</h2>
            <p className="d-body" style={{ maxWidth: 440, margin: "0 auto" }}>Real submissions. Real delusion. We love these kids. We just couldn&apos;t hang the originals with a straight face.</p>
          </div>
          <div className="d-grid d-grid-3">
            {WALL_OF_SHAME.map((item, i) => (
              <div key={i} className="d-shame-card">
                <div className="d-shame-top" style={{ background: PASTEL_BG[i % PASTEL_BG.length] }}>
                  <p style={{ fontSize: 15, fontStyle: "italic", color: "#6B7280", lineHeight: 1.6, textAlign: "center", marginBottom: 20 }}>&ldquo;{item.original}&rdquo;</p>
                  <span className="d-pill d-pill-coral">The original</span>
                </div>
                <div className="d-shame-body" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
                <div className="d-shame-footer">
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
        </div>
      </div>

      {/* THE VAULT */}
      <div className="d-section">
        <div className="d-container">
          <div className="d-grid d-grid-2" style={{ alignItems: "center" }}>
            <div>
              <p className="d-eyebrow d-eyebrow-lavender">The Vault</p>
              <h2 className="d-heading d-heading-md" style={{ marginBottom: 24 }}>
                Stop throwing away memories.<br />
                <span style={{ color: "#6B7280" }}>You monster.</span>
              </h2>
              <p className="d-body" style={{ marginBottom: 16 }}>
                Every parent has a drawer. The drawer is full. The guilt is real. You know you&apos;ve thrown away drawings when they weren&apos;t looking. We know it too.
              </p>
              <p className="d-body" style={{ marginBottom: 24 }}>
                The Vault stores every single drawing your kid makes -- digitally, forever, organized by kid and date. Scan it in 2 seconds, close the drawer, and never feel bad about the recycling bin again.
              </p>
              <ul className="d-check-list" style={{ marginBottom: 32 }}>
                <li className="d-check-item"><Check /> Unlimited scans. Free forever. No excuse.</li>
                <li className="d-check-item"><Check /> Organized by kid, date, and &ldquo;what were they thinking&rdquo;</li>
                <li className="d-check-item"><Check /> One-tap transform any stored drawing later</li>
                <li className="d-check-item"><Check /> Share vault with grandparents who &ldquo;want to see everything&rdquo;</li>
              </ul>
              <Link href="/create" className="d-btn-primary">Start Hoarding Digitally &rarr;</Link>
            </div>
            <div className="d-card d-card-sm">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {VAULT_ITEMS.map((item, i) => (
                  <div key={item} className="d-vault-row">
                    <div className="d-vault-day" style={{ background: VAULT_COLORS[i] }}>{VAULT_DAYS[i]}</div>
                    <div className="d-flex-1">
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{item}</p>
                      <p style={{ fontSize: 12, color: "#9CA3AF" }}>March {i + 1}, 2025 -- Emma, age 5</p>
                    </div>
                    <span className="d-pill d-pill-green">Saved</span>
                  </div>
                ))}
              </div>
              <p className="d-center d-body-xs" style={{ marginTop: 16 }}>5 drawings this week. 0 in the trash. Progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PARENTING ADVICE */}
      <ParentingAdvice />

      {/* STYLE OPTIONS */}
      <div className="d-section">
        <div className="d-container-md">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sky">Art styles</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Make it look intentional.</h2>
            <p className="d-body">8 styles that turn &ldquo;what is that&rdquo; into &ldquo;where did you buy that?&rdquo;</p>
          </div>
          <div className="d-grid d-grid-4">
            {STYLES.map((s) => (
              <Link key={s.name} href="/create" className="d-style-tile">
                <div className="d-style-icon" style={{ background: s.color }}>{s.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PRINTS */}
      <div className="d-section d-section-surface">
        <div className="d-container-sm d-center">
          <p className="d-eyebrow d-eyebrow-lavender">Physical prints</p>
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Put it on <span className="text-rainbow">a real wall.</span></h2>
          <p className="d-body" style={{ maxWidth: 520, margin: "0 auto 40px" }}>
            Your kid&apos;s art, printed on materials that don&apos;t crumble when someone opens the fridge too hard. Museum-quality stuff. The kind of thing guests stare at and say &ldquo;wait, your kid drew that?&rdquo;
          </p>
          <div className="d-print-grid">
            {[
              { name: "Canvas", sub: "Fancy. Textured. Overkill.", price: "$29.99", color: "#FF6B6B", bg: "rgba(255,107,107,0.08)" },
              { name: "Framed", sub: "Gallery-ready. Gift-ready.", price: "$49.99", color: "#A78BFA", bg: "rgba(167,139,250,0.08)" },
              { name: "Poster", sub: "Big. Bold. Cheap thrills.", price: "$14.99", color: "#60A5FA", bg: "rgba(96,165,250,0.08)" },
            ].map((p) => (
              <div key={p.name} className="d-print-card">
                <div className="d-print-icon" style={{ background: p.bg }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>{p.sub}</p>
                <p style={{ fontSize: 14, color: "#9CA3AF" }}>from <span style={{ color: p.color, fontWeight: 600 }}>{p.price}</span></p>
              </div>
            ))}
          </div>
          <p className="d-body-xs" style={{ marginTop: 24 }}>Printed and shipped in 3-5 business days. Faster than your kid&apos;s next masterpiece.</p>
        </div>
      </div>

      {/* PRICING */}
      <div className="d-section" id="pricing">
        <div className="d-container">
          <div className="d-center d-mb-2xl">
            <p className="d-eyebrow d-eyebrow-sunny">Pricing</p>
            <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24 }}>Cheaper than therapy.</h2>
            <p className="d-body">Also cheaper than art school, framing supplies, and the lie you&apos;ve been living.</p>
          </div>
          <div className="d-grid d-grid-3">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.name} className={`d-pricing-card ${tier.popular ? "d-pricing-popular" : ""}`}>
                {tier.popular && <div className="d-popular-badge">Yeah, This One</div>}
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", marginBottom: 8 }}>{tier.name}</h3>
                  <p className="d-body-sm">{tier.desc}</p>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em", color: "#1A1A2E" }}>{tier.price}</span>
                </div>
                <ul className="d-check-list" style={{ flex: 1, marginBottom: 40 }}>
                  {tier.features.map((f) => (
                    <li key={f} className="d-check-item"><Check /> {f}</li>
                  ))}
                </ul>
                <Link href="/create" className={`d-btn-primary d-btn-block ${!tier.popular ? "d-btn-secondary d-btn-block" : ""}`}>
                  {tier.popular ? "Obviously This One" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="d-section">
        <div className="d-container-sm d-center">
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 24, lineHeight: 1.2 }}>
            Look. <span style={{ color: "#FF6B6B" }}>The drawing is bad.</span><br />
            <span style={{ color: "#60A5FA" }}>The kid is great.</span> We fix the first part.
          </h2>
          <p className="d-body" style={{ maxWidth: 520, margin: "0 auto 40px" }}>
            You know that thing on the fridge? The one you smile at every morning while quietly wondering what it is? Upload it. We&apos;ll handle the rest. Your kid thinks they&apos;re Picasso, and honestly, with our help, they&apos;re not wrong.
          </p>
          <Link href="/create" className="d-btn-primary">Upload a Doodle &rarr;</Link>
          <p className="d-body-xs" style={{ marginTop: 24 }}>No signup. No credit card. Just upload the blob and see what happens.</p>
        </div>
      </div>
    </>
  );
}

/* ── Components ── */

function StepCard({ step, title, desc, color, icon }: { step: string; title: string; desc: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="d-card">
      <div className="d-icon-box" style={{ background: color, color: "#fff" }}>{icon}</div>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9CA3AF", marginBottom: 12 }}>Step {step}</p>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.3, marginBottom: 16 }}>{title}</h3>
      <p className="d-body">{desc}</p>
    </div>
  );
}

function UploadIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
}

function PaletteIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="13" r="2" /><circle cx="7" cy="13" r="2" /><circle cx="13.5" cy="19.5" r="2.5" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>;
}

function FrameIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="10" height="10" rx="1" /></svg>;
}
