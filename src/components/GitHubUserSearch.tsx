'use client'

import React, { useState } from 'react'
import { Search, User, AlertCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { fetchGitHubUser } from '@/lib/github'
import { GitHubUser } from '@/types/github'

interface GitHubUserSearchProps {
  onUserFound: (user: GitHubUser) => void
}

export default function GitHubUserSearch({ onUserFound }: GitHubUserSearchProps) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim()) {
      setError('Please enter a GitHub username')
      return
    }

    setLoading(true)
    setError('')

    try {
      const user = await fetchGitHubUser(username.trim())
      onUserFound(user)
      toast.success(`Found ${user.name || user.login}! 🎉`)
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch user data'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    if (error) setError('')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <label htmlFor="username" className="block text-sm font-medium text-github-text mb-2">
            GitHub Username
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username (e.g., octocat)"
              className={`w-full px-4 py-3 pl-10 bg-github-bg border rounded-lg text-github-text placeholder-github-muted focus:outline-none focus:ring-2 focus:ring-github-accent transition-colors ${
                error 
                  ? 'border-github-danger focus:ring-github-danger' 
                  : 'border-github-border focus:border-github-accent'
              }`}
              disabled={loading}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-github-muted" size={16} />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-github-danger text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="w-full glow-button text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={16} />
              Searching...
            </>
          ) : (
            <>
              <Search size={16} />
              Generate README
            </>
          )}
        </button>
      </form>

      <div className="text-xs text-github-muted space-y-1">
        <p>💡 <strong>Tip:</strong> Make sure the GitHub profile is public</p>
        <p>🚀 <strong>Examples:</strong> torvalds, octocat, defunkt, mojombo</p>
      </div>
    </div>
  )
} 