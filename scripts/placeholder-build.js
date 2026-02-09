#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Interactive Table – Work in Progress</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: #0a1128;
        color: #e0f1ff;
      }
      .card {
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        max-width: 460px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Interactive Table (CI placeholder)</h1>
      <p>
        This repository is waiting for the actual CSV upload experience.
        The GitHub Actions workflow is ready to build and deploy when the
        UI lands.
      </p>
    </div>
  </body>
</html>`;

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'index.html'), template, 'utf8');
console.log('Placeholder build finished.');
