import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { journalPosts } from '../data/journal';
import { JournalCard } from '../components/journal/JournalCard';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { formatDate } from '../utils/formatters';
import { NotFound } from './NotFound';
import { ArrowLeft } from 'lucide-react';

export const JournalDetail = () => {
  const { slug } = useParams();
  const post = journalPosts.find(p => p.slug === slug);

  if (!post) return <NotFound />;

  const relatedStories = journalPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      <Breadcrumb items={[
        { label: 'Journal', href: '/journal' },
        { label: post.title }
      ]} />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-[#807779]">
          <span className="font-semibold text-[#181516]">{post.category}</span>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#181516] leading-tight">
          {post.title}
        </h1>

        <p className="text-xs uppercase tracking-widest text-[#807779]">
          BY {post.author}
        </p>
      </div>

      {/* Main Image */}
      <div className="aspect-[16/9] bg-[#F4F2EE] rounded-sm overflow-hidden shadow-elevated">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-2xl mx-auto font-light text-sm sm:text-base text-[#181516] leading-relaxed space-y-6">
        {post.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#E9E2E3] flex items-center justify-between">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#181516] hover:text-[#807779] font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Related Stories */}
      <div className="pt-12 space-y-6">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] border-b border-[#E9E2E3] pb-2">
          MORE STORIES FROM THE STUDIO
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedStories.map(p => (
            <JournalCard key={p.id} post={p} />
          ))}
        </div>
      </div>

    </article>
  );
};
