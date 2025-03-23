-- Create a function to insert users that bypasses RLS
CREATE OR REPLACE FUNCTION create_user_bypassing_rls(
  p_email TEXT,
  p_name TEXT,
  p_password_hash TEXT,
  p_password_salt TEXT,
  p_avatar TEXT,
  p_location TEXT
) RETURNS JSONB
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  inserted_user JSONB;
BEGIN
  -- Insert the user
  INSERT INTO users (
    email,
    name,
    password_hash,
    password_salt,
    avatar,
    location,
    created_at,
    updated_at
  ) 
  VALUES (
    p_email,
    p_name,
    p_password_hash,
    p_password_salt,
    p_avatar,
    p_location,
    now(),
    now()
  )
  RETURNING to_jsonb(users.*) INTO inserted_user;
  
  RETURN inserted_user;
END;
$$ LANGUAGE plpgsql; 