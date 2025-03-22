# Plant Marketplace

A Next.js-based marketplace application for buying and selling plants.

## Features

- Browse plant listings
- User authentication
- Shopping cart functionality
- Checkout process with Packeta delivery integration
- User profiles
- Responsive design

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment to Netlify

### Method 1: Deploy via Netlify CLI

1. Install Netlify CLI globally (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize Netlify site configuration:
   ```bash
   netlify init
   ```

4. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

### Method 2: Deploy via Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to [Netlify](https://app.netlify.com/)

3. Click "New site from Git"

4. Choose your Git provider and repository

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

6. Click "Deploy site"

## Environment Variables

For production deployment, you may want to set the following environment variables:

- `NEXT_PUBLIC_API_URL`: API URL for backend services
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key for payments

## Notes

- This application uses client-side localStorage for data persistence in the demo version
- In a production environment, you would connect to a proper backend API

## Technology Stack

- **Frontend**: Next.js, React, React Native Web
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Styling**: TailwindCSS, Styled Components

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/plant-marketplace.git
   cd plant-marketplace
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Web Deployment

1. Build the application:
   ```
   npm run build
   ```

2. Deploy to your preferred hosting service (Vercel, Netlify, AWS, etc.).

### Mobile Deployment

For iOS and Android deployment, we'll use Capacitor to wrap our web application:

1. Add Capacitor to your project
2. Initialize Capacitor
3. Add platforms (iOS/Android)
4. Build and deploy to respective app stores

## Image Handling

The Plant Marketplace application includes several features for handling images:

### Directory Structure

- `/public/images/plants` - For storing plant images
- `/public/images/avatars` - For storing user profile images
- `/public/images/categories` - For storing category images

### Components

- `ImageUpload.js` - A reusable component for uploading images with preview functionality
  - Supports single or multiple image uploads
  - Provides image preview
  - Handles drag-and-drop functionality
  - Allows image removal

### Utilities

The application includes utility functions in `utils/image.js`:

- `uploadImage(file, type)` - Simulates uploading an image and returns a URL
- `getImageUrl(path, fallback)` - Gets the URL for an image or returns a fallback
- `getPlaceholderImage(width, height, text)` - Generates a placeholder image with specified dimensions and text

### Implementation

Images are handled in several key areas:

1. **Sell Page**: Users can upload up to 5 images when listing a plant for sale
2. **Profile Page**: Users can view their profile picture and plant listings with images
3. **Edit Profile Page**: Users can upload and update their profile picture
4. **Plant Detail Page**: Displays multiple images in a gallery for each plant
5. **Cart Page**: Shows thumbnail images of plants in the user's cart

### Fallback Handling

All image components include fallback handling to ensure a good user experience even when images fail to load.

## Other Features

- **Contact Form** - Allows users to contact the platform with questions or concerns
- **FAQ Page** - Provides answers to common questions about the platform
- **Terms of Service** - Outlines the rules and guidelines for using the platform
- **Privacy Policy** - Explains how user data is collected, used, and protected

## License

This project is licensed under the ISC License. 