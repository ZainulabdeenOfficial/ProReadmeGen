'use client'

import React from 'react'
import { Music, Cloud, Award, MapPin, Building, Calendar } from 'lucide-react'
import { GitHubUser } from '@/types/github'
import { 
  generateSpotifyUrl, 
  generateWeatherUrl, 
  generateCustomBadges,
  generateProfileViewsUrl
} from '@/lib/github'

interface SocialWidgetsProps {
  user: GitHubUser
}

export default function SocialWidgets({ user }: SocialWidgetsProps) {
  const badges = generateCustomBadges(user)

  return (
    <div className="space-y-6">
      {/* Custom Badges */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Profile Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <img 
              key={index}
              src={badge}
              alt={`Badge ${index + 1}`}
              className="h-7"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Profile Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Profile Analytics</h3>
        <div className="text-center">
          <img 
            src={generateProfileViewsUrl(user.login)}
            alt="Profile Views"
            className="mx-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Spotify Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Music className="h-5 w-5 text-green-500" />
          Currently Playing
        </h3>
        <div className="text-center">
          <img 
            src={generateSpotifyUrl()}
            alt="Spotify Currently Playing"
            className="mx-auto rounded-lg max-w-full"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Note: Requires Spotify integration
          </p>
        </div>
      </div>

      {/* Weather Widget */}
      {user.location && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            Weather in {user.location}
          </h3>
          <div className="text-center">
            <img 
              src={generateWeatherUrl(user.location)}
              alt={`Weather in ${user.location}`}
              className="mx-auto rounded-lg max-w-full"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.location && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <div>
                <p className="text-blue-100 text-sm">Location</p>
                <p className="font-semibold">{user.location}</p>
              </div>
            </div>
          </div>
        )}
        
        {user.company && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6" />
              <div>
                <p className="text-green-100 text-sm">Company</p>
                <p className="font-semibold">{user.company.replace('@', '')}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6" />
            <div>
              <p className="text-purple-100 text-sm">Joined GitHub</p>
              <p className="font-semibold">
                {new Date(user.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6" />
            <div>
              <p className="text-yellow-100 text-sm">Public Repos</p>
              <p className="font-semibold">{user.public_repos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 