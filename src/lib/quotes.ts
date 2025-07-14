export interface ProgrammingQuote {
  text: string;
  author: string;
  category: 'motivation' | 'coding' | 'technology' | 'wisdom' | 'humor';
}

export const programmingQuotes: ProgrammingQuote[] = [
  // Motivation
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "motivation"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "coding"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "coding"
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
    category: "wisdom"
  },
  {
    text: "In order to be irreplaceable, one must always be different.",
    author: "Coco Chanel",
    category: "motivation"
  },
  {
    text: "Java is to JavaScript what car is to Carpet.",
    author: "Chris Heilmann",
    category: "humor"
  },
  {
    text: "The most damaging phrase in the language is.. it's always been done this way",
    author: "Grace Hopper",
    category: "technology"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "coding"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
    category: "wisdom"
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    category: "coding"
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place.",
    author: "Brian Kernighan",
    category: "coding"
  },
  {
    text: "It's not a bug – it's an undocumented feature.",
    author: "Anonymous",
    category: "humor"
  },
  {
    text: "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics.",
    author: "Norman Augustine",
    category: "technology"
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
    category: "technology"
  },
  {
    text: "Code never lies, comments sometimes do.",
    author: "Ron Jeffries",
    category: "coding"
  },
  {
    text: "Programming is the art of algorithm design and the craft of debugging errant code.",
    author: "Ellen Ullman",
    category: "coding"
  },
  {
    text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    author: "Edsger Dijkstra",
    category: "humor"
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "coding"
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    category: "coding"
  },
  {
    text: "The best way to get a project done faster is to start sooner.",
    author: "Jim Highsmith",
    category: "motivation"
  },
  {
    text: "Software and cathedrals are much the same — first we build them, then we pray.",
    author: "Anonymous",
    category: "humor"
  },
  {
    text: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
    category: "humor"
  },
  {
    text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
    category: "coding"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "technology"
  },
  {
    text: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates",
    category: "technology"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "wisdom"
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    category: "coding"
  },
  {
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
    category: "coding"
  },
  {
    text: "Programming is not about typing, it's about thinking.",
    author: "Rich Hickey",
    category: "wisdom"
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
    category: "coding"
  }
];

export function getRandomQuote(): ProgrammingQuote {
  return programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)];
}

export function getRandomQuoteByCategory(category: ProgrammingQuote['category']): ProgrammingQuote {
  const categoryQuotes = programmingQuotes.filter(quote => quote.category === category);
  return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
}

export function getAllCategories(): ProgrammingQuote['category'][] {
  return ['motivation', 'coding', 'technology', 'wisdom', 'humor'];
}

export function generateQuoteMarkdown(quote: ProgrammingQuote): string {
  return `> **"${quote.text}"**\n> \n> — *${quote.author}*`;
} 