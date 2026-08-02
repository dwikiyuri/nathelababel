import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Badge } from '../ui/Badge';
import { QuickAddModal } from './QuickAddModal';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const { wishlist, toggleWishlist, isInWishlist } = useCart();

  const isLiked = isInWishlist(product.id);

  // Default display image (1st color 1st image)
  const defaultImage = product.colors[0]?.image || '/logo/nuthelabel-logo.png';
  // Hover image (2nd gallery photo of 1st color, or 2nd color image if available)
  const hoverImage = (product.colors[0]?.gallery && product.colors[0]?.gallery[1]) 
    || product.colors[1]?.image 
    || defaultImage;

  const badge = product.tags.includes('New Arrival') 
    ? 'New Arrival' 
    : product.tags.includes('Best Seller') 
      ? 'Best Seller' 
      : null;

  return (
    <>
      <div 
        className="group relative flex flex-col transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F2EE] rounded-sm mb-3">
          
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={defaultImage}
              alt={product.name}
              className={`w-full h-full object-cover object-center transition-opacity duration-500 absolute inset-0 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              className={`w-full h-full object-cover object-center transition-all duration-500 transform scale-102 absolute inset-0 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </Link>

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={badge === 'Best Seller' ? 'brand' : 'dark'}>
                {badge}
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked 
                ? 'bg-[#181516] text-[#F6E0E3]' 
                : 'bg-white/80 text-[#181516] hover:bg-white hover:scale-110'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add Button (Desktop Hover) */}
          <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="w-full bg-[#181516]/90 hover:bg-[#181516] text-[#FAF9F7] py-2.5 px-4 text-[11px] uppercase tracking-widest font-medium rounded-sm backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          </div>

        </div>

        {/* Product Meta */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#807779] font-medium">
              {product.category}
            </span>

            {/* Color Swatch Dots */}
            {product.colors && product.colors.length > 1 && (
              <div className="flex items-center gap-1">
                {product.colors.map((c) => (
                  <span
                    key={c.id}
                    className="w-2.5 h-2.5 rounded-full border border-[#181516]/20 inline-block"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#807779] transition-colors">
            <h3 className="text-xs sm:text-sm font-serif font-medium text-[#181516] tracking-wide line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#181516]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[11px] text-[#A39C9E] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        product={product}
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </>
  );
};
