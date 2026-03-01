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
    transformed: "A stunning oil painting of a family portrait in golden hour lighting",
  },
  {
    original: "Green blob with legs and teeth",
    kidSays: "It's a T-Rex, obviously!",
    parentThinks: "It's giving... avocado with anger issues",
    artist: "Liam, age 4",
    style: "Photorealistic",
    transformed: "A hyper-detailed digital painting of a majestic T-Rex in a jungle",
  },
  {
    original: "Blue and red house with smoke from chimney",
    kidSays: "That's where we live!",
    parentThinks: "We live in a trapezoid apparently",
    artist: "Sophia, age 6",
    style: "Watercolor",
    transformed: "A cozy cottage in watercolor with autumn trees and warm light",
  },
  {
    original: "Cat with triangle ears and whiskers",
    kidSays: "It's Mr. Whiskers!",
    parentThinks: "Mr. Whiskers looks like he's seen things",
    artist: "Noah, age 5",
    style: "Anime",
    transformed: "Elegant anime cat character with sparkle effects and soft lighting",
  },
  {
    original: "Rainbow with clouds on both sides",
    kidSays: "I made it for you!",
    parentThinks: "Why is the rainbow... square?",
    artist: "Olivia, age 3",
    style: "Cyberpunk",
    transformed: "A neon-lit rainbow arcing over a cyberpunk cityscape at night",
  },
  {
    original: "Dad with really long arms and tiny legs",
    kidSays: "That's you, Daddy!",
    parentThinks: "Do I really look like a stick figure having an existential crisis?",
    artist: "Ethan, age 5",
    style: "Pop Art",
    transformed: "Bold pop art portrait with halftone dots and vibrant colors",
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        {/* Soft gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-sky/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-lavender/8 rounded-full blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-xs font-medium text-text-secondary">
            <span className="inline-block h-2 w-2 rounded-full bg-mint animate-pulse" />
            AI-Powered Art Transformation
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl" style={{ fontFamily: "var(--font-fredoka)" }}>
            {HERO_WORDS.map((word, i) => (
              <span key={i}>
                <span style={{ color: word.color }}>{word.text}</span>
                {i < HERO_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-4 max-w-xl text-lg text-text-secondary leading-relaxed md:text-xl">
            Upload your little artist&apos;s masterpiece. Our AI transforms it
            into gallery-worthy art you&apos;ll actually want to frame.
          </p>
          <p className="mx-auto mb-10 max-w-md text-sm text-text-muted italic">
            They&apos;ll think they&apos;re Picasso. You&apos;ll know the truth. Everyone wins.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/create"
              className="rounded-full bg-coral px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-coral/20"
            >
              Upload a Doodle &rarr;
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border-2 border-border px-8 py-3.5 text-base font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
            >
              See the Gallery
            </Link>
          </div>

          <p className="mt-6 text-xs text-text-muted">
            No account needed. Upload, transform, download. Done.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
              How it works
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              Three steps. Zero talent required.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Upload the masterpiece"
              desc="Snap a photo of your kid's drawing -- that crumpled paper on the fridge, the napkin doodle from dinner, the crayon mural on your wall (we don't judge)."
              color="#FF6B6B"
              icon={<UploadIcon />}
            />
            <StepCard
              step="02"
              title="Pick a style"
              desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's vision reborn. Each style captures the same scene, just... better."
              color="#64B5F6"
              icon={<PaletteIcon />}
            />
            <StepCard
              step="03"
              title="Get actual art"
              desc="Our AI interprets the drawing and creates a professional piece. Download it, print it, frame it. When guests ask who the artist is, just smile."
              color="#69F0AE"
              icon={<FrameIcon />}
            />
          </div>
        </div>
      </section>

      {/* Wall of Shame */}
      <section className="relative z-10 border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-coral">
              The wall of shame
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              Can you guess what they drew?
            </h2>
            <p className="mt-4 text-text-secondary max-w-lg mx-auto">
              Real submissions from real kids. We love them. We love their art.
              We just... needed to fix it a little.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WALL_OF_SHAME.map((item, i) => (
              <WallOfShameCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Style Options */}
      <section className="relative z-10 border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky">
              Art styles
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              Pick your flavor.
            </h2>
            <p className="mt-4 text-text-secondary">
              8 styles. Each one turns scribbles into something gallery-worthy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
              <div
                key={style.name}
                className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-surface p-6 text-center transition-all hover:border-current hover:scale-[1.03] cursor-pointer"
                style={{ "--tw-border-opacity": 0.3, color: style.color } as React.CSSProperties}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ backgroundColor: style.color }}
                >
                  {style.icon}
                </span>
                <span className="text-sm font-semibold text-foreground">{style.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prints CTA */}
      <section className="relative z-10 border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lavender">
            Physical prints
          </p>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
            Put it on
            <span className="text-lavender"> your wall.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            Order museum-quality prints of your kid&apos;s reborn artwork.
            Canvas, framed, or poster. Shipped to your door. Your guests
            will never know a 4-year-old was involved.
          </p>
          <div className="inline-flex items-center gap-6 rounded-2xl border-2 border-border bg-background px-8 py-5">
            <PrintOption label="Canvas" price="$29.99" color="#FF6B6B" />
            <Divider />
            <PrintOption label="Framed" price="$49.99" color="#B388FF" />
            <Divider />
            <PrintOption label="Poster" price="$14.99" color="#64B5F6" />
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Fulfilled via Etsy. Ships in 3-5 business days.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 border-t border-border py-24 md:py-32" id="pricing">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sunny">
              Pricing
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
              Cheaper than art school.
            </h2>
            <p className="mt-4 text-text-secondary">
              And infinitely more effective for your specific situation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-8 transition-all ${
                  tier.popular
                    ? "scale-[1.02] shadow-lg"
                    : "bg-surface hover:shadow-md"
                }`}
                style={{
                  borderColor: tier.popular ? tier.color : undefined,
                  backgroundColor: tier.popular ? `${tier.color}08` : undefined,
                }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: tier.color }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-lg font-bold">{tier.name}</h3>
                  <p className="text-sm text-text-muted">{tier.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    tier.popular
                      ? "text-white hover:opacity-90"
                      : "border-2 border-border text-foreground hover:bg-surface-2"
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

      {/* Final CTA */}
      <section className="relative z-10 border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl" style={{ fontFamily: "var(--font-fredoka)" }}>
            Their art. <span className="text-coral">Your walls.</span>
            <br />
            <span className="text-sky">Their imagination.</span> Your frame.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            You know that drawing on the fridge? The one you smile at every morning?
            Imagine it as a real painting. That&apos;s what we do.
            Upload it. 30 seconds later, you&apos;ll have something special.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-10 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-coral/20"
          >
            Upload a Doodle &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}

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
    <div className="rounded-2xl border-2 border-border bg-surface p-8 transition-all hover:shadow-md hover:border-border-hover">
      <div
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">{step}</div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

function WallOfShameCard({
  item,
  index,
}: {
  item: (typeof WALL_OF_SHAME)[number];
  index: number;
}) {
  const pastelBgs = [
    "bg-coral/5", "bg-sky/5", "bg-lavender/5",
    "bg-mint/5", "bg-sunny/5", "bg-bubblegum/5",
  ];

  return (
    <div className="group overflow-hidden rounded-2xl border-2 border-border bg-background transition-all hover:border-border-hover hover:shadow-lg">
      {/* The "original" */}
      <div className={`relative aspect-[4/3] ${pastelBgs[index % pastelBgs.length]} flex items-center justify-center p-6`}>
        <div className="text-center">
          <p className="mb-3 text-sm italic text-text-muted">&ldquo;{item.original}&rdquo;</p>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-coral">
            The original
          </div>
        </div>
      </div>

      {/* Speech bubbles */}
      <div className="border-t border-border p-5 space-y-3">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full bg-sunny/20 flex items-center justify-center text-[10px]">
            K
          </div>
          <div>
            <p className="text-xs font-semibold text-sunny mb-0.5">Kid says:</p>
            <p className="text-sm text-foreground">&ldquo;{item.kidSays}&rdquo;</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full bg-lavender/20 flex items-center justify-center text-[10px]">
            P
          </div>
          <div>
            <p className="text-xs font-semibold text-lavender mb-0.5">Parent thinks:</p>
            <p className="text-sm text-text-secondary italic">&ldquo;{item.parentThinks}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* After transformation */}
      <div className="border-t border-border p-4 bg-surface-2/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mint">After AI magic</p>
            <p className="text-xs text-text-muted mt-0.5">{item.style} -- {item.artist}</p>
          </div>
          <div className="h-6 w-6 rounded-full bg-mint/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#69F0AE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintOption({ label, price, color }: { label: string; price: string; color: string }) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold" style={{ color }}>{label}</div>
      <div className="text-xs text-text-muted">from {price}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-8 w-px bg-border" />;
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  );
}
