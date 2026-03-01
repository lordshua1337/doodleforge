import Link from "next/link";

const WALL_OF_SHAME = [
  {
    original: "Crayon stick figures under a yellow sun",
    kidSays: "That's our family at the beach!",
    parentThinks: "Why does Daddy have 7 fingers?",
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
    parentThinks: "We live in a trapezoid apparently",
    artist: "Sophia, age 6",
    style: "Watercolor",
  },
  {
    original: "Cat with triangle ears and whiskers",
    kidSays: "It's Mr. Whiskers!",
    parentThinks: "Mr. Whiskers looks like he's seen things",
    artist: "Noah, age 5",
    style: "Anime",
  },
  {
    original: "Rainbow with clouds on both sides",
    kidSays: "I made it for you!",
    parentThinks: "Why is the rainbow... square?",
    artist: "Olivia, age 3",
    style: "Cyberpunk",
  },
  {
    original: "Dad with really long arms and tiny legs",
    kidSays: "That's you, Daddy!",
    parentThinks: "Do I really look like a stick figure having an existential crisis?",
    artist: "Ethan, age 5",
    style: "Pop Art",
  },
];

const PRICING_TIERS = [
  {
    name: "Single",
    price: "$4.99",
    desc: "One transformation",
    features: ["1 AI transformation", "3 style options", "High-res download", "Print-ready file"],
    popular: false,
  },
  {
    name: "Pack",
    price: "$12.99",
    desc: "Five transformations",
    features: [
      "5 AI transformations",
      "All style options",
      "High-res downloads",
      "Print-ready files",
      "Priority processing",
    ],
    popular: true,
  },
  {
    name: "Unlimited",
    price: "$29.99/mo",
    desc: "Go absolutely wild",
    features: [
      "Unlimited transformations",
      "All style options",
      "High-res downloads",
      "Print-ready files",
      "Priority processing",
      "Commercial license",
      "API access",
    ],
    popular: false,
  },
];

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple/[0.05] rounded-full blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface/60 backdrop-blur-sm px-5 py-2.5 text-xs font-medium text-text-secondary tracking-wide">
            <span className="inline-block h-2 w-2 rounded-full bg-green animate-pulse" />
            AI-Powered Art Transformation
          </div>

          <h1 className="mb-8 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Fridge art.{" "}
            <span className="text-accent">Gallery</span>{" "}
            upgrade.
          </h1>

          <p className="mx-auto mb-4 max-w-lg text-lg text-text-secondary leading-relaxed md:text-xl">
            Upload your kid&apos;s masterpiece. Our AI transforms it
            into art you&apos;ll actually want to frame.
          </p>
          <p className="mx-auto mb-14 max-w-md text-sm text-text-muted">
            They&apos;ll think they&apos;re Picasso. You&apos;ll know the truth. Everyone wins.
          </p>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <Link
              href="/create"
              className="rounded-xl bg-accent px-10 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/20"
            >
              Upload a Doodle &rarr;
            </Link>
            <Link
              href="/gallery"
              className="rounded-xl border border-border px-10 py-4 text-base font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground hover:bg-surface"
            >
              See the Gallery
            </Link>
          </div>

          <p className="mt-10 text-xs text-text-muted">
            No account needed. Upload, transform, download.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative z-10 border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-24 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Three steps. Zero talent required.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Upload the masterpiece"
              desc="Snap a photo of your kid's drawing. The crumpled paper on the fridge, the napkin doodle, the crayon mural on your wall."
              icon={<UploadIcon />}
            />
            <StepCard
              step="02"
              title="Pick a style"
              desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's vision reborn."
              icon={<PaletteIcon />}
            />
            <StepCard
              step="03"
              title="Get actual art"
              desc="Our AI creates a professional piece that captures the same scene. Download it, print it, frame it."
              icon={<FrameIcon />}
            />
          </div>
        </div>
      </section>

      {/* ─── WALL OF SHAME ─── */}
      <section className="relative z-10 border-t border-border bg-surface py-32 md:py-40">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-20 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The wall of shame
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Can you guess what they drew?
            </h2>
            <p className="mx-auto max-w-md text-text-secondary leading-relaxed">
              Real submissions from real kids. We love their art.
              We just needed to elevate it a little.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WALL_OF_SHAME.map((item, i) => (
              <WallOfShameCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLE OPTIONS ─── */}
      <section className="relative z-10 border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-4xl px-8">
          <div className="mb-20 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              Art styles
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Pick your flavor.
            </h2>
            <p className="text-text-secondary">
              8 styles. Each one turns scribbles into something gallery-worthy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { name: "Oil Painting", icon: "P", color: "#FF6B35" },
              { name: "Watercolor", icon: "W", color: "#60A5FA" },
              { name: "Anime", icon: "A", color: "#F472B6" },
              { name: "Cyberpunk", icon: "C", color: "#A78BFA" },
              { name: "Pop Art", icon: "!", color: "#FBBF24" },
              { name: "Pixel Art", icon: "#", color: "#34D399" },
              { name: "Studio Ghibli", icon: "G", color: "#FB923C" },
              { name: "Photorealistic", icon: "R", color: "#60A5FA" },
            ].map((style) => (
              <Link
                key={style.name}
                href="/create"
                className="group flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center transition-all hover:shadow-lg hover:scale-[1.02] hover:border-border-hover"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white"
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

      {/* ─── PRINTS CTA ─── */}
      <section className="relative z-10 border-t border-border bg-surface py-32 md:py-40">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple">
            Physical prints
          </p>
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Put it on <span className="text-accent">your wall.</span>
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-text-secondary leading-relaxed">
            Order museum-quality prints of your kid&apos;s reborn artwork.
            Canvas, framed, or poster. Shipped to your door.
          </p>
          <div className="inline-flex items-center gap-10 rounded-2xl border border-border bg-background px-12 py-8">
            <PrintOption label="Canvas" price="$29.99" />
            <Divider />
            <PrintOption label="Framed" price="$49.99" />
            <Divider />
            <PrintOption label="Poster" price="$14.99" />
          </div>
          <p className="mt-6 text-xs text-text-muted">
            Fulfilled via print-on-demand. Ships in 3-5 business days.
          </p>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="relative z-10 border-t border-border py-32 md:py-40" id="pricing">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-24 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
              Pricing
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Cheaper than art school.
            </h2>
            <p className="text-text-secondary">
              And infinitely more effective for your specific situation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-10 transition-all ${
                  tier.popular
                    ? "scale-[1.03] shadow-xl border-accent/40 bg-accent/[0.03]"
                    : "bg-surface border-border hover:shadow-lg hover:border-border-hover"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-10">
                  <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-text-muted">{tier.desc}</p>
                </div>
                <div className="mb-10">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                </div>
                <ul className="mb-12 flex-1 space-y-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className={`block w-full rounded-xl py-4 text-center text-sm font-semibold transition-all ${
                    tier.popular
                      ? "bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20"
                      : "border border-border text-foreground hover:bg-surface-2 hover:border-border-hover"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-5xl leading-tight" style={{ fontFamily: "var(--font-dm-serif)" }}>
            Their art. <span className="text-accent">Your walls.</span>
            <br />
            Their imagination. Your frame.
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-text-secondary leading-relaxed">
            You know that drawing on the fridge? The one you smile at every morning?
            Imagine it as a real painting. That&apos;s what we do.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-12 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/20"
          >
            Upload a Doodle &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Step Card ─── */

function StepCard({
  step,
  title,
  desc,
  icon,
}: {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-10 transition-all hover:shadow-lg hover:border-border-hover">
      <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted">
        Step {step}
      </p>
      <h3 className="mb-4 text-xl font-bold leading-snug">{title}</h3>
      <p className="text-[15px] text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Wall of Shame Card ─── */

function WallOfShameCard({
  item,
}: {
  item: (typeof WALL_OF_SHAME)[number];
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-border-hover hover:shadow-lg">
      {/* The "original" description */}
      <div className="flex flex-col items-center justify-center px-8 py-12 bg-surface-2/50">
        <p className="mb-5 text-center text-[15px] italic text-text-muted leading-relaxed">
          &ldquo;{item.original}&rdquo;
        </p>
        <span className="inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
          The original
        </span>
      </div>

      {/* Speech bubbles */}
      <div className="flex-1 border-t border-border px-8 py-7 space-y-5">
        <div className="flex gap-4 items-start">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow/10 text-[10px] font-bold text-yellow">
            K
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-yellow mb-1.5">Kid says</p>
            <p className="text-[14px] leading-snug text-foreground">&ldquo;{item.kidSays}&rdquo;</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple/10 text-[10px] font-bold text-purple">
            P
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-purple mb-1.5">Parent thinks</p>
            <p className="text-[14px] leading-snug text-text-secondary italic">&ldquo;{item.parentThinks}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-8 py-5 bg-surface/50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-green">Transformed</p>
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

/* ─── Small Components ─── */

function PrintOption({ label, price }: { label: string; price: string }) {
  return (
    <div className="text-center px-2">
      <div className="text-base font-semibold text-foreground mb-1">{label}</div>
      <div className="text-xs text-text-muted">from {price}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-border" />;
}

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
