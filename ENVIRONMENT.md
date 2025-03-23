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

### Setting Up Production Supabase

1. Create a new project on [Supabase Dashboard](https://supabase.com/dashboard)
2. Choose a name like `plant-marketplace-production` 
3. Set a secure database password
4. Choose a region close to your users
5. Wait for the project to be created
6. Go to Project Settings > API to get:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_KEY)
7. Update `.env.production` with these values
8. Initialize the production database:
   ```bash
   # Without sample data (recommended for production)
   npm run init:prod-db
   
   # With sample data (for testing)
   npm run init:prod-db:samples
   ```

## Netlify Configuration

Each environment should have its own Netlify deployment:

### Development Environment
- Netlify site: (Your development Netlify site)
- Config in `netlify.dev.toml`

### Production Environment
- Netlify site: (Your production Netlify site)
- Config in `netlify.prod.toml`

### Setting Up Netlify Sites

For both environments:

1. Log in to [Netlify](https://app.netlify.com/) 
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub repository
4. For dev environment:
   - Select the `dev` branch
   - Use the build command: `npm run use:dev && npm run build`
   - Set Base directory: `/`
   - Set Publish directory: `.next`
5. For prod environment:
   - Create a separate site
   - Select the `prod` branch
   - Use the build command: `npm run use:prod && npm run build`
   - Set Base directory: `/`
   - Set Publish directory: `.next`
6. Add environment variables in Netlify for each site (copy from respective .env files)

## Important Notes

- Never commit `.env.local` to Git (it's in .gitignore)
- Keep all environment files up to date when adding new variables
- When deploying to Netlify, make sure to set up the appropriate environment variables in the Netlify dashboard
- The service_role key has admin privileges - never expose it in client-side code 