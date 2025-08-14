#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Building client for Netlify deployment...');

try {
  // Build the client using the client-specific Vite config
  execSync('npx vite build --config vite.config.client.ts', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('✓ Client build completed successfully!');
} catch (error) {
  console.error('✗ Build failed:', error.message);
  process.exit(1);
}