'use client'

import React, { useState, useEffect } from 'react'
import { Activity, GitCommit, GitPullRequest, AlertCircle, Calendar, TrendingUp } from 'lucide-react'
import { GitHubUser } from '@/types/github'
import { 
  fetchRecentCommits, 
  fetchPullRequestStats, 
  fetchIssueStats, 
  calculateAdvancedStats,
  generateContributionCalendarUrl,
  generateGitHubMetricsUrl 
} from '@/lib/github'

interface AdvancedStatsProps {
  user: GitHubUser
  theme: string
}

export default function AdvancedStats({ user, theme }: AdvancedStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [recentCommits, setRecentCommits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdvancedData = async () => {
      try {
        const [advancedStats, commits] = await Promise.all([
          calculateAdvancedStats(user.login),
          fetchRecentCommits(user.login, 10)
        ])
        
        setStats(advancedStats)
        setRecentCommits(commits)
      } catch (error) {
        console.error('Error fetching advanced stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdvancedData()
  }, [user.login])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Contribution Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          GitHub Activity Graph
        </h3>
        <div className="overflow-x-auto">
          <img 
            src={generateContributionCalendarUrl(user.login, theme)}
            alt="GitHub Activity Graph"
            className="w-full max-w-4xl mx-auto rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Advanced Metrics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Commits</p>
                <p className="text-2xl font-bold">{stats.totalCommits}</p>
              </div>
              <GitCommit className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Pull Requests</p>
                <p className="text-2xl font-bold">{stats.pullRequests.total}</p>
              </div>
              <GitPullRequest className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Issues</p>
                <p className="text-2xl font-bold">{stats.issues.total}</p>
              </div>
                             <AlertCircle className="h-8 w-8 text-yellow-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Week</p>
                <p className="text-2xl font-bold">{stats.recentCommits}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>
      )}

      {/* Recent Commits Timeline */}
      {recentCommits.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentCommits.slice(0, 5).map((commit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {commit.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {commit.repo} • {commit.sha}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(commit.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <img 
            src={generateGitHubMetricsUrl(user.login, theme)}
            alt="GitHub Metrics"
            className="w-full max-w-3xl mx-auto rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
} 