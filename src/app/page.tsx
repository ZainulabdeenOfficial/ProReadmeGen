'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Code, 
  Star, 
  GitFork, 
  Users, 
  Sparkles, 
  Zap, 
  TrendingUp,
  Award,
  Activity,
  Palette,
  Bot,
  Rocket,
  Music,
  Cloud,
  BarChart3
} from 'lucide-react'
import GitHubUserSearch from '@/components/GitHubUserSearch'
import ReadmeGenerator from '@/components/ReadmeGenerator'
import ReadmePreview from '@/components/ReadmePreview'
import AdvancedStats from '@/components/AdvancedStats'
import TechStack from '@/components/TechStack'
import SocialWidgets from '@/components/SocialWidgets'
import FeatureShowcase from '@/components/FeatureShowcase'
import ThemePreview from '@/components/ThemePreview'
import AnimatedBanner from '@/components/AnimatedBanner'
import { GitHubUser } from '@/types/github'
import { calculateLanguageStats, fetchAllUserRepositories } from '@/lib/github'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null)
  const [readmeContent, setReadmeContent] = useState<string>('')
  const [showAdvancedPreview, setShowAdvancedPreview] = useState(false)
  const [languageStats, setLanguageStats] = useState<any>({})
  const [currentTheme, setCurrentTheme] = useState('tokyonight')

  const handleUserSelect = async (user: GitHubUser) => {
    setSelectedUser(user)
    setReadmeContent('')
    
    // Fetch language stats for advanced components
    try {
      const repos = await fetchAllUserRepositories(user.login)
      const stats = await calculateLanguageStats(repos)
      setLanguageStats(stats)
    } catch (error) {
      console.error('Error fetching language stats:', error)
    }
  }

  const handleReadmeGenerated = (content: string) => {
    setReadmeContent(content)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <motion.div 
            className="text-center space-y-6"
            {...fadeInUp}
          >
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <Rocket className="h-10 w-10 text-purple-600" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Amazing
              </span>
              <br />
              <span className="text-white">GitHub README</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Create stunning, professional GitHub profile READMEs with advanced features, 
              real-time data, beautiful themes, animated banners, GIFs, and interactive elements! ✨🚀
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {[
                { icon: Activity, text: 'Real-Time GitHub Data', color: 'from-green-400 to-blue-500' },
                { icon: Palette, text: '25+ Premium Themes', color: 'from-purple-400 to-pink-500' },
                { icon: Zap, text: 'Advanced Analytics', color: 'from-yellow-400 to-red-500' },
                { icon: Bot, text: 'AI-Powered Content', color: 'from-blue-400 to-indigo-500' },
                { icon: Music, text: 'Animated Banners & GIFs', color: 'from-pink-400 to-red-500' },
                { icon: BarChart3, text: '3D Contributions', color: 'from-green-400 to-teal-500' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className={`bg-gradient-to-r ${feature.color} p-3 rounded-full text-white font-medium text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <feature.icon className="h-4 w-4" />
                  {feature.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Amazing User Banner Section */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
            <AnimatedBanner user={selectedUser} theme={currentTheme} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Feature Showcase */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Incredible Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create an absolutely stunning GitHub profile that will blow minds! 🤯
          </p>
        </motion.div>

        <FeatureShowcase />
      </div>

      {/* Main Generator Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - User Search & Generator */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            {...fadeInUp}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Find GitHub User
              </h3>
              <GitHubUserSearch onUserFound={handleUserSelect} />
            </div>

            <AnimatePresence mode="wait">
              {selectedUser && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReadmeGenerator 
                    user={selectedUser} 
                    onReadmeGenerated={handleReadmeGenerated}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Preview & Advanced Features */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Preview Panel */}
            {(readmeContent || selectedUser) && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Code className="h-5 w-5 text-green-500" />
                      README Preview 🚀
                    </h3>
                    {selectedUser && Object.keys(languageStats).length > 0 && (
                      <button
                        onClick={() => setShowAdvancedPreview(!showAdvancedPreview)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                      >
                        <TrendingUp className="h-4 w-4" />
                        {showAdvancedPreview ? 'Hide' : 'Show'} Advanced Features
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  {readmeContent ? (
                    <ReadmePreview content={readmeContent} />
                  ) : selectedUser ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Generate Amazing README" to see your incredible preview! ✨</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Advanced Features Preview */}
            <AnimatePresence>
              {showAdvancedPreview && selectedUser && Object.keys(languageStats).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Advanced Stats Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Advanced GitHub Analytics 📊
                    </h4>
                    <AdvancedStats user={selectedUser} theme={currentTheme} />
                  </div>

                  {/* Tech Stack Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-purple-500" />
                      Tech Stack & Skills 🛠️
                    </h4>
                    <TechStack languages={languageStats} theme="light" />
                  </div>

                  {/* Social Widgets Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Social & Profile Widgets 🌟
                    </h4>
                    <SocialWidgets user={selectedUser} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Theme Showcase */}
            {!selectedUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  25+ Beautiful Themes 🎨
                </h4>
                <ThemePreview theme="tokyonight" username="demo" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Stats Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Star, label: 'Amazing Features', value: '25+', color: 'text-yellow-400' },
              { icon: Palette, label: 'Premium Themes', value: '25+', color: 'text-purple-400' },
              { icon: Users, label: 'Happy Users', value: '10K+', color: 'text-blue-400' },
              { icon: Award, label: 'Success Rate', value: '100%', color: 'text-green-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white"
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <Sparkles className="h-5 w-5" />
            <span>Built with ❤️ and lots of ✨ magic for the GitHub community</span>
          </div>
          <p className="text-gray-500 text-sm">
            Create absolutely stunning GitHub profile READMEs with real-time data, animated banners, and 25+ beautiful themes! 🚀
          </p>
        </div>
      </footer>
    </div>
  )
} 