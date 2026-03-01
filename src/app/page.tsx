import Link from "next/link";
import { ParentingAdvice } from "@/components/parenting-advice";

const WALL_OF_SHAME = [
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
    original: "Blue and red house with smoke from chimney",
    kidSays: "That's where we live!",
    parentThinks: "We live in a trapezoid with a chimney that violates building codes",
    artist: "Sophia, age 6",
    style: "Watercolor",
  },
  {
    original: "Cat with triangle ears and whiskers",
    kidSays: "It's Mr. Whiskers!",
    parentThinks: "Mr. Whiskers looks like he's plotting a murder",
    artist: "Noah, age 5",
    style: "Anime",
  },
  {
    original: "Rainbow with clouds on both sides",
    kidSays: "I made it for you, Mommy!",
    parentThinks: "The rainbow is square. How is a rainbow square.",
    artist: "Olivia, age 3",
    style: "Cyberpunk",
  },
  {
    original: "Dad with really long arms and tiny legs",
    kidSays: "That's you, Daddy!",
    parentThinks: "Apparently I'm a human T-Rex having an existential crisis",
    artist: "Ethan, age 5",
    style: "Pop Art",
  },
];

const HARD_TRUTHS = [
  {
    lie: "\"Wow, that's amazing!\"",
    truth: "You said that about a brown circle. Your kid isn't fooled. They know it's a brown circle too.",
    icon: "T",
    color: "#FF6B6B",
  },
  {
    lie: "\"Let's put it on the fridge!\"",
    truth: "The fridge is full. You're stacking art on top of art. It's structurally unsound. Something will fall.",
    icon: "F",
    color: "#A78BFA",
  },
  {
    lie: "\"You're such an artist!\"",
    truth: "False expectations lead to art school. Art school leads to debt. Debt leads to them moving back in. Think about it.",
    icon: "A",
    color: "#60A5FA",
  },
  {
    lie: "\"I'll keep it forever!\"",
    truth: "You threw away 4 drawings last Tuesday when they weren't looking. We both know it. Stop lying to yourself.",
    icon: "K",
    color: "#F472B6",
  },
];

const PRICING_TIERS = [
  {
    name: "The Dip",
    price: "$4.99",
    desc: "One transformation. Just to see if we're legit.",
    features: ["1 AI transformation", "3 style options", "High-res download", "Print-ready file"],
    popular: false,
  },
  {
    name: "The Binge",
    price: "$12.99",
    desc: "Five transformations. You will use all of them in one sitting.",
    features: [
      "5 AI transformations",
      "All 8 styles unlocked",
      "High-res downloads",
      "Print-ready files",
      "Priority processing",
    ],
    popular: true,
  },
  {
    name: "The Addiction",
    price: "$29.99/mo",
    desc: "Unlimited. For the parent who has a problem.",
    features: [
      "Unlimited transformations",
      "All styles, forever",
      "High-res downloads",
      "Print-ready files",
      "Priority processing",
      "Commercial license",
      "API access",
    ],
    popular: false,
  },
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

export default function Home() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {/* Soft pastel gradient blurs */}
        <div className="absolute rounded-full" style={{ top: "15%", left: "15%", width: 500, height: 500, background: "rgba(255,107,107,0.07)", filter: "blur(120px)" }} />
        <div className="absolute rounded-full" style={{ bottom: "20%", right: "15%", width: 450, height: 450, background: "rgba(96,165,250,0.07)", filter: "blur(120px)" }} />
        <div className="absolute rounded-full" style={{ top: "40%", left: "55%", width: 350, height: 350, background: "rgba(167,139,250,0.06)", filter: "blur(100px)" }} />

        <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full backdrop-blur-sm px-6 py-2.5 text-xs font-medium tracking-wide"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #E5E7EB", color: "#6B7280", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ background: "#34D399" }} />
            AI-Powered Art Intervention
          </div>

          <h1
            className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Fridge art.{" "}
            <span className="text-rainbow">Gallery upgrade.</span>
          </h1>

          <p className="mx-auto mb-4 max-w-lg text-lg leading-relaxed md:text-xl" style={{ color: "#6B7280" }}>
            Your kid drew something. You lied and said it was great.
            We actually make it great. Problem solved.
          </p>
          <p className="mx-auto mb-10 max-w-md text-sm" style={{ color: "#9CA3AF" }}>
            Upload the scribble. Pick a style. Get real art. Hang it up.
            Take credit at Thanksgiving. We won&apos;t tell.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/create" className="hero-cta-primary">
              Upload a Doodle &rarr;
            </Link>
            <Link href="/gallery" className="hero-cta-secondary">
              See the Evidence
            </Link>
          </div>

          <p className="mt-10 text-xs" style={{ color: "#9CA3AF" }}>
            No account needed. No judgment. We&apos;ve seen worse.
          </p>
        </div>
      </section>

      {/* --- THREE PILLARS --- */}
      <section className="relative z-10 bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl"
                style={{ width: "56px", height: "56px", margin: "0 auto 20px", backgroundColor: "rgba(255,107,107,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">AI Art Transformation</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Upload the scribble. AI makes it gallery-worthy. Your kid&apos;s vision, minus the skill gap.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl"
                style={{ width: "56px", height: "56px", margin: "0 auto 20px", backgroundColor: "rgba(167,139,250,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">The Vault</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every drawing, stored forever. No more &ldquo;I swear it was in this drawer.&rdquo;
                Scan it, save it, never feel guilty again.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl"
                style={{ width: "56px", height: "56px", margin: "0 auto 20px", backgroundColor: "rgba(96,165,250,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Parenting Advice</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Terrible advice for every parenting situation. By an AI. That has no children.
                What could go wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
              How it works
            </p>
            <h2
              className="text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Three steps. Zero talent required.
            </h2>
            <p className="mt-4 text-text-secondary">
              (Yours or theirs. We don&apos;t discriminate.)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Upload the evidence"
              desc="Snap a photo of whatever your kid made. The crumpled thing on the fridge. The napkin doodle. The crayon mural on your rental wall that you're definitely not getting the deposit back for."
              color="#FF6B6B"
              icon={<UploadIcon />}
            />
            <StepCard
              step="02"
              title="Pick a style"
              desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's 30-second scribble reborn as something that took a real artist 40 hours."
              color="#60A5FA"
              icon={<PaletteIcon />}
            />
            <StepCard
              step="03"
              title="Receive actual art"
              desc="Our AI transforms it into something you'd actually hang above the couch. Same composition, same vibe, 1000x more frameable. Your kid gets hyped. You get wall art. Grandma cries."
              color="#34D399"
              icon={<FrameIcon />}
            />
          </div>
        </div>
      </section>

      {/* --- HARD TRUTHS (Here's What You Avoid) --- */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              The intervention
            </p>
            <h2
              className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Stop lying to your children.
            </h2>
            <p className="mx-auto max-w-lg text-text-secondary leading-relaxed">
              Every parent does it. You look at a blob, say &ldquo;wow, beautiful!&rdquo;
              and stick it on the fridge. Here&apos;s what that&apos;s actually costing you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {HARD_TRUTHS.map((item) => (
              <div
                key={item.lie}
                className="rounded-2xl border border-border bg-surface p-8 transition-all hover:shadow-lg hover:shadow-black/[0.04] hover:border-border-hover"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </span>
                  <p className="text-lg font-bold text-foreground">{item.lie}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {item.truth}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted">
              Or -- and hear us out -- you could just upload the drawing and let AI
              make it actually good. Then everyone&apos;s happy and nobody needs therapy.
            </p>
          </div>
        </div>
      </section>

      {/* --- WALL OF SHAME --- */}
      <section className="relative z-10 bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              The wall of shame
            </p>
            <h2
              className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Actual things children drew.
            </h2>
            <p className="mx-auto max-w-md text-text-secondary leading-relaxed">
              Real submissions. Real delusion. We love these kids.
              We just couldn&apos;t hang the originals with a straight face.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WALL_OF_SHAME.map((item, i) => (
              <WallOfShameCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- THE VAULT --- */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
                The Vault
              </p>
              <h2
                className="mb-6 text-3xl font-bold tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Stop throwing away memories.
                <br />
                <span className="text-text-secondary">You monster.</span>
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                Every parent has a drawer. The drawer is full. The guilt is real.
                You know you&apos;ve thrown away drawings when they weren&apos;t looking.
                We know it too.
              </p>
              <p className="mb-6 text-[15px] leading-relaxed text-text-secondary">
                The Vault stores every single drawing your kid makes -- digitally,
                forever, organized by kid and date. Scan it in 2 seconds, close the drawer,
                and never feel bad about the recycling bin again.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Unlimited scans. Free forever. No excuse.
                </li>
                <li className="flex items-center gap-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Organized by kid, date, and &ldquo;what were they thinking&rdquo;
                </li>
                <li className="flex items-center gap-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  One-tap transform any stored drawing later
                </li>
                <li className="flex items-center gap-3 text-sm text-text-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Share vault with grandparents who &ldquo;want to see everything&rdquo;
                </li>
              </ul>
              <Link href="/create" className="hero-cta-primary">
                Start Hoarding Digitally &rarr;
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="space-y-4">
                {["Monday blob", "Tuesday scribble", "Wednesday... cat?", "Thursday masterpiece", "Friday abstract"].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 rounded-xl bg-background p-4 border border-border/50">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: ["#FF6B6B", "#60A5FA", "#A78BFA", "#34D399", "#FBBF24"][i] }}
                    >
                      {["M", "T", "W", "T", "F"][i]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item}</p>
                      <p className="text-xs text-text-muted">March {i + 1}, 2025 -- Emma, age 5</p>
                    </div>
                    <span className="rounded-full bg-green/10 px-3 py-1 text-[10px] font-bold text-green">
                      Saved
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-text-muted">
                5 drawings this week. 0 in the trash. Progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARENTING ADVICE --- */}
      <ParentingAdvice />

      {/* --- STYLE OPTIONS --- */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              Art styles
            </p>
            <h2
              className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Make it look intentional.
            </h2>
            <p className="text-text-secondary">
              8 styles that turn &ldquo;what is that&rdquo; into &ldquo;where did you buy that?&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {STYLES.map((style) => (
              <Link
                key={style.name}
                href="/create"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center transition-all hover:shadow-lg hover:shadow-black/[0.04] hover:scale-[1.02] hover:border-border-hover"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm"
                  style={{ backgroundColor: style.color }}
                >
                  {style.icon}
                </span>
                <span className="text-sm font-semibold text-foreground">{style.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRINTS CTA --- */}
      <section className="relative z-10 bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
            Physical prints
          </p>
          <h2
            className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Put it on <span className="text-rainbow">a real wall.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            Your kid&apos;s art, printed on materials that don&apos;t crumble
            when someone opens the fridge too hard. Museum-quality stuff.
            The kind of thing guests stare at and say &ldquo;wait, your kid drew that?&rdquo;
          </p>
          <div className="grid grid-cols-3 gap-6" style={{ maxWidth: "540px", margin: "0 auto" }}>
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl" style={{ width: "56px", height: "56px", margin: "0 auto 16px", backgroundColor: "rgba(255,107,107,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: "#1A1A2E" }}>Canvas</div>
              <div className="text-xs mb-2" style={{ color: "#9CA3AF" }}>Fancy. Textured. Overkill.</div>
              <div className="text-sm" style={{ color: "#9CA3AF" }}>from <span style={{ color: "#FF6B6B", fontWeight: 600 }}>$29.99</span></div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl" style={{ width: "56px", height: "56px", margin: "0 auto 16px", backgroundColor: "rgba(167,139,250,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: "#1A1A2E" }}>Framed</div>
              <div className="text-xs mb-2" style={{ color: "#9CA3AF" }}>Gallery-ready. Gift-ready.</div>
              <div className="text-sm" style={{ color: "#9CA3AF" }}>from <span style={{ color: "#A78BFA", fontWeight: 600 }}>$49.99</span></div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8 text-center transition-all hover:shadow-lg hover:border-border-hover">
              <div className="flex items-center justify-center rounded-2xl" style={{ width: "56px", height: "56px", margin: "0 auto 16px", backgroundColor: "rgba(96,165,250,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="8" y1="6" x2="16" y2="6"/></svg>
              </div>
              <div className="text-base font-semibold mb-1" style={{ color: "#1A1A2E" }}>Poster</div>
              <div className="text-xs mb-2" style={{ color: "#9CA3AF" }}>Big. Bold. Cheap thrills.</div>
              <div className="text-sm" style={{ color: "#9CA3AF" }}>from <span style={{ color: "#60A5FA", fontWeight: 600 }}>$14.99</span></div>
            </div>
          </div>
          <p className="mt-6 text-xs text-text-muted">
            Printed and shipped in 3-5 business days. Faster than your kid&apos;s next masterpiece.
          </p>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="relative z-10 py-20 md:py-28" id="pricing">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sunny">
              Pricing
            </p>
            <h2
              className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Cheaper than therapy.
            </h2>
            <p className="text-text-secondary">
              Also cheaper than art school, framing supplies, and the lie
              you&apos;ve been living.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2
            className="mb-6 text-3xl font-bold tracking-tight md:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Look. <span className="text-coral">The drawing is bad.</span>
            <br />
            <span className="text-sky">The kid is great.</span> We fix the first part.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            You know that thing on the fridge? The one you smile at
            every morning while quietly wondering what it is?
            Upload it. We&apos;ll handle the rest. Your kid thinks they&apos;re
            Picasso, and honestly, with our help, they&apos;re not wrong.
          </p>
          <Link href="/create" className="hero-cta-primary">
            Upload a Doodle &rarr;
          </Link>
          <p className="mt-6 text-xs text-text-muted">
            No signup. No credit card. Just upload the blob and see what happens.
          </p>
        </div>
      </section>
    </>
  );
}

/* --- Step Card --- */

function StepCard({
  step,
  title,
  desc,
  color,
  icon,
}: {
  step: string;
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-10 transition-all hover:shadow-lg" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
      <div
        className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {icon}
      </div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted">
        Step {step}
      </p>
      <h3 className="mb-4 text-xl font-bold leading-snug text-foreground">{title}</h3>
      <p className="text-[15px] text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

/* --- Wall of Shame Card --- */

const PASTEL_BG = [
  "rgba(255,107,107,0.04)", "rgba(96,165,250,0.04)", "rgba(167,139,250,0.04)",
  "rgba(52,211,153,0.04)", "rgba(251,191,36,0.04)", "rgba(244,114,182,0.04)",
];

function WallOfShameCard({
  item,
  index,
}: {
  item: (typeof WALL_OF_SHAME)[number];
  index: number;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-border-hover hover:shadow-lg hover:shadow-black/[0.04]">
      {/* The "original" description */}
      <div className="flex flex-col items-center justify-center px-8 py-12" style={{ backgroundColor: PASTEL_BG[index % PASTEL_BG.length] }}>
        <p className="mb-5 text-center text-[15px] italic text-text-secondary leading-relaxed">
          &ldquo;{item.original}&rdquo;
        </p>
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-coral">
          The original
        </span>
      </div>

      {/* Speech bubbles */}
      <div className="flex-1 border-t border-border px-8 py-7 space-y-5">
        <div className="flex gap-4 items-start">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sunny/15 text-[10px] font-bold text-sunny">
            K
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-sunny mb-1.5">Kid says</p>
            <p className="text-[14px] leading-snug text-foreground">&ldquo;{item.kidSays}&rdquo;</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lavender/15 text-[10px] font-bold text-lavender">
            P
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-lavender mb-1.5">Parent thinks</p>
            <p className="text-[14px] leading-snug text-text-secondary italic">&ldquo;{item.parentThinks}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-8 py-5 bg-surface-2/30 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-green">Fixed it</p>
          <p className="text-[13px] text-text-muted mt-1">{item.style} -- {item.artist}</p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* --- Pricing Card --- */

function PricingCard({ tier }: { tier: (typeof PRICING_TIERS)[number] }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-10 transition-all ${
        tier.popular
          ? "scale-[1.03] shadow-xl shadow-coral/[0.06] border-coral/30 bg-surface"
          : "bg-surface border-border hover:shadow-lg hover:shadow-black/[0.04] hover:border-border-hover"
      }`}
    >
      {tier.popular && (
        <div className="popular-badge">
          Yeah, This One
        </div>
      )}
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-bold text-foreground">{tier.name}</h3>
        <p className="text-sm text-text-muted">{tier.desc}</p>
      </div>
      <div className="mb-8">
        <span className="text-5xl font-extrabold tracking-tight text-foreground">{tier.price}</span>
      </div>
      <ul className="mb-10 flex-1 space-y-4">
        {tier.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/create"
        className={tier.popular ? "pricing-cta-popular" : "pricing-cta-default"}
      >
        {tier.popular ? "Obviously This One" : "Get Started"}
      </Link>
    </div>
  );
}

/* --- Small Components --- */

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="19" cy="13" r="2" />
      <circle cx="7" cy="13" r="2" />
      <circle cx="13.5" cy="19.5" r="2.5" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
  );
}

function FrameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  );
}
