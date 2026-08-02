import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { OrderConfirmation } from '../components/checkout/OrderConfirmation';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  const handleOrderSubmit = (formData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refId = `NTL-2026-${randomNum}`;
    setOrderReference(refId);
    clearCart();
    setIsOrdered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isOrdered) {
    return <OrderConfirmation orderId={orderReference} />;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h1 className="text-2xl font-serif text-[#181516]">Your bag is empty for checkout.</h1>
        <p className="text-xs text-[#807779]">Add pieces to your bag before proceeding.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: 'Bag', href: '/cart' },
        { label: 'Checkout' }
      ]} />

      <div className="border-b border-[#E9E2E3] pb-4">
        <span className="text-xs uppercase tracking-mega text-[#807779]">Express Checkout</span>
        <h1 className="text-3xl font-serif text-[#181516]">Order Information</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Form side (7 cols) */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} />
        </div>

        {/* Order Summary side (5 cols) */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>

      </div>

    </div>
  );
};
