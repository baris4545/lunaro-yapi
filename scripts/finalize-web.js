const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const webBuild = path.join(cwd, 'web-build');
const out = path.join(cwd, 'dist');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

if (fs.existsSync(out)) {
  console.log('dist already exists — leaving as-is');
  process.exit(0);
}

if (fs.existsSync(webBuild)) {
  console.log('Moving web-build -> dist');
  const ok = copyDir(webBuild, out);
  if (!ok) {
    console.error('Failed to copy web-build');
    process.exit(1);
  }
  console.log('Copied to dist');
  process.exit(0);
}

// older expo versions may output to "dist" already
if (fs.existsSync(out)) {
  console.log('dist exists');
  process.exit(0);
}

console.warn('No web-build or dist directory found after expo export:web');
process.exit(0);
