'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      addItem({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url,
      });
      // Reset quantity after adding
      setQuantity(1);
      // Show success feedback
      alert('Added to cart!');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-40 md:h-48 bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="text-lg md:text-xl font-bold text-primary mb-3">
            {product.price.toLocaleString('en-UG', {
              style: 'currency',
              currency: 'UGX',
              minimumFractionDigits: 0,
            })}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center border border-border rounded">
              <button
                className="px-2 py-1 text-sm hover:bg-muted"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-3 py-1 text-sm font-semibold">{quantity}</span>
              <button
                className="px-2 py-1 text-sm hover:bg-muted"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 gap-2"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
