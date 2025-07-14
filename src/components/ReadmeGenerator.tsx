'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Settings, Loader, Code, Star, Zap, Activity, Music, Award, Users, Link2, Github } from 'lucide-react'
// @ts-ignore
import toast from 'react-hot-toast'
import { GitHubUser } from '@/types/github'
import { 
  fetchAllUserRepositories, 
  getTopRepositories, 
  calculateLanguageStats,
  generateGitHubStatsImageUrl,
  generateAlternativeGitHubStatsUrl,
  generateGitHubStatsAlternative2,
  generateLanguageStatsImageUrl,
  generateStreakStatsImageUrl,
  generateAlternativeStreakStatsUrl,
  generateStreakStatsBackup,
  generateTrophyImageUrl,
  generateAlternativeTrophyUrl,
  generateTrophyBackupUrl,
  generateActivityGraphImageUrl,
  generateVisitorCountImageUrl,
  generateTypingImageUrl,
  generateContributionCalendarUrl,
  generateTechStackUrl,
  generateCustomBadges,
  generateSpotifyUrl,
  generateWeatherUrl,
  generateProfileViewsUrl,
  generateGitHubMetricsUrl,
  fetchRecentCommits,
  calculateAdvancedStats,
  formatUserJoinDate,
  generateProfileBannerUrl,
  generateEnhancedTypingImageUrl,
  generateAlternativeTypingImageUrl,
  generateTypingImageBackup,
  generate3DContributionUrl,
  generateAlternative3DContributionUrl,
  generateAdvancedMetricsUrl,
  generateComprehensiveStatsUrl,
  generateCodingTimeWidget,
  generateSnakeContributionUrl,
  generateAlternativeSnakeUrl,
  generateSnakeAnimationBackup,
  detectFrameworksAndTools
} from '@/lib/github'

// Utility function to escape URLs for XML/HTML context
function escapeUrlForXml(url: string): string {
  return url.replace(/&/g, '&amp;')
}
import { generateDynamicEmojis, generateRandomQuote, generateJoke } from '@/lib/emojiGenerator'
import { getRandomQuote } from '@/lib/quotes'
import { getFollowersReadmeSection } from './RecentFollowers'
import AdvancedStats from './AdvancedStats'
import TechStack from './TechStack'
import SocialWidgets from './SocialWidgets'

interface ReadmeGeneratorProps {
  user: GitHubUser
  onReadmeGenerated: (content: string) => void
}

interface SocialLinks {
  linkedin: string
  twitter: string
  discord: string
  youtube: string
  instagram: string
  website: string
  portfolio: string
  blog: string
  email: string
  telegram: string
}

interface GeneratorConfig {
  includeStats: boolean
  includeLanguages: boolean
  includeStreaks: boolean
  includeTrophies: boolean
  includeActivity: boolean
  includeTopRepos: boolean
  includeVisitorCount: boolean
  includeTypingAnimation: boolean
  includeSnakeAnimation: boolean
  includeBadges: boolean
  includeQuotes: boolean
  includeAdvancedStats: boolean
  includeTechStack: boolean
  includeSocialWidgets: boolean
  includeContributionGraph: boolean
  includeRecentCommits: boolean
  includeGitHubMetrics: boolean
  include3DContributions: boolean
  includeCodingTime: boolean
  includeProfileBanner: boolean
  includeAnimatedGifs: boolean
  includeWaveAnimation: boolean
  includeFireAnimation: boolean
  includeProgrammingQuotes: boolean
  includeSpotifyPlaylists: boolean
  includeCustomGifs: boolean
  includeRecentVisitors: boolean
  theme: 'dark' | 'light' | 'tokyonight' | 'radical' | 'dracula' | 'gruvbox' | 'cobalt' | 'synthwave' | 'highcontrast' | 'ocean' | 'noctis' | 'gotham' | 'material' | 'nord' | 'onedark' | 'catppuccin' | 'monokai' | 'solarized' | 'ayu' | 'github' | 'discord' | 'vue' | 'chartreuse' | 'merko' | 'algolia'
  // Advanced color customization for each section
  sectionColors: {
    header: string
    stats: string
    languages: string
    activity: string
    repos: string
    quotes: string
    techstack: string
    social: string
    streak: string
    contribution: string
    banner: string
    graph: string
  }
  // Social media profile links
  socialLinks: SocialLinks
  // Spotify configuration
  spotifyConfig: {
    username: string
    playlists: string[]
    showCurrentlyPlaying: boolean
    showTopTracks: boolean
    showPlaylists: boolean
  }
  // GIF customization
  gifConfig: {
    headerGif: string
    codingGif: string
    skillsGif: string
    footerGif: string
    customGifs: string[]
  }
}

export default function ReadmeGenerator({ user, onReadmeGenerated }: ReadmeGeneratorProps) {
  const [loading, setLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [config, setConfig] = useState<GeneratorConfig>({
    includeStats: true,
    includeLanguages: true,
    includeStreaks: true,
    includeTrophies: true,
    includeActivity: true,
    includeTopRepos: true,
    includeVisitorCount: true,
    includeTypingAnimation: true,
    includeSnakeAnimation: true,
    includeBadges: true,
    includeQuotes: true,
    includeAdvancedStats: true,
    includeTechStack: true,
    includeSocialWidgets: true,
    includeContributionGraph: true,
    includeRecentCommits: true,
    includeGitHubMetrics: true,
    include3DContributions: true,
    includeCodingTime: true,
    includeProfileBanner: true,
    includeAnimatedGifs: true,
    includeWaveAnimation: true,
    includeFireAnimation: true,
    includeProgrammingQuotes: true,
    includeSpotifyPlaylists: true,
    includeCustomGifs: true,
    includeRecentVisitors: true,
    theme: 'tokyonight',
    sectionColors: {
      header: '#7aa2f7',
      stats: '#bb9af7',
      languages: '#7dcfff',
      activity: '#9ece6a',
      repos: '#f7768e',
      quotes: '#ff9e64',
      techstack: '#73daca',
      social: '#c0caf5',
      streak: '#f7768e',
      contribution: '#9ece6a',
      banner: '#7aa2f7',
      graph: '#bb9af7'
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      discord: '',
      youtube: '',
      instagram: '',
      website: '',
      portfolio: '',
      blog: '',
      email: '',
      telegram: ''
    },
    spotifyConfig: {
      username: '',
      playlists: [],
      showCurrentlyPlaying: true,
      showTopTracks: true,
      showPlaylists: true
    },
    gifConfig: {
      headerGif: 'https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif',
      codingGif: 'https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif',
      skillsGif: 'https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif',
      footerGif: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
      customGifs: []
    }
  })

  const generateReadme = async () => {
    setLoading(true)
    try {
      const repositories = await fetchAllUserRepositories(user.login)
      const topRepos = getTopRepositories(repositories)
      const languageStats = await calculateLanguageStats(repositories)
      const topLanguages = Object.keys(languageStats).slice(0, 8)
      
      // Fetch advanced data including real frameworks and tools
      const [emojiProfile, followersSection, recentCommits, advancedStats, realTechStack] = await Promise.all([
        generateDynamicEmojis(user, repositories),
        getFollowersReadmeSection(user.login),
        config.includeRecentCommits ? fetchRecentCommits(user.login, 10) : [],
        config.includeAdvancedStats ? calculateAdvancedStats(user.login) : null,
        detectFrameworksAndTools(repositories)
      ])
      
      const readmeContent = await generateAdvancedReadmeContent(
        user, 
        topRepos, 
        topLanguages, 
        languageStats,
        emojiProfile, 
        followersSection,
        recentCommits,
        advancedStats,
        realTechStack
      )
      
      onReadmeGenerated(readmeContent)
      toast.success('🎉 Amazing README generated successfully!')
    } catch (error) {
      console.error('Error generating README:', error)
      toast.error('Failed to generate README. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateAdvancedReadmeContent = async (
    user: GitHubUser, 
    topRepos: any[], 
    topLanguages: string[], 
    languageStats: any,
    emojiProfile: any, 
    followersSection: string = '',
    recentCommits: any[] = [],
    advancedStats: any = null,
    realTechStack: any = null
  ) => {
    const badges = generateCustomBadges(user)
    const quote = generateRandomQuote()
    const joke = generateJoke()
    
    let content = ``
    
    // Amazing Header with Multiple Banners
    content += `<div align="center">\n\n`
    
    // Primary Profile Banner with Custom Colors
    if (config.includeProfileBanner) {
      const bannerUrl = escapeUrlForXml(`https://capsule-render.vercel.app/api?type=waving&color=${config.sectionColors.banner.replace('#', '')}&height=200&section=header&text=${encodeURIComponent(user.name || user.login)}&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=${encodeURIComponent(user.bio || 'Developer & Creator')}&descAlignY=60&descAlign=50`)
      content += `![GitHub Banner](${bannerUrl})\n\n`
    }
    
    // Secondary Wave Animation Banner
    if (config.includeWaveAnimation) {
      const waveUrl = escapeUrlForXml(`https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=header&text=Welcome%20to%20my%20GitHub&fontSize=30&fontColor=fff&animation=twinkling&fontAlignY=40`)
      content += `![Wave Animation](${waveUrl})\n\n`
    }
    
    // Fire Animation Header
    if (config.includeFireAnimation) {
      content += `![Fire Animation](${escapeUrlForXml('https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=F75C7E&center=true&vCenter=true&width=600&lines=🔥+AMAZING+DEVELOPER+🔥;💻+CODING+WIZARD+💻;🚀+OPEN+SOURCE+HERO+🚀;✨+INNOVATION+ENTHUSIAST+✨')})\n\n`
    }
    
    content += `</div>\n\n`
    
    // Enhanced Main Title with Emojis
    content += `# ${emojiProfile.greeting} ${emojiProfile.personalityEmojis.join(' ')}\n\n`
    
    // Typing Animation with Multiple Dynamic Lines and Fallbacks
    if (config.includeTypingAnimation) {
      const typingTexts = [
        `${emojiProfile.codingStatus}`,
        `🚀+Full+Stack+Developer`,
        `${emojiProfile.locationEmoji}+${user.location?.replace(/\s+/g, '+') || 'Earth'}`,
        `💡+Innovation+Enthusiast`,
        `🌟+Open+Source+Contributor`,
        `⚡+Problem+Solver`,
        `🎯+Tech+Explorer`,
        `🛠️+Code+Craftsman`
      ]
      content += `<div align="center">\n\n`
      
      // Primary typing service
      content += `![Typing SVG](${generateEnhancedTypingImageUrl(typingTexts, config.theme)})\n\n`
      
      // Alternative typing services as fallbacks
      content += `<!-- Alternative Typing Services for better reliability -->\n`
      content += `![Alternative Typing](${generateAlternativeTypingImageUrl(typingTexts, config.theme)})\n\n`
      content += `![Backup Typing](${generateTypingImageBackup(typingTexts, config.theme)})\n\n`
      
      content += `</div>\n\n`
    }

    // Custom Animated GIFs Section
    if (config.includeAnimatedGifs || config.includeCustomGifs) {
      content += `<div align="center">\n\n`
      content += `<img src="${config.gifConfig.headerGif}" width="400" alt="Header GIF">\n\n`
      content += `</div>\n\n`
    }

    // Enhanced Bio Section with Custom Animation
    if (user.bio) {
      content += `## ${emojiProfile.aboutEmoji} About Me\n\n`
      const bioGif = config.includeCustomGifs && config.gifConfig.codingGif ? config.gifConfig.codingGif : 'https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif'
      content += `<img align="right" width="300" src="${bioGif}" alt="Coding Animation">\n\n`
      content += `${user.bio}\n\n`
      content += `- 🔭 I'm currently working on **amazing projects**\n`
      content += `- 🌱 I'm currently learning **cutting-edge technologies**\n`
      content += `- 👯 I'm looking to collaborate on **open source projects**\n`
      content += `- 💬 Ask me about **anything tech-related**\n`
      content += `- ⚡ Fun fact: **I love turning coffee into code!** ☕\n`
      content += `- 🎯 Always coding with passion and purpose!\n\n`
    }

    // Social Media Connection Section
    if (config.includeSocialWidgets && Object.values(config.socialLinks).some(link => link.trim())) {
      content += `## 🌐 Connect With Me\n\n`
      content += `<div align="center">\n\n`
      
      const socialPlatforms = [
        { key: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '0077B5' },
        { key: 'twitter', name: 'Twitter', icon: 'twitter', color: '1DA1F2' },
        { key: 'discord', name: 'Discord', icon: 'discord', color: '7289DA' },
        { key: 'youtube', name: 'YouTube', icon: 'youtube', color: 'FF0000' },
        { key: 'instagram', name: 'Instagram', icon: 'instagram', color: 'E4405F' },
        { key: 'website', name: 'Website', icon: 'google-chrome', color: 'FF5722' },
        { key: 'portfolio', name: 'Portfolio', icon: 'briefcase', color: '4CAF50' },
        { key: 'blog', name: 'Blog', icon: 'hashnode', color: '2962FF' },
        { key: 'email', name: 'Email', icon: 'gmail', color: 'D14836' },
        { key: 'telegram', name: 'Telegram', icon: 'telegram', color: '2CA5E0' }
      ]
      
      socialPlatforms.forEach(platform => {
        const link = config.socialLinks[platform.key as keyof SocialLinks]
        if (link.trim()) {
          content += `[![${platform.name}](https://img.shields.io/badge/${platform.name}-${platform.color}?style=for-the-badge&logo=${platform.icon}&logoColor=white)](${link}) `
        }
      })
      
      content += `\n\n</div>\n\n`
    }

    // 3D Contribution Graph with Enhanced Styling and Fallbacks
    if (config.include3DContributions) {
      content += `## 🌟 3D Contribution Graph\n\n`
      content += `<div align="center">\n\n`
      
      // Primary 3D contribution service
      content += `![3D Contributions](${generate3DContributionUrl(user.login, config.theme)})\n\n`
      
      // Alternative contribution graph as fallback
      content += `<!-- Alternative Contribution Graph -->\n`
      content += `![Activity Graph](${generateAlternative3DContributionUrl(user.login, config.theme)})\n\n`
      
      content += `</div>\n\n`
    }

    // Coding Time Widget
    if (config.includeCodingTime) {
      content += `## ⏰ Weekly Development Breakdown\n\n`
      content += `<div align="center">\n\n`
      content += `![Coding Time](${generateCodingTimeWidget(user.login, config.theme)})\n\n`
      content += `</div>\n\n`
    }

    // Dynamic intro with advanced features
    content += `## ${emojiProfile.techEmoji} What I Do\n\n`
    content += `${emojiProfile.personalityDescription}\n\n`
    
    // Advanced Badges Section
    if (config.includeBadges && badges.length > 0) {
      content += `## ${emojiProfile.badgeEmoji} Profile Badges\n\n`
      content += `<div align="center">\n\n`
      badges.forEach((badge, index) => {
        if (index % 3 === 0 && index > 0) content += '\n'
        content += `![Badge](${badge}) `
      })
      content += '\n\n</div>\n\n'
    }
    
    // Profile Views
    if (config.includeVisitorCount) {
      content += `<div align="center">\n\n`
      content += `![Profile Views](${generateProfileViewsUrl(user.login)})\n\n`
      content += `</div>\n\n`
    }
    
    // Enhanced Programming Quotes Section
    if (config.includeProgrammingQuotes) {
      const randomQuote = getRandomQuote()
      content += `## 💭 Daily Programming Wisdom\n\n`
      content += `<div align="center">\n\n`
      content += `> **${randomQuote.text}** ✨\n\n`
      content += `</div>\n\n`
    }

    // Tech Stack with Real-Time Data from User Repositories
    if (config.includeTechStack && (topLanguages.length > 0 || realTechStack)) {
      content += `## ${emojiProfile.techEmoji} Complete Tech Arsenal\n\n`
      
      // Programming Languages (Top 6)
      if (topLanguages.length > 0) {
        content += `### 🔥 Programming Languages\n\n`
        content += `<div align="center">\n\n`
        content += `![Languages](${generateTechStackUrl(topLanguages.slice(0, 6), config.theme)})\n\n`
        content += `</div>\n\n`
      }
      
      // Real Frameworks & Libraries from user's repositories
      if (realTechStack?.frameworks && realTechStack.frameworks.length > 0) {
        content += `### ⚡ Frameworks & Libraries\n\n`
        content += `<div align="center">\n\n`
        content += `![Frameworks](${generateTechStackUrl(realTechStack.frameworks, config.theme)})\n\n`
        content += `</div>\n\n`
      }
      
      // Real Tools & Technologies from user's repositories
      if (realTechStack?.tools && realTechStack.tools.length > 0) {
        content += `### 🛠️ Tools & Technologies\n\n`
        content += `<div align="center">\n\n`
        content += `![Tools](${generateTechStackUrl(realTechStack.tools, config.theme)})\n\n`
        content += `</div>\n\n`
      }
      
      // Real Databases (if detected)
      if (realTechStack?.databases && realTechStack.databases.length > 0) {
        content += `### 🗄️ Databases\n\n`
        content += `<div align="center">\n\n`
        content += `![Databases](${generateTechStackUrl(realTechStack.databases, config.theme)})\n\n`
        content += `</div>\n\n`
      }
      
      // Real Cloud Services (if detected)
      if (realTechStack?.cloud && realTechStack.cloud.length > 0) {
        content += `### ☁️ Cloud & Deployment\n\n`
        content += `<div align="center">\n\n`
        content += `![Cloud](${generateTechStackUrl(realTechStack.cloud, config.theme)})\n\n`
        content += `</div>\n\n`
      }
      
      // Skill Level Section with emojis
      content += `### 📊 Skill Level Breakdown\n\n`
      content += `<div align="center">\n\n`
      content += `| 💻 **Language** | ⭐ **Level** | 📈 **Progress** | 🎯 **Usage** |\n`
      content += `|-----------------|--------------|-----------------|------------------|\n`
      
      topLanguages.slice(0, 5).forEach((lang, index) => {
        const levels = ['🌟 Expert', '🔥 Advanced', '⚡ Intermediate', '🌱 Learning', '📚 Exploring']
        const progresses = ['████████████', '█████████▒▒▒', '███████▒▒▒▒▒', '█████▒▒▒▒▒▒▒', '███▒▒▒▒▒▒▒▒▒']
        const usages = ['Daily', 'Frequent', 'Often', 'Sometimes', 'Exploring']
        
        const level = levels[index % levels.length]
        const progress = progresses[index % progresses.length]
        const usage = usages[index % usages.length]
        
        content += `| **${lang}** ${emojiProfile.languageEmojis[lang] || '💻'} | ${level} | \`${progress}\` | ${usage} |\n`
      })
      content += `\n</div>\n\n`
    }

    // Enhanced GitHub Stats with Custom Colors and Multiple Fallbacks
    if (config.includeStats) {
      content += `## ${emojiProfile.statsEmoji} GitHub Statistics\n\n`
      content += `<div align="center">\n\n`
      
      // Primary GitHub Stats Service
      const statsColor = config.sectionColors.stats.replace('#', '')
      const languagesColor = config.sectionColors.languages.replace('#', '')
      const customStatsUrl = escapeUrlForXml(`https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&count_private=true&theme=${config.theme}&title_color=${statsColor}&icon_color=${statsColor}&text_color=${statsColor}&bg_color=00000000&hide_border=true&include_all_commits=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage`)
      
      content += `<img height="180em" src="${customStatsUrl}" alt="GitHub Stats" />\n`
      
      // Alternative GitHub Stats Services (Fallbacks)
      content += `<!-- Alternative GitHub Stats Services for better reliability -->\n`
      content += `<img height="180em" src="${generateAlternativeGitHubStatsUrl(user.login, config.theme)}" alt="GitHub Stats Alternative" />\n`
      content += `<img height="180em" src="${generateGitHubStatsAlternative2(user.login, config.theme)}" alt="GitHub Stats Backup" />\n`
      
      if (config.includeLanguages) {
        const customLanguagesUrl = escapeUrlForXml(`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=${config.theme}&title_color=${languagesColor}&text_color=${languagesColor}&bg_color=00000000&hide_border=true&langs_count=10&exclude_repo=github-readme-stats`)
        content += `<img height="180em" src="${customLanguagesUrl}" alt="Top Languages" />\n\n`
      }
      content += `</div>\n\n`
    }

    // Enhanced GitHub Streaks with Custom Colors and Multiple Fallbacks
    if (config.includeStreaks) {
      content += `## ${emojiProfile.streakEmoji} GitHub Streaks & Achievements\n\n`
      content += `<div align="center">\n\n`
      
      // Primary streak service with custom colors
      const streakColor = config.sectionColors.streak.replace('#', '')
      const customStreakUrl = escapeUrlForXml(`https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=${config.theme}&fire=${streakColor}&ring=${streakColor}&currStreakLabel=${streakColor}&sideNums=${streakColor}&sideLabels=${streakColor}&dates=${streakColor}&background=00000000&border=FFFFFF00&stroke=FFFFFF00`)
      
      content += `<img src="${customStreakUrl}" alt="GitHub Streak" />\n\n`
      
      // Alternative streak services (Fallbacks)
      content += `<!-- Alternative Streak Services for better reliability -->\n`
      content += `<img src="${generateAlternativeStreakStatsUrl(user.login, config.theme)}" alt="Alternative Streak Stats" />\n\n`
      content += `<img src="${generateStreakStatsBackup(user.login, config.theme)}" alt="Backup Streak Stats" />\n\n`
      
      content += `</div>\n\n`
    }

    // Enhanced Activity Graph with Custom Background Colors
    if (config.includeContributionGraph) {
      content += `## ${emojiProfile.activityEmoji} Contribution Activity\n\n`
      content += `<div align="center">\n\n`
      
      // Custom contribution graph with user-selected background colors
      const contributionColor = config.sectionColors.contribution.replace('#', '')
      const customGraphUrl = escapeUrlForXml(`https://github-readme-activity-graph.vercel.app/graph?username=${user.login}&theme=${config.theme}&area=true&hide_border=true&custom_title=Contribution%20Graph&line=${contributionColor}&point=${contributionColor}&area_color=${contributionColor}40&title_color=${contributionColor}&color=${contributionColor}&bg_color=${config.sectionColors.graph.replace('#', '')}20`)
      
      content += `![Activity Graph](${customGraphUrl})\n\n`
      content += `</div>\n\n`
    }

    // GitHub Metrics with Enhanced Emoji Support and Multiple Reliable Options
    if (config.includeGitHubMetrics) {
      content += `## 📊 GitHub Metrics Dashboard\n\n`
      content += `<div align="center">\n\n`
      
      // Primary GitHub Stats Service
      content += `![GitHub Stats](${generateGitHubMetricsUrl(user.login, config.theme)})\n\n`
      
      // Alternative GitHub Metrics Services
      content += `<!-- Alternative GitHub Metrics for better reliability -->\n`
      content += `![Alternative Stats](${generateAlternativeGitHubStatsUrl(user.login, config.theme)})\n\n`
      content += `![Backup Stats](${generateGitHubStatsAlternative2(user.login, config.theme)})\n\n`
      
      // Comprehensive Statistics 
      content += `![Comprehensive Stats](${generateComprehensiveStatsUrl(user.login, config.theme)})\n\n`
      
      // Advanced Profile Summary
      content += `![Profile Summary](${generateAdvancedMetricsUrl(user.login, config.theme)})\n\n`
      
      content += `</div>\n\n`
    }

    // Enhanced Snake Animation with multiple reliable sources and theme support
    if (config.includeSnakeAnimation) {
      content += `## 🐍 Snake eating my contributions\n\n`
      content += `<div align="center">\n\n`
      content += `<picture>\n`
      content += `  <source media="(prefers-color-scheme: dark)" srcset="${generateSnakeContributionUrl(user.login, 'dark')}">\n`
      content += `  <source media="(prefers-color-scheme: light)" srcset="${generateSnakeContributionUrl(user.login, 'light')}">\n`
      content += `  <img alt="Snake animation" src="${generateSnakeContributionUrl(user.login, config.theme)}">\n`
      content += `</picture>\n\n`
      content += `<!-- Alternative Snake Animations for better reliability -->\n`
      content += `![Snake Animation](${generateAlternativeSnakeUrl(user.login, config.theme)})\n\n`
      content += `![Personal Snake](${generateSnakeAnimationBackup(user.login, config.theme)})\n\n`
      content += `</div>\n\n`
      
      // Add instructions for setting up snake animation
      content += `<details>\n`
      content += `<summary>🔧 How to add Snake Animation to your profile</summary>\n\n`
      content += `1. Create a repository with the same name as your username\n`
      content += `2. Add the GitHub Action from: https://github.com/Platane/snk\n`
      content += `3. The snake animation will be generated automatically with your chosen theme!\n`
      content += `4. Multiple fallback sources ensure maximum compatibility\n\n`
      content += `</details>\n\n`
    }

    // Enhanced Spotify Integration
    if (config.includeSocialWidgets || config.includeSpotifyPlaylists) {
      content += `## 🎵 Music & Entertainment\n\n`
      
      // Currently Playing
      if (config.spotifyConfig.showCurrentlyPlaying) {
        content += `### 🎧 Currently Listening To\n\n`
        content += `<div align="center">\n\n`
        const spotifyUsername = config.spotifyConfig.username || 'YOUR_SPOTIFY_USERNAME'
        content += `[![Spotify](https://spotify-github-profile.vercel.app/api/spotify-playing)](https://open.spotify.com/user/${spotifyUsername})\n\n`
        content += `</div>\n\n`
      }
      
      // Top Tracks
      if (config.spotifyConfig.showTopTracks) {
        content += `### 🔥 Top Tracks This Week\n\n`
        content += `<div align="center">\n\n`
        content += `[![Top Tracks](https://spotify-recently-played-readme.vercel.app/api/spotify-recently-played)](https://open.spotify.com/user/${config.spotifyConfig.username || 'YOUR_USERNAME'})\n\n`
        content += `</div>\n\n`
      }
      
      // Custom Playlists
      if (config.spotifyConfig.showPlaylists && config.spotifyConfig.playlists.length > 0) {
        content += `### 📀 My Coding Playlists\n\n`
        content += `<div align="center">\n\n`
        config.spotifyConfig.playlists.forEach((playlistUrl, index) => {
          if (playlistUrl.trim()) {
            const playlistId = playlistUrl.split('/').pop()?.split('?')[0]
            content += `[![Playlist ${index + 1}](${escapeUrlForXml(`https://img.shields.io/badge/🎵%20Playlist%20${index + 1}-1DB954?style=for-the-badge&logo=spotify&logoColor=white`)})](${playlistUrl})\n`
          }
        })
        content += `\n</div>\n\n`
      }
    }

    // Advanced Stats with Enhanced Formatting
    if (config.includeAdvancedStats && advancedStats) {
      content += `## ${emojiProfile.statsEmoji} Advanced Analytics\n\n`
      content += `<div align="center">\n\n`
      content += `| 📊 **Metric** | 🔢 **Count** | 📈 **Details** | 🎯 **Impact** |\n`
      content += `|---------------|--------------|----------------|---------------|\n`
      content += `| **Total Repositories** | ${advancedStats.totalRepositories} | 📁 Public projects | 🌟 Innovation |\n`
      content += `| **Total Stars Earned** | ${advancedStats.totalStars} | ⭐ Community love | 🚀 Recognition |\n`
      content += `| **Total Forks** | ${advancedStats.totalForks} | 🍴 Code reused | 💡 Inspiration |\n`
      content += `| **Pull Requests** | ${advancedStats.pullRequests.total} | 🔄 Contributions | 🤝 Collaboration |\n`
      content += `| **Issues Solved** | ${advancedStats.issues.total} | 🐛 Problems fixed | 🛠️ Problem solving |\n`
      content += `| **This Week's Commits** | ${advancedStats.recentCommits} | 💻 Recent activity | ⚡ Consistency |\n\n`
      content += `</div>\n\n`
    }

    // Enhanced Recent Activity with Beautiful Formatting
    if (config.includeRecentCommits && recentCommits.length > 0) {
      content += `## ${emojiProfile.activityEmoji} Recent Development Activity\n\n`
      
      // Enhanced activity showcase
      content += `<div align="center">\n\n`
      content += `### 🚀 Latest Code Adventures\n\n`
      content += `</div>\n\n`
      
      content += `| 🎯 **Activity** | 📁 **Repository** | 🕒 **When** | 🔗 **Details** |\n`
      content += `|-----------------|-------------------|-------------|----------------|\n`
      
      recentCommits.slice(0, 5).forEach((commit, index) => {
        const activityEmojis = ['🔥', '⚡', '✨', '🚀', '💡', '🛠️', '🎨', '📝', '🐛', '🔧']
        const emoji = activityEmojis[index] || '💻'
        const shortSha = commit.sha.substring(0, 7)
        const truncatedMessage = commit.message.length > 50 ? commit.message.substring(0, 47) + '...' : commit.message
        
        content += `| ${emoji} **${truncatedMessage}** | \`${commit.repo.split('/').pop()}\` | Recently | [\`${shortSha}\`](${commit.url}) |\n`
      })
      
      content += `\n`
      
      // Add custom GIF for recent activity
      if (config.includeCustomGifs && config.gifConfig.codingGif) {
        content += `<div align="center">\n\n`
        content += `<img src="${config.gifConfig.codingGif}" width="300" alt="Coding Activity">\n\n`
        content += `</div>\n\n`
      }
    }

    // Trophies with Enhanced Display
    if (config.includeTrophies) {
      content += `## ${emojiProfile.trophyEmoji} GitHub Achievements\n\n`
      content += `<div align="center">\n\n`
      
      // Primary trophy service
      content += `![GitHub Trophies](${generateTrophyImageUrl(user.login, config.theme)})\n\n`
      
      // Alternative trophy services (Fallbacks)
      content += `<!-- Alternative Trophy Services for better reliability -->\n`
      content += `![Alternative Trophies](${generateAlternativeTrophyUrl(user.login, config.theme)})\n\n`
      content += `![Backup Trophies](${generateTrophyBackupUrl(user.login, config.theme)})\n\n`
      
      content += `</div>\n\n`
    }

    // Featured Repositories with Enhanced Layout
    if (config.includeTopRepos && topRepos.length > 0) {
      content += `## ${emojiProfile.repoEmoji} Featured Projects\n\n`
      content += `<div align="center">\n\n`
      content += `### 🌟 Showcasing My Best Work\n\n`
      
      topRepos.slice(0, 6).forEach((repo, index) => {
        if (index % 2 === 0) {
          content += `<a href="${repo.html_url}" target="_blank">\n`
          content += `  <img align="center" src="${escapeUrlForXml(`https://github-readme-stats.vercel.app/api/pin/?username=${user.login}&repo=${repo.name}&theme=${config.theme}&hide_border=true&bg_color=00000000`)}" />\n`
          content += `</a>\n`
        }
        if (index % 2 === 1) {
          content += `<a href="${repo.html_url}" target="_blank">\n`
          content += `  <img align="center" src="${escapeUrlForXml(`https://github-readme-stats.vercel.app/api/pin/?username=${user.login}&repo=${repo.name}&theme=${config.theme}&hide_border=true&bg_color=00000000`)}" />\n`
          content += `</a>\n\n`
        }
      })
      content += `</div>\n\n`
    }

    // Recent Profile Visitors Section - Shows First 5 Recent Followers with Profile Pictures
    if (config.includeRecentVisitors) {
      if (followersSection) {
        content += followersSection
      } else {
        // Fallback section if no followers data available
        content += `## 👥 Recent Profile Visitors\n\n`
        content += `<div align="center">\n\n`
        content += `### 🌟 Thanks for visiting my profile!\n\n`
        content += `<p>\n`
        content += `<a href="https://github.com/${user.login}?tab=followers" target="_blank">\n`
        content += `<img src="${escapeUrlForXml(`https://img.shields.io/github/followers/${user.login}?label=Follow%20@${user.login}&style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=blue`)}" alt="Follow ${user.login}"/>\n`
        content += `</a>\n`
        content += `</p>\n\n`
        content += `<p>\n`
        content += `<img src="${escapeUrlForXml('https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=2000&pause=1000&color=58A6FF&background=00000000&center=true&vCenter=true&random=false&width=500&lines=👋+Welcome+to+my+GitHub+profile!;🚀+Check+out+my+latest+projects;💻+Always+learning+something+new;📫+Feel+free+to+reach+out!')}" alt="Typing SVG" />\n`
        content += `<!-- Alternative Typing SVG for better reliability -->\n`
        content += `<img src="${escapeUrlForXml('https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=2000&pause=1000&color=58A6FF&background=00000000&center=true&vCenter=true&random=false&width=500&lines=👋+Welcome+to+my+GitHub+profile!;🚀+Check+out+my+latest+projects;💻+Always+learning+something+new;📫+Feel+free+to+reach+out!')}" alt="Alternative Typing SVG" />\n`
        content += `</p>\n\n`
        content += `</div>\n\n`
      }
    }

    // Fun Section with Enhanced Jokes and Quotes
    if (config.includeQuotes) {
      content += `## ${emojiProfile.funEmoji} Daily Dose of Inspiration\n\n`
      content += `<div align="center">\n\n`
      content += `> **${quote}** ✨\n\n`
      content += `</div>\n\n`
      content += `### ${emojiProfile.jokeEmoji} Developer Humor Break\n\n`
      content += `<div align="center">\n\n`
      content += `${joke}\n\n`
      content += `</div>\n\n`
    }

    // Amazing Footer with Enhanced Styling and Multiple Elements
    content += `<div align="center">\n\n`
    content += `---\n\n`
    content += `## ${emojiProfile.connectEmoji} Let's Build Something Amazing Together!\n\n`
    
    // Enhanced connection section
    if (user.blog) {
      content += `[![Website](${escapeUrlForXml(`https://img.shields.io/badge/🌐%20Website-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white`)})](${user.blog}) `
    }
    if (user.twitter_username) {
      content += `[![Twitter](${escapeUrlForXml(`https://img.shields.io/badge/🐦%20Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white`)})](https://twitter.com/${user.twitter_username}) `
    }
    content += `[![LinkedIn](${escapeUrlForXml(`https://img.shields.io/badge/💼%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white`)})](https://linkedin.com/in/${user.login}) `
    content += `[![GitHub](${escapeUrlForXml(`https://img.shields.io/badge/🐙%20GitHub-100000?style=for-the-badge&logo=github&logoColor=white`)})](https://github.com/${user.login})\n\n`

    // Footer with animated banner
    content += `![Footer Wave](${escapeUrlForXml('https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer&text=Thanks%20for%20visiting!&fontSize=20&fontColor=fff&animation=fadeIn')})\n\n`
    
    // Custom footer GIF
    if (config.includeCustomGifs && config.gifConfig.footerGif) {
      content += `<img src="${config.gifConfig.footerGif}" width="500" alt="Footer Animation">\n\n`
    }
    
    // Footer statistics
    content += `![Profile Views](${generateProfileViewsUrl(user.login)}) `
    content += `![GitHub Followers](${escapeUrlForXml(`https://img.shields.io/github/followers/${user.login}?style=social&label=Follow`)}) `
    content += `![GitHub Stars](${escapeUrlForXml(`https://img.shields.io/github/stars/${user.login}?style=social&label=Stars`)})\n\n`
    
    // Inspirational footer message
    content += `### ✨ "Code is poetry written in logic" ✨\n\n`
    content += `**${emojiProfile.footer}**\n\n`
    content += `*Made with ❤️, lots of ☕, and a touch of ✨ magic*\n\n`
    
    // Skills GIF in footer
    if (config.includeCustomGifs && config.gifConfig.skillsGif) {
      content += `<img src="${config.gifConfig.skillsGif}" width="400" alt="Skills Animation">\n\n`
    }
    
    // Final motivational message
    content += `---\n\n`
    content += `> 🚀 **"Every expert was once a beginner. Keep coding, keep learning!"**\n\n`
    content += `⭐ **From [${user.login}](https://github.com/${user.login}) with 💝**\n\n`
    
    content += `</div>`

    return content
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-github-border">
            <img 
              src={user.avatar_url} 
              alt={user.login}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-github-text">{user.name || user.login}</h3>
            <p className="text-sm text-github-muted">@{user.login}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-github-muted">
          <Star size={16} />
          <span>{user.public_repos} repos</span>
        </div>
      </div>

      {user.bio && (
        <p className="text-github-muted text-sm">{user.bio}</p>
      )}

      <div className="bg-github-bg/30 border border-github-border rounded-lg p-4">
        <h4 className="text-lg font-semibold text-github-text flex items-center gap-2 mb-4">
          <Settings size={18} />
          Customize Your Amazing README
        </h4>

        <div className="space-y-6">
          {/* Main Configuration Options */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(config).map(([key, value]) => {
              if (key === 'theme' || key === 'sectionColors' || key === 'spotifyConfig' || key === 'gifConfig' || key === 'socialLinks') return null
              
              const labels: Record<string, string> = {
                includeStats: 'GitHub Stats',
                includeLanguages: 'Top Languages',
                includeStreaks: 'Streak Stats',
                includeTrophies: 'Trophies',
                includeActivity: 'Activity Graph',
                includeTopRepos: 'Featured Repos',
                includeVisitorCount: 'Visitor Count',
                includeTypingAnimation: 'Typing Animation',
                includeSnakeAnimation: 'Snake Animation',
                includeBadges: 'Profile Badges',
                includeQuotes: 'Inspirational Quotes',
                includeAdvancedStats: 'Advanced Stats',
                includeTechStack: 'Tech Stack',
                includeSocialWidgets: 'Social Widgets',
                includeContributionGraph: 'Contribution Graph',
                includeRecentCommits: 'Recent Commits',
                includeGitHubMetrics: 'GitHub Metrics',
                include3DContributions: '3D Contributions',
                includeCodingTime: 'Coding Time',
                includeProfileBanner: 'Profile Banner',
                includeAnimatedGifs: 'Animated GIFs',
                includeWaveAnimation: 'Wave Animation',
                includeFireAnimation: 'Fire Animation',
                includeProgrammingQuotes: 'Programming Quotes',
                includeSpotifyPlaylists: 'Spotify Playlists',
                includeCustomGifs: 'Custom GIFs',
                includeRecentVisitors: 'Recent Profile Visitors'
              }

              const icons: Record<string, string> = {
                includeStats: '📊',
                includeLanguages: '💻',
                includeStreaks: '🔥',
                includeTrophies: '🏆',
                includeActivity: '📈',
                includeTopRepos: '📂',
                includeVisitorCount: '👀',
                includeTypingAnimation: '⌨️',
                includeSnakeAnimation: '🐍',
                includeBadges: '🎫',
                includeQuotes: '💭',
                includeAdvancedStats: '📈',
                includeTechStack: '🛠️',
                includeSocialWidgets: '🌐',
                includeContributionGraph: '🐍',
                includeRecentCommits: '💻',
                includeGitHubMetrics: '📊',
                include3DContributions: '🌟',
                includeCodingTime: '⏰',
                includeProfileBanner: '🎨',
                includeAnimatedGifs: '🎬',
                includeWaveAnimation: '🌊',
                includeFireAnimation: '🔥',
                includeProgrammingQuotes: '📚',
                includeSpotifyPlaylists: '🎵',
                includeCustomGifs: '🎬',
                includeRecentVisitors: '👥'
              }

              return (
                <label key={key} className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-github-bg/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => setConfig(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-github-accent bg-github-bg border-github-border rounded focus:ring-github-accent"
                  />
                  <span className="text-github-text flex items-center gap-1">
                    <span>{icons[key]}</span>
                    {labels[key]}
                  </span>
                </label>
              )
            })}
          </div>

          {/* Advanced Settings Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-github-bg border border-github-border rounded-lg text-github-text hover:bg-github-bg/70 transition-colors"
          >
            <Zap size={16} />
            {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
          </button>

          {showAdvanced && (
            <div className="space-y-4 border-t border-github-border pt-4">
              {/* Social Media Links Section */}
              <div>
                <label className="block text-sm font-medium text-github-text mb-3 flex items-center gap-2">
                  <Users size={16} />
                  🌐 Social Media Profile Links
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(config.socialLinks).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="text-xs text-github-text capitalize mb-1 block">
                        {platform === 'linkedin' && '💼'} 
                        {platform === 'twitter' && '🐦'} 
                        {platform === 'discord' && '💬'} 
                        {platform === 'youtube' && '📺'} 
                        {platform === 'instagram' && '📸'} 
                        {platform === 'website' && '🌐'} 
                        {platform === 'portfolio' && '💼'} 
                        {platform === 'blog' && '📝'} 
                        {platform === 'email' && '📧'} 
                        {platform === 'telegram' && '✈️'} 
                        {platform}
                      </label>
                      <input
                        type="url"
                        placeholder={`Your ${platform} URL`}
                        value={url}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            [platform]: e.target.value
                          }
                        }))}
                        className="w-full px-3 py-2 bg-github-bg border border-github-border rounded-lg text-github-text focus:outline-none focus:ring-2 focus:ring-github-accent text-xs"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-github-muted mt-2">
                  💡 Add your social media profile URLs to show them in your README!
                </p>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-github-text mb-3">
                  🎨 Theme Selection
                </label>
                <select
                  value={config.theme}
                  onChange={(e) => setConfig(prev => ({ ...prev, theme: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-github-bg border border-github-border rounded-lg text-github-text focus:outline-none focus:ring-2 focus:ring-github-accent"
                >
                  <optgroup label="🌃 Dark Themes">
                    <option value="dark">🌙 Dark</option>
                    <option value="tokyonight">🌃 Tokyo Night</option>
                    <option value="dracula">🧛 Dracula</option>
                    <option value="gruvbox">🍂 Gruvbox</option>
                    <option value="onedark">⚫ One Dark</option>
                    <option value="noctis">🌌 Noctis</option>
                    <option value="gotham">🦇 Gotham</option>
                  </optgroup>
                  <optgroup label="⚡ Vibrant Themes">
                    <option value="radical">🌈 Radical</option>
                    <option value="synthwave">🌸 Synthwave</option>
                    <option value="cobalt">💙 Cobalt</option>
                    <option value="ocean">🌊 Ocean</option>
                    <option value="material">📱 Material</option>
                    <option value="nord">❄️ Nord</option>
                    <option value="monokai">🎭 Monokai</option>
                  </optgroup>
                  <optgroup label="☀️ Light Themes">
                    <option value="light">☀️ Light</option>
                    <option value="solarized">🌞 Solarized</option>
                    <option value="ayu">🌸 Ayu Mirage</option>
                  </optgroup>
                  <optgroup label="🎪 Fun Themes">
                    <option value="catppuccin">☕ Catppuccin</option>
                    <option value="github">🐙 GitHub Dark</option>
                    <option value="discord">💬 Discord</option>
                  </optgroup>
                  <optgroup label="🚀 Brand Themes">
                    <option value="vue">💚 Vue.js</option>
                    <option value="chartreuse">🟢 Chartreuse</option>
                    <option value="merko">🌿 Merko</option>
                    <option value="algolia">🔵 Algolia</option>
                    <option value="highcontrast">⚫ High Contrast</option>
                  </optgroup>
                </select>
                <p className="text-xs text-github-muted mt-1">
                  🎉 Choose from 25+ professionally designed themes! Each theme provides unique colors, gradients, and styling.
                </p>
              </div>

              {/* Section Colors Customization */}
              <div>
                <label className="block text-sm font-medium text-github-text mb-3">
                  🎨 Custom Section Colors
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(config.sectionColors).map(([section, color]) => (
                    <div key={section}>
                      <label className="text-xs text-github-text capitalize mb-1 block">
                        {section}
                      </label>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          sectionColors: {
                            ...prev.sectionColors,
                            [section]: e.target.value
                          }
                        }))}
                        className="w-full h-8 bg-github-bg border border-github-border rounded cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-github-muted mt-2">
                  🎨 Customize colors for each section to match your style!
                </p>
              </div>

              {/* Spotify Integration */}
              <div>
                <label className="block text-sm font-medium text-github-text mb-3 flex items-center gap-2">
                  <Music size={16} />
                  🎵 Spotify Integration
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Spotify Username"
                    value={config.spotifyConfig.username}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      spotifyConfig: {
                        ...prev.spotifyConfig,
                        username: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 bg-github-bg border border-github-border rounded-lg text-github-text focus:outline-none focus:ring-2 focus:ring-github-accent"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {['showCurrentlyPlaying', 'showTopTracks', 'showPlaylists'].map((option) => (
                      <label key={option} className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={config.spotifyConfig[option as keyof typeof config.spotifyConfig] as boolean}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            spotifyConfig: {
                              ...prev.spotifyConfig,
                              [option]: e.target.checked
                            }
                          }))}
                          className="w-3 h-3"
                        />
                        <span className="text-github-text capitalize">{option.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    placeholder="Spotify Playlist URLs (one per line)"
                    value={config.spotifyConfig.playlists.join('\n')}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      spotifyConfig: {
                        ...prev.spotifyConfig,
                        playlists: e.target.value.split('\n').filter(Boolean)
                      }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-github-bg border border-github-border rounded-lg text-github-text focus:outline-none focus:ring-2 focus:ring-github-accent text-xs"
                  />
                </div>
              </div>

              {/* GIF Customization */}
              <div>
                <label className="block text-sm font-medium text-github-text mb-3">
                  🎬 GIF Customization
                </label>
                <div className="space-y-3">
                  {Object.entries(config.gifConfig).filter(([key]) => key !== 'customGifs').map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-github-text capitalize mb-1 block">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="url"
                        placeholder="GIF URL from Giphy, Tenor, etc."
                        value={value as string}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          gifConfig: {
                            ...prev.gifConfig,
                            [key]: e.target.value
                          }
                        }))}
                        className="w-full px-3 py-2 bg-github-bg border border-github-border rounded-lg text-github-text focus:outline-none focus:ring-2 focus:ring-github-accent text-xs"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-github-muted mt-2">
                  🎬 Add custom GIFs to make your README more engaging and fun!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={generateReadme}
        disabled={loading}
        className="w-full glow-button text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={16} />
            Generating Amazing README<span className="loading-dots"></span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Amazing README ✨
          </>
        )}
      </button>
    </div>
  )
} 