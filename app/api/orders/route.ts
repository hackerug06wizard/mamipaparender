import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabaseClient();

    // Fetch orders with their items
    const { data: orders, error } = await supabase
      .from('orders')
      .select(
        `
        id,
        customer_name,
        customer_email,
        customer_phone,
        total_amount,
        payment_status,
        payment_method,
        transaction_id,
        created_at,
        order_items (
          id,
          order_id,
          product_id,
          product_name,
          price,
          quantity
        )
        `
      )
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(orders || []);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
