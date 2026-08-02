import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export const OrderConfirmation = ({ orderId = "NTL-2026-001" }) => {
  return (
    <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-6 animate-fade-in">
      <div className="w-16 h-16 bg-[#F6E0E3] rounded-full flex items-center justify-center mx-auto text-[#181516]">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#807779]">Order Confirmed</span>
        <h1 className="text-2xl sm:text-4xl font-serif text-[#181516]">
          Thank you for shopping with nuthelabel.
        </h1>
        <p className="text-sm text-[#807779] max-w-md mx-auto leading-relaxed">
          Your order has been received and is currently being prepared with quiet care by our studio team.
        </p>
      </div>

      <div className="bg-[#FBF1F2] border border-[#E9E2E3] p-4 rounded-sm inline-block">
        <p className="text-xs uppercase tracking-widest text-[#807779]">Order Reference</p>
        <p className="text-lg font-mono font-bold text-[#181516] mt-1">#{orderId}</p>
      </div>

      <div className="pt-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-8 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>CONTINUE SHOPPING</span>
        </Link>
      </div>
    </div>
  );
};
