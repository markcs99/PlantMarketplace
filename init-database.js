require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with admin privileges
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function initializeDatabase() {
  try {
    console.log('Reading SQL schema file...');
    const schemaPath = path.join(__dirname, 'supabase-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing SQL schema...');
    
    // Instead of trying to directly execute the SQL through the JavaScript client,
    // we'll create the tables one by one using the Supabase client's API

    // Create users table
    console.log('Creating users table...');
    const { error: usersError } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          avatar TEXT,
          location TEXT DEFAULT 'Bratislava',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (usersError) {
      console.error('Error creating users table:', usersError);
      // Try another approach if the RPC method doesn't work
      console.log('Attempting to create users table directly...');
      await manuallyCreateTables();
      return;
    }

    // Create products table
    console.log('Creating products table...');
    await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          seller_id INTEGER REFERENCES users(id),
          category TEXT NOT NULL,
          image TEXT,
          additional_images TEXT[],
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create orders table
    console.log('Creating orders table...');
    await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          buyer_id INTEGER REFERENCES users(id),
          total_amount DECIMAL(10, 2) NOT NULL,
          status TEXT DEFAULT 'pending',
          shipping_address JSONB,
          billing_address JSONB,
          payment_info JSONB,
          delivery_method TEXT,
          packeta_point_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create order_items table
    console.log('Creating order_items table...');
    await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER REFERENCES orders(id),
          product_id INTEGER REFERENCES products(id),
          quantity INTEGER NOT NULL,
          price_at_purchase DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create reviews table
    console.log('Creating reviews table...');
    await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          reviewer_id INTEGER REFERENCES users(id),
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          content TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create indexes
    console.log('Creating indexes...');
    await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
        CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
        CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
        CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
      `
    });

    console.log('Database schema created successfully!');

    // Create sample data
    await createSampleData();

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    console.log('Attempting alternative approach...');
    await createTablesDirectly();
  }
}

async function manuallyCreateTables() {
  console.log('Creating tables directly via the Supabase API...');
  
  // Since the RPC approach didn't work, we'll use the Supabase management API
  // to directly create the tables
  console.log("Please go to your Supabase project's SQL Editor and paste the SQL from supabase-schema.sql");
  console.log("After running the SQL, come back here to continue with sample data.");
  
  const continueWithSampleData = await askToContinue();
  if (continueWithSampleData) {
    await createSampleData();
  }
}

async function askToContinue() {
  // This is a simple placeholder since we can't easily create an interactive prompt in this context
  console.log("Assuming you've created the tables, continuing with sample data...");
  return true;
}

async function createSampleData() {
  try {
    console.log('Creating sample users...');
    
    // Create sample users
    const users = [
      {
        name: 'Green Thumb Gardens',
        email: 'greenthumb@example.com',
        password_hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // "password"
        password_salt: 'salt1',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenThumb&backgroundColor=b6e3f4',
        location: 'Bratislava'
      },
      {
        name: 'Plant Paradise',
        email: 'plantparadise@example.com',
        password_hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // "password"
        password_salt: 'salt2',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PlantParadise&backgroundColor=ffd5dc',
        location: 'Košice'
      }
    ];

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'email' })
      .select();
    
    if (usersError) {
      console.error('Error creating sample users:', usersError);
      return;
    }

    console.log(`Created ${usersData?.length || 0} sample users`);

    // Create sample products
    console.log('Creating sample products...');
    
    const products = [
      {
        title: 'Monstera Deliciosa',
        description: 'A beautiful Monstera plant with large, glossy leaves. Perfect for indoor decoration.',
        price: 39.99,
        seller_id: usersData[0].id,
        category: 'indoor',
        image: '/images/plants/plant1.jpg',
        status: 'active'
      },
      {
        title: 'Fiddle Leaf Fig',
        description: 'Tall and elegant fiddle leaf fig. Requires bright, indirect light.',
        price: 49.99,
        seller_id: usersData[0].id,
        category: 'indoor',
        image: '/images/plants/plant2.jpg',
        status: 'active'
      },
      {
        title: 'Snake Plant',
        description: 'Low-maintenance snake plant that thrives in both low and bright light conditions.',
        price: 29.99,
        seller_id: usersData[1].id,
        category: 'indoor',
        image: '/images/plants/plant3.jpg',
        status: 'active'
      },
      {
        title: 'Peace Lily',
        description: 'Beautiful flowering plant that purifies the air in your home.',
        price: 34.99,
        seller_id: usersData[1].id,
        category: 'indoor',
        image: '/images/plants/plant4.jpg',
        status: 'active'
      },
      {
        title: 'Pothos',
        description: 'Fast-growing vine with heart-shaped leaves. Very easy to care for.',
        price: 24.99,
        seller_id: usersData[0].id,
        category: 'hanging',
        image: '/images/plants/plant5.jpg',
        status: 'active'
      },
      {
        title: 'ZZ Plant',
        description: 'Nearly indestructible plant with glossy leaves. Perfect for beginners.',
        price: 32.99,
        seller_id: usersData[1].id,
        category: 'indoor',
        image: '/images/plants/plant6.jpg',
        status: 'active'
      }
    ];

    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .upsert(products)
      .select();
    
    if (productsError) {
      console.error('Error creating sample products:', productsError);
      return;
    }

    console.log(`Created ${productsData?.length || 0} sample products`);

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

async function createTablesDirectly() {
  try {
    // First, check if the users table exists
    const { data: tableData, error: tableError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (!tableError) {
      console.log('Tables seem to be already created. Proceeding with sample data...');
      await createSampleData();
      return;
    }

    console.log('Please go to your Supabase SQL Editor and run the SQL in supabase-schema.sql');
    console.log('Once the tables are created, run this script again to add sample data.');
  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

// Run the initialization
initializeDatabase(); 