"use client";

import { useState } from "react";
import { useKid } from "@/lib/kid-context";

const AGES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

type Scenario = {
  readonly situation: string;
  readonly advice: Record<string, string>;
  readonly icon: string;
  readonly color: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    situation: "Your kid shows you a drawing and asks if it's good",
    advice: {
      "2": "Say 'wow!' and clap. {name} can't tell you're lying yet. You have maybe 6 months left of this working.",
      "3": "Tell {name} it's going in a museum. {name} doesn't know what museums are. This buys you time.",
      "4": "Say 'I love how you used ALL the colors.' This is technically not a lie. It's a diplomatic deflection. You're getting good at this.",
      "5": "Ask {name} to explain it to you. This kills 20 minutes and you don't have to commit to an opinion.",
      "6": "Say 'that's very creative' -- the universal parent phrase that means absolutely nothing but sounds supportive.",
      "7": "Start the 'art is subjective' conversation early. Tell {name} about Picasso. Show some abstract art. Now everything {name} draws is 'intentional.'",
      "8": "Suggest {name} 'add more detail' -- this stalls for another hour and the next version might actually be identifiable.",
      "9": "Be honest-adjacent. 'I can tell you worked really hard on this.' Hard work is not the same as talent and {name} will figure that out eventually.",
      "10": "{name} is old enough for constructive feedback. Say 'the composition is interesting.' {name} will google 'composition' and learn something.",
      "11": "At this point {name} probably knows it's bad. Commiserate. 'Art is hard. Want some ice cream?'",
      "12": "{name} has stopped showing you things. This is both a relief and heartbreaking. You'll miss the blob era.",
    },
    icon: "?",
    color: "#FF6B6B",
  },
  {
    situation: "They want to give their art as a gift to grandma",
    advice: {
      "2": "Let {name}. Grandma will cry either way. She cries at everything. This is free emotional labor.",
      "3": "Absolutely send it. Grandma has an entire wall dedicated to this stuff. She will frame a napkin smear.",
      "4": "Upload it to Doodie first. Send grandma the upgraded version. She'll think {name} is a prodigy. You win.",
      "5": "Frame it professionally. The frame costs more than the art. This is fine. Most of modern art works this way.",
      "6": "Let {name} make a card. Grandma will keep it until the heat death of the universe.",
      "7": "This is actually sweet. Don't ruin it. Just quietly upload it to Doodie so you have a backup plan.",
      "8": "{name} might actually draw something decent at this age. Keyword: might. Have Doodie on standby.",
      "9": "Suggest a 'collaboration' -- {name} draws, you Doodie it, grandma gets both. Everyone thinks they contributed.",
      "10": "At this age {name} might want to buy a real gift instead. Respect the growth. Mourn the end of free gifts.",
      "11": "If {name} is still making art for grandma at 11, you've raised a good human. Don't question the quality.",
      "12": "{name} will just text her 'happy birthday.' Miss the drawing era yet?",
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
      "6": "If {name} drew on the wall at 6, this is a choice. Respect the commitment. Then hand {name} a sponge.",
      "7": "By now {name} knows walls aren't for drawing. This is either rebellion or performance art. Either way, photo first, clean second.",
      "8": "Have {name} paint over it. This is a 'natural consequence.' Also it's free labor.",
      "9": "Frame a section of the wall before you paint over it. Unhinged? Yes. Memorable? Also yes.",
      "10": "{name} is testing you. Don't react. Clean it silently. The psychological warfare goes both ways.",
      "11": "If {name} is drawing on walls at 11, either you have Banksy or a problem. Upload to Doodie and see which one.",
      "12": "This is no longer 'kids being kids.' This is 'we need to talk.' But still -- photo first.",
    },
    icon: "W",
    color: "#60A5FA",
  },
  {
    situation: "They say they want to be an artist when they grow up",
    advice: {
      "2": "{name} also wants to be a dinosaur. You have time.",
      "3": "Encourage it! {name} will change their mind 47 more times before college. Next week it's 'astronaut.'",
      "4": "Say 'that's amazing!' while silently googling 'artist salary statistics.'",
      "5": "Support the dream. Also start a college fund. These things are not mutually exclusive.",
      "6": "Enroll {name} in art classes. Either they love it and get better, or they quit and you saved yourself decades of worry.",
      "7": "Show {name} your art from when you were 7. If it's bad, bond over it. If it's good, re-evaluate your own life choices.",
      "8": "Introduce {name} to graphic design. It's art but with health insurance.",
      "9": "The 'artist or designer' fork in the road is approaching. Graphic designers eat. Fine artists have 'character.'",
      "10": "{name} might actually be good at this point. Or {name} might just have strong opinions. Hard to tell the difference at 10.",
      "11": "If {name} is still saying 'artist' at 11, they might mean it. Start taking it seriously. Also, still fund the college account.",
      "12": "{name} is about to enter middle school where they'll either double down or discover coding. Either way, you'll survive.",
    },
    icon: "S",
    color: "#34D399",
  },
  {
    situation: "The fridge is full and they made another drawing",
    advice: {
      "2": "Stack them. The fridge can hold more than you think. We believe in you.",
      "3": "Start a 'rotation system.' Oldest off, newest on. {name} won't notice. ({name} will absolutely notice.)",
      "4": "This is why Doodie exists. Upload, transform, store digitally. Reclaim the fridge. Eat leftovers again.",
      "5": "Get a corkboard. Or a second fridge. One of these is more practical. The other is more fun.",
      "6": "Start a 'gallery wall' in {name}'s room. Now the fridge is yours again and {name} has their own exhibition space.",
      "7": "Introduce the concept of 'curating.' Only the best work makes the fridge. This teaches standards. Or causes tears. Coin flip.",
      "8": "Digitize everything. Upload the good ones to Doodie. Throw away the bad ones when {name} is at school. We won't judge.",
      "9": "By now {name} might be self-curating. If not, gently introduce the concept of a 'portfolio' -- sounds more grown-up than 'fridge.'",
      "10": "The fridge drawings should be tapering off naturally. If not, you've created a monster. A creative, expressive monster.",
      "11": "{name} has probably moved to digital art by now. Your fridge is free. You feel weirdly empty about this.",
      "12": "The fridge is bare. You miss the clutter. You never thought you'd miss the clutter. Upload everything to Doodie before the nostalgia kills you.",
    },
    icon: "F",
    color: "#FBBF24",
  },
  {
    situation: "They're having a meltdown because their drawing 'doesn't look right'",
    advice: {
      "2": "Distract {name} with a snack. This works for every problem at age 2.",
      "3": "Draw something worse on purpose. {name} will laugh. Crisis averted. You're a hero.",
      "4": "Say 'art isn't about being perfect, it's about expressing yourself.' You read that on Instagram but it works.",
      "5": "'Bob Ross didn't get it right the first time either.' {name} doesn't know who Bob Ross is. Show them. Now you're watching Bob Ross together. This is a win.",
      "6": "Teach {name} that erasing exists. This seems obvious but some kids genuinely don't know you can undo things in real life.",
      "7": "Show {name} the before/after on Doodie. 'See? Even bad drawings become amazing art.' Existential crisis: solved.",
      "8": "This is actually a growth mindset moment. {name} cares about quality. That's good. Help them try again. Or upload it and let AI handle the emotional labor.",
      "9": "Introduce {name} to the concept of 'iteration.' Real artists do 50 versions. The second attempt will be better. Probably.",
      "10": "{name} is developing self-awareness and standards. This is healthy but painful. Like most of parenting.",
      "11": "Welcome to perfectionism. It only gets worse from here. Art therapy is $150/hour. Doodie is $4.99. Your call.",
      "12": "{name} might actually have a point -- the drawing might genuinely not look right. Help fix it or upload it to Doodie. Either way, validate the feeling.",
    },
    icon: "M",
    color: "#F472B6",
  },
];

function injectName(text: string, name: string): string {
  if (!name) return text.replace(/\{name\}/g, "them");
  return text.replace(/\{name\}/g, name);
}

export function ParentingAdvice() {
  const { profile, setShowSetup } = useKid();
  const kidName = profile.kidName;
  const defaultAge = profile.kidAge ? String(profile.kidAge) : "5";

  const [selectedAge, setSelectedAge] = useState(defaultAge);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="d-section d-section-surface">
      <div className="d-container">
        {/* Personalization banner */}
        {kidName ? (
          <div className="d-center" style={{ marginBottom: 32 }}>
            <span className="d-badge" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
              <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>
                Personalized for {kidName}
              </span>
            </span>
          </div>
        ) : (
          <div className="d-center" style={{ marginBottom: 32 }}>
            <button
              onClick={() => setShowSetup(true)}
              className="d-badge"
              style={{ cursor: "pointer", background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.15)" }}
            >
              <span style={{ fontSize: 12, color: "#FF6B6B", fontWeight: 600 }}>
                Add your kid&apos;s name for personalized advice
              </span>
            </button>
          </div>
        )}

        <div className="d-center d-mb-2xl">
          <p className="d-eyebrow d-eyebrow-coral">Questionable parenting advice</p>
          <h2 className="d-heading d-heading-lg" style={{ marginBottom: 8 }}>
            {kidName ? `Advice for ${kidName}'s parent.` : "We shouldn't be giving advice."}
          </h2>
          <p className="d-heading" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "#6B7280", marginBottom: 24 }}>
            {kidName ? "You're welcome. Don't sue us." : "But here we are."}
          </p>
          <p className="d-body" style={{ maxWidth: 520, margin: "0 auto" }}>
            Select {kidName ? `${kidName}'s` : "your child's"} age. Read the advice. Ignore it entirely. We are an art app, not licensed professionals.
          </p>
        </div>

        {/* Age picker */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>
            {kidName ? `${kidName} is:` : "My kid is:"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {AGES.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={selectedAge === age ? "d-age-btn d-age-btn-active" : "d-age-btn d-age-btn-inactive"}
              >
                {age}
              </button>
            ))}
          </div>
          <p className="d-body-xs">
            {kidName
              ? `Showing advice for ${kidName} at age ${selectedAge}.`
              : "(If you have multiple kids, pick the one causing the most problems right now.)"}
          </p>
        </div>

        {/* Scenarios */}
        <div>
          {SCENARIOS.map((scenario, i) => {
            const isExpanded = expandedIndex === i;
            const adviceText = injectName(scenario.advice[selectedAge], kidName);
            return (
              <div key={scenario.situation} className="d-advice-accordion">
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="d-advice-trigger"
                >
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: scenario.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                    {scenario.icon}
                  </span>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>
                    {kidName
                      ? scenario.situation.replace("Your kid", kidName).replace("They ", `${kidName} `).replace("They'", `${kidName}'`).replace("their", `${kidName}'s`)
                      : scenario.situation}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="d-advice-body-wrapper"
                  style={{
                    maxHeight: isExpanded ? 300 : 0,
                    opacity: isExpanded ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.2s ease",
                  }}
                >
                  <div className="d-advice-body">
                    <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                      <span style={{ marginTop: 4, width: 28, height: 28, borderRadius: 8, background: scenario.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                        {selectedAge}
                      </span>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9CA3AF", marginBottom: 4 }}>
                          Age {selectedAge} -- our advice{kidName ? ` for ${kidName}` : ""}
                        </p>
                        <p className="d-body">{adviceText}</p>
                      </div>
                    </div>
                    <p style={{ marginTop: 16, fontSize: 11, color: "#9CA3AF", fontStyle: "italic" }}>
                      This is not real advice. Please do not sue us.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
