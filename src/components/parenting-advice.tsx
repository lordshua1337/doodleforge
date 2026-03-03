"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { useKid } from "@/lib/kid-context";

const AGES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

type Scenario = {
  readonly situation: string;
  readonly situationPersonalized: string;
  readonly advice: Record<string, string>;
  readonly icon: string;
  readonly color: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    situation: "Your kid shows you a drawing and asks if it's good",
    situationPersonalized: "{name} shows you a drawing and asks if it's good",
    advice: {
      "2": "Say 'wow!' and clap like you just witnessed the Mona Lisa being painted in real time. At 2, {name} has zero ability to detect sarcasm, deception, or artistic fraud. This is your golden window. Abuse it. Clap harder. Do a little dance. {name} will beam with pride and you will feel nothing inside because you know that 'drawing' is just a fistful of crayon dragged across paper like a tiny drunk person trying to write a ransom note. But {name} is happy. And that's what matters. For now.",
      "3": "Tell {name} it's going straight to a museum. Not just any museum -- THE museum. The big one in the city. {name} has no idea what a museum is, which is exactly why this works. You could tell {name} it's going to the moon and get the same reaction: pure, unfiltered joy. Meanwhile, the drawing looks like a crime scene diagram made by someone having a medical emergency. But {name} doesn't know that. And you have maybe 18 more months before the questions start getting harder.",
      "4": "Say 'I love how you used ALL the colors.' This is technically not a lie. {name} did, in fact, use every single color in the box -- simultaneously, on top of each other, creating what scientists call 'brown.' It's a diplomatic deflection worthy of the UN. You haven't said it's good. You haven't said it's bad. You've commented on color usage, which is the art-parent equivalent of saying 'that's certainly a choice.' You're becoming a politician. Embrace it.",
      "5": "Ask {name} to explain the drawing to you. This is the nuclear option and it works every single time. First, it buys you 20 minutes of not having to form an opinion. Second, {name} will describe an elaborate fantasy world that has absolutely nothing to do with what's on the paper. The scribble in the corner? That's a dragon. The brown smudge? A castle. The random line? That's you, apparently, and you're flying. Just nod along. This is cheaper than therapy for both of you.",
      "6": "Deploy the phrase 'that's very creative' -- the Swiss Army knife of parental art criticism. It means absolutely nothing. It could apply to a Picasso or to a napkin someone sneezed on. But it sounds supportive, it sounds engaged, and most importantly, it doesn't commit you to any specific position on whether this drawing is 'good.' Because let's be honest: {name} drew a horse that looks like a melting building, and you need an exit strategy.",
      "7": "Time to introduce {name} to the concept that 'art is subjective.' Pull up some Picasso. Show {name} some abstract art. Watch {name}'s face when you explain that people pay millions of dollars for paintings that look like they were done by a 4-year-old. Now everything {name} draws is 'intentional.' That weird arm? Cubism. The missing face? Minimalism. The fact that the dog has 7 legs? Creative interpretation. You've just handed {name} an unbeatable defense and you should be proud of yourself.",
      "8": "Suggest {name} 'add more detail.' This accomplishes three things simultaneously: (1) it sounds like genuine artistic guidance, (2) it stalls {name} for another hour while they obsessively shade in a tree, and (3) there's a nonzero chance the next version will actually be identifiable as the thing it's supposed to be. You're basically kicking the can down the road, but with a paintbrush. The revised drawing will probably still be questionable, but at least you bought yourself time to google 'how to be supportive of bad art.'",
      "9": "Be honest-adjacent. 'I can tell you really worked hard on this.' Notice what you did there? You complimented effort, not outcome. This is a corporate performance review technique and it works just as well on 9-year-olds. {name} will feel seen and validated. You didn't lie. You didn't tell the truth. You existed in the liminal space between encouragement and reality, which is where all good parenting happens. Eventually {name} will figure out that effort and talent are different things, but that's a problem for Future You.",
      "10": "{name} is old enough for constructive feedback now, so say 'the composition is interesting.' {name} will immediately google 'composition' and actually learn something about art. You've just tricked a 10-year-old into self-directed education while avoiding the question entirely. This is parenting at its peak. If {name} asks what you mean, say 'the way you've arranged the elements creates a unique visual flow.' You have no idea what that means. Neither does {name}. But it sounds like something a real art critic would say, and that's enough.",
      "11": "At 11, {name} probably already knows the drawing isn't great. You can see it in their eyes. The self-awareness has arrived and it brought its friend, self-doubt. Your job now isn't to lie -- it's to commiserate. 'Art is hard. You should see what I draw. Want some ice cream?' The pivot to ice cream is crucial. It redirects the emotional energy from 'am I talented?' to 'do I want sprinkles?' and the answer to the second question is always yes.",
      "12": "{name} has stopped showing you drawings. Not because they stopped drawing -- because they started caring what you think, and caring what you think means the drawings stay in the sketchbook where they can't be judged. This is both a relief and absolutely devastating. You spent 10 years figuring out how to fake enthusiasm and now nobody's asking. You will miss the blob era. You will miss being handed a piece of paper with an unidentifiable shape and being told 'it's you, Mommy.' Save everything in the Vault. You'll want it later.",
    },
    icon: "?",
    color: "#FF6B35",
  },
  {
    situation: "They want to give their art as a gift to grandma",
    situationPersonalized: "{name} wants to give art as a gift to grandma",
    advice: {
      "2": "Let {name} do it. Grandma will cry. She cries at commercials, sunsets, and the mere mention of how fast they're growing up. A crayon drawing from {name}? She will weep like she's accepting a lifetime achievement award. This is free emotional labor. The drawing could be a single dot on a crumpled piece of paper and grandma would frame it, put it on the mantle, and tell every visitor about it for the next 6 years. Let the system work.",
      "3": "Absolutely send it. Grandma already has an entire wall dedicated to {name}'s art. She has more of {name}'s drawings than you do. She has a filing system. She has FAVORITES. She will frame a napkin smear if {name}'s hand touched it. The real question isn't whether to send it -- it's whether grandma's wall has structural capacity for another frame.",
      "4": "Upload it to Doodie first. Send grandma the AI-upgraded version alongside the original. She'll think {name} is a prodigy. She'll call everyone she knows. She'll post it on Facebook with seven paragraphs about natural talent and 'running in the family.' Meanwhile, {name} is eating paste in the other room. You've created an illusion so powerful it will sustain three Thanksgiving conversations. You're welcome.",
      "5": "Frame it professionally. Yes, the frame will cost more than the art. Yes, this is absurd. But grandma will absolutely lose her mind when she unwraps a professionally framed crayon drawing of what might be a dog or might be a potato. It elevates the whole thing. Suddenly it's not a kid's drawing -- it's a 'piece.' And honestly, most of modern art works exactly this way. The frame IS the art. {name} is basically Banksy.",
      "6": "Let {name} make a card. Handmade, from the heart, with glitter that will be found in grandma's carpet until 2047. Grandma will keep this card in a special drawer. She will show it to her friends. She will read it out loud at family gatherings while everyone pretends they're not checking their phones. This card will outlive us all.",
      "7": "This is genuinely sweet and you should not ruin it. {name} voluntarily wanting to make art for grandma at 7 is peak childhood magic. Just quietly upload it to Doodie so you have a backup plan in case the original gets lost, destroyed, or is so abstract that even grandma can't figure out what it is. Which, let's be honest, is a real possibility.",
      "8": "{name} might actually draw something decent at 8. Keyword: might. The motor skills are developing. The hand-eye coordination is improving. There's a 40% chance grandma receives something identifiable this year. Have Doodie on standby for the other 60%.",
      "9": "Suggest a 'collaboration.' {name} draws the original, you run it through Doodie, grandma gets both versions. Everyone thinks they contributed meaningfully. {name} feels like an artist, you feel like a creative director, and grandma feels like she has the most talented grandchild in human history. This is the gift economy working exactly as intended.",
      "10": "At 10, {name} might want to buy a 'real' gift instead. This is growth. This is maturity. This is also the end of free gifts, which hits different than you expected. Respect the evolution. Buy the candle or whatever {name} picks out. But save every drawing from every previous year because you will absolutely miss the era of homemade gifts that cost nothing and meant everything.",
      "11": "If {name} is still making art for grandma at 11, congratulations -- you raised a human being with genuine thoughtfulness and emotional intelligence. Don't you dare critique the quality. Don't even think about it. The fact that an 11-year-old chose to make something by hand instead of asking for Amazon money is a miracle. Protect this at all costs.",
      "12": "{name} will text grandma 'happy birthday' with maybe an emoji. Maybe. Miss the drawing era yet? Of course you do. Everyone does. That's why the Vault exists. Upload everything before the nostalgia eats you alive.",
    },
    icon: "G",
    color: "#8B5CF6",
  },
  {
    situation: "They drew on the wall",
    situationPersonalized: "{name} drew on the wall",
    advice: {
      "2": "It's a mural now. Congratulations, you live in a gallery. An unauthorized, unsanctioned gallery featuring the abstract expressionist works of a person who also eats crayons. The good news: Magic Eraser exists. The bad news: {name} can make art faster than you can erase it. This is an arms race and you are losing. Consider it character-building. For you, not {name}. {name} is having the time of their life.",
      "3": "Magic Erasers. Buy them in bulk. Subscribe. Set up auto-delivery. You will go through these like tissues during allergy season. {name} has discovered that walls are large, flat, and infinitely more satisfying than paper. You cannot reason with a 3-year-old about property damage. You can only clean and cope. Accept your new life. This is who you are now.",
      "4": "Take a photo first. Upload it to Doodie. Now it's not vandalism -- it's 'wall art you're preserving digitally before the restoration process.' You're not angry, you're 'archiving.' See how that works? Same crayon marks, completely different narrative. You're basically a museum curator now, except the artist is 4 and currently hiding behind the couch because they know they did something.",
      "5": "This is a boundaries conversation. OR it's a chalkboard paint conversation. One of these involves sitting {name} down and explaining respect for property and shared spaces. The other involves buying a $15 can of paint and turning an entire wall into a legitimate drawing surface. One of these is significantly easier than the other. I'll let you figure out which.",
      "6": "If {name} drew on the wall at 6, this is a deliberate choice. A 6-year-old knows that walls are not for drawing. {name} looked at that wall, looked at the crayon, did the math, and decided the consequences were worth it. Respect the commitment to their craft. Then hand {name} a sponge. Natural consequences. {name} made art, {name} cleans art. Circle of life.",
      "7": "By 7, {name} absolutely knows walls aren't for drawing. This is either rebellion, performance art, or a cry for a bigger canvas. Either way: photo first, clean second. Always photo first. Because in 10 years, you'll look at that photo and laugh. You will not be laughing right now. But future you will. Trust the process.",
      "8": "Have {name} paint over it themselves. With primer. Then the wall color. This teaches 'natural consequences,' which is parenting-book code for 'making the kid fix their own mess.' It's also free labor. {name} learns responsibility, you get your wall back, and the whole thing becomes a story you tell at dinner parties. Everyone wins. Eventually.",
      "9": "Here's a move: frame a section of the wall before you paint over it. Cut out the drywall. Actually frame it. Put it in {name}'s room. Is this unhinged? Absolutely. Is it memorable? Also absolutely. Is it the kind of thing {name} will bring up in therapy in 20 years? Probably. But they'll be laughing when they do it.",
      "10": "{name} is testing you. This is a power move. Don't react. Don't yell. Just clean it. Silently. Maintain eye contact. The psychological warfare goes both ways, and {name} is about to learn that you can be scarier calm than angry. Also, take a photo for the Vault because this is still technically art and you're still technically a curator.",
      "11": "If {name} is drawing on walls at 11, you either have the next Banksy or you have a situation. Upload it to Doodie and find out which one. If the AI turns it into something amazing, lean into the prodigy narrative. If the AI can't even salvage it, that's a different conversation. But still -- photo first. Always photo first.",
      "12": "This is no longer 'kids being kids.' This is a conversation. A real one. About choices and consequences and respecting shared spaces. But also -- and I cannot stress this enough -- take a photo first. Document everything. Because even the wall drawings are memories, and you will want them someday. You will want all of it.",
    },
    icon: "W",
    color: "#818CF8",
  },
  {
    situation: "They say they want to be an artist when they grow up",
    situationPersonalized: "{name} says they want to be an artist when they grow up",
    advice: {
      "2": "{name} also wants to be a dinosaur, a truck, and a piece of cheese. You have time. At 2, career aspirations have the shelf life of a banana in August. Smile, nod, and revisit this conversation in about 15 years when it actually matters. For now, just hand {name} another crayon and enjoy the fact that their biggest professional concern is whether to use the red one or the blue one.",
      "3": "Encourage it! {name} will change their mind approximately 47 more times before settling on a career. Next week it's astronaut. The week after, veterinarian. By Thursday, firefighter who is also a princess. The 'artist' phase is one stop on a very long train ride. Enjoy the scenery. Buy more crayons. Don't panic.",
      "4": "Say 'that's amazing!' with full enthusiasm while silently opening a new tab and googling 'artist salary statistics.' The numbers will terrify you. Close the tab. Look at {name}'s happy face. Open the tab again. Close it again. This internal back-and-forth will define the next 14 years of your parenting. Welcome to the ride.",
      "5": "Support the dream. Also start a college fund. These things are not mutually exclusive. You can be both the parent who says 'follow your passion' and the parent who has a financial safety net for when 'passion' turns out to pay $23,000 a year. This is called 'responsible optimism' and it's the only way to survive raising a creative child without developing an ulcer.",
      "6": "Enroll {name} in art classes. This is the moment of truth. Either {name} loves it, gets better, and you've got a genuine budding artist on your hands -- or {name} quits after three sessions because 'the teacher makes us draw boring stuff like fruit.' Either outcome saves you decades of wondering. It's $200 well spent on certainty.",
      "7": "Show {name} your art from when you were 7. If it's bad -- and it probably is -- bond over it. Laugh about it together. If it's somehow good, have a quiet existential moment about the roads not taken. Either way, this is a genuine connection opportunity. Also upload your childhood art to Doodie because frankly, yours needs help too.",
      "8": "This is the age to casually introduce {name} to graphic design. 'It's art,' you say, 'but with health insurance.' Show {name} that people design logos, apps, movie posters, and video game characters for a living. Plant the seed. You're not crushing a dream -- you're expanding it. There's a version of 'artist' that doesn't involve a futon and ramen at 35. Help {name} find it.",
      "9": "The 'artist or designer' fork in the road is approaching. On one path: galleries, residencies, grant applications, and the word 'practice' used as a noun. On the other: salaries, benefits, retirement plans, and the ability to eat food that doesn't come in a packet. Graphic designers eat well. Fine artists have 'character.' Guide gently. Don't push.",
      "10": "{name} might actually be developing real skill at this point. Or {name} might just have very strong opinions about what looks good. At 10, it's genuinely hard to tell the difference between emerging talent and confident mediocrity. Either way, support it. The worst that happens is {name} develops a lifelong hobby that brings them joy. That's not a bad outcome.",
      "11": "If {name} is still saying 'artist' at 11, after the phase where every kid wants to be a YouTuber, this might be real. Take it seriously. Look into better art supplies, portfolio-building programs, summer art camps. Also -- still fund the college account. Because even Picasso needed rent money, and {name} is not Picasso. Yet.",
      "12": "{name} is about to enter middle school, where dreams go to either die or get forged in fire. They'll either double down on art as their identity, or they'll discover coding, sports, or whatever their friend group is into. Either way, you'll survive. And you'll have a Vault full of every drawing they ever made to look back on, no matter what they become.",
    },
    icon: "S",
    color: "#10B981",
  },
  {
    situation: "The fridge is full and they made another drawing",
    situationPersonalized: "The fridge is full and {name} made another drawing",
    advice: {
      "2": "Stack them. Layer them. Create geological strata of art on your refrigerator door. The fridge can hold more than you think. Magnets are strong. Your guilt is stronger. At 2, {name} produces drawings at a rate that would make a printer jealous. Just keep stacking. We believe in you. The fridge believes in you. Gravity is the only thing that doesn't.",
      "3": "Start a 'rotation system.' Oldest drawing comes off, newest goes up. This sounds reasonable and organized. In practice, {name} will notice within 4 seconds that Tuesday's drawing is gone and will have a complete emotional meltdown about it. You will cave. You will put it back. The fridge now has two layers of drawings. This is your life now.",
      "4": "This is literally why Doodie exists. Upload the drawing. Transform it into something amazing. Store it digitally. Remove the physical version from the fridge while {name} is at preschool. Reclaim your refrigerator. See your food again. Eat leftovers without having to peel back three layers of crayon art. Welcome back to civilization.",
      "5": "You have two options. Option A: get a corkboard and create a dedicated 'gallery wall.' This is practical, organized, and makes {name} feel special. Option B: buy a second fridge. This is insane, expensive, and makes you feel like you've given up. Surprisingly, many parents have chosen Option B. We don't judge. We just transform the art.",
      "6": "Start a 'gallery wall' in {name}'s room. Frame the best ones. Make it look intentional. Now the fridge is yours again, {name} has their own personal exhibition space, and guests think you're a curating genius. The drawings that don't make the gallery wall? Those go in the Vault. Digitally preserved, physically recycled. Everyone's happy. Everyone.",
      "7": "Introduce {name} to the concept of 'curating.' Only the absolute best work makes it to the fridge. This teaches artistic standards, critical thinking, and self-evaluation. It also has a 50/50 chance of causing tears. If it's the tears outcome, abort mission and just buy more magnets. If it's the standards outcome, congratulations -- you're raising an art director.",
      "8": "Digitize everything. Seriously, everything. Upload the good ones to Doodie for transformation. The questionable ones go straight to the Vault. And the truly terrible ones? Delete them when {name} is at school and never speak of it again. We won't tell. The Vault won't tell. This is a judgment-free zone. (It's not. We're judging the art. Just not you.)",
      "9": "By 9, {name} might be self-curating. {name} might look at the fridge, look at the new drawing, and voluntarily remove an older one. If this happens, do not react. Do not celebrate. Act like this is normal. Inside, you are witnessing a miracle of child development. Outside, you are calmly making dinner. This is the balance.",
      "10": "The fridge drawings should be tapering off naturally by now. If they're not, congratulations -- you've created a monster. A creative, expressive, prolific monster who produces art at industrial scale. This is both wonderful and logistically overwhelming. Invest in a scanner. Invest in cloud storage. Invest in Doodie. The fridge can only hold so much.",
      "11": "{name} has probably moved to digital art by now. An iPad. A computer. Something with an undo button. Your fridge is suddenly, strangely bare. You can see the surface. You can read the magnets that say things like 'Live Laugh Love' that have been buried under drawings since 2018. You feel... empty. This is normal. This is growth. Upload everything to the Vault before the nostalgia hits.",
      "12": "The fridge is bare. Completely bare. Not a single drawing. Not a single magnet holding a single piece of paper. You can see the stainless steel. You miss the clutter. You never thought you'd miss the clutter. You never thought you'd stand in front of an empty fridge feeling like something important ended and you didn't get to say goodbye. Upload everything. Transform everything. Keep everything. The Vault doesn't forget, even when the fridge does.",
    },
    icon: "F",
    color: "#F59E0B",
  },
  {
    situation: "They're having a meltdown because their drawing 'doesn't look right'",
    situationPersonalized: "{name} is having a meltdown because the drawing 'doesn't look right'",
    advice: {
      "2": "Distract {name} with a snack. A cracker. A piece of cheese. Literally anything edible. At 2, the attention span is approximately 8 seconds and food overrides all other concerns. The drawing crisis will be forgotten before the goldfish cracker hits the tongue. This is not avoidance -- it's strategic emotional redirection. You're basically a therapist with snacks.",
      "3": "Draw something worse. On purpose. Make it hilariously bad. The stick figure with arms coming out of its head. The sun that's clearly just a circle with lines. {name} will look at your drawing, look at theirs, and realize that theirs is actually pretty good by comparison. Crisis averted. Hero status achieved. And {name} learns that grown-ups can't draw either, which is honestly one of life's most comforting truths.",
      "4": "'Art isn't about being perfect, it's about expressing yourself.' You read that on a Pinterest board or an Instagram infographic. It doesn't matter where. What matters is that you said it with enough conviction that {name} believes you, stops crying, and goes back to drawing. The drawing will still look weird. But {name} will feel better about it, and in the end, that's what matters more than accuracy.",
      "5": "'Bob Ross didn't get it right the first time either.' {name} has no idea who Bob Ross is. This is your cue. Pull up YouTube. Find 'The Joy of Painting.' Sit down together. Within 10 minutes, you're both watching a man with a magnificent afro paint 'happy little trees' and everything in the world feels okay. The drawing crisis has been replaced by a Bob Ross marathon. This is an absolute win.",
      "6": "Teach {name} that erasing exists. I know this sounds obvious. But some kids genuinely, truly do not know that you can undo things. They think every mark is permanent and final and irreversible, like a tattoo. The moment {name} discovers the eraser, everything changes. Mistakes become fixable. Art becomes iterative. The meltdowns decrease by approximately 60%. Buy good erasers. Buy many.",
      "7": "Pull up Doodie. Show {name} a before-and-after. 'See? Even drawings that don't look right become amazing art. That's the whole point.' You've just solved an existential crisis with technology. {name} now understands that imperfection is not the end -- it's the beginning. Also, you've subtly marketed our product during a vulnerable emotional moment. You're welcome, and we're sorry.",
      "8": "This is actually a growth mindset moment and you should recognize it. {name} is upset because they care about quality. They have standards now. They can see the gap between what they imagined and what they created, and that gap hurts. Help {name} try again. Or upload the 'bad' version to Doodie and let AI close the gap. Either way, validate the feeling first: 'I know it's frustrating when things don't come out the way you see them in your head.'",
      "9": "Introduce {name} to the concept of 'iteration.' Real artists make 50 versions before they get one they like. Show {name} the sketch pages of famous animators or concept artists. All those 'mistakes' led to the final thing. The second attempt will be better than the first. The third even better. This is literally how every creative person who ever lived got good. Persistence, not talent.",
      "10": "{name} is developing self-awareness and standards at 10, and both of those things are healthy but painful. Like growing pains, but for artistic ego. The meltdown is actually a sign of progress -- {name} can see quality now, even if they can't produce it yet. Your job is to sit in the discomfort with them. Don't fix it. Don't minimize it. Just be there. 'Yeah, it's hard. Let's try again tomorrow.'",
      "11": "Welcome to perfectionism. It arrived and it's not leaving. {name} will compare every drawing to what they see online, in books, from other kids. The gap will feel enormous. Art therapy is $150/hour. Doodie is $4.99. Both are valid options. But also: normalize imperfection. Show {name} your own failures. Show {name} that adults mess up too, all the time, at everything. The pressure to be perfect is the real enemy here, not the drawing.",
      "12": "{name} might actually have a point -- the drawing might genuinely not look right. At 12, the critical eye is sharp and the skills haven't fully caught up. This is the most frustrating age for creative kids because they can finally see exactly how good they want to be and exactly how far they are from getting there. Help {name} fix it. Or upload it to Doodie and let AI bridge the gap. Either way, validate the feeling: 'I see what you were going for. Let's figure it out together.'",
    },
    icon: "M",
    color: "#8B5CF6",
  },
  {
    situation: "They drew a portrait of you and it looks nothing like you",
    situationPersonalized: "{name} drew a portrait of you and it looks nothing like you",
    advice: {
      "2": "Congratulations, you're now a circle with two dots and some lines coming out of it. That's you. That's how {name} sees you. A potato with hair. And honestly? After the week you've had, that might be accurate. The real question is not 'does this look like me?' -- it's 'why does my 2-year-old think I have seven fingers and no neck?' Don't ask. Just smile and say 'that's beautiful.' Put it on the fridge. Accept your new identity.",
      "3": "Your head is enormous. Your body is a triangle. One arm is twice as long as the other and both legs appear to be the same leg drawn twice. Welcome to portraiture at age 3, where anatomy is a suggestion and proportions are a myth. {name} is genuinely proud of this and will ask you to identify yourself in the drawing. You must do this correctly. Study the clues. The one with the big circle head and the line mouth? That's you. The slightly smaller circle? That's the dog. Get it right.",
      "4": "At 4, {name} has added detail. You now have fingers (the wrong number), eyes (one bigger than the other), and something that might be a smile or might be a mustache. You do not have a mustache. This doesn't matter. The point is {name} looked at you -- really looked at you -- and this is what came back. It's not flattering. It's not accurate. But someone loved you enough to sit down with a crayon and try to capture you on paper, and that is objectively sweet. Upload it to Doodie so the AI can figure out who it's supposed to be.",
      "5": "Here's the thing: {name}'s portrait of you reveals how {name} actually perceives you. The giant head means you talk a lot. The huge hands mean you're always grabbing things (snacks, phones, {name}'s drawings off the floor). The missing ears mean {name} doesn't think you listen. This is simultaneously hilarious and deeply psychoanalytic. Frame it. Show it to your therapist. They'll have notes.",
      "6": "{name} drew you with no body, just a floating head with legs coming out of the chin. This is called the 'tadpole stage' of drawing development and it's perfectly normal. What's less normal is how personally attacked you feel by it. 'I have a torso,' you want to say. 'I have arms. I have a NECK.' But you won't say that, because you're an adult. You'll say 'I love it' and you'll mean approximately 40% of that statement.",
      "7": "By 7, {name} is drawing you with more realistic features, which means you're now confronted with how your child actually sees your face. That forehead is... large. The nose is... prominent. And why are you frowning in every portrait? Is that how you look? Do you always look like that? This drawing is giving 'stressed parent who hasn't slept since 2019' and unfortunately that's accurate. Consider it honest art.",
      "8": "{name} drew you at 8, and the portrait has entered the uncanny valley. It's recognizable enough that you can tell it's supposed to be you, but wrong enough that it's unsettling. Like a police sketch done by someone who saw you once, in a dream, from across a parking lot. The eyes are close but slightly too far apart. The mouth exists but in the wrong place. Upload it to Doodie. The AI version will somehow be more flattering and less existentially threatening.",
      "9": "At 9, {name} is genuinely trying for accuracy and the result is... honest. Too honest. You can see every feature you're self-conscious about, rendered in colored pencil by someone with zero social awareness about what you'd prefer to have emphasized. That cowlick? Drawn with forensic precision. The bags under your eyes? Shaded. The weird way your ear sticks out? Captured from multiple angles. This portrait is a mirror and you're not ready for it.",
      "10": "Plot twist: {name} actually captured something real at 10. Not your physical appearance -- they're still getting that wrong -- but some essential quality of YOU. The way you hold your coffee. The specific tired smile. Something in the posture. It doesn't look like you but it somehow FEELS like you, and that's significantly more impressive than photorealism. This is art. Accidentally. Don't tell {name} that -- just say 'wow, I love this.'",
      "11": "{name} at 11 is either drawing you with genuine skill (unlikely but possible) or drawing you with intentional artistic license (read: making fun of you). Check the expression. If you're smiling serenely, {name} loves you. If your eyes are huge and your mouth is a flat line, {name} is commenting on your 'screen face' and they're not wrong. Either way, this portrait is going in the Vault because someday you'll want proof that {name} noticed you at all during the preteen years.",
      "12": "{name} might have stopped drawing you entirely. The last portrait was months ago and it's been replaced by drawings of anime characters, celebrities, or their friend group. You are no longer the main character of {name}'s art, and this is fine. This is completely fine. You are an adult who does not need to be the subject of a 12-year-old's artwork to feel valued. You're fine. Upload every portrait they ever drew of you to the Vault. You'll want them all.",
    },
    icon: "P",
    color: "#FF6B35",
  },
  {
    situation: "They compare their art to another kid's and feel bad",
    situationPersonalized: "{name} compares art to another kid's and feels bad",
    advice: {
      "2": "A 2-year-old comparing art is actually just pointing at another kid's drawing and yelling 'MINE' or trying to eat it. If {name} seems upset, it's probably because the other kid has the red crayon and {name} doesn't. This is not an art critique situation. This is a sharing situation. Get a second red crayon. Crisis averted. Art school can wait.",
      "3": "If {name} at 3 is already comparing themselves to other kids' drawings, you have a future perfectionist on your hands. Or {name} just wants whatever the other kid has, which at 3 is literally every toy, snack, and art supply within visual range. Either way, redirect: 'Yours is different and different is good.' This is the first of approximately 4,000 times you'll say this before they graduate high school.",
      "4": "'But theirs is BETTER.' The four most soul-crushing words a parent can hear. {name} said it about a drawing that is, objectively, not better -- it's just different. But try explaining subjective aesthetic evaluation to a 4-year-old who's already decided their drawing is garbage because Emma drew a horse with four legs instead of seven. You can't. So instead: 'Let me show you something cool.' Pull up Doodie. Transform {name}'s drawing. Watch the comparison evaporate.",
      "5": "This is the age where comparison starts to stick. {name} has noticed that some kids draw 'better' and has filed this information in the growing folder of 'things to feel insecure about.' Your job is to empty that folder. Show {name} that their drawing has something the other kid's doesn't -- personality, weirdness, a dog with wings. Point out the unique things. Make uniqueness the goal, not accuracy. You're rewiring the metric for success and it's important.",
      "6": "'Everyone has different strengths.' You'll say this. {name} won't believe you. Because {name} just watched Aiden draw a perfect dinosaur while {name}'s looks like a deflated balloon. The comparison is visceral and real and no amount of 'but yours is special' will fix it. What WILL fix it: showing {name} that their style, transformed through Doodie, becomes something incredible. The AI doesn't care about accuracy. It cares about personality. And {name}'s drawing has TONS of that.",
      "7": "Art comparison at 7 gets serious because kids start being honest with each other. Not kind-honest. Just honest. 'Your horse looks weird.' 'Mine is better.' This is childhood socialization at its most brutal. You cannot protect {name} from this. You CAN show {name} that art is not a competition, that style is personal, and that the kid with the 'better' drawing probably can't do the 50 other things {name} can do. Perspective. Give {name} perspective. And a cookie.",
      "8": "At 8, {name} might be right -- the other kid might actually draw better. Some kids develop motor skills and spatial awareness faster. This isn't a reflection of intelligence, creativity, or worth. It's just hand-eye coordination on a different timeline. The fix isn't to deny reality. It's to expand the definition of 'good.' Show {name} abstract art. Show {name} outsider art. Show {name} that the most interesting art in history was made by people who couldn't draw 'correctly' either.",
      "9": "Welcome to the comparison Olympics, where {name} is now ranking every kid in class by drawing ability and placing themselves at the bottom. They're probably wrong about the ranking, but it doesn't matter -- the feeling is real. This is a confidence problem, not a skill problem. Build the confidence: 'Let's make something together.' Co-create. Show {name} that the process matters more than the product. If that fails, upload both drawings to Doodie and let {name} see that AI doesn't play favorites.",
      "10": "At 10, social comparison is a full-time job and art is just one battlefield. {name} is comparing everything -- grades, clothes, skills, popularity, and yes, drawings. The antidote to comparison is purpose. 'Why do YOU draw? Because it's fun? Because it relaxes you? Then who cares if someone draws a straighter line?' This is easier said than believed, but planting the seed matters. Art for joy vs. art for approval is a life lesson disguised as a crayon conversation.",
      "11": "Social media has entered the chat. {name} is now comparing their art not just to classmates but to 11-year-olds on TikTok who draw like professional illustrators (because they've been practicing since they were 4 with professional-grade tools and possibly some parental 'help'). The comparison pool just went from 25 kids in a classroom to 8 million kids on the internet. Normalize being a beginner. Normalize being imperfect. Turn off the phone if necessary.",
      "12": "At 12, {name} has either made peace with their art level or given up entirely. If they've made peace: celebrate. That emotional maturity is rare and valuable. If they've given up: this is your intervention moment. Don't push art -- push expression. Maybe it's music, writing, coding, cooking. The creative impulse doesn't die, it redirects. And if {name} ever picks up a pencil again? Doodie will be here, ready to turn whatever they make into something that reminds them they were always good enough.",
    },
    icon: "C",
    color: "#14B8A6",
  },
  {
    situation: "They refuse to draw anything new and just want to watch screens",
    situationPersonalized: "{name} refuses to draw and just wants to watch screens",
    advice: {
      "2": "At 2, screens are basically a magic spell. Bright colors, movement, sounds -- of course {name} would rather watch Bluey than hold a crayon. The crayon doesn't sing. The crayon doesn't move. The crayon just sits there, being waxy and disappointing. Your move: draw WITH {name}. Make it a together activity. You draw, {name} copies, the screen stays off. Or -- upload one of {name}'s old scribbles to Doodie and show the transformation on the screen. Now the screen IS the art. Checkmate.",
      "3": "Three-year-olds don't have art blocks. They have preference shifts. Yesterday {name} drew for an hour. Today {name} wants to watch the same episode of Paw Patrol for the 47th time. This is not a crisis. This is Tuesday. Don't force art. Leave supplies out. Make it accessible but not mandatory. The crayon box on the table is an invitation, not an assignment. {name} will come back to it. Probably during the closing credits.",
      "4": "The screen is winning because the screen asks nothing of {name}. Drawing requires effort, imagination, and fine motor skills that are still developing. Screens require eyeballs. That's it. You cannot compete with passive entertainment using active creation unless you make creation MORE fun than consumption. Try: 'Let's draw the characters from the show.' Now the screen is the reference, not the replacement. {name} gets to draw Bluey and you get to pretend you know what Bluey looks like.",
      "5": "If {name} is choosing screens over drawing at 5, try making drawing an EVENT. Special new markers. A fresh sketchbook. Stickers as rewards. A 'drawing date' with snacks. You're not competing with a screen -- you're competing with dopamine, and dopamine responds to novelty. Also: show {name} their Doodie transformations. 'Remember when you drew that cat and it became THIS?' That before-and-after is its own dopamine hit.",
      "6": "'I don't want to draw, I want to watch YouTube.' This sentence will be spoken approximately 3,000 more times before {name} turns 18. Your choices: (A) argue about screen time, creating conflict; (B) bribe with dessert, creating unhealthy associations; (C) say 'okay, 20 minutes, then we make something,' creating compromise. Option C wins. Set a timer. When it goes off, sit down together. Make it collaborative. {name} will grumble for 2 minutes then get absorbed in drawing for 45. Kids are wild.",
      "7": "At 7, the screen addiction is real and drawing feels like work. Here's the move: merge them. Give {name} a tablet with a drawing app. It's a screen AND it's art. Is this cheating? Maybe. Does it work? Absolutely. {name} gets the screen experience while actually creating something. Then export the digital drawing, upload to Doodie, and transform it. Now {name} has made art, used a screen, and produced something worth keeping. Everyone wins.",
      "8": "The comparison problem from the last scenario compounds here. {name} watches artists on YouTube draw incredible things and thinks 'I could never do that, so why try?' The screen shows perfection. The paper shows reality. The gap is discouraging. Your counter: show {name} the time-lapse. Every YouTube artist has failures. Every masterpiece started as a sketch. And every drawing {name} makes, no matter how rough, can be transformed by Doodie into something that closes that gap. The point isn't perfection. It's participation.",
      "9": "{name} at 9 has genuine hobbies now and drawing might not be one of them. That's okay. Not every kid is an artist, just like not every kid is an athlete or a musician. If {name} wants screens instead of art, ask what they're watching. If it's creative content -- animation, art tutorials, design videos -- they're still in the creative orbit. If it's just mindless scrolling, that's a different conversation, and it's about screen hygiene, not about art.",
      "10": "Negotiate. 'For every 30 minutes of screen time, make one drawing.' This sounds like bartering with a tiny dictator because it is. But at 10, {name} understands deals. They understand exchange. They might even enjoy the structure of earning screen time through creativity. If the drawing takes 5 minutes and is a stick figure, that counts. The goal isn't masterpieces -- it's keeping the creative habit alive through the screen-obsessed years.",
      "11": "At 11, you cannot force art. Full stop. You can leave supplies around. You can draw yourself (modeling behavior). You can upload old drawings to Doodie and casually show {name} the results ('look what I found!'). But you cannot make an 11-year-old create something they don't want to create. What you CAN do: find the creative activity they DO care about. Maybe it's building in Minecraft. Maybe it's editing videos. Maybe it's writing. Creativity takes many forms. Drawing is one. Not the only one.",
      "12": "{name} hasn't drawn in months. The sketchbook is dusty. The crayons are a relic. The fridge is bare (see earlier scenario where this destroyed you emotionally). This is normal. This is temporary. Creativity is cyclical and adolescence is the longest drought. Keep the Vault updated with everything from their earlier years. And when {name} is 22 and finds their old drawings in the Vault and says 'I can't believe I used to draw all the time' -- that's when it comes back. It always comes back. You just have to wait.",
    },
    icon: "T",
    color: "#8B5CF6",
  },
];

function injectName(text: string, name: string): string {
  if (!name) return text.replace(/\{name\}/g, "your kid");
  return text.replace(/\{name\}/g, name);
}

// -- Favorites --

const FAVORITES_KEY = "doodie-advice-favorites";

function loadFavorites(): ReadonlySet<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return new Set();
    const parsed = JSON.parse(stored);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveFavorites(favs: ReadonlySet<string>): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs]));
  } catch {
    // localStorage may be unavailable
  }
}

function useFavorites() {
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveFavorites(next);
      return next;
    });
  }, []);

  return { favorites, toggle } as const;
}

function HeartIcon({ filled }: { readonly filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

// -- Scroll Reveal --

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("scroll-reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShareButton({ text }: { readonly text: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {
      // clipboard not available -- fail silently
    });
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy advice to clipboard"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 999,
        border: "1px solid",
        borderColor: copied ? "rgba(16,185,129,0.3)" : "rgba(229,231,235,0.8)",
        background: copied ? "rgba(16,185,129,0.06)" : "rgba(243,244,246,0.5)",
        color: copied ? "#10B981" : "#9CA3AF",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function AdviceCardWrapper({ children, index }: { readonly children: ReactNode; readonly index: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="scroll-reveal neu-card d-card-hover"
      style={{ padding: 0, overflow: "hidden", transitionDelay: `${Math.min(index * 60, 300)}ms` }}
    >
      {children}
    </div>
  );
}

export function ParentingAdvice() {
  const { profile, setShowSetup } = useKid();
  const kidName = profile.kidName;
  const defaultAge = profile.kidAge ? String(profile.kidAge) : "5";
  const { favorites, toggle: toggleFavorite } = useFavorites();

  const [selectedAge, setSelectedAge] = useState(defaultAge);

  // Sync age picker when profile rehydrates from localStorage
  useEffect(() => {
    if (profile.kidAge) {
      setSelectedAge(String(profile.kidAge));
    }
  }, [profile.kidAge]);

  return (
    <div style={{ position: "relative" }}>
      {/* Personalization banner */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        {kidName ? (
          <span
            className="d-badge"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <span style={{ fontSize: 12, color: "#8B5CF6", fontWeight: 600 }}>
              Personalized for {kidName}
            </span>
          </span>
        ) : (
          <button
            onClick={() => setShowSetup(true)}
            className="d-badge"
            style={{ cursor: "pointer", background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)" }}
          >
            <span style={{ fontSize: 12, color: "#FF6B35", fontWeight: 600 }}>
              Add your kid&apos;s name for personalized advice
            </span>
          </button>
        )}
      </div>

      {/* Sticky age picker */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 30,
          background: "rgba(250,250,250,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "20px 0",
          marginBottom: 32,
          borderBottom: "1px solid rgba(229,231,235,0.5)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
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
        </div>
      </div>

      {/* Card feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SCENARIOS.map((scenario, index) => {
          const adviceText = injectName(scenario.advice[selectedAge], kidName);
          const situationText = kidName
            ? injectName(scenario.situationPersonalized, kidName)
            : scenario.situation;
          const cardId = `${scenario.situation}-${selectedAge}`;
          const isFavorited = favorites.has(cardId);

          return (
            <AdviceCardWrapper key={scenario.situation} index={index}>
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "24px 28px 20px",
                  borderBottom: "1px solid rgba(229,231,235,0.4)",
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: scenario.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                    boxShadow: `0 2px 8px ${scenario.color}33`,
                  }}
                >
                  {scenario.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1A1A2E",
                      lineHeight: 1.4,
                    }}
                  >
                    {situationText}
                  </h3>
                </div>
              </div>

              {/* Card body -- the advice */}
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: 20 }}>
                  <span
                    style={{
                      marginTop: 2,
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: `${scenario.color}18`,
                      border: `1px solid ${scenario.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: scenario.color,
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {selectedAge}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#9CA3AF",
                        marginBottom: 10,
                      }}
                    >
                      Age {selectedAge}{kidName ? ` -- for ${kidName}` : ""}
                    </p>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.8,
                        color: "#4B5563",
                      }}
                    >
                      {adviceText}
                    </p>
                  </div>
                </div>

                {/* Card footer -- copy + disclaimer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 16,
                    borderTop: "1px solid rgba(229,231,235,0.3)",
                  }}
                >
                  <p style={{ fontSize: 11, color: "#D1D5DB", fontStyle: "italic" }}>
                    Not real advice. We are an art app.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => toggleFavorite(cardId)}
                      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        border: "1px solid",
                        borderColor: isFavorited ? "rgba(255,107,53,0.3)" : "rgba(229,231,235,0.8)",
                        background: isFavorited ? "rgba(255,107,53,0.06)" : "transparent",
                        color: isFavorited ? "#FF6B35" : "#D1D5DB",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        padding: 0,
                        fontFamily: "inherit",
                      }}
                    >
                      <HeartIcon filled={isFavorited} />
                    </button>
                    <ShareButton text={`${situationText}\n\nAge ${selectedAge}: ${adviceText}\n\n-- Doodie (doodleforge.com/advice)`} />
                  </div>
                </div>
              </div>
            </AdviceCardWrapper>
          );
        })}
      </div>
    </div>
  );
}
