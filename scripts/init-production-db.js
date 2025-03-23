const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.production' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be set in .env.production');
  process.exit(1);
}

// Initialize Supabase client with service role key (admin access)
const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSql(sql) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'params=single-object'
      },
      body: JSON.stringify({
        query: sql
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SQL execution failed: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting production database setup...');
    
    // Read schema SQL file
    const schemaPath = path.join(__dirname, '../supabase-schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.error(`Error: Schema file not found at ${schemaPath}`);
      process.exit(1);
    }
    
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema SQL
    console.log('Creating database schema...');
    try {
      await executeSql(schemaSql);
      console.log('✅ Database schema created successfully!');
    } catch (error) {
      console.error('Error creating schema:', error);
      process.exit(1);
    }
    
    // Optionally add sample data
    const addSampleData = process.argv.includes('--with-samples');
    
    if (addSampleData) {
      const samplesPath = path.join(__dirname, '../supabase-init-with-samples.sql');
      if (!fs.existsSync(samplesPath)) {
        console.error(`Error: Sample data file not found at ${samplesPath}`);
        process.exit(1);
      }
      
      const samplesSql = fs.readFileSync(samplesPath, 'utf8');
      
      console.log('Adding sample data...');
      try {
        await executeSql(samplesSql);
        console.log('✅ Sample data added successfully!');
      } catch (error) {
        console.error('Error adding sample data:', error);
        process.exit(1);
      }
    }
    
    console.log('🚀 Production database setup complete!');
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

main(); 