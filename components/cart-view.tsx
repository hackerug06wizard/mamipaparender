'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/use-cart';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function CartView() {
  const router = useRouter();
  const { cart, removeItem, updateQuantity, getTotalPrice, isLoaded } = useCart();

  if (!isLoaded) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-6">Your cart is empty</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="bg-card border border-border rounded-lg p-4 flex gap-4"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 bg-muted rounded flex-shrink-0">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.product_name}
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.product_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.price.toLocaleString('en-UG', {
                      style: 'currency',
                      currency: 'UGX',
                      minimumFractionDigits: 0,
                    })} each
                  </p>
                </div>

                {/* Quantity & Price */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border rounded">
                    <button
                      className="px-2 py-1 text-sm hover:bg-muted"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 text-sm hover:bg-muted"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {(item.price * item.quantity).toLocaleString('en-UG', {
                        style: 'currency',
                        currency: 'UGX',
                        minimumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="text-destructive hover:text-destructive/80 transition"
                onClick={() => removeItem(item.product_id)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          {/* Subtotal */}
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
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

          {/* Total */}
          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-primary">
              {totalPrice.toLocaleString('en-UG', {
                style: 'currency',
                currency: 'UGX',
                minimumFractionDigits: 0,
              })}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </Button>

          {/* Continue Shopping */}
          <Link href="/">
            <Button variant="outline" className="w-full mt-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
