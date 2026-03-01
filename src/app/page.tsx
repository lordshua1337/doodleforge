import Link from "next/link";

const HERO_WORDS = [
  { text: "Bring", color: "#FF6B6B" },
  { text: "your", color: "#FFD54F" },
  { text: "kid's", color: "#69F0AE" },
  { text: "imagination", color: "#64B5F6" },
  { text: "to", color: "#B388FF" },
  { text: "life.", color: "#F48FB1" },
];

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
    color: "#64B5F6",
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
    color: "#FF6B6B",
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
    color: "#B388FF",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coral/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-sky/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-lavender/6 rounded-full blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 backdrop-blur-sm px-5 py-2 text-xs font-medium text-text-secondary">
            <span className="inline-block h-2 w-2 rounded-full bg-mint animate-pulse" />
            AI-Powered Art Transformation
          </div>

          <h1
            className="mb-8 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {HERO_WORDS.map((word, i) => (
              <span key={i}>
                <span style={{ color: word.color }}>{word.text}</span>
                {i < HERO_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-3 max-w-lg text-lg text-text-secondary leading-relaxed md:text-xl">
            Upload your little artist&apos;s masterpiece. Our AI transforms it
            into gallery-worthy art you&apos;ll actually want to frame.
          </p>
          <p className="mx-auto mb-12 max-w-md text-sm text-text-muted italic">
            They&apos;ll think they&apos;re Picasso. You&apos;ll know the truth. Everyone wins.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/create"
              className="rounded-full bg-coral px-9 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-coral/25"
            >
              Upload a Doodle &rarr;
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border-2 border-border px-9 py-4 text-base font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
            >
              See the Gallery
            </Link>
          </div>

          <p className="mt-8 text-xs text-text-muted">
            No account needed. Upload, transform, download. Done.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative z-10 border-t border-border py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-20 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
              How it works
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Three steps. Zero talent required.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StepCard
              step="01"
              title="Upload the masterpiece"
              desc="Snap a photo of your kid's drawing. The crumpled paper on the fridge, the napkin doodle, the crayon mural on your wall."
              color="#FF6B6B"
              icon={<UploadIcon />}
            />
            <StepCard
              step="02"
              title="Pick a style"
              desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's vision reborn."
              color="#64B5F6"
              icon={<PaletteIcon />}
            />
            <StepCard
              step="03"
              title="Get actual art"
              desc="Our AI creates a professional piece that captures the same scene. Download it, print it, frame it."
              color="#69F0AE"
              icon={<FrameIcon />}
            />
          </div>
        </div>
      </section>

      {/* ─── WALL OF SHAME ─── */}
      <section className="relative z-10 border-t border-border bg-surface py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              The wall of shame
            </p>
            <h2
              className="mb-5 text-3xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Can you guess what they drew?
            </h2>
            <p className="mx-auto max-w-md text-text-secondary leading-relaxed">
              Real submissions from real kids. We love their art.
              We just needed to fix it a little.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WALL_OF_SHAME.map((item, i) => (
              <WallOfShameCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLE OPTIONS ─── */}
      <section className="relative z-10 border-t border-border py-28 md:py-36">
        <div className="mx-auto max-w-4xl px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              Art styles
            </p>
            <h2
              className="mb-5 text-3xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Pick your flavor.
            </h2>
            <p className="text-text-secondary">
              8 styles. Each one turns scribbles into something gallery-worthy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { name: "Oil Painting", icon: "P", color: "#FF6B6B" },
              { name: "Watercolor", icon: "W", color: "#64B5F6" },
              { name: "Anime", icon: "A", color: "#F48FB1" },
              { name: "Cyberpunk", icon: "C", color: "#B388FF" },
              { name: "Pop Art", icon: "!", color: "#FFD54F" },
              { name: "Pixel Art", icon: "#", color: "#69F0AE" },
              { name: "Studio Ghibli", icon: "G", color: "#FFAB91" },
              { name: "Photorealistic", icon: "R", color: "#64B5F6" },
            ].map((style) => (
              <Link
                key={style.name}
                href="/create"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-7 text-center transition-all hover:shadow-md hover:scale-[1.03] hover:border-border-hover"
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

      {/* ─── PRINTS CTA ─── */}
      <section className="relative z-10 border-t border-border bg-surface py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
            Physical prints
          </p>
          <h2
            className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Put it on<span className="text-lavender"> your wall.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-text-secondary leading-relaxed">
            Order museum-quality prints of your kid&apos;s reborn artwork.
            Canvas, framed, or poster. Shipped to your door.
          </p>
          <div className="inline-flex items-center gap-8 rounded-2xl border border-border bg-background px-10 py-7 shadow-sm">
            <PrintOption label="Canvas" price="$29.99" color="#FF6B6B" />
            <Divider />
            <PrintOption label="Framed" price="$49.99" color="#B388FF" />
            <Divider />
            <PrintOption label="Poster" price="$14.99" color="#64B5F6" />
          </div>
          <p className="mt-5 text-xs text-text-muted">
            Fulfilled via Etsy. Ships in 3-5 business days.
          </p>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="relative z-10 border-t border-border py-28 md:py-36" id="pricing">
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-20 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sunny">
              Pricing
            </p>
            <h2
              className="mb-5 text-3xl font-extrabold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
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
                className={`relative flex flex-col rounded-3xl border p-9 transition-all ${
                  tier.popular
                    ? "scale-[1.03] shadow-xl border-2"
                    : "bg-surface border-border hover:shadow-md"
                }`}
                style={{
                  borderColor: tier.popular ? tier.color : undefined,
                  backgroundColor: tier.popular ? `${tier.color}08` : undefined,
                }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: tier.color }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="mb-1.5 text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-text-muted">{tier.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                </div>
                <ul className="mb-10 flex-1 space-y-3.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className={`block w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                    tier.popular
                      ? "text-white hover:opacity-90 shadow-md"
                      : "border border-border text-foreground hover:bg-surface-2"
                  }`}
                  style={tier.popular ? { backgroundColor: tier.color } : undefined}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 border-t border-border py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-8 text-center">
          <h2
            className="mb-8 text-3xl font-extrabold tracking-tight md:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Their art. <span className="text-coral">Your walls.</span>
            <br />
            <span className="text-sky">Their imagination.</span> Your frame.
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-text-secondary leading-relaxed">
            You know that drawing on the fridge? The one you smile at every morning?
            Imagine it as a real painting. That&apos;s what we do.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-10 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-coral/25"
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
    <div className="rounded-3xl border border-border bg-background p-9 transition-all hover:shadow-lg hover:border-border-hover">
      <div
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <p
        className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted"
      >
        Step {step}
      </p>
      <h3 className="mb-3 text-xl font-bold leading-snug">{title}</h3>
      <p className="text-[15px] text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Wall of Shame Card ─── */

function WallOfShameCard({
  item,
  index,
}: {
  item: (typeof WALL_OF_SHAME)[number];
  index: number;
}) {
  const pastelBgs = [
    "bg-coral/[0.04]", "bg-sky/[0.04]", "bg-lavender/[0.04]",
    "bg-mint/[0.04]", "bg-sunny/[0.04]", "bg-bubblegum/[0.04]",
  ];

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all hover:border-border-hover hover:shadow-lg">
      {/* The "original" -- compact, centered */}
      <div className={`flex flex-col items-center justify-center px-8 py-10 ${pastelBgs[index % pastelBgs.length]}`}>
        <p className="mb-4 text-center text-[15px] italic text-text-muted leading-relaxed">
          &ldquo;{item.original}&rdquo;
        </p>
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-coral">
          The original
        </span>
      </div>

      {/* Speech bubbles -- properly spaced */}
      <div className="flex-1 border-t border-border px-7 py-6 space-y-4">
        <div className="flex gap-3.5 items-start">
          <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunny/15 text-[10px] font-bold text-sunny">
            K
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-sunny mb-1">Kid says</p>
            <p className="text-[14px] leading-snug text-foreground">&ldquo;{item.kidSays}&rdquo;</p>
          </div>
        </div>
        <div className="flex gap-3.5 items-start">
          <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lavender/15 text-[10px] font-bold text-lavender">
            P
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-lavender mb-1">Parent thinks</p>
            <p className="text-[14px] leading-snug text-text-secondary italic">&ldquo;{item.parentThinks}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-7 py-4 bg-surface/50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-mint">Transformed</p>
          <p className="text-[13px] text-text-muted mt-0.5">{item.style} -- {item.artist}</p>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/15">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#69F0AE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ─── Small Components ─── */

function PrintOption({ label, price, color }: { label: string; price: string; color: string }) {
  return (
    <div className="text-center px-2">
      <div className="text-base font-semibold mb-0.5" style={{ color }}>{label}</div>
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
