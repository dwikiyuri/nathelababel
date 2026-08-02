import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeData } from '../../data/home';

export const HeroSlider = () => {
  const slides = homeData.heroSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] max-h-[850px] bg-[#181516] text-[#FAF9F7] overflow-hidden">
      
      {/* Background Image with Smooth Crossfade */}
      {slides.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />
          {/* Subtle Fashion Editorial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181516]/80 via-[#181516]/30 to-transparent" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-2xl space-y-4 animate-fade-in key={slide.id}">
          
          <span className="inline-block text-xs uppercase tracking-mega font-medium text-[#F6E0E3] bg-[#181516]/60 backdrop-blur-sm px-3 py-1 border border-[#F6E0E3]/30 rounded-sm">
            {slide.tagline}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] text-[#FFFFFF]">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-[#E9E2E3] font-light leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>

          <div className="pt-4">
            <Link
              to={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-[#F6E0E3] text-[#181516] hover:bg-[#FFFFFF] px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow-lg group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* Slide Navigation Dots & Arrows */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to hero slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#F6E0E3]' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/20">
          <button
            onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="p-2 text-white hover:text-[#F6E0E3] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
            aria-label="Next slide"
            className="p-2 text-white hover:text-[#F6E0E3] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </section>
  );
};
