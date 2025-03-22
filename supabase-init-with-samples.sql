-- Create users table
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

-- Create products table
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

-- Create orders table
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

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  reviewer_id INTEGER REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- Insert sample users
INSERT INTO users (name, email, password_hash, password_salt, avatar, location)
VALUES
  (
    'Green Thumb Gardens',
    'greenthumb@example.com',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    'salt1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenThumb&backgroundColor=b6e3f4',
    'Bratislava'
  ),
  (
    'Plant Paradise',
    'plantparadise@example.com',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    'salt2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=PlantParadise&backgroundColor=ffd5dc',
    'Košice'
  )
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
-- First get the user IDs
DO $$
DECLARE
    user1_id INTEGER;
    user2_id INTEGER;
BEGIN
    SELECT id INTO user1_id FROM users WHERE email = 'greenthumb@example.com' LIMIT 1;
    SELECT id INTO user2_id FROM users WHERE email = 'plantparadise@example.com' LIMIT 1;
    
    IF user1_id IS NOT NULL AND user2_id IS NOT NULL THEN
        -- Insert products
        INSERT INTO products (title, description, price, seller_id, category, image, status)
        VALUES
          (
            'Monstera Deliciosa',
            'A beautiful Monstera plant with large, glossy leaves. Perfect for indoor decoration.',
            39.99,
            user1_id,
            'indoor',
            '/images/plants/plant1.jpg',
            'active'
          ),
          (
            'Fiddle Leaf Fig',
            'Tall and elegant fiddle leaf fig. Requires bright, indirect light.',
            49.99,
            user1_id,
            'indoor',
            '/images/plants/plant2.jpg',
            'active'
          ),
          (
            'Snake Plant',
            'Low-maintenance snake plant that thrives in both low and bright light conditions.',
            29.99,
            user2_id,
            'indoor',
            '/images/plants/plant3.jpg',
            'active'
          ),
          (
            'Peace Lily',
            'Beautiful flowering plant that purifies the air in your home.',
            34.99,
            user2_id,
            'indoor',
            '/images/plants/plant4.jpg',
            'active'
          ),
          (
            'Pothos',
            'Fast-growing vine with heart-shaped leaves. Very easy to care for.',
            24.99,
            user1_id,
            'hanging',
            '/images/plants/plant5.jpg',
            'active'
          ),
          (
            'ZZ Plant',
            'Nearly indestructible plant with glossy leaves. Perfect for beginners.',
            32.99,
            user2_id,
            'indoor',
            '/images/plants/plant6.jpg',
            'active'
          );
    END IF;
END $$; 