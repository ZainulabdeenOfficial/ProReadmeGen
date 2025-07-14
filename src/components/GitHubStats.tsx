'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, Eye, Book, Calendar, MapPin, Building, Link } from 'lucide-react'
import { GitHubUser } from '@/types/github'

interface GitHubStatsProps {
  user: GitHubUser
}

export default function GitHubStats({ user }: GitHubStatsProps) {
  const joinDate = new Date(user.created_at)
  const yearsActive = new Date().getFullYear() - joinDate.getFullYear()

  const stats = [
    { label: 'Public Repos', value: user.public_repos, icon: <Book size={16} />, color: 'text-github-accent' },
    { label: 'Followers', value: user.followers, icon: <Eye size={16} />, color: 'text-green-400' },
    { label: 'Following', value: user.following, icon: <GitFork size={16} />, color: 'text-blue-400' },
    { label: 'Public Gists', value: user.public_gists, icon: <Star size={16} />, color: 'text-yellow-400' },
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="github-card p-4 text-center"
          >
            <div className={`flex justify-center mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-github-text mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-xs text-github-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="github-card p-4"
      >
        <h3 className="text-lg font-semibold text-github-text mb-3 flex items-center gap-2">
          <Calendar size={18} />
          GitHub Journey
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-github-muted">Member since</span>
            <span className="text-github-text font-medium">
              {joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-github-muted">Years active</span>
            <span className="text-github-text font-medium">{yearsActive} year{yearsActive !== 1 ? 's' : ''}</span>
          </div>

          {user.location && (
            <div className="flex justify-between items-center">
              <span className="text-github-muted flex items-center gap-1">
                <MapPin size={14} />
                Location
              </span>
              <span className="text-github-text font-medium">{user.location}</span>
            </div>
          )}

          {user.company && (
            <div className="flex justify-between items-center">
              <span className="text-github-muted flex items-center gap-1">
                <Building size={14} />
                Company
              </span>
              <span className="text-github-text font-medium">{user.company}</span>
            </div>
          )}

          {user.blog && (
            <div className="flex justify-between items-center">
              <span className="text-github-muted flex items-center gap-1">
                <Link size={14} />
                Website
              </span>
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-github-accent hover:underline font-medium"
              >
                {user.blog.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {user.twitter_username && (
            <div className="flex justify-between items-center">
              <span className="text-github-muted">Twitter</span>
              <a 
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-github-accent hover:underline font-medium"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Activity Level Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="github-card p-4"
      >
        <h3 className="text-lg font-semibold text-github-text mb-3">
          🔥 Activity Level
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-github-muted">Profile Activity</span>
            <div className="flex items-center gap-2">
              {user.public_repos > 50 ? (
                <span className="text-green-400">🔥 Very Active</span>
              ) : user.public_repos > 20 ? (
                <span className="text-yellow-400">⚡ Active</span>
              ) : user.public_repos > 5 ? (
                <span className="text-blue-400">📈 Growing</span>
              ) : (
                <span className="text-github-muted">🌱 Starting</span>
              )}
            </div>
          </div>
          
          <div className="w-full bg-github-border rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-github-accent to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${Math.min((user.public_repos / 100) * 100, 100)}%` 
              }}
            ></div>
          </div>
          
          <div className="text-xs text-github-muted">
            Based on public repositories and community engagement
          </div>
        </div>
      </motion.div>
    </div>
  )
} 