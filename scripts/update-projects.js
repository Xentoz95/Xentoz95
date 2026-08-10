/**
 * DAYA MIDEA - README Auto-Updater
 *
 * This script updates the Featured Projects section of your README
 * with your latest repositories from GitHub.
 *
 * Usage: node scripts/update-projects.js
 *
 * Note: You need a GitHub Personal Access Token with 'repo' scope.
 * Set it as an environment variable: export GITHUB_TOKEN=your_token
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  username: 'Xentoz95',
  maxProjects: 6,
  token: process.env.GITHUB_TOKEN // Set via environment variable
};

if (!CONFIG.token) {
  console.error('❌ GitHub token not found!');
  console.error('   Set it with: export GITHUB_TOKEN=your_github_token');
  console.error('   Get a token at: https://github.com/settings/tokens');
  process.exit(1);
}

// Fetch repositories from GitHub API
function fetchRepositories() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${CONFIG.username}/repos?sort=updated&direction=desc&per_page=100`,
      method: 'GET',
      headers: {
        'User-Agent': 'DAYA-MIDEA-README-Updater',
        'Authorization': `token ${CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const repos = JSON.parse(data);
            resolve(repos);
          } catch (e) {
            reject(new Error('Failed to parse GitHub API response'));
          }
        } else if (res.statusCode === 401) {
          reject(new Error('Invalid or expired GitHub token'));
        } else {
          reject(new Error(`GitHub API returned status ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Generate project card markdown
function generateProjectCard(repo) {
  const name = repo.name;
  const description = repo.description || 'No description available';
  const stars = repo.stargazers_count;
  const language = repo.language || '';
  const url = repo.html_url;

  let techStack = '';
  if (language) {
    techStack = `**Tech Stack:** \`${language}\` `;
  }

  return `### 📦 ${name}
> ${description}

${techStack}**⭐ ${stars} stars**

[![View Project](https://img.shields.io/badge/View_on_GitHub-10B981?style=flat-square)](${url})

---
`;
}

// Main update function
async function updateReadme() {
  console.log('🚀 Starting README update...\n');

  try {
    // Fetch repositories
    console.log(`📡 Fetching repositories for @${CONFIG.username}...`);
    const allRepos = await fetchRepositories();

    // Filter out forks and get top projects
    const projects = allRepos
      .filter(repo => !repo.fork)
      .slice(0, CONFIG.maxProjects);

    console.log(`✅ Found ${projects.length} repositories\n`);

    if (projects.length === 0) {
      console.log('⚠️  No repositories found. Make sure you have pushed code to GitHub!');
      process.exit(0);
    }

    // Generate projects section
    let projectsSection = '\n';
    projects.forEach(repo => {
      projectsSection += generateProjectCard(repo);
    });

    console.log('📝 Generating projects section...');
    console.log(projectsSection);

    // Read current README
    const readmePath = path.join(__dirname, '..', 'README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // Replace content between markers
    const startMarker = '<!-- &&& FEATURED_PROJECTS_START &&& -->';
    const endMarker = '<!-- &&& FEATURED_PROJECTS_END &&& -->';

    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.error('❌ Could not find project markers in README.md');
      console.error('   Make sure your README has: <!-- &&& FEATURED_PROJECTS_START &&& --> and <!-- &&& FEATURED_PROJECTS_END &&& -->');
      process.exit(1);
    }

    // Replace the section
    const newReadme =
      readmeContent.substring(0, startIndex + startMarker.length) +
      '\n\n<!-- Auto-generated projects will appear below -->\n' +
      projectsSection +
      '\n' +
      readmeContent.substring(endIndex);

    // Write updated README
    fs.writeFileSync(readmePath, newReadme);

    console.log('✅ README.md updated successfully!');
    console.log(`📊 Added ${projects.length} projects`);
    console.log('\n💡 Commit and push to update your GitHub profile.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the updater
updateReadme();
