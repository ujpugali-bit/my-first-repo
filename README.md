# Test Blog — my-first-repo

This is a minimal test blog hosting site intended for development and demonstration.

What this includes
- A tiny Node.js/Express server that serves Markdown files from the `posts/` directory and exposes a small JSON API.
- A simple single-page frontend (`index.html`) that lists posts and shows post content.
- Dockerfile + docker-compose for running locally.
- One sample post in `posts/`.

How to run locally
1. Install dependencies:
   ```
   npm install
   ```
2. Start the app:
   ```
   npm start
   ```
3. Open http://localhost:3000

Or with Docker:
```
docker-compose up --build
```

Project structure
- server.js — Express server and API
- posts/ — Markdown posts (hello-world.md)
- public/ — Static assets (index.html, styles.css)
- package.json, Dockerfile, docker-compose.yml
