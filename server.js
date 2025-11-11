const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;
const POSTS_DIR = path.join(__dirname, 'posts');

app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: list posts (reads filenames and extracts first line as title)
app.get('/api/posts', (req, res) => {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    const posts = files.map(file => {
      const full = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(full, 'utf8');
      const titleMatch = content.split('\n').find(Boolean) || file;
      return {
        slug: path.basename(file, '.md'),
        title: titleMatch.replace(/^#\s*/, '').trim()
      };
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Unable to read posts' });
  }
});

// API: get post HTML by slug
app.get('/api/posts/:slug', (req, res) => {
  const slug = req.params.slug;
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Post not found' });
  const md = fs.readFileSync(file, 'utf8');
  const html = marked(md);
  res.json({ slug, html });
});

// Health
app.get('/health', (req, res) => res.send('ok'));

app.listen(PORT, () => {
  console.log(`Test blog running on http://localhost:${PORT}`);
});