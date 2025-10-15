const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy ui.html from src to dist
const uiSrc = path.join(srcDir, 'ui.html');
const uiDest = path.join(distDir, 'ui.html');

if (fs.existsSync(uiSrc)) {
  fs.copyFileSync(uiSrc, uiDest);
  console.log('✓ Copied ui.html to dist/');
} else {
  console.log('⚠ ui.html not found in src/');
}
