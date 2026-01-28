const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'public', '_headers');
const destDir = path.resolve(__dirname, '..', 'dist');
const dest = path.join(destDir, '_headers');

try {
  if (!fs.existsSync(src)) {
    console.log(`No public/_headers found at ${src}`);
    process.exit(0);
  }
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
} catch (err) {
  console.error('Failed to copy _headers:', err);
  process.exit(1);
}
