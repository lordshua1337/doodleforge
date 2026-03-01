import Link from "next/link";

const GALLERY_ITEMS = [
  {
    original: "Crayon stick figures under a yellow sun",
    transformed: "Renaissance-style family portrait with golden hour lighting",
    style: "Oil Painting",
    artist: "Emma, age 5",
  },
  {
    original: "Green blob with legs and teeth",
    transformed: "Majestic dinosaur in a prehistoric jungle landscape",
    style: "Photorealistic",
    artist: "Liam, age 4",
  },
  {
    original: "Blue and red house with smoke from chimney",
    transformed: "Cozy cottage in watercolor with autumn trees",
    style: "Watercolor",
    artist: "Sophia, age 6",
  },
  {
    original: "Cat with triangle ears and whiskers",
    transformed: "Elegant anime cat character with sparkle effects",
    style: "Anime",
    artist: "Noah, age 5",
  },
  {
    original: "Rainbow with clouds on both sides",
    transformed: "Neon-lit rainbow over a cyberpunk cityscape",
    style: "Cyberpunk",
    artist: "Olivia, age 3",
  },
  {
    original: "Spaceship with fire coming out the bottom",
    transformed: "8-bit pixel art rocket launch with star field",
    style: "Pixel Art",
    artist: "Jackson, age 7",
  },
  {
    original: "Tree with a bird and flowers",
    transformed: "Enchanted forest scene with magical creatures",
    style: "Studio Ghibli",
    artist: "Ava, age 4",
  },
  {
    original: "Dad with really long arms and tiny legs",
    transformed: "Bold pop art portrait with halftone dots",
    style: "Pop Art",
    artist: "Ethan, age 5",
  },
  {
    original: "Fish swimming in wavy water",
    transformed: "Underwater oil painting with bioluminescent sea life",
    style: "Oil Painting",
    artist: "Isabella, age 6",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Gallery
          </p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Art that used to be terrible.
          </h1>
          <p className="mx-auto max-w-lg text-text-secondary">
            Every piece started as a child&apos;s drawing. Look at them now.
            These parents are absolutely lying about who made these.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-border-hover hover:shadow-lg hover:shadow-black/10"
            >
              {/* Image placeholder */}
              <div className="relative aspect-square bg-surface-2 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8 transition-transform group-hover:scale-[1.02]">
                  <p className="mb-2 text-sm font-medium text-text-secondary">
                    {item.transformed}
                  </p>
                  <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {item.style}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="border-t border-border p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-text-muted">Original:</p>
                  <p className="text-xs text-text-muted">{item.artist}</p>
                </div>
                <p className="text-sm text-text-secondary italic">
                  &ldquo;{item.original}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
            Your kid&apos;s drawing could be next.
          </h2>
          <p className="mb-6 text-text-secondary">
            It probably can&apos;t get worse. But it can definitely get better.
          </p>
          <Link
            href="/create"
            className="inline-flex rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02]"
          >
            Upload a Doodle &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
