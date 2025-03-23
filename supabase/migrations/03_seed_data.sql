-- Create an admin user
-- Password will be 'adminPassword123' - CHANGE THIS in production!
INSERT INTO users (name, email, password_hash, password_salt, avatar, location)
VALUES
  (
    'Admin User',
    'admin@plantmarketplace.com',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', -- hash of 'password'
    'adminsalt123',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=b6e3f4',
    'Bratislava'
  )
ON CONFLICT (email) DO NOTHING;

-- You can change this password through the application after setup 