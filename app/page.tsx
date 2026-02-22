'use client';

import { useState } from 'react';
import Header from '@/components/header';
import ProductGrid from '@/components/product-grid';
import CategoriesSection from '@/components/categories-section';
import Footer from '@/components/footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome to Mami Papa Babies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality baby products for every stage of your little one's journey. Browse our curated collection of essential items.
            </p>
          </div>
          
          {/* Categories Section */}
          <CategoriesSection 
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          
          {/* Products Grid */}
          <ProductGrid categoryId={selectedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
