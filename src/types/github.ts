export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubUser
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
  } | null
  allow_forking: boolean
  is_template: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface GitHubStats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
  totalStars: number
  contributedTo: number
}

export interface LanguageStats {
  [language: string]: number
}

export interface GitHubContribution {
  date: string
  count: number
}

export interface ReadmeConfig {
  user: GitHubUser
  repositories: GitHubRepository[]
  stats: GitHubStats
  languageStats: LanguageStats
  topRepositories: GitHubRepository[]
  recentActivity: GitHubContribution[]
  customSections: {
    showStats: boolean
    showLanguages: boolean
    showTrophies: boolean
    showStreaks: boolean
    showActivity: boolean
    showTopRepos: boolean
    includePrivateRepos: boolean
  }
  styling: {
    theme: 'light' | 'dark' | 'auto'
    accentColor: string
    showIcons: boolean
    compactLayout: boolean
  }
}

export interface ReadmeSection {
  id: string
  title: string
  content: string
  enabled: boolean
  order: number
} 