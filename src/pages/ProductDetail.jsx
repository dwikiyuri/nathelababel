import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  X,
  Ruler,
} from "lucide-react";
import { products } from "../data/products";
import { ProductGallery } from "../components/product/ProductGallery";
import { ColorSwatches } from "../components/product/ColorSwatches";
import { SizeSelector } from "../components/product/SizeSelector";
import { QuantitySelector } from "../components/product/QuantitySelector";
import { ProductAccordion } from "../components/product/ProductAccordion";
import { ProductGrid } from "../components/product/ProductGrid";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { NotFound } from "./NotFound";

export const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addToCart, wishlist, toggleWishlist, isInWishlist } = useCart();
  const isLiked = isInWishlist(product.id);

  // Update selected color when product slug changes
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

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
      slug: product.slug,
    });
  };

  // Related Products (Complete Your Look)
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categorySlug === product.categorySlug ||
          p.tags.some((t) => product.tags.includes(t))),
    )
    .slice(0, 4);

  const accordionItems = [
    {
      title: "Product Details & Fit",
      content: `${product.description} Cut with a generous flow that maintains modesty while enabling dynamic comfort.`,
    },
    {
      title: "Material & Craftsmanship",
      content: `${product.material}. Finished with invisible stitching and pre-shrunk soft treatment.`,
    },
    {
      title: "Care Instructions",
      content: product.careInstructions,
    },
    {
      title: "Shipping & Complimentary Returns",
      content: product.shippingInfo + " " + product.returnsInfo,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/shop/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Product Gallery (7 cols) */}
        <div className="lg:col-span-6">
          <ProductGallery color={selectedColor} />
        </div>

        {/* Right Column: Product Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pb-4 border-b border-[#E9E2E3]">
            <span className="text-xs uppercase tracking-mega font-medium text-[#807779]">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#181516] tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xl font-semibold text-[#181516]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <span className="text-sm text-[#A39C9E] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
            </div>
          </div>

          {/* Color Selection */}
          <ColorSwatches
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Size Selection */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />

          {/* Main Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-4 px-6 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              className={`p-4 border rounded-sm transition-colors ${
                isLiked
                  ? "bg-[#181516] border-[#181516] text-[#F6E0E3]"
                  : "border-[#E9E2E3] text-[#181516] hover:border-[#181516]"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#E9E2E3] text-[11px] text-[#807779]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#181516]" />
              <span>Free Shipping over Rp750k</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#181516]" />
              <span>30-Day Hassle-Free Exchange</span>
            </div>
          </div>

          {/* Accordion Sections */}
          <ProductAccordion items={accordionItems} />
        </div>
      </div>

      {/* Related Products / Complete Your Look */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E9E2E3] space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-mega text-[#807779]">
              Styling Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#181516]">
              Complete Your Look
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181516]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF9F7] max-w-md w-full p-6 border border-[#E9E2E3] rounded-sm relative shadow-2xl animate-slide-up">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-[#F6E0E3]/40 rounded-full"
            >
              <X className="w-5 h-5 text-[#181516]" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-[#181516]" />
              <h3 className="text-sm uppercase tracking-widest font-semibold text-[#181516]">
                Size Guide
              </h3>
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E9E2E3] text-[#807779] uppercase">
                  <th className="py-2">Size</th>
                  <th className="py-2">Bust (cm)</th>
                  <th className="py-2">Waist (cm)</th>
                  <th className="py-2">Length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E2E3] text-[#181516]">
                <tr>
                  <td className="py-2.5 font-semibold">S</td>
                  <td>92</td>
                  <td>86</td>
                  <td>138</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold">M</td>
                  <td>98</td>
                  <td>92</td>
                  <td>140</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold">L</td>
                  <td>104</td>
                  <td>98</td>
                  <td>142</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold">XL</td>
                  <td>110</td>
                  <td>104</td>
                  <td>144</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
