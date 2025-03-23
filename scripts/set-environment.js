// Set Environment Script
const fs = require('fs');
const path = require('path');

// Get the environment from command-line arguments
const env = process.argv[2];

if (!env || (env !== 'dev' && env !== 'prod')) {
  console.error('Please specify environment: dev or prod');
  console.error('Usage: node scripts/set-environment.js dev|prod');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');

// Copy the appropriate .env file
try {
  // Source file path based on environment
  const envSourceFile = path.join(rootDir, env === 'dev' ? '.env.development' : '.env.production');
  const envTargetFile = path.join(rootDir, '.env.local');

  // Check if source file exists
  if (!fs.existsSync(envSourceFile)) {
    console.error(`Environment file ${envSourceFile} does not exist!`);
    process.exit(1);
  }

  // Copy the file
  fs.copyFileSync(envSourceFile, envTargetFile);
  console.log(`✅ Environment variables updated for ${env} environment`);
} catch (error) {
  console.error('❌ Failed to update environment variables:', error);
  process.exit(1);
}

// Copy the appropriate netlify.toml file
try {
  // Source file path based on environment
  const netlifySourceFile = path.join(rootDir, env === 'dev' ? 'netlify.dev.toml' : 'netlify.prod.toml');
  const netlifyTargetFile = path.join(rootDir, 'netlify.toml');

  // Check if source file exists
  if (!fs.existsSync(netlifySourceFile)) {
    console.error(`Netlify config file ${netlifySourceFile} does not exist!`);
    process.exit(1);
  }

  // Copy the file
  fs.copyFileSync(netlifySourceFile, netlifyTargetFile);
  console.log(`✅ Netlify configuration updated for ${env} environment`);
} catch (error) {
  console.error('❌ Failed to update Netlify configuration:', error);
  process.exit(1);
}

console.log(`🚀 Successfully switched to ${env.toUpperCase()} environment!`); 