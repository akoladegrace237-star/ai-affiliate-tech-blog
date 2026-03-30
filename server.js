/**
 * server.js — Local Preview Server for AI Affiliate Tech Blog
 * ============================================================
 * Run `npm start` to launch the site in your browser without any hosting.
 *
 * How it works:
 *   • Serves every file in the project as a static asset.
 *   • Visiting http://localhost:3000 opens the homepage automatically.
 *   • All CSS, JS, images, and HTML relative paths work exactly as they do
 *     when deployed — because the browser resolves them against the real
 *     file URL (/src/pages/index.html), not the root redirect.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// -----------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
const ROOT = __dirname; // Project root — serves every file from here

// MIME type map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.md':   'text/markdown; charset=utf-8',
};

// -----------------------------------------------------------------------
// Request handler
// -----------------------------------------------------------------------
function requestHandler(req, res) {
  // Redirect bare "/" to the homepage
  if (req.url === '/' || req.url === '') {
    res.writeHead(302, { Location: '/src/pages/index.html' });
    res.end();
    return;
  }

  // Strip query strings (e.g. ?v=123)
  const urlPath = req.url.split('?')[0];

  // Resolve to an absolute file path, preventing directory traversal
  const filePath = path.normalize(path.join(ROOT, urlPath));

  // Safety check — never serve files outside the project root
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Read and serve the file
  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html><head><title>404 Not Found</title></head>
<body style="font-family:sans-serif;padding:2rem;">
  <h1>404 — Page Not Found</h1>
  <p>The file <code>${urlPath}</code> does not exist.</p>
  <p><a href="/src/pages/index.html">← Back to Homepage</a></p>
</body></html>`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error: ' + err.message);
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// -----------------------------------------------------------------------
// Open the browser automatically (cross-platform)
// -----------------------------------------------------------------------
function openBrowser(url) {
  try {
    const platform = process.platform;
    if (platform === 'win32') {
      execSync(`start "" "${url}"`);
    } else if (platform === 'darwin') {
      execSync(`open "${url}"`);
    } else {
      // Linux — try common browsers in order
      execSync(`xdg-open "${url}" 2>/dev/null || sensible-browser "${url}" 2>/dev/null || true`);
    }
  } catch (_) {
    // Silently ignore — browser opening is a convenience, not a requirement
  }
}

// -----------------------------------------------------------------------
// Start the server
// -----------------------------------------------------------------------
const server = http.createServer(requestHandler);

server.listen(PORT, '127.0.0.1', function () {
  const homeUrl = `http://localhost:${PORT}/src/pages/index.html`;

  console.log('');
  console.log('┌─────────────────────────────────────────────────┐');
  console.log('│   🤖  AI Affiliate Tech Blog — Local Preview     │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log(`│   🏠  Homepage:  ${homeUrl}  │`);
  console.log(`│   ℹ️   About:     http://localhost:${PORT}/src/pages/about.html        │`);
  console.log(`│   📝  Review:    http://localhost:${PORT}/src/pages/blog/sample-review.html │`);
  console.log('│                                                   │');
  console.log('│   Press Ctrl+C to stop the server.               │');
  console.log('└─────────────────────────────────────────────────┘');
  console.log('');

  // Give the OS a moment, then open the browser
  setTimeout(function () { openBrowser(homeUrl); }, 500);
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌  Port ${PORT} is already in use.`);
    console.error(`   Try a different port: PORT=3001 npm start\n`);
  } else {
    console.error('\n❌  Server error:', err.message);
  }
  process.exit(1);
});
