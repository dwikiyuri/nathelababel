import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-[#F6E0E3] rounded-full flex items-center justify-center mx-auto text-[#181516]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif text-[#181516]">Your bag is empty.</h1>
        <p className="text-xs sm:text-sm text-[#807779] max-w-md mx-auto font-light">
          Discover pieces made for your everyday wardrobe in our latest collection.
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
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: 'Your Bag' }
      ]} />

      <div className="flex items-between justify-between border-b border-[#E9E2E3] pb-4">
        <div>
          <span className="text-xs uppercase tracking-mega text-[#807779]">Shopping Bag</span>
          <h1 className="text-3xl font-serif text-[#181516]">Items Selected</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-widest text-[#807779] hover:text-[#181516] underline self-end"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Cart Item List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#181516] font-medium hover:text-[#807779] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Side (5 cols) */}
        <div className="lg:col-span-5">
          <CartSummary onCheckout={() => navigate('/checkout')} />
        </div>

      </div>

    </div>
  );
};
