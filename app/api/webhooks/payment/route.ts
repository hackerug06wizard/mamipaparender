import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase-client';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Verify webhook signature (implement based on Wearemarz documentation)
    const { transaction_id, status, reference } = data;

    if (!transaction_id || !status) {
      return NextResponse.json(
        { error: 'Invalid webhook data' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabaseClient();

    // Update order status
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: status === 'successful' || status === 'completed' ? 'completed' : 'failed',
        transaction_id,
      })
      .eq('id', parseInt(reference.split('_')[1]));

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
