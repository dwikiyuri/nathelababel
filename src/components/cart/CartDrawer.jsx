import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, cartSubtotal, amountForFreeShipping, shippingProgress } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewBagClick = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#181516]/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F7] h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E9E2E3] bg-[#FAF9F7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#181516]" />
            <h2 className="text-xs uppercase tracking-widest font-semibold text-[#181516]">
              YOUR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={closeCart} 
            aria-label="Close bag drawer"
            className="p-1 hover:bg-[#F6E0E3]/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#181516]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FBF1F2] p-4 border-b border-[#E9E2E3] text-xs">
          {amountForFreeShipping > 0 ? (
            <p className="text-[#807779] mb-1.5">
              Add <strong className="text-[#181516]">{formatPrice(amountForFreeShipping)}</strong> for Complimentary Shipping
            </p>
          ) : (
            <p className="text-[#181516] font-medium mb-1.5">
              🎉 You unlocked Complimentary Shipping!
            </p>
          )}
          <div className="w-full bg-[#E9E2E3] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#181516] h-full transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {cart.length > 0 ? (
            cart.map(item => (
              <CartItem key={item.id} item={item} isCompact={true} />
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <p className="text-lg font-serif text-[#181516]">Your bag is empty.</p>
              <p className="text-xs text-[#807779]">
                Discover pieces made for your everyday wardrobe.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="inline-block bg-[#181516] text-[#FAF9F7] px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#807779] transition-colors"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#FAF9F7] border-t border-[#E9E2E3] space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold text-[#181516]">
              <span className="uppercase tracking-widest text-xs font-normal text-[#807779]">Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleViewBagClick}
                className="w-full bg-transparent border border-[#181516] text-[#181516] hover:bg-[#FBF1F2] py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors text-center"
              >
                VIEW BAG
              </button>
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
