import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wider text-[#807779] block">Quantity:</span>
      <div className="inline-flex items-center border border-[#E9E2E3] rounded-sm bg-[#FFFFFF]">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="w-10 h-10 flex items-center justify-center text-[#181516] hover:bg-[#F6E0E3]/30 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-10 text-center text-xs font-semibold text-[#181516]">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
          className="w-10 h-10 flex items-center justify-center text-[#181516] hover:bg-[#F6E0E3]/30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
