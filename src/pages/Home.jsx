import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Heart } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ProductGrid } from '../components/product/ProductGrid';
import { JournalSlider } from '../components/journal/JournalSlider';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { journalPosts } from '../data/journal';
import { homeData } from '../data/home';

export const Home = () => {
  const newArrivals = products.filter(p => p.tags.includes('New Arrival')).slice(0, 4);
  const bestSellers = products.filter(p => p.tags.includes('Best Seller')).slice(0, 4);
  const featuredCategories = categories.filter(c => c.featured);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. FEATURED CATEGORIES EDITORIAL GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase tracking-mega text-[#807779]">Curated Silhouettes</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#181516]">Shop By Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop/${cat.slug}`}
              className="group relative h-96 overflow-hidden rounded-sm bg-[#F4F2EE] block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181516]/70 via-[#181516]/20 to-transparent transition-opacity group-hover:opacity-90" />
              
              <div className="absolute bottom-6 inset-x-6 text-[#FAF9F7] space-y-1 transform group-hover:-translate-y-1 transition-transform">
                <span className="text-[10px] uppercase tracking-widest text-[#F6E0E3]">Collection</span>
                <h3 className="text-xl font-serif font-medium">{cat.name}</h3>
                <p className="text-xs text-[#E9E2E3] font-light line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#F6E0E3] pt-2 underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E9E2E3] pb-4 gap-4">
          <div>
            <span className="text-xs uppercase tracking-mega text-[#807779]">Fresh In Studio</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#181516]">New Arrivals</h2>
          </div>
          <Link
            to="/shop?collection=new-arrivals"
            className="text-xs uppercase tracking-widest font-semibold text-[#181516] hover:text-[#807779] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} />
      </section>

      {/* 4. EDITORIAL / CAMPAIGN SECTION */}
      <section className="bg-[#FBF1F2] py-20 border-y border-[#E9E2E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#F4F2EE] shadow-elevated">
              <img
                src={homeData.campaignBanner.image}
                alt="Nuthelabel Editorial Campaign"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-mega font-medium text-[#807779]">
                {homeData.campaignBanner.tagline}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#181516] leading-tight">
                {homeData.campaignBanner.title}
              </h2>
              <p className="text-sm text-[#807779] leading-relaxed font-light">
                {homeData.campaignBanner.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E9E2E3]">
                {homeData.values.map((v, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#181516] uppercase tracking-wider">{v.title}</h4>
                    <p className="text-[11px] text-[#807779] leading-normal">{v.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to={homeData.campaignBanner.ctaLink}
                  className="inline-flex items-center gap-2 bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-7 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
                >
                  <span>{homeData.campaignBanner.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E9E2E3] pb-4 gap-4">
          <div>
            <span className="text-xs uppercase tracking-mega text-[#807779]">Most Cherished</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#181516]">Best Sellers</h2>
          </div>
          <Link
            to="/shop?sort=best-selling"
            className="text-xs uppercase tracking-widest font-semibold text-[#181516] hover:text-[#807779] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} />
      </section>

      {/* 6. SWIPEABLE JOURNAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E9E2E3] pb-4 gap-4">
          <div>
            <span className="text-xs uppercase tracking-mega text-[#807779]">EDITORIAL & STORIES</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#181516]">From The Journal</h2>
          </div>
          <Link
            to="/journal"
            className="text-xs uppercase tracking-widest font-semibold text-[#181516] hover:text-[#807779] flex items-center gap-1 transition-colors"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <JournalSlider posts={journalPosts} />
      </section>

    </div>
  );
};
