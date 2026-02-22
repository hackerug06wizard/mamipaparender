import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleProducts = [
  {
    name: 'Baby Stroller',
    description: 'Lightweight and durable baby stroller perfect for long walks',
    price: 250000,
    image_url: 'https://images.unsplash.com/photo-1586488035338-142f77d1e705?w=400',
  },
  {
    name: 'Crib Bedding Set',
    description: 'Soft and comfortable crib bedding set for safe sleep',
    price: 85000,
    image_url: 'https://images.unsplash.com/photo-1606730908346-d91dd54fa0c5?w=400',
  },
  {
    name: 'Baby Monitor',
    description: 'HD baby monitor with night vision and two-way talk',
    price: 180000,
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae3ddd9c8045?w=400',
  },
  {
    name: 'High Chair',
    description: 'Adjustable high chair for feeding your growing baby',
    price: 320000,
    image_url: 'https://images.unsplash.com/photo-1570107612674-c2b9ee08e5b2?w=400',
  },
  {
    name: 'Baby Car Seat',
    description: 'Safety-certified car seat for infants and toddlers',
    price: 450000,
    image_url: 'https://images.unsplash.com/photo-1619633668038-4078d8086ec6?w=400',
  },
  {
    name: 'Diaper Bag',
    description: 'Spacious and stylish diaper bag with multiple compartments',
    price: 95000,
    image_url: 'https://images.unsplash.com/photo-1526919371950-042beae58b34?w=400',
  },
  {
    name: 'Baby Bathtub',
    description: 'Ergonomic baby bathtub with temperature indicator',
    price: 65000,
    image_url: 'https://images.unsplash.com/photo-1584113990330-f17cfc892e34?w=400',
  },
  {
    name: 'Bottle Sterilizer',
    description: 'Electric bottle sterilizer and dryer for safety',
    price: 140000,
    image_url: 'https://images.unsplash.com/photo-1578210356186-9aae4cab1b37?w=400',
  },
];

async function seedProducts() {
  try {
    console.log('Seeding products...');

    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (error) {
      console.error('Error seeding products:', error);
      process.exit(1);
    }

    console.log(`Successfully seeded ${data.length} products`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedProducts();
