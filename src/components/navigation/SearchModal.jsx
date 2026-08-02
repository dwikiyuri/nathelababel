import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatters';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectProduct = (slug) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#181516]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F7] border-b border-[#E9E2E3] p-6 md:p-10 shadow-elevated w-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-[#E9E2E3]">
            <h2 className="text-xs uppercase tracking-widest text-[#807779]">Search Catalog</h2>
            <button 
              onClick={onClose} 
              aria-label="Close search modal"
              className="p-2 hover:bg-[#F6E0E3]/40 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#181516]" />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-6 relative flex items-center">
            <Search className="w-6 h-6 text-[#807779] absolute left-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, abaya, hijab, pashmina..."
              className="w-full bg-transparent pl-10 pr-12 py-3 text-lg md:text-2xl font-serif placeholder:font-sans placeholder:text-sm placeholder:text-[#A39C9E] focus:outline-none text-[#181516] border-b border-transparent focus:border-[#181516] transition-colors"
            />
            {query && (
              <button 
                type="submit" 
                aria-label="Submit search"
                className="absolute right-0 p-2 hover:text-[#D89B9E] transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-[#181516]" />
              </button>
            )}
          </form>

          {/* Instant Live Results */}
          {query.trim() && (
            <div className="mt-6 max-h-[50vh] overflow-y-auto pr-2">
              <p className="text-[11px] uppercase tracking-widest text-[#807779] mb-4">
                Found {results.length} results
              </p>
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group flex items-center gap-4 p-2 cursor-pointer rounded-sm hover:bg-[#F6E0E3]/20 transition-colors"
                    >
                      <img
                        src={product.colors[0].image}
                        alt={product.name}
                        className="w-14 h-18 object-cover rounded-sm bg-[#F4F2EE]"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#807779]">{product.category}</p>
                        <h4 className="text-sm font-medium text-[#181516] group-hover:text-[#807779] transition-colors">{product.name}</h4>
                        <p className="text-xs font-semibold text-[#181516] mt-1">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#807779] py-8 text-center font-serif italic">
                  No products matched "{query}". Try searching "dress", "rayon", or "hijab".
                </p>
              )}
            </div>
          )}

          {/* Quick Suggestions */}
          {!query.trim() && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#807779] uppercase tracking-widest mr-2">Popular:</span>
              {['Alya Dress', 'Rayon Inner', 'Square Hijab', 'Pashmina', 'Royal Scarf'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-[#FBF1F2] hover:bg-[#F6E0E3] text-[#181516] px-3 py-1 rounded-sm transition-colors border border-[#E9E2E3]"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
