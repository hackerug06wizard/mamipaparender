'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  order_items?: OrderItem[];
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Orders ({orders.length})</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold">Customer</th>
              <th className="text-left py-3 px-4 font-semibold">Total</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Payment Method</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-muted">
                <td className="py-3 px-4 font-mono text-sm">#{order.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-primary">
                  {order.total_amount.toLocaleString('en-UG', {
                    style: 'currency',
                    currency: 'UGX',
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.payment_status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.payment_status === 'completed' ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 uppercase text-sm">
                  {order.payment_method}
                </td>
                <td className="py-3 px-4 text-sm">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span> {selectedOrder.customer_name}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span> {selectedOrder.customer_email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> {selectedOrder.customer_phone}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                    selectedOrder.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm bg-muted p-2 rounded">
                        <span>{item.product_name}</span>
                        <span>x{item.quantity}</span>
                        <span className="font-semibold">
                          {(item.price * item.quantity).toLocaleString('en-UG', {
                            style: 'currency',
                            currency: 'UGX',
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No items</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-primary">
                      {selectedOrder.total_amount.toLocaleString('en-UG', {
                        style: 'currency',
                        currency: 'UGX',
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <span className="font-semibold capitalize">{selectedOrder.payment_status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-semibold uppercase">{selectedOrder.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono text-xs">{selectedOrder.transaction_id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
