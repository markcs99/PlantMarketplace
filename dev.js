// Simple script to start the Netlify development server
const { execSync } = require('child_process');

try {
  console.log('Starting Netlify development server...');
  execSync('npx netlify dev', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting development server:', error);
} 