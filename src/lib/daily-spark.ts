// Daily Doodle Spark -- 60+ creative prompts paired with art styles
// Rotates deterministically so everyone gets the same prompt each day

export interface DailySpark {
  readonly prompt: string;
  readonly styleName: string;
  readonly styleColor: string;
  readonly dayIndex: number;
  readonly totalSparks: number;
}

interface SparkEntry {
  readonly prompt: string;
  readonly styleIndex: number; // index into STYLES array
}

const STYLES = [
  { name: "Oil Painting", color: "#FF6B35" },
  { name: "Watercolor", color: "#818CF8" },
  { name: "Anime", color: "#8B5CF6" },
  { name: "Cyberpunk", color: "#EC4899" },
  { name: "Pop Art", color: "#F59E0B" },
  { name: "Pixel Art", color: "#10B981" },
  { name: "Studio Ghibli", color: "#F97316" },
  { name: "Photorealistic", color: "#64B5F6" },
  { name: "Stained Glass", color: "#CE93D8" },
  { name: "Cartoon", color: "#FFB74D" },
  { name: "Pencil Sketch", color: "#90A4AE" },
  { name: "Fantasy Epic", color: "#A5D6A7" },
] as const;

// 65 creative prompts -- each paired with a featured style
const SPARKS: readonly SparkEntry[] = [
  { prompt: "Draw your pet as a superhero", styleIndex: 0 },
  { prompt: "Draw what you had for breakfast as a monster", styleIndex: 3 },
  { prompt: "Draw your house if it could fly", styleIndex: 6 },
  { prompt: "Draw a dinosaur going to school", styleIndex: 2 },
  { prompt: "Draw the silliest face you can imagine", styleIndex: 9 },
  { prompt: "Draw your favorite animal wearing a hat", styleIndex: 1 },
  { prompt: "Draw a robot that helps with chores", styleIndex: 3 },
  { prompt: "Draw yourself as a wizard", styleIndex: 11 },
  { prompt: "Draw a castle made of candy", styleIndex: 8 },
  { prompt: "Draw a fish driving a car", styleIndex: 4 },
  { prompt: "Draw your family as penguins", styleIndex: 6 },
  { prompt: "Draw the inside of a volcano", styleIndex: 0 },
  { prompt: "Draw a treehouse in the clouds", styleIndex: 1 },
  { prompt: "Draw your dream bedroom", styleIndex: 7 },
  { prompt: "Draw an alien visiting your school", styleIndex: 3 },
  { prompt: "Draw a cat that is also a pirate", styleIndex: 2 },
  { prompt: "Draw what lives at the bottom of the ocean", styleIndex: 8 },
  { prompt: "Draw a dragon having a birthday party", styleIndex: 11 },
  { prompt: "Draw your favorite food with legs", styleIndex: 9 },
  { prompt: "Draw a jungle gym on the moon", styleIndex: 5 },
  { prompt: "Draw a flower that is bigger than a house", styleIndex: 1 },
  { prompt: "Draw your dog (or dream dog) as a rock star", styleIndex: 4 },
  { prompt: "Draw a train that goes underwater", styleIndex: 6 },
  { prompt: "Draw a snowman in summer", styleIndex: 10 },
  { prompt: "Draw yourself riding a giant bird", styleIndex: 11 },
  { prompt: "Draw a sandwich the size of a building", styleIndex: 7 },
  { prompt: "Draw a unicorn in a race car", styleIndex: 3 },
  { prompt: "Draw your shoe if it was alive", styleIndex: 9 },
  { prompt: "Draw a secret door in the wall", styleIndex: 0 },
  { prompt: "Draw a rainbow bridge to another world", styleIndex: 8 },
  { prompt: "Draw a bear playing drums", styleIndex: 4 },
  { prompt: "Draw your hand as a map to treasure", styleIndex: 10 },
  { prompt: "Draw a city inside a giant tree", styleIndex: 6 },
  { prompt: "Draw a spaceship made of vegetables", styleIndex: 5 },
  { prompt: "Draw the world's weirdest zoo animal", styleIndex: 2 },
  { prompt: "Draw a monster that is actually friendly", styleIndex: 1 },
  { prompt: "Draw what you see when you close your eyes", styleIndex: 8 },
  { prompt: "Draw a knight riding a bicycle", styleIndex: 11 },
  { prompt: "Draw your teacher as a cartoon character", styleIndex: 9 },
  { prompt: "Draw a pizza with unusual toppings", styleIndex: 4 },
  { prompt: "Draw an island shaped like your favorite letter", styleIndex: 7 },
  { prompt: "Draw a giraffe playing basketball", styleIndex: 10 },
  { prompt: "Draw a house where everything is upside down", styleIndex: 3 },
  { prompt: "Draw the most powerful bug in the world", styleIndex: 5 },
  { prompt: "Draw your backpack if it had superpowers", styleIndex: 2 },
  { prompt: "Draw a library in the sky", styleIndex: 0 },
  { prompt: "Draw an octopus making art", styleIndex: 1 },
  { prompt: "Draw your best friend as an action figure", styleIndex: 7 },
  { prompt: "Draw a mountain that is also a sleeping giant", styleIndex: 11 },
  { prompt: "Draw a boat made of cookies", styleIndex: 9 },
  { prompt: "Draw a garden where the flowers sing", styleIndex: 6 },
  { prompt: "Draw a penguin on a surfboard", styleIndex: 4 },
  { prompt: "Draw a clock with feelings", styleIndex: 10 },
  { prompt: "Draw a car wash for dinosaurs", styleIndex: 3 },
  { prompt: "Draw the world's tallest ice cream cone", styleIndex: 5 },
  { prompt: "Draw a fox reading a book by a campfire", styleIndex: 0 },
  { prompt: "Draw a whale flying through the stars", styleIndex: 8 },
  { prompt: "Draw your favorite toy as a giant", styleIndex: 2 },
  { prompt: "Draw a bridge between two volcanoes", styleIndex: 11 },
  { prompt: "Draw an elephant wearing a tutu", styleIndex: 1 },
  { prompt: "Draw yourself 100 years in the future", styleIndex: 7 },
  { prompt: "Draw a planet made entirely of music", styleIndex: 8 },
  { prompt: "Draw a hamster piloting a helicopter", styleIndex: 5 },
  { prompt: "Draw your lunchbox as a tiny house", styleIndex: 9 },
  { prompt: "Draw the inside of a magical backpack", styleIndex: 6 },
] as const;

function getDaysSinceEpoch(): number {
  const epoch = new Date(2026, 0, 1).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - epoch) / 86400000);
}

export function getDailySpark(): DailySpark {
  const dayIndex = getDaysSinceEpoch() % SPARKS.length;
  const spark = SPARKS[dayIndex];
  const style = STYLES[spark.styleIndex];

  return {
    prompt: spark.prompt,
    styleName: style.name,
    styleColor: style.color,
    dayIndex,
    totalSparks: SPARKS.length,
  };
}

export function getRecentSparks(count: number): DailySpark[] {
  const results: DailySpark[] = [];
  const today = getDaysSinceEpoch();

  for (let i = 1; i <= count; i++) {
    const pastDay = ((today - i) % SPARKS.length + SPARKS.length) % SPARKS.length;
    const spark = SPARKS[pastDay];
    const style = STYLES[spark.styleIndex];
    results.push({
      prompt: spark.prompt,
      styleName: style.name,
      styleColor: style.color,
      dayIndex: pastDay,
      totalSparks: SPARKS.length,
    });
  }

  return results;
}
