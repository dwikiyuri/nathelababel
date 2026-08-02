import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { QuantitySelector } from '../product/QuantitySelector';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item, isCompact = false }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className={`flex gap-4 ${isCompact ? 'py-3' : 'py-5'} border-b border-[#E9E2E3] animate-fade-in`}>
      {/* Product Image */}
      <Link to={`/product/${item.slug}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.productName}
          className={`${isCompact ? 'w-16 h-20' : 'w-24 h-32'} object-cover rounded-sm bg-[#F4F2EE]`}
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <Link to={`/product/${item.slug}`} className="hover:text-[#807779] transition-colors">
              <h4 className="text-xs sm:text-sm font-serif font-medium text-[#181516]">{item.productName}</h4>
            </Link>
            <button
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.productName} from bag`}
              className="text-[#807779] hover:text-[#181516] p-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] text-[#807779] space-y-0.5 mt-1">
            <p>Color: <span className="font-medium text-[#181516]">{item.color}</span></p>
            <p>Size: <span className="font-medium text-[#181516]">{item.size}</span></p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          />
          <div className="text-right">
            <span className="text-xs font-semibold text-[#181516]">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
