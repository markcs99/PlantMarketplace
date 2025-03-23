-- Add policy to allow service role to insert new users
CREATE POLICY "Service role can insert new users" ON users
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- Alternatively, if that doesn't work, we can try:
-- Allow public insert into users table for registration
CREATE POLICY "Allow public registration" ON users
  FOR INSERT 
  WITH CHECK (true); 