const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local file');
  console.error('Make sure SUPABASE_URL and SUPABASE_KEY are defined');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Try to perform a simple query to test connection
    const { error } = await supabase.from('_prisma_migrations').select('*', { count: 'exact', head: true });
    
    if (error && error.code !== '42P01') {
      console.error('Error connecting to Supabase:', error.message);
      return false;
    }
    
    // If we got a "relation does not exist" error (42P01), that's fine - it just means this table doesn't exist
    // but the connection itself is working
    
    console.log('✅ Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('Unexpected error testing Supabase connection:', error.message);
    return false;
  }
}

async function checkExistingTables() {
  try {
    console.log('\nChecking for existing tables...');
    
    // Check if users table exists
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
      
    if (usersError && usersError.code !== '42P01') {
      console.error('Error checking users table:', usersError.message);
    } else if (usersError && usersError.code === '42P01') {
      console.log('❌ Users table does not exist. You need to create the database schema.');
    } else {
      console.log('✅ Users table exists');
    }
    
    // Output instructions for setting up the database
    console.log('\n--------------------------------------------------------');
    console.log('INSTRUCTIONS FOR SETTING UP THE DATABASE');
    console.log('--------------------------------------------------------');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Click on "SQL Editor" in the left sidebar');
    console.log('3. Click "New query"');
    console.log('4. Open the file "supabase-init-with-samples.sql" from this project');
    console.log('5. Copy and paste the entire SQL content into the SQL Editor');
    console.log('6. Click "Run" to execute the SQL and create all tables and sample data');
    console.log('7. After running the SQL, come back and run this script again to verify');
    console.log('--------------------------------------------------------\n');
    
  } catch (error) {
    console.error('Error checking tables:', error.message);
  }
}

async function main() {
  const connected = await checkSupabaseConnection();
  
  if (connected) {
    await checkExistingTables();
  } else {
    console.log('\nPlease check your Supabase credentials and try again.');
    console.log('Make sure the SUPABASE_URL and SUPABASE_KEY in your .env.local file are correct.');
  }
}

main().catch(error => {
  console.error('Error in main function:', error.message);
  process.exit(1);
}); 