import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

export const OrderSummary = () => {
  const { cart, cartSubtotal, freeShippingThreshold } = useCart();
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : 25000;
  const total = cartSubtotal + shippingFee;

  return (
    <div className="bg-[#FBF1F2] p-6 border border-[#E9E2E3] rounded-sm space-y-6">
      <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
        ORDER ITEMS ({cart.reduce((a, b) => a + b.quantity, 0)})
      </h3>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {cart.map(item => (
          <div key={item.id} className="flex gap-3 text-xs">
            <img
              src={item.image}
              alt={item.productName}
              className="w-14 h-18 object-cover rounded-sm bg-[#F4F2EE] shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-medium text-[#181516]">{item.productName}</h4>
                <p className="text-[11px] text-[#807779]">{item.color} / Size {item.size}</p>
                <p className="text-[11px] text-[#807779]">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-[#181516] text-right">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#E9E2E3] space-y-2 text-xs">
        <div className="flex justify-between text-[#807779]">
          <span>Subtotal</span>
          <span className="text-[#181516]">{formatPrice(cartSubtotal)}</span>
        </div>
        <div className="flex justify-between text-[#807779]">
          <span>Shipping</span>
          <span className="text-[#181516]">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-[#E9E2E3] text-sm font-semibold text-[#181516]">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};
