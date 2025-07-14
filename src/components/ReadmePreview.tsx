'use client'

import React, { useState } from 'react'
import { Eye, Code, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'

interface ReadmePreviewProps {
  content: string
}

export default function ReadmePreview({ content }: ReadmePreviewProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copy(content)
    setCopied(true)
    toast.success('README copied to clipboard! 🎉')
    setTimeout(() => setCopied(false), 2000)
  }

  const renderMarkdown = (markdown: string) => {
    // Simple markdown to HTML conversion for preview
    let html = markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-github-card px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-github-accent pl-4 italic text-github-muted">$1</blockquote>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-github-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />')
      .replace(/\n/gim, '<br />')

    return html
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-github-accent text-white'
                : 'text-github-muted hover:text-github-text'
            }`}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'code'
                ? 'bg-github-accent text-white'
                : 'text-github-muted hover:text-github-text'
            }`}
          >
            <Code size={16} />
            Markdown
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-github-success hover:bg-github-success/80 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="border border-github-border rounded-lg overflow-hidden">
        {viewMode === 'preview' ? (
          <div className="bg-github-card p-6 max-h-96 overflow-y-auto">
            <div 
              className="prose prose-invert max-w-none text-github-text"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        ) : (
          <div className="relative">
            <SyntaxHighlighter
              language="markdown"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                maxHeight: '400px',
                fontSize: '14px',
                background: 'rgba(13, 17, 23, 0.95)',
              }}
              showLineNumbers
              wrapLines
            >
              {content}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      <div className="text-xs text-github-muted space-y-1">
        <p>📝 <strong>Usage:</strong> Copy the markdown and paste it into your GitHub profile README.md</p>
        <p>🔧 <strong>Tip:</strong> Switch to Preview mode to see how it will look on GitHub</p>
        <p>⚡ <strong>Note:</strong> Some dynamic elements may not work in the preview but will work on GitHub</p>
      </div>
    </div>
  )
} 