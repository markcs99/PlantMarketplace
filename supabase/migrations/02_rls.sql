-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- User policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid()::text::integer = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text::integer = id);

-- Product policies
-- Anyone can read active products
CREATE POLICY "Anyone can read active products" ON products
  FOR SELECT USING (status = 'active');

-- Sellers can read, update, and delete their own products
CREATE POLICY "Sellers can manage own products" ON products
  FOR ALL USING (auth.uid()::text::integer = seller_id);

-- Order policies
-- Buyers can read their own orders
CREATE POLICY "Buyers can read own orders" ON orders
  FOR SELECT USING (auth.uid()::text::integer = buyer_id);

-- Sellers can read orders for their products
CREATE POLICY "Sellers can see orders for their products" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = orders.id AND p.seller_id = auth.uid()::text::integer
    )
  );

-- Order Item policies
-- Buyers can read their own order items
CREATE POLICY "Buyers can read own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_items.order_id AND o.buyer_id = auth.uid()::text::integer
    )
  );

-- Sellers can read order items for their products
CREATE POLICY "Sellers can see order items for their products" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = order_items.product_id AND p.seller_id = auth.uid()::text::integer
    )
  );

-- Review policies
-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews" ON reviews
  FOR SELECT USING (true);

-- Reviewers can manage their own reviews
CREATE POLICY "Reviewers can manage own reviews" ON reviews
  FOR ALL USING (auth.uid()::text::integer = reviewer_id); 