'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { trackPurchase, trackGooglePurchase } from '@/lib/analytics';

interface OrderData {
  order_id: number;
  customer_name: string;
  customer_phone: string;
  items: Array<{
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export default function OrderSuccessView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Get order details from sessionStorage
    const savedOrder = sessionStorage.getItem('last_order');
    if (savedOrder) {
      try {
        const orderData = JSON.parse(savedOrder);
        setOrder(orderData);

        // Track purchase in Meta Pixel
        trackPurchase({
          value: orderData.total,
          currency: 'UGX',
          content_name: 'Product Purchase',
          num_items: orderData.items.length,
          contents: orderData.items.map((item: any) => ({
            id: item.product_id.toString(),
            title: item.product_name,
            quantity: item.quantity,
            price: item.price,
          })),
        });

        // Track purchase in Google Ads
        trackGooglePurchase({
          transaction_id: orderId,
          value: orderData.total,
          currency: 'UGX',
          items: orderData.items.map((item: any) => ({
            id: item.product_id.toString(),
            name: item.product_name,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, [orderId]);

  const generateWhatsAppMessage = () => {
    if (!order) return '';

    const itemsList = order.items
      .map((item) => `• ${item.product_name} x${item.quantity} - ${item.price.toLocaleString('en-UG', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0 })}`)
      .join('\n');

    return `Hello, I just purchased from Mami Papa Babies:\n\n${itemsList}\n\nTotal: ${order.total.toLocaleString('en-UG', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0 })}\n\nOrder ID: ${orderId}\nCustomer Name: ${order.customer_name}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    const whatsappUrl = `https://wa.me/256753979539?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Message */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Thank you for your purchase
        </p>
        <p className="text-sm text-muted-foreground">
          Order ID: <span className="font-mono font-bold">#{orderId}</span>
        </p>
      </div>

      {/* Order Details */}
      {order && (
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>

          <div className="space-y-4 mb-8 pb-8 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Name:</span>
              <span className="font-semibold">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-semibold">{order.customer_phone}</span>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Items Ordered:</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between p-3 bg-muted rounded"
                >
                  <div>
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toLocaleString('en-UG', {
                      style: 'currency',
                      currency: 'UGX',
                      minimumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <span className="text-lg font-bold">Total Amount:</span>
            <span className="text-2xl font-bold text-primary">
              {order.total.toLocaleString('en-UG', {
                style: 'currency',
                currency: 'UGX',
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      {order && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-900">
              Continue on WhatsApp
            </h3>
          </div>
          <p className="text-sm text-green-800 mb-4">
            Click the button below to confirm your order and discuss delivery details via WhatsApp
          </p>
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message on WhatsApp
          </Button>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-3">What Happens Next?</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ You will receive a confirmation email shortly</li>
          <li>✓ Our team will process your payment</li>
          <li>✓ We will contact you via WhatsApp with delivery details</li>
          <li>✓ Your order will be shipped within 1-2 business days</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
        {order && (
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            Contact Support
          </Button>
        )}
      </div>
    </div>
  );
}
