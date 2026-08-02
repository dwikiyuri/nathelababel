import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';
import { ArrowRight } from 'lucide-react';

export const JournalCard = ({ post }) => {
  return (
    <article className="group flex flex-col space-y-3">
      <Link to={`/journal/${post.slug}`} className="block aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#F4F2EE] rounded-sm relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#181516]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#807779]">
          <span className="font-semibold text-[#181516]">{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <Link to={`/journal/${post.slug}`} className="block group-hover:text-[#807779] transition-colors">
          <h3 className="text-base sm:text-lg font-serif font-medium text-[#181516] leading-snug line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-xs text-[#807779] line-clamp-2 leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}

        <Link
          to={`/journal/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#181516] font-medium pt-1 group-hover:translate-x-1 transition-transform"
        >
          <span>Read story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
