#!/usr/bin/env node

/**
 * Minify CSS files with Autoprefixer and generate source maps
 * 
 * Usage:
 *   node scripts/minify-css.js              # Minify all CSS files in css/
 *   node scripts/minify-css.js file.css     # Minify specific file(s)
 */

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const CSS_DIR = path.join(__dirname, '..', 'css');

async function minifyFile(inputPath) {
  const filename = path.basename(inputPath);
  
  // Skip already minified files
  if (filename.endsWith('.min.css')) {
    return;
  }

  const baseName = filename.replace('.css', '');
  const outputPath = path.join(CSS_DIR, `${baseName}.min.css`);
  const mapPath = path.join(CSS_DIR, `${baseName}.min.css.map`);

  try {
    const css = fs.readFileSync(inputPath, 'utf8');
    
    const result = await postcss([
      autoprefixer,
      cssnano({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        }]
      })
    ]).process(css, {
      from: inputPath,
      to: outputPath,
      map: {
        inline: false,
        annotation: `${baseName}.min.css.map`
      }
    });

    fs.writeFileSync(outputPath, result.css);
    console.log(`✓ Created ${baseName}.min.css`);

    if (result.map) {
      fs.writeFileSync(mapPath, result.map.toString());
      console.log(`✓ Created ${baseName}.min.css.map`);
    }

  } catch (error) {
    console.error(`✗ Error minifying ${filename}:`, error.message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  let filesToProcess = [];

  if (args.length > 0) {
    // Process specific files passed as arguments
    filesToProcess = args
      .map(arg => {
        // Handle both full paths and just filenames
        if (path.isAbsolute(arg)) {
          return arg;
        }
        // Check if it's a path relative to css/
        if (arg.startsWith('css/')) {
          return path.join(__dirname, '..', arg);
        }
        return path.join(CSS_DIR, path.basename(arg));
      })
      .filter(f => f.endsWith('.css') && !f.endsWith('.min.css'));
  } else {
    // Process all CSS files in the css directory
    filesToProcess = fs.readdirSync(CSS_DIR)
      .filter(f => f.endsWith('.css') && !f.endsWith('.min.css'))
      .map(f => path.join(CSS_DIR, f));
  }

  if (filesToProcess.length === 0) {
    console.log('No CSS files to minify');
    return;
  }

  console.log(`\nMinifying ${filesToProcess.length} CSS file(s)...\n`);

  for (const file of filesToProcess) {
    await minifyFile(file);
  }

  console.log('\nDone!\n');
}

main();
