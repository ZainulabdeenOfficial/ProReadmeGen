'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { GitHubUser } from '@/types/github'
import { Sparkles, Star, Code, Zap, Heart, Rocket } from 'lucide-react'

interface AnimatedBannerProps {
  user: GitHubUser
  theme: string
}

export default function AnimatedBanner({ user, theme }: AnimatedBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = {
      dark: ['#58a6ff', '#f85149', '#7ee787', '#ffa657', '#da70d6'],
      light: ['#0969da', '#d1242f', '#116329', '#bf8700', '#8250df'],
      tokyonight: ['#7aa2f7', '#f7768e', '#9ece6a', '#e0af68', '#bb9af7'],
      radical: ['#fe428e', '#a9fef7', '#fd1d53', '#f8d847', '#81ffef'],
      dracula: ['#ff79c6', '#8be9fd', '#50fa7b', '#ffb86c', '#bd93f9'],
      gruvbox: ['#fabd2f', '#fb4934', '#b8bb26', '#fe8019', '#d3869b'],
      cobalt: ['#1f9ede', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
      synthwave: ['#ff6ac1', '#00d9ff', '#ff9472', '#f038ff', '#00ff9f'],
      highcontrast: ['#ffffff', '#ffff00', '#ff0000', '#00ff00', '#00ffff'],
      ocean: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
    }

    const themeColors = colors[theme as keyof typeof colors] || colors.tokyonight

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: themeColors[Math.floor(Math.random() * themeColors.length)]
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [theme])

  const themeGradients = {
    dark: 'from-gray-900 via-blue-900 to-purple-900',
    light: 'from-blue-50 via-indigo-100 to-purple-100',
    tokyonight: 'from-indigo-900 via-purple-900 to-pink-900',
    radical: 'from-pink-900 via-red-900 to-orange-900',
    dracula: 'from-purple-900 via-pink-900 to-indigo-900',
    gruvbox: 'from-yellow-900 via-orange-900 to-red-900',
    cobalt: 'from-blue-900 via-cyan-900 to-teal-900',
    synthwave: 'from-purple-900 via-pink-900 to-cyan-900',
    highcontrast: 'from-black via-gray-900 to-black',
    ocean: 'from-blue-900 via-teal-900 to-cyan-900'
  }

  const gradient = themeGradients[theme as keyof typeof themeGradients] || themeGradients.tokyonight

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${gradient} rounded-2xl p-8 shadow-2xl`}>
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 6s ease-in-out infinite'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Enhanced Avatar Section */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Floating Icons */}
          {[Sparkles, Star, Code, Zap, Heart, Rocket].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${50 + 60 * Math.cos((index * Math.PI * 2) / 6)}px`,
                top: `${50 + 60 * Math.sin((index * Math.PI * 2) / 6)}px`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              <Icon className="h-6 w-6 text-white opacity-70" />
            </motion.div>
          ))}

          {/* Multiple Glow Rings */}
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-[-20px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-xl opacity-30"></div>
            <div className="absolute inset-[-10px] bg-gradient-to-r from-pink-400 to-red-600 rounded-full blur-lg opacity-40"></div>
          </div>
          
          {/* Main Avatar */}
          <motion.div 
            className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={user.avatar_url} 
              alt={user.login}
              className="w-full h-full object-cover"
            />
            {/* Online Indicator with Animation */}
            <motion.div 
              className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced User Info */}
        <motion.div 
          className="flex-1 text-center lg:text-left text-white"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {user.name || user.login}
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-blue-200 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            @{user.login}
          </motion.p>

          {user.bio && (
            <motion.p 
              className="text-lg text-white/80 mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {user.bio}
            </motion.p>
          )}

          {/* Animated Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {[
              { label: 'Repositories', value: user.public_repos, icon: '📁', color: 'from-blue-400 to-cyan-400' },
              { label: 'Followers', value: user.followers, icon: '👥', color: 'from-green-400 to-emerald-400' },
              { label: 'Following', value: user.following, icon: '🤝', color: 'from-purple-400 to-pink-400' },
              { label: 'Gists', value: user.public_gists, icon: '📝', color: 'from-yellow-400 to-orange-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl shadow-lg backdrop-blur-sm border border-white/20`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons with Hover Effects */}
          <motion.div 
            className="flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">🚀</span>
              View Profile
            </motion.a>
            
            {user.blog && (
              <motion.a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">🌐</span>
                Website
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Animation Elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
} 