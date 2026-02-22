import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  const email = 'barbarakatusabe999@gmail.com';
  const password = 'QWer12@*';

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert or update the admin user
  const { data, error } = await supabase
    .from('admins')
    .upsert([{ email, password_hash: hashedPassword }], { onConflict: 'email' })
    .select();

  if (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }

  console.log('Admin user seeded successfully:', data);
  process.exit(0);
}

seedAdmin();
