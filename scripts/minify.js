#!/usr/bin/env node

/**
 * Minify JS files and generate source maps
 * 
 * Usage:
 *   node scripts/minify.js           # Minify all JS files in js/
 *   node scripts/minify.js file.js   # Minify specific file(s)
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const JS_DIR = path.join(__dirname, '..', 'js');

async function minifyFile(inputPath) {
  const filename = path.basename(inputPath);
  
  // Skip already minified files
  if (filename.endsWith('.min.js')) {
    return;
  }

  const baseName = filename.replace('.js', '');
  const outputPath = path.join(JS_DIR, `${baseName}.min.js`);
  const mapPath = path.join(JS_DIR, `${baseName}.min.js.map`);

  try {
    const code = fs.readFileSync(inputPath, 'utf8');
    
    const result = await minify(code, {
      sourceMap: {
        filename: `${baseName}.min.js`,
        url: `${baseName}.min.js.map`
      },
      compress: {
        drop_console: false, // Keep console.log for debugging
        drop_debugger: true
      },
      mangle: true,
      format: {
        comments: false
      }
    });

    if (result.code) {
      fs.writeFileSync(outputPath, result.code);
      console.log(`✓ Created ${baseName}.min.js`);
    }

    if (result.map) {
      fs.writeFileSync(mapPath, result.map);
      console.log(`✓ Created ${baseName}.min.js.map`);
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
        // Check if it's a path relative to js/
        if (arg.startsWith('js/')) {
          return path.join(__dirname, '..', arg);
        }
        return path.join(JS_DIR, path.basename(arg));
      })
      .filter(f => f.endsWith('.js') && !f.endsWith('.min.js'));
  } else {
    // Process all JS files in the js directory
    filesToProcess = fs.readdirSync(JS_DIR)
      .filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))
      .map(f => path.join(JS_DIR, f));
  }

  if (filesToProcess.length === 0) {
    console.log('No JS files to minify');
    return;
  }

  console.log(`\nMinifying ${filesToProcess.length} file(s)...\n`);

  for (const file of filesToProcess) {
    await minifyFile(file);
  }

  console.log('\nDone!\n');
}

main();
