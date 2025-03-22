# Plant Marketplace

A modern marketplace application for buying and selling plants. Built with Next.js, Tailwind CSS, and Supabase.

## Features

- User authentication and account management
- Product listings with search and filtering
- Shopping cart functionality
- Checkout process with Packeta delivery integration
- Order management
- Reviews and ratings system
- Seller profiles
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Netlify Functions (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom JWT implementation with Supabase
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/plant-marketplace.git
   cd plant-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update the Supabase credentials and other environment variables

4. Download sample images:
   ```bash
   node download-images.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Netlify Dev

To test serverless functions locally:

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Start the Netlify development environment:
   ```bash
   npm run netlify-dev
   # or 
   yarn netlify-dev
   ```

3. Open [http://localhost:8888](http://localhost:8888) in your browser.

## Production Setup

For detailed production setup instructions, see [PROD-SETUP.md](./PROD-SETUP.md).

### Quick Deployment Steps

1. Create a Supabase project and set up the database schema:
   - Use the `supabase-schema.sql` file to create all required tables

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set the appropriate environment variables
   - Deploy the application

## Folder Structure

```
plant-marketplace/
├── netlify/                  # Netlify serverless functions
│   └── functions/            # API endpoints
├── public/                   # Static assets
│   └── images/               # Product images
├── src/                      # Source code
│   ├── components/           # React components
│   ├── contexts/             # Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and libraries
│   ├── pages/                # Next.js pages
│   └── styles/               # Global styles
├── .env.local.example        # Example environment variables
├── next.config.js            # Next.js configuration
├── netlify.toml              # Netlify configuration
├── supabase-schema.sql       # Database schema
└── package.json              # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Plant images courtesy of Unsplash
- Icons from Heroicons
- UI inspiration from various plant selling websites 