import { GitHubUser, GitHubRepository } from '@/types/github'

export interface EmojiProfile {
  headerEmoji: string
  locationEmoji: string
  languageEmojis: Record<string, string>
  personalityEmojis: string[]
  greetingGif: string
  workingGif: string
  funFactEmojis: string[]
  techEmojis: string[]
  
  // Advanced properties for enhanced README
  greeting: string
  aboutEmoji: string
  techEmoji: string
  badgeEmoji: string
  statsEmoji: string
  streakEmoji: string
  activityEmoji: string
  trophyEmoji: string
  repoEmoji: string
  socialEmoji: string
  funEmoji: string
  jokeEmoji: string
  connectEmoji: string
  footer: string
  personalityDescription: string
  codingStatus: string
}

export function generateDynamicEmojis(user: GitHubUser, repositories: GitHubRepository[]): EmojiProfile {
  // Language to emoji mapping
  const languageEmojis: Record<string, string> = {
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'Python': '🐍',
    'Java': '☕',
    'C++': '⚡',
    'C#': '💜',
    'PHP': '🐘',
    'Ruby': '💎',
    'Go': '🐹',
    'Rust': '🦀',
    'Swift': '🍎',
    'Kotlin': '📱',
    'Dart': '🎯',
    'HTML': '🌐',
    'CSS': '🎨',
    'Shell': '🐚',
    'Vue': '💚',
    'React': '⚛️',
    'Angular': '🅰️',
    'Node.js': '💚',
    'Docker': '🐳',
    'Kubernetes': '☸️'
  }

  // Location-based emojis
  const getLocationEmoji = (location: string | null): string => {
    if (!location) return '🌍'
    const loc = location.toLowerCase()
    
    // Countries
    if (loc.includes('usa') || loc.includes('america') || loc.includes('united states')) return '🇺🇸'
    if (loc.includes('canada')) return '🇨🇦'
    if (loc.includes('uk') || loc.includes('britain') || loc.includes('england')) return '🇬🇧'
    if (loc.includes('germany')) return '🇩🇪'
    if (loc.includes('france')) return '🇫🇷'
    if (loc.includes('japan')) return '🇯🇵'
    if (loc.includes('china')) return '🇨🇳'
    if (loc.includes('india')) return '🇮🇳'
    if (loc.includes('brazil')) return '🇧🇷'
    if (loc.includes('australia')) return '🇦🇺'
    if (loc.includes('russia')) return '🇷🇺'
    if (loc.includes('korea')) return '🇰🇷'
    if (loc.includes('italy')) return '🇮🇹'
    if (loc.includes('spain')) return '🇪🇸'
    if (loc.includes('netherlands')) return '🇳🇱'
    if (loc.includes('sweden')) return '🇸🇪'
    if (loc.includes('norway')) return '🇳🇴'
    if (loc.includes('denmark')) return '🇩🇰'
    if (loc.includes('finland')) return '🇫🇮'
    if (loc.includes('switzerland')) return '🇨🇭'
    if (loc.includes('austria')) return '🇦🇹'
    if (loc.includes('poland')) return '🇵🇱'
    if (loc.includes('ukraine')) return '🇺🇦'
    if (loc.includes('israel')) return '🇮🇱'
    if (loc.includes('turkey')) return '🇹🇷'
    if (loc.includes('mexico')) return '🇲🇽'
    if (loc.includes('argentina')) return '🇦🇷'
    if (loc.includes('chile')) return '🇨🇱'
    if (loc.includes('colombia')) return '🇨🇴'
    if (loc.includes('peru')) return '🇵🇪'
    if (loc.includes('south africa')) return '🇿🇦'
    if (loc.includes('egypt')) return '🇪🇬'
    if (loc.includes('nigeria')) return '🇳🇬'
    if (loc.includes('kenya')) return '🇰🇪'
    if (loc.includes('thailand')) return '🇹🇭'
    if (loc.includes('vietnam')) return '🇻🇳'
    if (loc.includes('singapore')) return '🇸🇬'
    if (loc.includes('indonesia')) return '🇮🇩'
    if (loc.includes('philippines')) return '🇵🇭'
    if (loc.includes('malaysia')) return '🇲🇾'
    
    // Cities
    if (loc.includes('san francisco') || loc.includes('silicon valley')) return '🌉'
    if (loc.includes('new york')) return '🗽'
    if (loc.includes('london')) return '🏰'
    if (loc.includes('tokyo')) return '🗼'
    if (loc.includes('paris')) return '🗼'
    if (loc.includes('berlin')) return '🏛️'
    if (loc.includes('toronto')) return '🍁'
    if (loc.includes('sydney')) return '🏄‍♂️'
    if (loc.includes('amsterdam')) return '🚲'
    if (loc.includes('seattle')) return '🌧️'
    if (loc.includes('austin')) return '🤠'
    if (loc.includes('miami')) return '🏖️'
    if (loc.includes('los angeles')) return '🌴'
    if (loc.includes('chicago')) return '🏙️'
    if (loc.includes('boston')) return '⚓'
    if (loc.includes('denver')) return '🏔️'
    if (loc.includes('portland')) return '🌲'
    
    return '📍'
  }

  // Generate personality emojis based on profile data
  const getPersonalityEmojis = (): string[] => {
    const emojis: string[] = []
    
    // Based on repo count
    if (user.public_repos > 100) emojis.push('🚀') // Prolific coder
    if (user.public_repos > 50) emojis.push('💪') // Strong contributor
    if (user.followers > 1000) emojis.push('🌟') // Popular
    if (user.followers > 100) emojis.push('👥') // Well-connected
    if (user.following > 500) emojis.push('🤝') // Community minded
    
    // Based on repositories content
    const repoNames = repositories.map(repo => repo.name.toLowerCase()).join(' ')
    const repoDescriptions = repositories.map(repo => repo.description?.toLowerCase() || '').join(' ')
    const allText = `${repoNames} ${repoDescriptions} ${user.bio?.toLowerCase() || ''}`
    
    if (allText.includes('ai') || allText.includes('machine learning') || allText.includes('neural')) emojis.push('🤖')
    if (allText.includes('game') || allText.includes('unity') || allText.includes('godot')) emojis.push('🎮')
    if (allText.includes('mobile') || allText.includes('android') || allText.includes('ios')) emojis.push('📱')
    if (allText.includes('web') || allText.includes('frontend') || allText.includes('backend')) emojis.push('🌐')
    if (allText.includes('security') || allText.includes('crypto') || allText.includes('blockchain')) emojis.push('🔐')
    if (allText.includes('data') || allText.includes('analytics') || allText.includes('visualization')) emojis.push('📊')
    if (allText.includes('music') || allText.includes('audio') || allText.includes('sound')) emojis.push('🎵')
    if (allText.includes('design') || allText.includes('ui') || allText.includes('ux')) emojis.push('🎨')
    if (allText.includes('devops') || allText.includes('infrastructure') || allText.includes('cloud')) emojis.push('☁️')
    if (allText.includes('bot') || allText.includes('automation') || allText.includes('script')) emojis.push('🤖')
    if (allText.includes('education') || allText.includes('learning') || allText.includes('tutorial')) emojis.push('📚')
    if (allText.includes('open source') || allText.includes('community') || allText.includes('collaboration')) emojis.push('🌱')
    
    return emojis.length ? emojis : ['💻', '⚡', '🚀']
  }

  // Get tech emojis based on most used languages
  const getTechEmojis = (): string[] => {
    const languageCounts: Record<string, number> = {}
    repositories.forEach(repo => {
      if (repo.language && !repo.fork) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    })
    
    const topLanguages = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([lang]) => languageEmojis[lang] || '💻')
    
    return topLanguages.length ? topLanguages : ['💻', '⚡', '🔧']
  }

  // Fun fact emojis based on profile
  const getFunFactEmojis = (): string[] => {
    const facts: string[] = []
    
    const yearJoined = new Date(user.created_at).getFullYear()
    const currentYear = new Date().getFullYear()
    const yearsActive = currentYear - yearJoined
    
    if (yearsActive >= 10) facts.push('🦴') // Veteran
    if (yearsActive >= 5) facts.push('🏆') // Experienced
    if (user.public_repos === 0) facts.push('🌱') // New to coding
    if (user.public_gists > 50) facts.push('📝') // Loves sharing snippets
    if (user.followers > user.following * 2) facts.push('🌟') // More popular than following
    if (user.following > user.followers * 2) facts.push('🤝') // Very social
    if (user.public_repos > 200) facts.push('🔥') // Super active
    
    // Day of week joined
    const joinedDay = new Date(user.created_at).getDay()
    const dayEmojis = ['☀️', '🌙', '🔥', '💎', '⚡', '🎉', '🌟']
    facts.push(dayEmojis[joinedDay])
    
    return facts
  }

  // Header emoji based on time and personality
  const getHeaderEmoji = (): string => {
    const hour = new Date().getHours()
    const personalityEmojis = getPersonalityEmojis()
    
    if (hour < 6) return '🌙' // Late night coder
    if (hour < 12) return '🌅' // Morning person
    if (hour < 18) return '☀️' // Day time
    if (hour < 22) return '🌇' // Evening
    return personalityEmojis[0] || '🚀'
  }

  // GIF URLs based on profile
  const getGreetingGif = (): string => {
    const gifs = [
      'https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif', // Waving hand
      'https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif', // Hello computer
      'https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif', // Coding
      'https://media.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif', // Waving
      'https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif', // Matrix
    ]
    
    // Select based on user ID for consistency
    return gifs[user.id % gifs.length]
  }

  const getWorkingGif = (): string => {
    const gifs = [
      'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif', // Typing fast
      'https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif', // Coding
      'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif', // Developer
      'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', // Hacker typing
      'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif', // Cat typing
    ]
    
    return gifs[user.id % gifs.length]
  }

  // Generate dynamic greeting based on time
  const getGreeting = (): string => {
    const hour = new Date().getHours()
    const name = user.name || user.login
    
    if (hour < 6) return `🌙 Late night coding? Hi, I'm ${name}!`
    if (hour < 12) return `🌅 Good morning! I'm ${name}`
    if (hour < 18) return `☀️ Hello there! I'm ${name}`
    if (hour < 22) return `🌇 Good evening! I'm ${name}`
    return `🚀 Hi there! I'm ${name}`
  }

  // Generate personality description
  const getPersonalityDescription = (): string => {
    const totalRepos = repositories.length
    const languages = repositories.map(repo => repo.language).filter(Boolean)
    const uniqueLanguages = Array.from(new Set(languages))
    
    if (totalRepos > 50) {
      return "🚀 Prolific developer with a passion for building amazing things. I love exploring new technologies and sharing knowledge with the community."
    } else if (totalRepos > 20) {
      return "💻 Full-stack developer who enjoys creating innovative solutions. Always learning and contributing to open source projects."
    } else if (totalRepos > 10) {
      return "🌱 Growing developer excited about code and creativity. Building projects and learning something new every day."
    } else {
      return "✨ Aspiring developer on an exciting coding journey. Every commit is a step towards mastering the art of programming."
    }
  }

  // Generate coding status
  const getCodingStatus = (): string => {
    const languages = repositories.map(repo => repo.language).filter(Boolean)
    const topLanguage = languages[0] || 'Code'
    return `💻+Coding+with+${topLanguage}`
  }

  // Generate footer message
  const getFooter = (): string => {
    return `Thanks for visiting my profile! Let's connect and build something amazing together! 🚀`
  }

  return {
    headerEmoji: getHeaderEmoji(),
    locationEmoji: getLocationEmoji(user.location),
    languageEmojis,
    personalityEmojis: getPersonalityEmojis(),
    greetingGif: getGreetingGif(),
    workingGif: getWorkingGif(),
    funFactEmojis: getFunFactEmojis(),
    techEmojis: getTechEmojis(),
    
    // Advanced properties for enhanced README
    greeting: getGreeting(),
    aboutEmoji: '👋', // Placeholder, can be replaced with a more specific emoji
    techEmoji: '⚙️', // Placeholder, can be replaced with a more specific emoji
    badgeEmoji: '🏆', // Placeholder, can be replaced with a more specific emoji
    statsEmoji: '📊', // Placeholder, can be replaced with a more specific emoji
    streakEmoji: '⚡', // Placeholder, can be replaced with a more specific emoji
    activityEmoji: '🎉', // Placeholder, can be replaced with a more specific emoji
    trophyEmoji: '🏆', // Placeholder, can be replaced with a more specific emoji
    repoEmoji: '📦', // Placeholder, can be replaced with a more specific emoji
    socialEmoji: '🤝', // Placeholder, can be replaced with a more specific emoji
    funEmoji: '🎮', // Placeholder, can be replaced with a more specific emoji
    jokeEmoji: '😄', // Placeholder, can be replaced with a more specific emoji
    connectEmoji: '🔗', // Placeholder, can be replaced with a more specific emoji
    footer: getFooter(),
    personalityDescription: getPersonalityDescription(),
    codingStatus: getCodingStatus()
  }
}

export function generateRandomQuote(): string {
  const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "In order to be irreplaceable, one must always be different.",
    "Java is to JavaScript what car is to Carpet.",
    "Programming isn't about what you know; it's about what you can figure out.",
    "The best method for accelerating a computer is the one that boosts it by 9.8 m/s².",
    "I'm not a great programmer; I'm just a good programmer with great habits.",
    "Talk is cheap. Show me the code.",
    "It's not a bug – it's an undocumented feature.",
    "The most disastrous thing that you can ever learn is your first programming language.",
    "Programming is learned by writing programs.",
    "Simplicity is the ultimate sophistication.",
    "Code never lies, comments sometimes do.",
    "Make it work, make it right, make it fast."
  ]
  
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export function generateJoke(): string {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "How many programmers does it take to change a light bulb? None – it's a hardware problem! 💡",
    "Why do Java developers wear glasses? Because they don't C# 👓",
    "What's a programmer's favorite hangout place? Foo Bar! 🍺",
    "Why did the programmer quit his job? He didn't get arrays! 📊",
    "How do you comfort a JavaScript bug? You console it! 🐞",
    "What did the Java code say to the C code? You've got no class! 😎",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25! 🎃🎄",
    "What's the object-oriented way to become wealthy? Inheritance! 💰",
    "Why did the database administrator leave his wife? She had one-to-many relationships! 💔"
  ]
  
  return jokes[Math.floor(Math.random() * jokes.length)]
} 