"use client";

import { useState } from "react";

const AGES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

type Scenario = {
  situation: string;
  advice: Record<string, string>;
  icon: string;
  color: string;
};

const SCENARIOS: Scenario[] = [
  {
    situation: "Your kid shows you a drawing and asks if it's good",
    advice: {
      "2": "Say 'wow!' and clap. They can't tell you're lying yet. You have maybe 6 months left of this working.",
      "3": "Tell them it's going in a museum. They don't know what museums are. This buys you time.",
      "4": "Say 'I love how you used ALL the colors.' This is technically not a lie. It's a diplomatic deflection. You're getting good at this.",
      "5": "Ask them to explain it to you. This kills 20 minutes and you don't have to commit to an opinion.",
      "6": "Say 'that's very creative' -- the universal parent phrase that means absolutely nothing but sounds supportive.",
      "7": "Start the 'art is subjective' conversation early. Tell them about Picasso. Show them some abstract art. Now everything they draw is 'intentional.'",
      "8": "Suggest they 'add more detail' -- this stalls them for another hour and the next version might actually be identifiable.",
      "9": "Be honest-adjacent. 'I can tell you worked really hard on this.' Hard work is not the same as talent and they'll figure that out eventually.",
      "10": "They're old enough for constructive feedback. Say 'the composition is interesting.' They'll google 'composition' and learn something.",
      "11": "At this point they probably know it's bad. Commiserate. 'Art is hard. Want some ice cream?'",
      "12": "They've stopped showing you things. This is both a relief and heartbreaking. You'll miss the blob era.",
    },
    icon: "?",
    color: "#FF6B6B",
  },
  {
    situation: "They want to give their art as a gift to grandma",
    advice: {
      "2": "Let them. Grandma will cry either way. She cries at everything. This is free emotional labor.",
      "3": "Absolutely send it. Grandma has an entire wall dedicated to this stuff. She will frame a napkin smear. Grandma doesn't care.",
      "4": "Upload it to Doodie first. Send grandma the upgraded version. She'll think your kid is a prodigy. You win.",
      "5": "Frame it professionally. The frame costs more than the art. This is fine. Most of modern art works this way.",
      "6": "Let them make a card. Grandma will keep it until the heat death of the universe.",
      "7": "This is actually sweet. Don't ruin it. Just quietly upload it to Doodie so you have a backup plan.",
      "8": "They might actually draw something decent at this age. Keyword: might. Have Doodie on standby.",
      "9": "Suggest a 'collaboration' -- they draw, you Doodie it, grandma gets both. Everyone thinks they contributed.",
      "10": "At this age they might want to buy a real gift instead. Respect the growth. Mourn the end of free gifts.",
      "11": "If they're still making art for grandma at 11, you've raised a good human. Don't question the quality.",
      "12": "They'll just text her 'happy birthday.' Miss the drawing era yet?",
    },
    icon: "G",
    color: "#A78BFA",
  },
  {
    situation: "They drew on the wall",
    advice: {
      "2": "It's a mural now. Congratulations, you live in a gallery. Lean into it.",
      "3": "Magic Eraser exists for a reason. Buy them in bulk. Accept your new life.",
      "4": "Take a photo first. Upload it to Doodie. Now it's 'wall art you're preserving digitally.' You're not mad, you're 'archiving.'",
      "5": "This is a boundaries conversation. Or a chalkboard paint conversation. One of these is easier.",
      "6": "If they drew on the wall at 6, this is a choice. Respect the commitment. Then hand them a sponge.",
      "7": "By now they know walls aren't for drawing. This is either rebellion or performance art. Either way, photo first, clean second.",
      "8": "Have them paint over it themselves. This is a 'natural consequence.' Also it's free labor.",
      "9": "Frame a section of the wall before you paint over it. Unhinged? Yes. Memorable? Also yes.",
      "10": "They're testing you. Don't react. Clean it silently. The psychological warfare goes both ways.",
      "11": "If they're drawing on walls at 11, either you have Banksy or a problem. Upload to Doodie and see which one.",
      "12": "This is no longer 'kids being kids.' This is 'we need to talk.' But still -- photo first.",
    },
    icon: "W",
    color: "#60A5FA",
  },
  {
    situation: "They say they want to be an artist when they grow up",
    advice: {
      "2": "They also want to be a dinosaur. You have time.",
      "3": "Encourage it! They'll change their mind 47 more times before college. Next week it's 'astronaut.'",
      "4": "Say 'that's amazing!' while silently googling 'artist salary statistics.'",
      "5": "Support the dream. Also start a college fund. These things are not mutually exclusive.",
      "6": "Enroll them in art classes. Either they love it and get better, or they quit and you saved yourself decades of worry.",
      "7": "Show them your art from when you were 7. If it's bad, bond over it. If it's good, re-evaluate your own life choices.",
      "8": "Introduce them to graphic design. It's art but with health insurance.",
      "9": "The 'artist or designer' fork in the road is approaching. Graphic designers eat. Fine artists have 'character.'",
      "10": "They might actually be good at this point. Or they might just have strong opinions. Hard to tell the difference at 10.",
      "11": "If they're still saying 'artist' at 11, they might mean it. Start taking it seriously. Also, still fund the college account.",
      "12": "They're about to enter middle school where they'll either double down or discover coding. Either way, you'll survive.",
    },
    icon: "S",
    color: "#34D399",
  },
  {
    situation: "The fridge is full and they made another drawing",
    advice: {
      "2": "Stack them. The fridge can hold more than you think. We believe in you.",
      "3": "Start a 'rotation system.' Oldest off, newest on. They won't notice. (They will absolutely notice.)",
      "4": "This is why Doodie exists. Upload, transform, store digitally. Reclaim the fridge. Eat leftovers again.",
      "5": "Get a corkboard. Or a second fridge. One of these is more practical. The other is more fun.",
      "6": "Start a 'gallery wall' in their room. Now the fridge is yours again and they have their own exhibition space.",
      "7": "Introduce the concept of 'curating.' Only the best work makes the fridge. This teaches standards. Or causes tears. Coin flip.",
      "8": "Digitize everything. Upload the good ones to Doodie. Throw away the bad ones when they're at school. We won't judge.",
      "9": "By now they might be self-curating. If not, gently introduce the concept of a 'portfolio' -- sounds more grown-up than 'fridge.'",
      "10": "The fridge drawings should be tapering off naturally. If not, you've created a monster. A creative, expressive monster.",
      "11": "They've probably moved to digital art by now. Your fridge is free. You feel weirdly empty about this.",
      "12": "The fridge is bare. You miss the clutter. You never thought you'd miss the clutter. Upload everything to Doodie before the nostalgia kills you.",
    },
    icon: "F",
    color: "#FBBF24",
  },
  {
    situation: "They're having a meltdown because their drawing 'doesn't look right'",
    advice: {
      "2": "Distract them with a snack. This works for every problem at age 2.",
      "3": "Draw something worse on purpose. They'll laugh. Crisis averted. You're a hero.",
      "4": "Say 'art isn't about being perfect, it's about expressing yourself.' You read that on Instagram but it works.",
      "5": "'Bob Ross didn't get it right the first time either.' They don't know who Bob Ross is. Show them. Now you're watching Bob Ross together. This is a win.",
      "6": "Teach them erasing exists. This seems obvious but some kids genuinely don't know you can undo things in real life.",
      "7": "Show them the before/after on Doodie. 'See? Even 'bad' drawings become amazing art.' Existential crisis: solved.",
      "8": "This is actually a growth mindset moment. They care about quality. That's good. Help them try again. Or upload it and let AI handle the emotional labor.",
      "9": "Introduce them to the concept of 'iteration.' Real artists do 50 versions. Their second attempt will be better. Probably.",
      "10": "They're developing self-awareness and standards. This is healthy but painful. Like most of parenting.",
      "11": "Welcome to perfectionism. It only gets worse from here. Art therapy is $150/hour. Doodie is $4.99. Your call.",
      "12": "They might actually have a point -- their drawing might genuinely not look right. Help them fix it or upload it to Doodie. Either way, validate the feeling.",
    },
    icon: "M",
    color: "#F472B6",
  },
];

export function ParentingAdvice() {
  const [selectedAge, setSelectedAge] = useState("5");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Questionable parenting advice
          </p>
          <h2
            className="mb-6 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            We shouldn&apos;t be giving advice.
            <br />
            <span className="text-text-secondary text-2xl md:text-4xl">But here we are.</span>
          </h2>
          <p className="mx-auto max-w-lg text-text-secondary leading-relaxed">
            Select your child&apos;s age. Read the advice. Ignore it entirely.
            We are an art app, not licensed professionals.
          </p>
        </div>

        {/* Age picker */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <p className="text-sm font-semibold text-foreground">My kid is:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AGES.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all"
                style={
                  selectedAge === age
                    ? { background: "linear-gradient(135deg, #FF6B6B, #A78BFA)", color: "#fff", boxShadow: "0 2px 8px rgba(255,107,107,0.3)" }
                    : { background: "#fff", border: "1px solid #E5E7EB", color: "#6B7280" }
                }
              >
                {age}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-muted">
            (If you have multiple kids, pick the one causing the most problems right now.)
          </p>
        </div>

        {/* Scenarios */}
        <div className="space-y-4">
          {SCENARIOS.map((scenario, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={scenario.situation}
                className="overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-border-hover"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="flex w-full items-center gap-4 px-8 py-6 text-left transition-colors hover:bg-surface-2/30"
                >
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: scenario.color }}
                  >
                    {scenario.icon}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold text-foreground">
                    {scenario.situation}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 transition-transform"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="border-t border-border px-8 py-6">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                        style={{ backgroundColor: scenario.color }}
                      >
                        {selectedAge}
                      </span>
                      <div>
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-text-muted">
                          Age {selectedAge} -- our advice
                        </p>
                        <p className="text-[15px] leading-relaxed text-text-secondary">
                          {scenario.advice[selectedAge]}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] text-text-muted italic">
                      This is not real advice. Please do not sue us.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
