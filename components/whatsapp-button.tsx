'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';

interface OrderData {
  id: number;
  customer_name: string;
  total_amount: number;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Check if user has just completed a purchase
    const savedOrder = sessionStorage.getItem('last_order');
    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder);
        setOrderData(order);
        setIsVisible(true);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, []);

  if (!isVisible || !orderData) {
    return null;
  }

  // Generate WhatsApp message with order details
  const generateMessage = () => {
    const items = orderData.items
      .map((item) => `• ${item.product_name} (Qty: ${item.quantity})`)
      .join('%0A');

    const message = `Hello Mami Papa Babies!%0A%0AI just purchased from your store:%0A${items}%0A%0ATotal: UGX ${orderData.total_amount.toLocaleString()}%0ACustomer Name: ${orderData.customer_name}%0A%0APlease confirm my order.`;

    return message;
  };

  const whatsappNumber = '256753979539'; // Without + symbol for URL
  const whatsappMessage = generateMessage();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp floating button */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </Link>

      {/* Info card above button */}
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs mr-2 animate-slide-up">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">Order Confirmation</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Click the WhatsApp button below to confirm your order with our team.
        </p>
        <div className="bg-gray-100 rounded p-3 mb-3">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Order ID:</span> #{orderData.id}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-semibold">Items:</span> {orderData.items.length}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-semibold">Total:</span> UGX{' '}
            {orderData.total_amount.toLocaleString()}
          </p>
        </div>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          <MessageCircle size={16} />
          Open WhatsApp
        </Link>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
