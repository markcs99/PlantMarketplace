-- First, ensure RLS is enabled on users table (should already be enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop any existing INSERT policy on users table to avoid conflicts
DROP POLICY IF EXISTS "Allow public registration" ON users;
DROP POLICY IF EXISTS "Service role can insert new users" ON users;

-- Create a policy that allows anyone to register new users
-- This is appropriate for a registration endpoint
CREATE POLICY "Allow public registration" ON users
  FOR INSERT 
  WITH CHECK (true);

-- Keep the existing policies for SELECT and UPDATE
-- These restrict users to only seeing and updating their own data 