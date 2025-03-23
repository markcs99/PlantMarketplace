# Netlify Deployment Configuration

This directory contains configuration files for Netlify deployments of the Plant Marketplace application.

## Environment Files

- `netlify-production.env`: Contains environment variables for the production deployment (main branch)
- `netlify-development.env`: Contains environment variables for the development deployment (dev branch)

## How to Use

These environment files are not automatically used by Netlify. Instead, you need to:

1. Create a new Netlify site from your GitHub repository
2. Configure branch deployments for main (production) and dev (development)
3. Add the environment variables from these files to your Netlify site settings

### Setting Up Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to Site settings > Build & deploy > Environment
4. Add each environment variable from the appropriate .env file:
   - For the production branch (main): Use variables from `netlify-production.env`
   - For other branches (dev, deploy previews): Use variables from `netlify-development.env`

### Branch-Specific Deployments

The `netlify.toml` file in the root of the project contains context-specific configurations for:

- `production`: Main branch deployment (uses production environment)
- `dev`: Development branch deployment (uses development environment)
- `deploy-preview`: Pull request previews (uses development environment)

## Serverless Functions

The `functions/` directory contains the serverless functions that are deployed to Netlify:

- `auth.js`: Authentication functions
- `products.js`: Product management functions
- `orders.js`: Order management functions
- `reviews.js`: Review management functions
- `user.js`: User management functions 