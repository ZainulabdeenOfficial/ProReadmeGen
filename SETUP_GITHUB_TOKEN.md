# 🔑 Fix GitHub API 403 Errors - Setup Guide

You're seeing 403 errors because GitHub limits unauthenticated requests to **60 per hour**. Adding a GitHub token increases this to **5000 per hour**.

## Quick Fix Steps:

### 1. Create `.env.local` file
In your project root (same folder as `package.json`), create a file named `.env.local`:

```bash
# GitHub Personal Access Token
GITHUB_TOKEN=your_actual_token_here
```

### 2. Get GitHub Token
1. Go to: https://github.com/settings/personal-access-tokens/tokens
2. Click "Generate new token" 
3. Select **"Tokens (classic)"**
4. Set expiration (90 days recommended)
5. Check **"public_repo"** scope only
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### 3. Add Token to `.env.local`
Replace `your_actual_token_here` with your token:

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Example `.env.local` file:
```bash
# GitHub README Generator Environment Variables
GITHUB_TOKEN=ghp_1234567890abcdef1234567890abcdef12345678

# Note: Keep this file private! It's already in .gitignore
```

## Alternative: Test with Public User
If you don't want to set up a token right now, try these usernames that should work:
- `octocat` (GitHub's mascot)
- `torvalds` (Linux creator)
- `gaearon` (React team)

These are popular users and should work even with rate limits.

---

**After setting up the token, your 403 errors should disappear! 🎉** 