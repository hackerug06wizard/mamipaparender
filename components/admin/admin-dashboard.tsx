'use client';

import { useState } from 'react';
import ProductManagement from './product-management';
import OrderManagement from './order-management';
import CategoryManagement from './category-management';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'orders'>('categories');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Manage your products and view orders
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-border">
        <Button
          variant={activeTab === 'categories' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('categories')}
          className="px-6 py-2 rounded-none border-b-2 border-transparent"
        >
          Categories
        </Button>
        <Button
          variant={activeTab === 'products' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('products')}
          className="px-6 py-2 rounded-none border-b-2 border-transparent"
        >
          Products
        </Button>
        <Button
          variant={activeTab === 'orders' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('orders')}
          className="px-6 py-2 rounded-none border-b-2 border-transparent"
        >
          Orders
        </Button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'categories' && <CategoryManagement />}
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
}
