import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

export const ProductGrid = ({ products, isLoading = false, emptyMessage }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <p className="text-base font-serif text-[#181516]">
          {emptyMessage || "No products found."}
        </p>
        <p className="text-xs text-[#807779]">
          Discover pieces made for your everyday wardrobe in our latest collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
