# DAYA MIDEA Profile Setup Guide

## 📁 Files Created

```
Xentoz95/
├── README.md                      # Your GitHub profile (already updated)
├── .github/
│   └── workflows/
│       └── update-readme.yml      # GitHub Actions workflow (auto-run)
├── scripts/
│   └── update-projects.js        # Local updater script
├── package.json                   # Node.js config
└── SETUP.md                      # This file
```

---

## 🔄 Auto-Update Options

### Option 1: GitHub Actions (Fully Automatic) ✅ Recommended

**Setup Steps:**

1. **Go to your GitHub repo Settings**
   - Navigate to: `Settings → Secrets and variables → Actions`

2. **Add your GitHub Token**
   - Name: `GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token
   - (GitHub automatically provides this secret, no need to create one)

3. **The workflow will automatically run**
   - Daily at midnight UTC
   - Or manually via: Actions → "Update README with Latest Activity" → Run workflow

---

### Option 2: Local Script (Manual Update)

**Prerequisites:**
- Node.js installed

**Setup Steps:**

1. **Clone the repo**
   ```bash
   git clone https://github.com/Xentoz95/Xentoz95.git
   cd Xentoz95
   ```

2. **Set your GitHub token**
   ```bash
   # Linux/Mac
   export GITHUB_TOKEN=your_github_token_here

   # Windows (Command Prompt)
   set GITHUB_TOKEN=your_github_token_here

   # Windows (PowerShell)
   $env:GITHUB_TOKEN="your_github_token_here"
   ```

3. **Run the updater**
   ```bash
   npm run update-projects
   ```

4. **Commit and push**
   ```bash
   git add README.md
   git commit -m "🤖 Auto-update featured projects"
   git push
   ```

---

## 🔧 Get a GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it something like "README Updater"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories) - for updating
   - ✅ `read:user` (Read user profile data) - for reading your repos
5. Click "Generate token"
6. **Copy and save the token** (you won't see it again!)

---

## ⚡ Quick Commands

```bash
# Update README manually
npm run update-projects

# Commit changes
git add .
git commit -m "Your message"
git push

# Check GitHub Actions
# Go to: https://github.com/Xentoz95/Xentoz95/actions
```

---

## 📝 What Gets Auto-Updated

| Section | Auto-Update? |
|---------|-------------|
| GitHub Stats (stars, commits) | ✅ Yes (via external API) |
| Top Languages | ✅ Yes (via external API) |
| Profile Views | ✅ Yes (via external API) |
| Featured Projects | ✅ Yes (via GitHub Actions) |
| Everything else | ❌ Manual (About Me, Skills, etc.) |

---

## 🆘 Troubleshooting

### "GitHub token not found"
```bash
export GITHUB_TOKEN=your_token_here
```

### Workflow not running
- Go to Actions tab on GitHub
- Click "Update README with Latest Activity"
- Click "Run workflow" to test

### No projects showing
- Make sure you have pushed repositories to GitHub
- The script filters out forked repositories

---

## 💡 Tips

1. **Star your best projects** - They appear first
2. **Add good descriptions** - They show in project cards
3. **Update regularly** - Push new code to see activity

---

Built with ❤️ by **Joseph Thuo | DAYA MIDEA**
