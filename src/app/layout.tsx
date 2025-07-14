import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub README Generator | Create Stunning Profile READMEs',
  description: 'Generate beautiful, dynamic GitHub Profile READMEs with real-time data. Fetch live GitHub stats, repositories, and create amazing profile pages in seconds.',
  keywords: ['GitHub', 'README', 'Generator', 'Profile', 'Developer', 'Portfolio'],
  authors: [{ name: 'README Generator' }],
  openGraph: {
    title: 'GitHub README Generator | Create Stunning Profile READMEs',
    description: 'Generate beautiful, dynamic GitHub Profile READMEs with real-time data',
    type: 'website',
    url: 'https://github-readme-generator.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub README Generator',
    description: 'Generate beautiful, dynamic GitHub Profile READMEs with real-time data',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-github-dark">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#161b22',
                color: '#c9d1d9',
                border: '1px solid #30363d',
              },
            }}
          />
        </div>
      </body>
    </html>
  )
} 