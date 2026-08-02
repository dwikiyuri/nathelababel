import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const CartSummary = ({ onCheckout, showCheckoutBtn = true }) => {
  const { cartSubtotal, freeShippingThreshold, amountForFreeShipping, shippingProgress } = useCart();
  const navigate = useNavigate();

  const estimatedShipping = cartSubtotal >= freeShippingThreshold ? 0 : 25000;
  const grandTotal = cartSubtotal + estimatedShipping;

  return (
    <div className="bg-[#FBF1F2] p-6 border border-[#E9E2E3] rounded-sm space-y-5">
      <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
        ORDER SUMMARY
      </h3>

      {/* Free Shipping Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          {amountForFreeShipping > 0 ? (
            <span className="text-[#807779]">
              Add <strong className="text-[#181516]">{formatPrice(amountForFreeShipping)}</strong> for Complimentary Shipping
            </span>
          ) : (
            <span className="text-[#181516] font-medium flex items-center gap-1">
              🎉 You unlocked Complimentary Shipping!
            </span>
          )}
        </div>
        <div className="w-full bg-[#E9E2E3] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#181516] h-full transition-all duration-500"
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2.5 text-xs text-[#807779] pt-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-[#181516] font-medium">{formatPrice(cartSubtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="text-[#181516] font-medium">
            {estimatedShipping === 0 ? 'FREE' : formatPrice(estimatedShipping)}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-[#E9E2E3] text-sm font-semibold text-[#181516]">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {showCheckoutBtn && (
        <button
          onClick={onCheckout || (() => navigate('/checkout'))}
          disabled={cartSubtotal === 0}
          className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] disabled:opacity-50 py-3.5 px-4 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
        >
          <span>PROCEED TO CHECKOUT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-[#807779] pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#181516]" />
        <span>Secure Minimalist Checkout</span>
      </div>
    </div>
  );
};
