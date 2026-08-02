import React from "react";
import { journalPosts } from "../data/journal";
import { JournalCard } from "../components/journal/JournalCard";
import { Breadcrumb } from "../components/ui/Breadcrumb";

export const Journal = () => {
  const featuredPost = journalPosts[0];
  const secondaryPosts = journalPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: "Journal" }]} />

      <div className="border-b border-[#E9E2E3] pb-6 space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-mega text-[#807779]">
          Editorial Magazine
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#181516]">
          The nathelabel Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#807779] font-light">
          Refinement, craftsmanship, color studies, and quiet modest styling
          guides.
        </p>
      </div>

      {/* Hero Featured Article */}
      {featuredPost && (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FBF1F2] p-6 lg:p-10 border border-[#E9E2E3] rounded-sm">
          <div className="lg:col-span-7 aspect-[16/10] bg-[#F4F2EE] rounded-sm overflow-hidden">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#807779]">
              <span className="bg-[#F6E0E3] text-[#181516] px-2 py-0.5 font-bold">
                {featuredPost.category}
              </span>
              <span>•</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#181516] leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-xs text-[#807779] font-light leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="pt-2">
              <a
                href={`/journal/${featuredPost.slug}`}
                className="inline-block bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
              >
                READ FEATURED STORY
              </a>
            </div>
          </div>
        </article>
      )}

      {/* Grid of Other Articles */}
      <div className="space-y-6 pt-6">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] border-b border-[#E9E2E3] pb-2">
          LATEST STORIES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secondaryPosts.map((post) => (
            <JournalCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
