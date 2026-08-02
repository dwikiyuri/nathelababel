import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
      <span className="text-xs uppercase tracking-mega text-[#807779]">404 ERROR</span>
      <h1 className="text-4xl sm:text-5xl font-serif text-[#181516]">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-[#807779] font-light leading-relaxed">
        The story or product silhouette you are seeking may have moved or is no longer available.
      </p>
      <div>
        <Link
          to="/"
          className="inline-block bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] px-8 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
        >
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
};
