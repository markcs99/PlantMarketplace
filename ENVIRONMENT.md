# Environment Setup Guide

This project supports multiple environments with separate configurations for Supabase and Netlify.

## Branches

- `main` - Main development branch
- `dev` - Development environment
- `prod` - Production environment

## Environment Configuration

The project includes environment-specific configurations:

- `.env.development`: Environment variables for development
- `.env.production`: Environment variables for production
- `netlify.dev.toml`: Netlify configuration for development
- `netlify.prod.toml`: Netlify configuration for production

## Switching Environments

You can switch between environments using NPM scripts:

```bash
# Switch to development environment
npm run use:dev

# Switch to production environment
npm run use:prod

# Run the development server with development environment
npm run dev:dev

# Run the development server with production environment
npm run dev:prod
```

## Setting Up a New Environment

When setting up a new environment:

1. Copy the appropriate environment file to `.env.local`
2. Copy the appropriate Netlify config file to `netlify.toml`
3. Make sure you're using the correct Supabase project credentials

## Supabase Configuration

Each environment should have its own Supabase project:

### Development Environment
- Supabase URL: https://afzpwrhmrjtvvdgldfsb.supabase.co
- Set in `.env.development`

### Production Environment
- Supabase URL: (Your production Supabase URL)
- Set in `.env.production`

## Netlify Configuration

Each environment should have its own Netlify deployment:

### Development Environment
- Netlify site: (Your development Netlify site)
- Config in `netlify.dev.toml`

### Production Environment
- Netlify site: (Your production Netlify site)
- Config in `netlify.prod.toml`

## Important Notes

- Never commit `.env.local` to Git (it's in .gitignore)
- Keep all environment files up to date when adding new variables
- When deploying to Netlify, make sure to set up the appropriate environment variables in the Netlify dashboard 