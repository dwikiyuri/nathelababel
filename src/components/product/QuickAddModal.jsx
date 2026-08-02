import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { ColorSwatches } from './ColorSwatches';
import { SizeSelector } from './SizeSelector';
import { QuantitySelector } from './QuantitySelector';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export const QuickAddModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      color: selectedColor.name,
      colorId: selectedColor.id,
      size: selectedSize,
      quantity: quantity,
      price: product.price,
      image: selectedColor.image,
      slug: product.slug
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181516]/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F7] max-w-md w-full p-6 shadow-2xl border border-[#E9E2E3] rounded-sm relative animate-slide-up">
        
        <button
          onClick={onClose}
          aria-label="Close quick add panel"
          className="absolute top-4 right-4 p-1 hover:bg-[#F6E0E3]/40 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-[#181516]" />
        </button>

        <div className="flex items-center gap-4 pb-4 border-b border-[#E9E2E3]">
          <img
            src={selectedColor.image}
            alt={product.name}
            className="w-16 h-20 object-cover rounded-sm bg-[#F4F2EE]"
          />
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#807779]">{product.category}</span>
            <h3 className="text-sm font-serif font-medium text-[#181516]">{product.name}</h3>
            <p className="text-xs font-semibold text-[#181516] mt-1">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="py-5 space-y-4">
          <ColorSwatches
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ADD TO BAG — {formatPrice(product.price * quantity)}</span>
        </button>

      </div>
    </div>
  );
};
