import React from 'react';

export const SizeSelector = ({ sizes, selectedSize, onSelectSize, onOpenSizeGuide }) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs tracking-wider">
        <span className="uppercase text-[#807779]">Size:</span>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-[11px] underline text-[#807779] hover:text-[#181516] transition-colors"
          >
            Size Guide
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              aria-label={`Select size ${size}`}
              className={`min-w-[42px] h-10 px-3 text-xs tracking-wider uppercase font-medium rounded-sm border transition-all ${
                isSelected
                  ? 'bg-[#181516] text-[#FAF9F7] border-[#181516]'
                  : 'bg-transparent text-[#181516] border-[#E9E2E3] hover:border-[#181516]'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
