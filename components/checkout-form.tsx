'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    payment_method: 'mtn',
  });

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-6">Your cart is empty</p>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, payment_method: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create payment
      const response = await fetch('/api/orders/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          payment_method: formData.payment_method,
          items: cart,
          total_amount: totalPrice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to process payment'
        );
      }

      const data = await response.json();

      // Track purchase with Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: totalPrice,
          currency: 'UGX',
          content_name: 'Products',
          content_type: 'product',
        });
      }

      // Track with Google Ads
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          value: totalPrice,
          currency: 'UGX',
          items: cart.map((item) => ({
            item_id: item.product_id,
            item_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
          })),
        });
      }

      // Save order details for WhatsApp
      sessionStorage.setItem(
        'last_order',
        JSON.stringify({
          order_id: data.order_id,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          items: cart,
          total: totalPrice,
        })
      );

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/order-success/${data.order_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
              {error}
            </div>
          )}

          {/* Customer Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div>
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <Input
                id="customer_email"
                name="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="customer_phone">Phone Number *</Label>
              <Input
                id="customer_phone"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleInputChange}
                required
                placeholder="+256 700 000000"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment Method</h2>

            <div>
              <Label htmlFor="payment_method">Select Payment Method *</Label>
              <Select
                value={formData.payment_method}
                onValueChange={handlePaymentMethodChange}
              >
                <SelectTrigger id="payment_method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="space-y-2 bg-muted p-4 rounded-lg">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product_name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    {(item.price * item.quantity).toLocaleString('en-UG', {
                      style: 'currency',
                      currency: 'UGX',
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            {cart.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.product_name} x{item.quantity}
                </span>
                <span className="font-semibold">
                  {(item.price * item.quantity).toLocaleString('en-UG', {
                    style: 'currency',
                    currency: 'UGX',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">
                {totalPrice.toLocaleString('en-UG', {
                  style: 'currency',
                  currency: 'UGX',
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-border">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-primary">
              {totalPrice.toLocaleString('en-UG', {
                style: 'currency',
                currency: 'UGX',
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
