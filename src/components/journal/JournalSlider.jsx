import React, { useRef } from 'react';
import { JournalCard } from './JournalCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const JournalSlider = ({ posts }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      
      {/* Slider Controls */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left journal stories"
          className="p-2 border border-[#E9E2E3] hover:border-[#181516] hover:bg-[#F6E0E3]/30 rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[#181516]" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right journal stories"
          className="p-2 border border-[#E9E2E3] hover:border-[#181516] hover:bg-[#F6E0E3]/30 rounded-full transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-[#181516]" />
        </button>
      </div>

      {/* Snap Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x-mandatory no-scrollbar pb-4 scroll-smooth"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-[85vw] sm:w-[45vw] lg:w-[31%] shrink-0 snap-start-item"
          >
            <JournalCard post={post} />
          </div>
        ))}
      </div>

    </div>
  );
};
