const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

console.log('Starting Next.js development server...');

// Run the Next.js dev server
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

nextDev.on('error', (err) => {
  console.error('Failed to start Next.js server:', err);
});

// Exit cleanly on Ctrl+C
process.on('SIGINT', () => {
  console.log('Stopping Next.js development server...');
  nextDev.kill('SIGINT');
  process.exit(0);
}); 