import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-[11px] tracking-widest uppercase text-[#807779]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-[#181516] transition-colors">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-[#A39C9E]" />
            {item.href ? (
              <Link to={item.href} className="hover:text-[#181516] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#181516] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
