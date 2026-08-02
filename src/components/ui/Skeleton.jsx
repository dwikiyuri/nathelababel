import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-[#E9E2E3]/60 rounded-sm ${className}`} />
  );
};

export const ProductCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-[3/4] w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
    <Skeleton className="h-4 w-1/4" />
  </div>
);
