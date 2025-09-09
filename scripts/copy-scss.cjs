const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');

function copyCss(srcDir, outDir) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(srcDir, e.name);
    const d = path.join(outDir, e.name);
    if (e.isDirectory()) {
      copyCss(s, d);
    } else if (e.isFile() && (e.name.endsWith('.css') || e.name.endsWith('.module.css'))) {
      fs.copyFileSync(s, d);
    }
  }
}

copyCss(SRC, DIST);
console.log('CSS files copied to dist');
