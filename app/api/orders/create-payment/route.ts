import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase-client';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      items,
      total_amount,
      payment_method,
    } = await request.json();

    if (!customer_name || !customer_email || !customer_phone || !items || !total_amount || !payment_method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order in database
    const supabase = getServerSupabaseClient();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          total_amount,
          payment_method,
          payment_status: 'pending',
        },
      ])
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 }
      );
    }

    // Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return NextResponse.json(
        { error: itemsError.message },
        { status: 500 }
      );
    }

    // Call Wearemarz API to initiate payment
    const apiKey = process.env.WEAREMARZ_API_KEY!;
    const apiSecret = process.env.WEAREMARZ_API_SECRET!;

    // Create Basic Auth header
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const wearemarzResponse = await fetch(
      'https://wallet.wearemarz.com/api/v1/collect-money',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total_amount,
          currency: 'UGX', // Adjust as needed
          phone_number: customer_phone,
          reference: `order_${order.id}`,
          description: `Order #${order.id} - ${customer_name}`,
          payment_method: payment_method,
        }),
      }
    );

    if (!wearemarzResponse.ok) {
      const errorData = await wearemarzResponse.json();
      return NextResponse.json(
        { error: 'Payment initiation failed', details: errorData },
        { status: 400 }
      );
    }

    const paymentData = await wearemarzResponse.json();

    // Update order with transaction ID
    await supabase
      .from('orders')
      .update({ transaction_id: paymentData.transaction_id || paymentData.id })
      .eq('id', order.id);

    // Send email notifications (asynchronously - don't wait for response)
    const emailData = {
      order_id: order.id,
      customer_name,
      customer_email,
      customer_phone,
      items,
      total_amount,
      payment_method,
      admin_email: 'barbarakatusabe999@gmail.com',
    };

    // Send confirmation email to customer
    sendOrderConfirmationEmail(emailData).catch((err) =>
      console.error('Failed to send customer email:', err)
    );

    // Send notification to admin
    sendAdminNotificationEmail(emailData).catch((err) =>
      console.error('Failed to send admin email:', err)
    );

    return NextResponse.json(
      { success: true, order_id: order.id, payment_data: paymentData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
