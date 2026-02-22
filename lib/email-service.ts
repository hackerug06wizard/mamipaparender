// Email service for sending notifications
interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  order_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: OrderItem[];
  total_amount: number;
  payment_method: string;
  admin_email: string;
}

export async function sendOrderConfirmationEmail(
  data: OrderEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    // For now, we'll log the email that would be sent
    // In production, integrate with an email service like SendGrid, AWS SES, or Nodemailer
    console.log('[Email] Order Confirmation:', {
      to: data.customer_email,
      subject: `Order Confirmation - Mami Papa Babies #${data.order_id}`,
      orderId: data.order_id,
      customerName: data.customer_name,
    });

    // Email body content
    const itemsList = data.items
      .map(
        (item) =>
          `${item.product_name} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
      )
      .join('<br>');

    const emailContent = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, ${data.customer_name}!</p>
      
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> #${data.order_id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      
      <h2>Items Ordered</h2>
      <ul>${itemsList}</ul>
      
      <h2>Order Summary</h2>
      <p><strong>Total Amount:</strong> ${formatCurrency(data.total_amount)}</p>
      <p><strong>Payment Method:</strong> ${data.payment_method.toUpperCase()}</p>
      
      <h2>Next Steps</h2>
      <ol>
        <li>Your payment is being processed</li>
        <li>We will contact you via WhatsApp: ${data.customer_phone}</li>
        <li>Your items will be shipped within 1-2 business days</li>
      </ol>
      
      <p>If you have any questions, please contact us via WhatsApp at +256753979539</p>
      
      <p>Thank you for shopping at Mami Papa Babies!</p>
    `;

    // TODO: Replace with actual email service
    // Example using SendGrid:
    // await sgMail.send({
    //   to: data.customer_email,
    //   from: 'orders@mamipapababies.com',
    //   subject: `Order Confirmation - Mami Papa Babies #${data.order_id}`,
    //   html: emailContent,
    // });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Email] Error sending order confirmation:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function sendAdminNotificationEmail(
  data: OrderEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Email] Admin Notification:', {
      to: data.admin_email,
      subject: `New Order #${data.order_id}`,
    });

    const itemsList = data.items
      .map(
        (item) =>
          `${item.product_name} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
      )
      .join('\n');

    const emailContent = `
      <h1>New Order Received</h1>
      
      <h2>Customer Information</h2>
      <p><strong>Name:</strong> ${data.customer_name}</p>
      <p><strong>Email:</strong> ${data.customer_email}</p>
      <p><strong>Phone:</strong> ${data.customer_phone}</p>
      
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> #${data.order_id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      
      <h2>Items</h2>
      <pre>${itemsList}</pre>
      
      <h2>Order Total</h2>
      <p><strong>Amount:</strong> ${formatCurrency(data.total_amount)}</p>
      <p><strong>Payment Method:</strong> ${data.payment_method.toUpperCase()}</p>
      
      <p><a href="http://localhost:3000/admin/dashboard">View in Admin Dashboard</a></p>
    `;

    // TODO: Replace with actual email service
    // await sgMail.send({
    //   to: data.admin_email,
    //   from: 'noreply@mamipapababies.com',
    //   subject: `New Order #${data.order_id}`,
    //   html: emailContent,
    // });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Email] Error sending admin notification:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
  }).format(amount);
}
