export type DailyGuess = {
  day: number
  answer: string
  wrong_options: [string, string, string]
  reveal_text: string
  roast: string
  hint: string
}

// 30 daily guess items — rotates deterministically by day-of-year
export const DAILY_GUESSES: DailyGuess[] = [
  { day: 1, answer: 'Dog', wrong_options: ['Potato', 'Rock', 'Cloud'], reveal_text: "It's a DOG! Those four wobbly lines are legs, apparently.", roast: "You thought that was a potato? Bold take.", hint: 'It has four legs and barks' },
  { day: 2, answer: 'House', wrong_options: ['Mountain', 'Hat', 'Pizza slice'], reveal_text: "It's a HOUSE! The floating door is the chimney or the entrance -- we're not sure either.", roast: "A mountain? It has windows. Come on.", hint: 'People live in it' },
  { day: 3, answer: 'Cat', wrong_options: ['Alien', 'Spider', 'Blob'], reveal_text: "It's a CAT! Those antenna-looking things are ears.", roast: "Alien was honestly a reasonable guess.", hint: 'It purrs and knocks things off tables' },
  { day: 4, answer: 'Sun', wrong_options: ['Egg', 'Orange', 'Fireball'], reveal_text: "It's the SUN! Every kid draws it in the corner. It's law.", roast: "An egg? Did your kid draw this or you?", hint: 'It lives in the sky and is yellow' },
  { day: 5, answer: 'Tree', wrong_options: ['Broccoli', 'Mushroom', 'Lollipop'], reveal_text: "It's a TREE! Green ball on brown stick = tree. Universal kid language.", roast: "Broccoli was SO close though.", hint: 'Green on top, brown on bottom, stands outside' },
  { day: 6, answer: 'Fish', wrong_options: ['Submarine', 'Banana', 'Sword'], reveal_text: "It's a FISH! One eye, no depth perception, pure art.", roast: "A banana? You need to spend more time outdoors.", hint: 'It swims and has fins' },
  { day: 7, answer: 'Butterfly', wrong_options: ['Bow tie', 'Glasses', 'Mustache'], reveal_text: "It's a BUTTERFLY! Symmetry was attempted. Results vary.", roast: "A bow tie? Points for creativity, minus points for accuracy.", hint: 'It flies and has colorful wings' },
  { day: 8, answer: 'Rainbow', wrong_options: ['Bridge', 'Slide', 'Ribbon'], reveal_text: "It's a RAINBOW! Only 4 colors because crayons are limited.", roast: "A bridge? Between what, your imagination and reality?", hint: 'It appears after rain and has many colors' },
  { day: 9, answer: 'Car', wrong_options: ['Shoe box', 'Robot', 'Train'], reveal_text: "It's a CAR! Two circles = wheels. One rectangle = car. Simple math.", roast: "A shoe box? Okay, fair, it does look like one.", hint: 'It has 4 wheels and goes vroom' },
  { day: 10, answer: 'Flower', wrong_options: ['Pinwheel', 'Sun with hair', 'Octopus'], reveal_text: "It's a FLOWER! The classic circle-with-petals combo.", roast: "An octopus? The petals do look like tentacles though.", hint: 'It grows in a garden and smells nice' },
  { day: 11, answer: 'Dinosaur', wrong_options: ['Lizard', 'Horse', 'Dragon'], reveal_text: "It's a DINOSAUR! T-Rex specifically, based on those tiny arms.", roast: "A horse? With spikes?", hint: 'It lived millions of years ago and was very big' },
  { day: 12, answer: 'Mom', wrong_options: ['Witch', 'Princess', 'Stick figure'], reveal_text: "It's MOM! Triangle dress + hair spikes = mother dearest.", roast: "A witch? Hope your mom doesn't see this.", hint: 'The most important person in the house' },
  { day: 13, answer: 'Spider', wrong_options: ['Octopus', 'Sun', 'Star'], reveal_text: "It's a SPIDER! 8 legs (okay, 11, but who's counting).", roast: "Only a spider has this many legs and this much horror.", hint: 'It has 8 legs and builds webs' },
  { day: 14, answer: 'Rocket', wrong_options: ['Pencil', 'Carrot', 'Church'], reveal_text: "It's a ROCKET! Triangles + fire = space travel.", roast: "A pencil? I mean... shape-wise... fair.", hint: 'It goes to space' },
  { day: 15, answer: 'Princess', wrong_options: ['Triangle person', 'Lamp', 'Traffic cone'], reveal_text: "It's a PRINCESS! Crown + triangle dress = royalty.", roast: "A traffic cone? That crown does look cone-ish.", hint: 'She wears a crown and lives in a castle' },
  { day: 16, answer: 'Snake', wrong_options: ['Rope', 'River', 'Worm'], reveal_text: "It's a SNAKE! One squiggly line with a face. Art at its purest.", roast: "A river? Rivers don't have googly eyes.", hint: 'It slithers and goes hissss' },
  { day: 17, answer: 'Robot', wrong_options: ['Refrigerator', 'TV', 'Mailbox'], reveal_text: "It's a ROBOT! Square body, antenna, and surprisingly expressive.", roast: "A refrigerator? Does your fridge have antenna?", hint: 'It is made of metal and says beep boop' },
  { day: 18, answer: 'Birthday cake', wrong_options: ['Hat stack', 'Building', 'Drum'], reveal_text: "It's a BIRTHDAY CAKE! Layers, candles, and way too much frosting.", roast: "A hat stack? I see where you're coming from, honestly.", hint: 'You blow out candles on it once a year' },
  { day: 19, answer: 'Airplane', wrong_options: ['Bird', 'Cross', 'Plus sign'], reveal_text: "It's an AIRPLANE! Wings spread, nose pointed, vibes: flying.", roast: "A plus sign? Aerodynamically, you're not wrong.", hint: 'It flies people to faraway places' },
  { day: 20, answer: 'Elephant', wrong_options: ['Cloud with legs', 'Boulder', 'Hippo'], reveal_text: "It's an ELEPHANT! Big body, trunk, and ears for days.", roast: "A cloud with legs? You know what, I see it.", hint: 'It is gray, huge, and never forgets' },
  { day: 21, answer: 'Pizza', wrong_options: ['Triangle', 'Pie chart', 'Mountain'], reveal_text: "It's PIZZA! Triangle with dots. Universal food icon.", roast: "A pie chart? Only if the data was delicious.", hint: 'You eat it in slices' },
  { day: 22, answer: 'Shark', wrong_options: ['Submarine', 'Whale', 'Surfboard'], reveal_text: "It's a SHARK! That triangle on top is a fin, not a party hat.", roast: "A surfboard? With teeth?", hint: 'It has sharp teeth and a dorsal fin' },
  { day: 23, answer: 'Unicorn', wrong_options: ['Horse with tumor', 'Deer', 'Narwhal'], reveal_text: "It's a UNICORN! Horn + rainbow mane = magic horse.", roast: "A horse with a tumor? That's the horn, you monster.", hint: 'It is a horse but magical' },
  { day: 24, answer: 'Family', wrong_options: ['Bowling pins', 'Forest', 'Fence posts'], reveal_text: "It's the FAMILY! Size-ordered stick people. Smallest one is the pet.", roast: "Bowling pins? That's your family you're talking about.", hint: 'People who live together and love each other' },
  { day: 25, answer: 'Mermaid', wrong_options: ['Fish person', 'Tornado', 'Jellyfish'], reveal_text: "It's a MERMAID! Half person, half fish, 100% wobbly.", roast: "A tornado? That's just the tail swishing.", hint: 'She lives in the ocean and has a tail' },
  { day: 26, answer: 'Pirate ship', wrong_options: ['Bathtub', 'Cradle', 'Shoe'], reveal_text: "It's a PIRATE SHIP! Skull flag, waves, and probably a cannon somewhere.", roast: "A bathtub? Same shape, honestly.", hint: 'It sails the seas with a skull and crossbones flag' },
  { day: 27, answer: 'Snowman', wrong_options: ['Marshmallow stack', 'Ghost', 'Cotton balls'], reveal_text: "It's a SNOWMAN! Three circles, carrot nose, button eyes. Classic.", roast: "A marshmallow stack? Close, but colder.", hint: 'Made of circles and wears a top hat' },
  { day: 28, answer: 'Dragon', wrong_options: ['Dinosaur with wings', 'Lizard', 'Bird'], reveal_text: "It's a DRAGON! Fire-breathing, wing-having, tail-wagging beast.", roast: "A dinosaur with wings? Technically... you're not wrong.", hint: 'It breathes fire and has wings' },
  { day: 29, answer: 'Ice cream', wrong_options: ['Microphone', 'Light bulb', 'Mushroom'], reveal_text: "It's ICE CREAM! Cone + scoops + drips = summer perfection.", roast: "A microphone? Drop the mic on that guess.", hint: 'You eat it on a hot day' },
  { day: 30, answer: 'Monster', wrong_options: ['Dad in morning', 'Hairy potato', 'Sweater'], reveal_text: "It's a MONSTER! Teeth, claws, and a surprising amount of personality.", roast: "Dad in the morning? Valid but rude.", hint: 'It is scary and lives under the bed' },
]

export function getTodaysGuess(): DailyGuess {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const index = dayOfYear % DAILY_GUESSES.length
  return DAILY_GUESSES[index]
}
