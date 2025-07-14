'use client'

import React from 'react'
import { Code, Zap, Star, Layers } from 'lucide-react'
import { LanguageStats } from '@/types/github'
import { generateTechStackUrl } from '@/lib/github'

interface TechStackProps {
  languages: LanguageStats
  theme: string
}

export default function TechStack({ languages, theme }: TechStackProps) {
  const topLanguages = Object.keys(languages).slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Tech Stack Icons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5 text-blue-500" />
          Tech Stack
        </h3>
        <div className="text-center">
          <img 
            src={generateTechStackUrl(topLanguages, theme)}
            alt="Tech Stack"
            className="mx-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Language Progress Bars */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-purple-500" />
          Language Distribution
        </h3>
        <div className="space-y-4">
          {Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([lang, percentage], index) => (
              <div key={lang} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {lang}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 delay-${index * 100} ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-red-500' :
                      index === 4 ? 'bg-purple-500' :
                      'bg-pink-500'
                    }`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Skills Rating */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Skill Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([lang, percentage]) => {
              const skillLevel = 
                percentage > 20 ? 'Expert' :
                percentage > 10 ? 'Advanced' :
                percentage > 5 ? 'Intermediate' :
                'Beginner'
              
              const skillColor = 
                skillLevel === 'Expert' ? 'text-green-600 dark:text-green-400' :
                skillLevel === 'Advanced' ? 'text-blue-600 dark:text-blue-400' :
                skillLevel === 'Intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-gray-600 dark:text-gray-400'
              
              return (
                <div key={lang} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className={`h-4 w-4 ${skillColor}`} />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {lang}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${skillColor}`}>
                    {skillLevel}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
} 