'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface CategoriesSectionProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

export default function CategoriesSection({ onCategorySelect, selectedCategory }: CategoriesSectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading categories...</div>;
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
        <p className="text-gray-600">Browse our collection of quality baby products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* All Products Button */}
        <Button
          onClick={() => onCategorySelect(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="w-full h-auto py-4 flex flex-col items-center gap-2"
        >
          <span className="text-2xl">📦</span>
          <span className="text-sm font-semibold">All Products</span>
        </Button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="w-full h-auto py-4 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-2xl">👶</span>
            <span className="text-sm font-semibold">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Category Details */}
      {selectedCategory && (
        <div className="mt-6">
          {categories
            .filter((c) => c.id === selectedCategory)
            .map((category) => (
              <Card key={category.id} className="p-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-700">{category.description}</p>
                )}
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
