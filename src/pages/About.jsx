import React from "react";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import { Sparkles, Shield, Heart, Feather } from "lucide-react";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumb items={[{ label: "Our Story" }]} />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-mega text-[#807779]">
          The House of nathelabel
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#181516] leading-tight">
          Quiet Elegance in Modern Modesty
        </h1>
        <p className="text-xs sm:text-sm text-[#807779] font-light leading-relaxed">
          Founded on the principle that modesty and high design are harmonious,
          nuthelabel curates tactile, understated fashion for Muslim women
          around the world.
        </p>
      </div>

      {/* Hero Image Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        {/* Image */}
        <div className="w-full max-w-[360px] mx-auto lg:mx-0">
          <img
            src="/hero/hero-02.webp"
            alt="nuthelabel Studio & Craftsmanship"
            className="w-full h-auto object-cover rounded-sm"
          />
        </div>

        {/* Article */}
        <article className="max-w-2xl">
          <p className="mt-8 text-xl sm:text-2xl lg:text-3xl font-serif leading-relaxed text-[#181516]">
            Nuthelabel began with a simple belief: modest fashion does not have
            to compromise on elegance, comfort, or individuality.
          </p>

          <div className="mt-8 space-y-6 text-sm sm:text-base leading-8 text-[#807779] font-light">
            <p>
              We create considered pieces for women who appreciate quiet
              details, fluid silhouettes, and clothing that feels as beautiful
              as it looks.
            </p>

            <p>
              Every collection is designed to become part of your everyday
              rhythm, rather than simply follow a passing trend.
            </p>

            <p>
              From the softness of our fabrics to the proportions of every
              silhouette, we believe in creating fashion with intention.
            </p>
          </div>
        </article>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-[#E9E2E3]">
        <div className="space-y-3 text-center md:text-left">
          <Feather className="w-6 h-6 text-[#181516] mx-auto md:mx-0" />
          <h3 className="text-base font-serif font-semibold text-[#181516]">
            Tactile Comfort
          </h3>
          <p className="text-xs text-[#807779] font-light leading-relaxed">
            We source non-clinging, cooling rayon and superfine voal fabrics
            that allow your skin to breathe effortlessly throughout the day.
          </p>
        </div>

        <div className="space-y-3 text-center md:text-left">
          <Sparkles className="w-6 h-6 text-[#181516] mx-auto md:mx-0" />
          <h3 className="text-base font-serif font-semibold text-[#181516]">
            Editorial Proportion
          </h3>
          <p className="text-xs text-[#807779] font-light leading-relaxed">
            Our silhouettes are engineered with modest drops and fluid drapes,
            preserving personal privacy while exhibiting sophisticated grace.
          </p>
        </div>

        <div className="space-y-3 text-center md:text-left">
          <Shield className="w-6 h-6 text-[#181516] mx-auto md:mx-0" />
          <h3 className="text-base font-serif font-semibold text-[#181516]">
            Thoughtful Production
          </h3>
          <p className="text-xs text-[#807779] font-light leading-relaxed">
            Crafted in small, controlled batches to minimize waste and ensure
            every garment meets our high standard of seam integrity.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-mega text-[#807779]">
            Design Studio
          </span>
          <h2 className="text-3xl font-serif text-[#181516]">
            Crafting The Palette
          </h2>
          <p className="text-xs sm:text-sm text-[#807779] font-light leading-relaxed">
            Our primary palette revolves around delicate blush pink (#F6E0E3),
            warm taupe, serene rose, and grounded noir. We believe color should
            soothe the spirit, acting as a soft canvas for your individuality.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
            >
              EXPLORE OUR COLLECTION
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="/journal/post-1.jpg"
            alt="Fabric detail"
            className="aspect-[3/4] object-cover rounded-sm bg-[#F4F2EE]"
          />
          <img
            src="/journal/post-2.jpg"
            alt="Color palette"
            className="aspect-[3/4] object-cover rounded-sm bg-[#F4F2EE] mt-8"
          />
        </div>
      </div>
    </div>
  );
};
