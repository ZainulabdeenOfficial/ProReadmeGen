'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, Camera, Palette, Zap, Gift, Smile } from 'lucide-react'

export default function FeatureShowcase() {
  const features = [
    {
      icon: <Sparkles className="text-yellow-400" size={24} />,
      title: "Dynamic Emojis & GIFs",
      description: "Personalized emojis based on your location, languages, and coding style + animated GIFs",
      highlight: "🎨 Smart & Fun"
    },
    {
      icon: <Users className="text-blue-400" size={24} />,
      title: "Recent Followers Display",
      description: "Show your first 5 followers with profile pictures and create community engagement",
      highlight: "👥 Community Focus"
    },
    {
      icon: <Camera className="text-green-400" size={24} />,
      title: "Enhanced User Banner",
      description: "Beautiful avatar display with glow effects, activity levels, and fun facts",
      highlight: "✨ Professional Look"
    },
    {
      icon: <Palette className="text-purple-400" size={24} />,
      title: "10 Amazing Themes",
      description: "Tokyo Night, Dracula, Synthwave, Gruvbox, and 6 more stunning theme options",
      highlight: "🌈 Style Variety"
    },
    {
      icon: <Zap className="text-orange-400" size={24} />,
      title: "Real-Time Data",
      description: "Live GitHub stats, actual repositories, genuine programming languages usage",
      highlight: "📊 100% Authentic"
    },
    {
      icon: <Gift className="text-pink-400" size={24} />,
      title: "Unique Sections",
      description: "Coding jokes, inspirational quotes, fun facts, activity levels, and personality traits",
      highlight: "🎁 Personalized"
    },
    {
      icon: <Smile className="text-cyan-400" size={24} />,
      title: "Friendly & Interactive",
      description: "Time-based greetings, personality analysis, coding humor, and community features",
      highlight: "😊 Human Touch"
    },
    {
      icon: <Heart className="text-red-400" size={24} />,
      title: "Advanced Customization",
      description: "Toggle 11 different components, personalized content, and smart emoji selection",
      highlight: "❤️ Your Style"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="github-card rounded-2xl p-8 my-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-github-text mb-3 flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400" size={32} />
          🎉 NEW: Amazing Features Added!
          <Sparkles className="text-yellow-400" size={32} />
        </h2>
        <p className="text-github-muted text-lg">
          Your README generator just got a <strong className="text-github-accent">massive upgrade</strong>! 
          Check out these incredible new features:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-github-bg/50 rounded-xl p-4 border border-github-border hover:border-github-accent/50 transition-all hover:scale-105 hover:shadow-glow"
          >
            <div className="flex items-center justify-between mb-3">
              {feature.icon}
              <span className="text-xs bg-github-accent/20 text-github-accent px-2 py-1 rounded-full font-medium">
                {feature.highlight}
              </span>
            </div>
            
            <h3 className="text-sm font-semibold text-github-text mb-2">
              {feature.title}
            </h3>
            
            <p className="text-xs text-github-muted leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-github-accent/5 via-purple-500/5 to-pink-500/5 rounded-xl border border-github-accent/20">
        <div className="text-center">
          <h3 className="text-xl font-bold text-github-text mb-2 flex items-center justify-center gap-2">
            🚀 Ready to Create Magic?
          </h3>
          <p className="text-github-muted mb-4">
            Your README will now include <strong>dynamic emojis</strong>, <strong>animated GIFs</strong>, 
            <strong> follower profiles</strong>, and <strong>personalized content</strong> based on your GitHub data!
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">✅ Real GitHub Data</span>
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">🎨 Smart Emojis</span>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">👥 Follower Display</span>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">🎭 10 Themes</span>
            <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full">😄 Fun Features</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 