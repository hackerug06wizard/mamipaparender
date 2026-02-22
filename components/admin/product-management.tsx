'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id?: string;
  categories?: Category;
  created_at: string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setProducts(productsData);
        setCategories(categoriesData.categories || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          category_id: formData.category_id || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to add product');

      const newProduct = await response.json();
      setProducts([newProduct, ...products]);

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: '',
      });
      setShowForm(false);
      alert('Product added successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Add Product Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Baby Stroller"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Product description..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="price">Price (UGX) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                placeholder="50000"
              />
            </div>

            <div>
              <Label htmlFor="category_id">Category</Label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">-- Select a category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Add Product Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Product
        </Button>
      )}

      {/* Products List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Products ({products.length})
        </h3>

        {products.length === 0 ? (
          <p className="text-muted-foreground">No products yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative w-full h-40 bg-muted">
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
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    {product.name}
                  </h4>
                  {product.categories && (
                    <p className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block mb-2">
                      {product.categories.name}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-primary mb-4">
                    {product.price.toLocaleString('en-UG', {
                      style: 'currency',
                      currency: 'UGX',
                      minimumFractionDigits: 0,
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="gap-2 flex-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
