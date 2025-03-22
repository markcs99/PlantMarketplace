# Production Setup: PlantMarketplace

This document outlines the steps to set up PlantMarketplace for production using Supabase for the database and Netlify for hosting and serverless functions.

## 1. Supabase Setup

### Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up/log in
2. Create a new project
3. Note your project URL and API keys from the project dashboard

### Set Up Database Schema

1. In your Supabase project, navigate to the SQL Editor
2. Copy the contents of `supabase-schema.sql` in this repository
3. Run the SQL to create the necessary tables and indexes

## 2. Netlify Setup

### Connect Your Repository

1. Log in to [Netlify](https://netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub account and select the PlantMarketplace repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Environment Variables

In your Netlify site settings, add the following environment variables:

1. Go to Site settings > Environment variables
2. Add the following variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase service role key (for serverless functions)
   - `NEXT_PUBLIC_API_URL`: URL to your API (e.g., `https://your-netlify-site.netlify.app/api`)

## 3. Local Development with Production Services

To develop locally while using the production Supabase:

1. Create a `.env.local` file in the project root with:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_API_URL=/api
   ```

2. Run the application with Netlify Dev (this starts both Next.js and the serverless functions):
   ```
   npm run netlify-dev
   ```

## 4. Testing Authentication

1. Register a new user at `http://localhost:8888/signup` (or your Netlify dev URL)
2. Log in with the registered credentials
3. Verify that you can access protected routes

## 5. Deployment

### Deploy to Netlify

1. Commit your changes to your GitHub repository
2. Netlify will automatically deploy your site

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
netlify deploy --prod
```

## 6. Database Migration from Local to Production

If you have existing data in your local development version:

1. Export your user data, excluding passwords
2. Create a SQL script to insert users with new secure passwords
3. Import products and other data

## 7. Security Considerations

- The production setup uses proper password hashing with salt
- JWTs are used for authentication
- Sensitive information is never stored in the client
- Environment variables secure API keys and credentials

## 8. Troubleshooting

### Function Logs

Check your serverless function logs in the Netlify dashboard:
1. Go to Functions > Your function name
2. View logs for debugging information

### Local Testing

Use the Netlify Dev environment to test functions locally:
```
npm run netlify-dev
``` 