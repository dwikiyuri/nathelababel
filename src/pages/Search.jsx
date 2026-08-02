import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Search as SearchIcon } from 'lucide-react';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: `Search: "${query}"` }
      ]} />

      <div className="border-b border-[#E9E2E3] pb-4">
        <span className="text-xs uppercase tracking-mega text-[#807779]">Search Results</span>
        <h1 className="text-3xl font-serif text-[#181516]">
          {query ? `Results for "${query}"` : 'Search Catalog'}
        </h1>
        <p className="text-xs text-[#807779] mt-1">
          Found {results.length} item(s) matching your search query.
        </p>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="max-w-md mx-auto py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-[#FBF1F2] rounded-full flex items-center justify-center mx-auto text-[#807779]">
            <SearchIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif text-[#181516]">Nothing found.</h2>
          <p className="text-xs text-[#807779] font-light">
            Try another search term or explore our latest modest collection.
          </p>
          <div>
            <Link
              to="/shop"
              className="inline-block bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-8 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
