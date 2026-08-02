import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: 'Wishlist' }
      ]} />

      <div className="border-b border-[#E9E2E3] pb-4">
        <span className="text-xs uppercase tracking-mega text-[#807779]">Saved Pieces</span>
        <h1 className="text-3xl font-serif text-[#181516]">Your Wishlist ({wishlist.length})</h1>
      </div>

      {wishlist.length > 0 ? (
        <ProductGrid products={wishlist} />
      ) : (
        <div className="max-w-md mx-auto py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-[#FBF1F2] rounded-full flex items-center justify-center mx-auto text-[#181516]">
            <Heart className="w-8 h-8 text-[#807779]" />
          </div>
          <h2 className="text-2xl font-serif text-[#181516]">Your wishlist is waiting.</h2>
          <p className="text-xs text-[#807779] font-light leading-relaxed">
            Save pieces you love and find them here later. Explore our modest dresses, hijabs, and signature rayon essentials.
          </p>
          <div>
            <Link
              to="/shop"
              className="inline-block bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-8 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
