const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'node_modules', '@expo', 'vector-icons', 'build', 'vendor', 'react-native-vector-icons', 'Fonts');
const destDir = path.resolve(__dirname, '..', 'public', 'fonts');

try {
  if (!fs.existsSync(srcDir)) {
    console.log(`Source fonts not found at ${srcDir}`);
    process.exit(0);
  }
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.ttf'));
  files.forEach(f => {
    const src = path.join(srcDir, f);
    const dest = path.join(destDir, f);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  });
} catch (err) {
  console.error('Failed to copy fonts:', err);
  process.exit(1);
}
