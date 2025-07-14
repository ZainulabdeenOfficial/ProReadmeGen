import axios from 'axios'
import { GitHubUser, GitHubRepository, GitHubStats, LanguageStats } from '@/types/github'

const GITHUB_API_BASE = 'https://api.github.com'

// GitHub API client with optional token
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN && {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    })
  }
})

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const response = await githubApi.get(`/users/${username}`)
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(`User "${username}" not found`)
      } else if (error.response.status === 403) {
        const rateLimitRemaining = error.response.headers['x-ratelimit-remaining']
        const rateLimitReset = error.response.headers['x-ratelimit-reset']
        
        if (rateLimitRemaining === '0') {
          const resetTime = new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
          throw new Error(`GitHub API rate limit exceeded. Rate limit resets at ${resetTime}. Consider adding a GitHub token to increase your rate limit from 60 to 5000 requests per hour.`)
        } else {
          throw new Error(`GitHub API access forbidden (403). This might be due to rate limiting or the user profile being private.`)
        }
      } else if (error.response.status >= 500) {
        throw new Error('GitHub API is currently unavailable. Please try again later.')
      }
    }
    
    console.error('GitHub API Error:', error)
    throw new Error('Failed to fetch user data. Please check your connection and try again.')
  }
}

export async function fetchAllUserRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const allRepos: GitHubRepository[] = []
    let page = 1
    const perPage = 100

    while (true) {
      const response = await githubApi.get(`/users/${username}/repos`, {
        params: {
          sort: 'updated',
          direction: 'desc',
          per_page: perPage,
          page: page
        }
      })

      const repos = response.data
      allRepos.push(...repos)

      if (repos.length < perPage) {
        break
      }
      page++
    }

    return allRepos
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        const rateLimitRemaining = error.response.headers['x-ratelimit-remaining']
        if (rateLimitRemaining === '0') {
          throw new Error('GitHub API rate limit exceeded while fetching repositories. Please add a GitHub token or try again later.')
        }
      }
    }
    console.error('Error fetching repositories:', error)
    throw new Error('Failed to fetch repositories')
  }
}

export function getTopRepositories(repositories: GitHubRepository[], limit: number = 6): GitHubRepository[] {
  return repositories
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
}

export async function calculateGitHubStats(username: string): Promise<GitHubStats> {
  try {
    const repositories = await fetchAllUserRepositories(username)
    
    // Calculate basic stats from repositories
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0)
    
    // For more detailed stats, we'd need to make additional API calls
    // These are approximations based on available data
    const stats: GitHubStats = {
      totalCommits: 0, // Would need commits API
      totalPRs: 0, // Would need search API
      totalIssues: 0, // Would need issues API
      totalStars,
      contributedTo: repositories.length
    }

    return stats
  } catch (error) {
    throw new Error('Failed to calculate GitHub stats')
  }
}

export async function calculateLanguageStats(repositories: GitHubRepository[]): Promise<LanguageStats> {
  const languageStats: LanguageStats = {}
  let totalBytes = 0
  
  // Fetch detailed language data for each repository
  for (const repo of repositories.filter(r => !r.fork && r.size > 0)) {
    try {
      const response = await githubApi.get(`/repos/${repo.owner.login}/${repo.name}/languages`)
      const repoLanguages = response.data
      
      // Add up language bytes from this repository
      Object.entries(repoLanguages).forEach(([language, bytes]: [string, any]) => {
        languageStats[language] = (languageStats[language] || 0) + bytes
        totalBytes += bytes
      })
    } catch (error) {
      // Fallback: if API fails, count the primary language
      if (repo.language) {
        const fallbackBytes = repo.size * 1024 // Approximate based on repo size
        languageStats[repo.language] = (languageStats[repo.language] || 0) + fallbackBytes
        totalBytes += fallbackBytes
      }
    }
  }
  
  // Convert bytes to percentages
  const percentageStats: LanguageStats = {}
  Object.entries(languageStats).forEach(([language, bytes]) => {
    percentageStats[language] = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
  })
  
  return percentageStats
}

export function formatUserJoinDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Advanced: Generate GitHub stats with extended theme support
export function generateGitHubStatsImageUrl(username: string, theme: string = 'dark'): string {
  const extendedThemeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox_dark',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark',
    'noctis': 'noctis_minimus',
    'gotham': 'gotham',
    'material': 'material',
    'nord': 'nord',
    'onedark': 'onedark',
    'catppuccin': 'catppuccin_latte',
    'monokai': 'monokai',
    'solarized': 'solarized_dark',
    'ayu': 'ayu_mirage',
    'github': 'github_dark',
    'discord': 'discord_old_blurple',
    'vue': 'vue',
    'chartreuse': 'chartreuse_dark',
    'merko': 'merko',
    'algolia': 'algolia'
  }
  
  const mappedTheme = extendedThemeMap[theme] || 'dark'
  return `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${mappedTheme}&count_private=true&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=ffffff&icon_color=58a6ff&ring_color=58a6ff&include_all_commits=true`
}

// Advanced: Generate language stats with premium styling
export function generateLanguageStatsImageUrl(username: string, theme: string = 'dark'): string {
  const extendedThemeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox_dark',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark',
    'noctis': 'noctis_minimus',
    'gotham': 'gotham',
    'material': 'material',
    'nord': 'nord',
    'onedark': 'onedark',
    'catppuccin': 'catppuccin_latte',
    'monokai': 'monokai',
    'solarized': 'solarized_dark',
    'ayu': 'ayu_mirage',
    'github': 'github_dark',
    'discord': 'discord_old_blurple',
    'vue': 'vue',
    'chartreuse': 'chartreuse_dark',
    'merko': 'merko',
    'algolia': 'algolia'
  }
  
  const mappedTheme = extendedThemeMap[theme] || 'dark'
  
  // Enhanced language stats with better visibility and more languages
  return `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=donut&theme=${mappedTheme}&hide_border=true&langs_count=12&size_weight=0.5&count_weight=0.5&card_width=320&hide=html,css,scss,less`
}

// Advanced: Generate streak stats with enhanced styling
export function generateStreakStatsImageUrl(username: string, theme: string = 'dark'): string {
  const extendedThemeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox_dark',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark',
    'noctis': 'noctis_minimus',
    'gotham': 'gotham',
    'material': 'material',
    'nord': 'nord',
    'onedark': 'onedark',
    'catppuccin': 'catppuccin_latte',
    'monokai': 'monokai',
    'solarized': 'solarized_dark',
    'ayu': 'ayu_mirage',
    'github': 'github_dark',
    'discord': 'discord_old_blurple',
    'vue': 'vue',
    'chartreuse': 'chartreuse_dark',
    'merko': 'merko',
    'algolia': 'algolia'
  }
  
  const mappedTheme = extendedThemeMap[theme] || 'dark'
  return `https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=${mappedTheme}&hide_border=true&background=00000000&fire=ff6b6b&ring=4ecdc4&currStreakLabel=4ecdc4`
}

// Advanced: Generate enhanced typing animation with better emoji support
export function generateEnhancedTypingImageUrl(texts: string[], theme: string = 'dark'): string {
  const themeColors: { [key: string]: string } = {
    'dark': '58a6ff',
    'light': '0969da',
    'tokyonight': '7aa2f7',
    'radical': 'fe428e',
    'dracula': 'ff79c6',
    'gruvbox': 'fabd2f',
    'cobalt': '1f9ede',
    'synthwave': 'ff6ac1',
    'highcontrast': 'ffffff',
    'ocean': '409eff',
    'noctis': '8a9db8',
    'gotham': '599cab',
    'material': '89ddff',
    'nord': '81a1c1',
    'onedark': '61afef',
    'catppuccin': '8aadf4',
    'monokai': 'a6e22e',
    'solarized': '268bd2',
    'ayu': 'ffcc66',
    'github': '58a6ff',
    'discord': '5865f2',
    'vue': '4fc08d',
    'chartreuse': '7fff00',
    'merko': 'abd200',
    'algolia': '5468ff'
  }
  
  const color = themeColors[theme] || '58a6ff'
  const encodedTexts = texts.join(';').replace(/\s+/g, '+')
  
  return `https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=4000&pause=1000&color=${color}&width=600&lines=${encodedTexts}&center=true&vCenter=true&multiline=false&repeat=true`
}

// Advanced: Generate profile banner with custom styling
export function generateProfileBannerUrl(username: string, theme: string = 'dark', customText?: string): string {
  const themeColors: { [key: string]: string } = {
    'dark': '0d1117',
    'light': 'ffffff',
    'tokyonight': '1a1b27',
    'radical': '141321',
    'dracula': '282a36',
    'gruvbox': '1d2021',
    'cobalt': '193549',
    'synthwave': '2d1b69',
    'highcontrast': '000000',
    'ocean': '0e1419'
  }
  
  const bgColor = themeColors[theme] || '0d1117'
  const text = customText || `Welcome to ${username}'s Profile`
  
  return `https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=${encodeURIComponent(text)}&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Developer%20%26%20Creator&descAlignY=60&descAlign=50`
}

// Advanced: Generate repository cards with themes
export function generateRepoCardUrl(username: string, repo: string, theme: string = 'dark'): string {
  const extendedThemeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox_dark',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark',
    'noctis': 'noctis_minimus',
    'gotham': 'gotham',
    'material': 'material',
    'nord': 'nord',
    'onedark': 'onedark',
    'catppuccin': 'catppuccin_latte',
    'monokai': 'monokai',
    'solarized': 'solarized_dark',
    'ayu': 'ayu_mirage',
    'github': 'github_dark',
    'discord': 'discord_old_blurple',
    'vue': 'vue',
    'chartreuse': 'chartreuse_dark',
    'merko': 'merko',
    'algolia': 'algolia'
  }
  
  const mappedTheme = extendedThemeMap[theme] || 'dark'
  return `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}&theme=${mappedTheme}&hide_border=true&bg_color=00000000&show_owner=true`
}

// Advanced: Generate 3D contribution calendar with fallback options
export function generate3DContributionUrl(username: string, theme: string = 'dark'): string {
  const themeColors: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'light',
    'tokyonight': 'blue',
    'radical': 'pink',
    'dracula': 'purple',
    'gruvbox': 'yellow',
    'cobalt': 'blue',
    'synthwave': 'pink',
    'highcontrast': 'black',
    'ocean': 'blue',
    'noctis': 'blue',
    'gotham': 'dark',
    'material': 'blue',
    'nord': 'blue',
    'onedark': 'dark'
  }
  
  const calendarTheme = themeColors[theme] || 'dark'
  const currentYear = new Date().getFullYear()
  
  // Primary service - skyline contribution graph (more reliable)
  return `https://skyline.github.com/${username}/${currentYear}.png`
}

// Alternative 3D contribution services
export function generateAlternative3DContributionUrl(username: string, theme: string = 'dark'): string {
  const themeColors: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'light',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave'
  }
  
  const calendarTheme = themeColors[theme] || 'dark'
  // Alternative service using contribution graph
  return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=00000000&color=58a6ff&line=58a6ff&point=58a6ff&area=true&hide_border=true&theme=${calendarTheme}`
}

// Enhanced metrics with multiple options
export function generateAdvancedMetricsUrl(username: string, theme: string = 'dark'): string {
  const themeParam = theme === 'light' ? 'light' : 'dark'
  return `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=${themeParam}`
}

// Comprehensive GitHub statistics
export function generateComprehensiveStatsUrl(username: string, theme: string = 'dark'): string {
  return `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&theme=${theme}&include_all_commits=true&hide_border=true&bg_color=00000000&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&line_height=27&custom_title=📊%20Comprehensive%20GitHub%20Statistics`
}

// Advanced: Generate coding time widget
export function generateCodingTimeWidget(username: string, theme: string = 'dark'): string {
  const themeColors: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'light',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean'
  }
  
  const widgetTheme = themeColors[theme] || 'dark'
  return `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&theme=${widgetTheme}&layout=compact&hide_border=true&bg_color=00000000`
}

export function generateTrophyImageUrl(username: string, theme: string = 'dark'): string {
  const params = new URLSearchParams({
    username,
    theme,
    'no-frame': 'true',
    'margin-w': '15',
    'margin-h': '15',
    'column': '7',
    'row': '2'
  })
  return `https://github-profile-trophy.vercel.app/?${params.toString()}`
}

export function generateActivityGraphImageUrl(username: string, theme: string = 'tokyo-night'): string {
  const params = new URLSearchParams({
    username,
    theme,
    hide_border: 'true',
    area: 'true',
    custom_title: 'Contribution Activity Graph'
  })
  return `https://github-readme-activity-graph.vercel.app/graph?${params.toString()}`
}

export function generateVisitorCountImageUrl(username: string): string {
  const params = new URLSearchParams({
    username,
    label: 'Profile%20views',
    color: '0e75b6',
    style: 'flat-square',
    labelColor: '1c1917'
  })
  return `https://komarev.com/ghpvc/?${params.toString()}`
}

export function generateTypingImageUrl(text: string): string {
  const encodedText = encodeURIComponent(text)
  return `https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=4000&pause=1000&color=00D8FF&width=435&lines=${encodedText}`
}

// Advanced: Generate contribution calendar with custom theme
export function generateContributionCalendarUrl(username: string, theme: string = 'dark'): string {
  const themeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default',
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox_dark',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark'
  }
  return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${themeMap[theme] || 'dark'}&area=true&hide_border=true&custom_title=Contribution Calendar`
}

// Enhanced: Generate snake contribution graph with multiple reliable services
export function generateSnakeContributionUrl(username: string, theme: string = 'dark'): string {
  const themeColors: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'github-light', 
    'tokyonight': 'github-dark-blue',
    'radical': 'radical',
    'dracula': 'github-dark-green',
    'gruvbox': 'github-dark-dimmed',
    'cobalt': 'github-dark-blue',
    'synthwave': 'radical',
    'highcontrast': 'github-dark',
    'ocean': 'ocean_dark'
  }
  
  const snakeTheme = themeColors[theme] || 'dark'
  
  // Use the most reliable snake animation service
  return `https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake-dark.svg`
}

// Alternative snake animation with theme support
export function generateAlternativeSnakeUrl(username: string, theme: string = 'dark'): string {
  // Create query parameters for snake animation
  const params = new URLSearchParams({
    username: username,
    background_color: theme === 'light' ? 'ffffff' : '0d1117',
    color: theme === 'light' ? '216e39' : '9be9a8',
    dot_color: theme === 'light' ? '1f6feb' : '58a6ff',
    line_color: theme === 'light' ? '1f6feb' : '7c3aed'
  })
  
  return `https://raw.githubusercontent.com/BEPb/BEPb/output/github-contribution-grid-snake.svg?${params.toString()}`
}

// Backup snake animation URL for fallback
export function generateSnakeAnimationBackup(username: string, theme: string = 'dark'): string {
  return `https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg`
}

// Enhanced: Generate proper tech stack with improved language mapping
export function generateTechStackUrl(languages: string[], theme: string = 'dark'): string {
  // Enhanced language to icon mapping with more comprehensive coverage
  const iconMap: { [key: string]: string } = {
    // Core Programming Languages
    'JavaScript': 'js',
    'TypeScript': 'ts',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cpp',
    'C#': 'cs',
    'C': 'c',
    'Go': 'go',
    'Rust': 'rust',
    'PHP': 'php',
    'Ruby': 'ruby',
    'Swift': 'swift',
    'Kotlin': 'kotlin',
    'Dart': 'dart',
    'Scala': 'scala',
    'R': 'r',
    'MATLAB': 'matlab',
    'Perl': 'perl',
    'Lua': 'lua',
    'Haskell': 'haskell',
    'Elixir': 'elixir',
    'Clojure': 'clojure',
    'F#': 'fsharp',
    'Objective-C': 'objectivec',
    'Assembly': 'asm',
    
    // Web Technologies
    'HTML': 'html',
    'CSS': 'css',
    'Sass': 'sass',
    'SCSS': 'sass',
    'Less': 'less',
    'Stylus': 'stylus',
    'PostCSS': 'postcss',
    
    // Frontend Frameworks
    'Vue': 'vuejs',
    'React': 'react',
    'Angular': 'angular',
    'Svelte': 'svelte',
    'Alpine.js': 'alpinejs',
    'Ember.js': 'ember',
    
    // Backend & Runtime
    'Node.js': 'nodejs',
    'Next.js': 'nextjs',
    'Nuxt.js': 'nuxtjs',
    'Express': 'express',
    'Fastify': 'fastify',
    'Nest.js': 'nestjs',
    'Django': 'django',
    'Flask': 'flask',
    'FastAPI': 'fastapi',
    'Spring': 'spring',
    'Laravel': 'laravel',
    'CodeIgniter': 'codeigniter',
    'Symfony': 'symfony',
    'Rails': 'rails',
    'Sinatra': 'sinatra',
    
    // DevOps & Cloud
    'Docker': 'docker',
    'Kubernetes': 'kubernetes',
    'AWS': 'aws',
    'Azure': 'azure',
    'GCP': 'gcp',
    'Firebase': 'firebase',
    'Heroku': 'heroku',
    'Vercel': 'vercel',
    'Netlify': 'netlify',
    'DigitalOcean': 'digitalocean',
    
    // Databases
    'MongoDB': 'mongodb',
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'SQLite': 'sqlite',
    'Redis': 'redis',
    'DynamoDB': 'dynamodb',
    'Cassandra': 'cassandra',
    'Neo4j': 'neo4j',
    
    // Tools & Editors
    'Git': 'git',
    'GitHub': 'github',
    'GitLab': 'gitlab',
    'Bitbucket': 'bitbucket',
    'VS Code': 'vscode',
    'Vim': 'vim',
    'WebStorm': 'webstorm',
    'IntelliJ': 'idea',
    'Eclipse': 'eclipse',
    'Atom': 'atom',
    'Sublime': 'sublime',
    'Figma': 'figma',
    'Adobe XD': 'xd',
    'Photoshop': 'photoshop',
    'Illustrator': 'illustrator',
    
    // Operating Systems
    'Linux': 'linux',
    'Ubuntu': 'ubuntu',
    'CentOS': 'centos',
    'Debian': 'debian',
    'Windows': 'windows',
    'macOS': 'apple',
    
    // Mobile Development
    'Flutter': 'flutter',
    'React Native': 'react',
    'Xamarin': 'xamarin',
    'Ionic': 'ionic',
    
    // Data & ML
    'Jupyter': 'jupyter',
    'Pandas': 'pandas',
    'NumPy': 'numpy',
    'TensorFlow': 'tensorflow',
    'PyTorch': 'pytorch',
    'Scikit-learn': 'sklearn',
    
    // Build Tools & Package Managers
    'Webpack': 'webpack',
    'Vite': 'vite',
    'Rollup': 'rollup',
    'Parcel': 'parcel',
    'npm': 'npm',
    'Yarn': 'yarn',
    'pnpm': 'pnpm',
    'Maven': 'maven',
    'Gradle': 'gradle',
    'Composer': 'composer',
    'pip': 'python',
    
    // Testing
    'Jest': 'jest',
    'Cypress': 'cypress',
    'Selenium': 'selenium',
    'Playwright': 'playwright',
    
    // Common GitHub repository languages
    'Jupyter Notebook': 'jupyter',
    'Shell': 'bash',
    'PowerShell': 'powershell',
    'Dockerfile': 'docker',
    'Makefile': 'make',
    'CMake': 'cmake',
    'YAML': 'yaml',
    'JSON': 'json',
    'XML': 'xml',
    'Markdown': 'markdown',
    'TeX': 'latex',
    'NSIS': 'windows',
    'Batchfile': 'windows',
    'Vim script': 'vim',
    'Emacs Lisp': 'emacs'
  }
  
  // Get icons for languages, limit to top 12 for better display
  const icons = languages.slice(0, 12).map(lang => {
    // First try exact match
    if (iconMap[lang]) {
      return iconMap[lang]
    }
    
    // Try case-insensitive match
    const lowerLang = lang.toLowerCase()
    const matchedKey = Object.keys(iconMap).find(key => key.toLowerCase() === lowerLang)
    if (matchedKey) {
      return iconMap[matchedKey]
    }
    
    // Try partial match for compound names
    const partialMatch = Object.keys(iconMap).find(key => 
      key.toLowerCase().includes(lowerLang) || lowerLang.includes(key.toLowerCase())
    )
    if (partialMatch) {
      return iconMap[partialMatch]
    }
    
    // Fallback: clean the language name
    return lang.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
      .replace(/notebook$/, '')
      .replace(/script$/, '')
  }).filter(icon => icon && icon.length > 0) // Remove empty icons
  
  // Ensure we have at least some icons, add common ones if none found
  if (icons.length === 0) {
    icons.push('js', 'html', 'css', 'git')
  }
  
     const uniqueIcons = Array.from(new Set(icons)) // Remove duplicates
  const iconString = uniqueIcons.slice(0, 16).join(',') // Limit to 16 icons max
  
  const themeParam = theme === 'light' ? 'light' : 'dark'
  return `https://skillicons.dev/icons?i=${iconString}&theme=${themeParam}&perline=8`
}

// Advanced: Generate coding time stats
export function generateCodingTimeUrl(username: string): string {
  return `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=00000000`
}

// Advanced: Generate Spotify widget with enhanced styling
export function generateSpotifyWidget(username: string = 'YOUR_SPOTIFY_USERNAME'): string {
  return `https://spotify-github-profile.vercel.app/api/spotify?background_color=0d1117&border_color=ffffff&scan=true&theme=default&rainbow=false`
}

export function generateSpotifyUrl(): string {
  return generateSpotifyWidget()
}

// Advanced: Generate weather widget
export function generateWeatherUrl(location: string): string {
  if (!location) return ''
  const encodedLocation = encodeURIComponent(location)
  return `https://wttr.in/${encodedLocation}.png?0&theme=dark&format=3`
}

// Advanced: Generate profile views URL with enhanced styling
export function generateProfileViewsUrl(username: string): string {
  return `https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat-square&labelColor=1c1917`
}

// Advanced: Generate custom shields/badges with enhanced emoji support
export function generateCustomBadges(user: GitHubUser): string[] {
  const badges = [
    `https://img.shields.io/github/followers/${user.login}?style=for-the-badge&logo=github&logoColor=white&labelColor=101010&color=blue&label=👥%20Followers`,
    `https://img.shields.io/github/stars/${user.login}?affiliations=OWNER&style=for-the-badge&logo=github&logoColor=white&labelColor=101010&color=yellow&label=⭐%20Stars`,
    `https://img.shields.io/badge/📅%20Since-${new Date(user.created_at).getFullYear()}-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=101010`,
  ]
  
  if (user.public_repos) {
    badges.push(`https://img.shields.io/badge/📁%20Repos-${user.public_repos}-orange?style=for-the-badge&logo=github&logoColor=white&labelColor=101010`)
  }
  
  if (user.company) {
    const company = user.company.replace('@', '').replace(/\s+/g, '%20')
    badges.push(`https://img.shields.io/badge/🏢%20Company-${encodeURIComponent(company)}-green?style=for-the-badge&logo=building&logoColor=white&labelColor=101010`)
  }
  
  if (user.location) {
    const location = user.location.replace(/\s+/g, '%20')
    badges.push(`https://img.shields.io/badge/📍%20Location-${encodeURIComponent(location)}-red?style=for-the-badge&logo=map-pin&logoColor=white&labelColor=101010`)
  }
  
  if (user.public_gists > 0) {
    badges.push(`https://img.shields.io/badge/📝%20Gists-${user.public_gists}-purple?style=for-the-badge&logo=github-gist&logoColor=white&labelColor=101010`)
  }
  
  return badges
}

// Advanced: Generate GitHub metrics with enhanced emoji and language support
export function generateGitHubMetricsUrl(username: string, theme: string = 'dark'): string {
  // Map themes to supported values
  const themeMap: { [key: string]: string } = {
    'dark': 'dark',
    'light': 'default', 
    'tokyonight': 'tokyonight',
    'radical': 'radical',
    'dracula': 'dracula',
    'gruvbox': 'gruvbox',
    'cobalt': 'cobalt',
    'synthwave': 'synthwave',
    'highcontrast': 'highcontrast',
    'ocean': 'ocean_dark',
    'noctis': 'noctis_minimus',
    'gotham': 'gotham',
    'material': 'material-palenight',
    'nord': 'nord',
    'onedark': 'onedark'
  }
  
  const selectedTheme = themeMap[theme] || 'dark'
  
  // Enhanced GitHub stats with comprehensive metrics
  return `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true&theme=${selectedTheme}&include_all_commits=true&line_height=21&hide_border=true&title_color=58A6FF&icon_color=1F6FEB&text_color=C9D1D9&bg_color=0D1117`
}

// Advanced: Fetch recent commits across all repositories with enhanced error handling
export async function fetchRecentCommits(username: string, limit: number = 10): Promise<any[]> {
  try {
    const eventsResponse = await githubApi.get(`/users/${username}/events/public`)
    const commitEvents = eventsResponse.data
      .filter((event: any) => event.type === 'PushEvent')
      .slice(0, limit)
      .map((event: any) => ({
        repo: event.repo.name,
        message: event.payload.commits[0]?.message || 'Initial commit',
        date: event.created_at,
        sha: event.payload.commits[0]?.sha.substring(0, 7) || 'unknown',
        url: `https://github.com/${event.repo.name}/commit/${event.payload.commits[0]?.sha || ''}`
      }))
    return commitEvents
  } catch (error) {
    console.error('Error fetching recent commits:', error)
    return []
  }
}

// Advanced: Fetch pull request statistics with enhanced error handling
export async function fetchPullRequestStats(username: string): Promise<any> {
  try {
    const searchResponse = await githubApi.get(`/search/issues?q=author:${username}+type:pr`)
    const prs = searchResponse.data.items
    
    const merged = prs.filter((pr: any) => pr.state === 'closed' && pr.pull_request?.merged_at).length
    const open = prs.filter((pr: any) => pr.state === 'open').length
    const closed = prs.filter((pr: any) => pr.state === 'closed' && !pr.pull_request?.merged_at).length
    
    return {
      total: prs.length,
      merged,
      open,
      closed
    }
  } catch (error) {
    console.error('Error fetching PR stats:', error)
    return { total: 0, merged: 0, open: 0, closed: 0 }
  }
}

// Advanced: Fetch issue statistics with enhanced error handling
export async function fetchIssueStats(username: string): Promise<any> {
  try {
    const searchResponse = await githubApi.get(`/search/issues?q=author:${username}+type:issue`)
    const issues = searchResponse.data.items
    
    const open = issues.filter((issue: any) => issue.state === 'open').length
    const closed = issues.filter((issue: any) => issue.state === 'closed').length
    
    return {
      total: issues.length,
      open,
      closed
    }
  } catch (error) {
    console.error('Error fetching issue stats:', error)
    return { total: 0, open: 0, closed: 0 }
  }
}

// Advanced: Fetch user gists with enhanced error handling
export async function fetchUserGists(username: string): Promise<any[]> {
  try {
    const gistsResponse = await githubApi.get(`/users/${username}/gists`)
    return gistsResponse.data.slice(0, 5).map((gist: any) => ({
      id: gist.id,
      description: gist.description || 'No description',
      url: gist.html_url,
      files: Object.keys(gist.files).length,
      public: gist.public,
      created_at: gist.created_at
    }))
  } catch (error) {
    console.error('Error fetching gists:', error)
    return []
  }
}

// Advanced: Calculate detailed activity stats with enhanced error handling
export async function calculateAdvancedStats(username: string): Promise<any> {
  try {
    const repos = await fetchAllUserRepositories(username)
    const commits = await fetchRecentCommits(username, 100)
    const prStats = await fetchPullRequestStats(username)
    const issueStats = await fetchIssueStats(username)
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0)
    const totalIssues = repos.reduce((sum, repo) => sum + repo.open_issues_count, 0)
    
    // Calculate commit frequency
    const now = new Date()
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const recentCommits = commits.filter(commit => new Date(commit.date) > lastWeek)
    
    // Calculate total contributions estimate
    const totalContributions = commits.length + (prStats?.total || 0) + (issueStats?.total || 0) + repos.length

    return {
      totalRepositories: repos.length,
      totalStars,
      totalForks,
      totalIssues,
      totalCommits: commits.length,
      totalContributions,
      recentCommits: recentCommits.length,
      pullRequests: prStats,
      issues: issueStats,
      languages: await calculateLanguageStats(repos)
    }
  } catch (error) {
    console.error('Error calculating advanced stats:', error)
    return null
  }
} 

// NEW: Detect real frameworks and tools from user repositories
export async function detectFrameworksAndTools(repositories: GitHubRepository[]): Promise<{
  frameworks: string[],
  tools: string[],
  databases: string[],
  cloud: string[]
}> {
  const frameworks = new Set<string>()
  const tools = new Set<string>()
  const databases = new Set<string>()
  const cloud = new Set<string>()

  // Analyze each repository for real frameworks and tools (limit to top 20 for performance)
  const reposToAnalyze = repositories
    .filter(r => !r.fork && r.size > 0) // Filter out forks and empty repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars (most popular first)
    .slice(0, 20) // Limit to top 20 repositories
    
  for (const repo of reposToAnalyze) {
    try {
      // Get repository contents to analyze package files
      const contentsResponse = await githubApi.get(`/repos/${repo.owner.login}/${repo.name}/contents`)
      const files = contentsResponse.data.map((file: any) => file.name.toLowerCase())
      
      // Detect frameworks from package.json (JavaScript/Node.js)
      if (files.includes('package.json')) {
        try {
          const packageResponse = await githubApi.get(`/repos/${repo.owner.login}/${repo.name}/contents/package.json`)
          const packageContent = JSON.parse(Buffer.from(packageResponse.data.content, 'base64').toString())
          
          const dependencies = { ...packageContent.dependencies, ...packageContent.devDependencies }
          
          // Frontend Frameworks
          if (dependencies.react) frameworks.add('React')
          if (dependencies.vue || dependencies['vue-cli']) frameworks.add('Vue.js')
          if (dependencies['@angular/core']) frameworks.add('Angular')
          if (dependencies.svelte) frameworks.add('Svelte')
          if (dependencies.next) frameworks.add('Next.js')
          if (dependencies.nuxt) frameworks.add('Nuxt.js')
          if (dependencies.gatsby) frameworks.add('Gatsby')
          
          // Backend Frameworks
          if (dependencies.express) frameworks.add('Express.js')
          if (dependencies.fastify) frameworks.add('Fastify')
          if (dependencies['@nestjs/core']) frameworks.add('NestJS')
          if (dependencies.koa) frameworks.add('Koa')
          if (dependencies.hapi) frameworks.add('Hapi')
          
          // Tools
          if (dependencies.webpack) tools.add('Webpack')
          if (dependencies.vite) tools.add('Vite')
          if (dependencies.eslint) tools.add('ESLint')
          if (dependencies.prettier) tools.add('Prettier')
          if (dependencies.jest) tools.add('Jest')
          if (dependencies.cypress) tools.add('Cypress')
          if (dependencies.playwright) tools.add('Playwright')
          if (dependencies.storybook) tools.add('Storybook')
          
          // Databases & ORMs
          if (dependencies.mongoose || dependencies.mongodb) databases.add('MongoDB')
          if (dependencies.sequelize || dependencies.mysql2) databases.add('MySQL')
          if (dependencies.pg || dependencies['node-postgres']) databases.add('PostgreSQL')
          if (dependencies.redis) databases.add('Redis')
          if (dependencies.prisma) tools.add('Prisma')
          if (dependencies.typeorm) tools.add('TypeORM')
        } catch (error) {
          console.log('Error parsing package.json for', repo.name)
        }
      }
      
      // Detect Python frameworks from requirements.txt
      if (files.includes('requirements.txt')) {
        try {
          const requirementsResponse = await githubApi.get(`/repos/${repo.owner.login}/${repo.name}/contents/requirements.txt`)
          const requirements = Buffer.from(requirementsResponse.data.content, 'base64').toString().toLowerCase()
          
          if (requirements.includes('django')) frameworks.add('Django')
          if (requirements.includes('flask')) frameworks.add('Flask')
          if (requirements.includes('fastapi')) frameworks.add('FastAPI')
          if (requirements.includes('tornado')) frameworks.add('Tornado')
          if (requirements.includes('pyramid')) frameworks.add('Pyramid')
          if (requirements.includes('pandas')) tools.add('Pandas')
          if (requirements.includes('numpy')) tools.add('NumPy')
          if (requirements.includes('tensorflow')) tools.add('TensorFlow')
          if (requirements.includes('pytorch')) tools.add('PyTorch')
          if (requirements.includes('scikit-learn')) tools.add('Scikit-learn')
        } catch (error) {
          console.log('Error parsing requirements.txt for', repo.name)
        }
      }
      
      // Detect from file presence
      if (files.includes('dockerfile') || files.includes('docker-compose.yml')) tools.add('Docker')
      if (files.includes('.github/workflows') || files.some((f: string) => f.includes('.yml'))) tools.add('GitHub Actions')
      if (files.includes('kubernetes') || files.some((f: string) => f.includes('k8s'))) tools.add('Kubernetes')
      if (files.includes('terraform')) tools.add('Terraform')
      if (files.includes('ansible')) tools.add('Ansible')
      
      // Detect from repository language
      if (repo.language) {
        switch (repo.language.toLowerCase()) {
          case 'go':
            if (repo.description?.toLowerCase().includes('gin')) frameworks.add('Gin')
            if (repo.description?.toLowerCase().includes('echo')) frameworks.add('Echo')
            if (repo.description?.toLowerCase().includes('fiber')) frameworks.add('Fiber')
            break
          case 'java':
            if (repo.description?.toLowerCase().includes('spring')) frameworks.add('Spring Boot')
            if (repo.description?.toLowerCase().includes('maven')) tools.add('Maven')
            if (repo.description?.toLowerCase().includes('gradle')) tools.add('Gradle')
            break
          case 'c#':
            if (repo.description?.toLowerCase().includes('asp.net')) frameworks.add('ASP.NET')
            if (repo.description?.toLowerCase().includes('.net')) frameworks.add('.NET')
            break
          case 'php':
            if (repo.description?.toLowerCase().includes('laravel')) frameworks.add('Laravel')
            if (repo.description?.toLowerCase().includes('symfony')) frameworks.add('Symfony')
            if (repo.description?.toLowerCase().includes('codeigniter')) frameworks.add('CodeIgniter')
            break
          case 'ruby':
            if (repo.description?.toLowerCase().includes('rails')) frameworks.add('Ruby on Rails')
            if (repo.description?.toLowerCase().includes('sinatra')) frameworks.add('Sinatra')
            break
        }
      }
      
      // Detect cloud services from descriptions and topics
      const fullText = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase()
      
      if (fullText.includes('aws') || fullText.includes('amazon')) cloud.add('AWS')
      if (fullText.includes('azure') || fullText.includes('microsoft')) cloud.add('Azure')
      if (fullText.includes('gcp') || fullText.includes('google cloud')) cloud.add('Google Cloud')
      if (fullText.includes('firebase')) cloud.add('Firebase')
      if (fullText.includes('vercel')) cloud.add('Vercel')
      if (fullText.includes('netlify')) cloud.add('Netlify')
      if (fullText.includes('heroku')) cloud.add('Heroku')
      if (fullText.includes('digitalocean')) cloud.add('DigitalOcean')
      
    } catch (error) {
      console.log(`Error analyzing repository ${repo.name}:`, error)
    }
  }
  
  // Always add common tools that every developer uses
  tools.add('Git')
  tools.add('VS Code')
  
  // Add fallback frameworks based on detected languages if none were found
  if (frameworks.size === 0) {
    const detectedLanguages = repositories.map(r => r.language).filter(Boolean)
    if (detectedLanguages.includes('JavaScript') || detectedLanguages.includes('TypeScript')) {
      frameworks.add('React') // Most popular JS framework
      frameworks.add('Node.js')
    }
    if (detectedLanguages.includes('Python')) {
      frameworks.add('Django')
      frameworks.add('Flask')
    }
    if (detectedLanguages.includes('Java')) {
      frameworks.add('Spring Boot')
    }
    if (detectedLanguages.includes('C#')) {
      frameworks.add('.NET')
    }
  }
  
  return {
    frameworks: Array.from(frameworks).slice(0, 8), // Top 8 frameworks
    tools: Array.from(tools).slice(0, 8), // Top 8 tools  
    databases: Array.from(databases).slice(0, 6), // Top 6 databases
    cloud: Array.from(cloud).slice(0, 6) // Top 6 cloud services
  }
} 