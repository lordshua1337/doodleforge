import Link from "next/link";

const BEFORE_AFTER = [
  {
    label: "Stick figure family",
    before: "A child's crayon stick figure family drawing on white paper",
    after: "A stunning oil painting of a family portrait in Renaissance style",
  },
  {
    label: "Rainbow house",
    before: "A kid's drawing of a house with a rainbow",
    after: "A photorealistic architectural rendering of a colorful modern house",
  },
  {
    label: "Dinosaur",
    before: "A child's scribbled green dinosaur",
    after: "A hyper-detailed digital painting of a majestic T-Rex",
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
    desc: "Go absolutely feral",
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-text-secondary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            AI-Powered Art Transformation
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
            Your kid drew
            <br />
            something.
            <br />
            <span className="text-accent">It&apos;s terrible.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-text-secondary leading-relaxed md:text-xl">
            Upload the masterpiece your 4-year-old is weirdly proud of.
            Our AI will turn it into art that&apos;s actually worth framing.
            Order prints. Put them on your wall. Tell nobody.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/create"
              className="rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Fix My Kid&apos;s Art &rarr;
            </Link>
            <Link
              href="/gallery"
              className="rounded-xl border border-border px-8 py-3.5 text-base font-medium text-text-secondary transition-all hover:border-border-hover hover:text-foreground"
            >
              See Examples
            </Link>
          </div>

          <p className="mt-6 text-xs text-text-muted">
            No account needed. Upload, transform, download. Done.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              How it works
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Three steps. Zero talent required.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Upload the evidence"
              desc="Snap a photo of your kid's drawing. Or drag the crumpled paper out of the trash where it belongs. We accept PNG, JPG, or WebP."
            />
            <StepCard
              step="02"
              title="Pick a style"
              desc="Oil painting? Watercolor? Anime? Cyberpunk? Choose how you want your kid's scribbles to be reborn. Or let our AI decide."
            />
            <StepCard
              step="03"
              title="Get actual art"
              desc="Our AI interprets the drawing and creates a professional piece that captures the same scene. Download it, print it, frame it."
            />
          </div>
        </div>
      </section>

      {/* Before / After Showcase */}
      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              The proof
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Before &amp; After
            </h2>
            <p className="mt-4 text-text-secondary">
              Real drawings. Real transformations. Real disappointment in the originals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BEFORE_AFTER.map((item) => (
              <div
                key={item.label}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-border-hover"
              >
                <div className="relative aspect-square bg-surface-2 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                      Before
                    </div>
                    <p className="text-sm text-text-muted">{item.before}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center py-3 text-text-muted">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
                <div className="relative aspect-square bg-surface-2 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green">
                      After
                    </div>
                    <p className="text-sm text-text-secondary">{item.after}</p>
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Options */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              Art styles
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Pick your weapon.
            </h2>
            <p className="mt-4 text-text-secondary">
              Your kid made abstract art. Let&apos;s at least make it intentional.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Oil Painting", icon: "P" },
              { name: "Watercolor", icon: "W" },
              { name: "Anime", icon: "A" },
              { name: "Cyberpunk", icon: "C" },
              { name: "Pop Art", icon: "!" },
              { name: "Pixel Art", icon: "#" },
              { name: "Studio Ghibli", icon: "G" },
              { name: "Photorealistic", icon: "R" },
            ].map((style) => (
              <div
                key={style.name}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center transition-all hover:border-accent/30 hover:bg-surface-2 cursor-pointer"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-lg font-bold text-accent">
                  {style.icon}
                </span>
                <span className="text-sm font-semibold">{style.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prints CTA */}
      <section className="border-t border-border bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple">
            Physical prints
          </p>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Put it on your wall.
            <br />
            <span className="text-text-secondary">Like a real gallery.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            Order museum-quality prints of your kid&apos;s reborn artwork.
            Canvas, framed, or poster. Shipped to your door. Hand to God,
            your guests will think you commissioned it.
          </p>
          <div className="inline-flex items-center gap-6 rounded-2xl border border-border bg-background px-8 py-5">
            <PrintOption label="Canvas" price="$29.99" />
            <Divider />
            <PrintOption label="Framed" price="$49.99" />
            <Divider />
            <PrintOption label="Poster" price="$14.99" />
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Fulfilled via Etsy. Ships in 3-5 business days.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border py-24 md:py-32" id="pricing">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              Pricing
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
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
                className={`relative rounded-2xl border p-8 transition-all ${
                  tier.popular
                    ? "border-accent bg-accent/5 scale-[1.02]"
                    : "border-border bg-surface hover:border-border-hover"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-lg font-bold">{tier.name}</h3>
                  <p className="text-sm text-text-muted">{tier.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {tier.price}
                  </span>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    tier.popular
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "border border-border text-foreground hover:bg-surface-2"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Stop lying to your kid.
            <br />
            <span className="text-accent">Start fixing their art.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary leading-relaxed">
            You know that drawing on the fridge? The one you smile at while
            internally screaming? Upload it. 30 seconds later, you&apos;ll have
            something you actually want to look at.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-10 py-4 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
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
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 transition-all hover:border-border-hover">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-bold text-accent">
        {step}
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}

function PrintOption({ label, price }: { label: string; price: string }) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-text-muted">from {price}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-8 w-px bg-border" />;
}
