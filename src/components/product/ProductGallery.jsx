import React, { useState, useEffect } from "react";

export const ProductGallery = ({ color }) => {
  const gallery =
    color?.gallery && color.gallery.length > 0
      ? color.gallery
      : [color?.image || "/logo/nuthelabel-logo.png"];

  const [activeImage, setActiveImage] = useState(gallery[0]);

  useEffect(() => {
    if (gallery && gallery.length > 0) {
      setActiveImage(gallery[0]);
    }
  }, [color]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Strip */}
      {gallery.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar max-h-[450px] shrink-0">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              aria-label={`View thumbnail image ${idx + 1}`}
              className={`w-16 h-20 lg:w-20 lg:h-26 rounded-sm overflow-hidden bg-[#F4F2EE] border transition-all shrink-0 ${
                activeImage === img
                  ? "border-[#181516] ring-1 ring-[#181516]"
                  : "border-[#E9E2E3] opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Display Image */}
      <div className="flex-1 aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] bg-[#F4F2EE] rounded-sm overflow-hidden relative">
        <img
          src={activeImage}
          alt="Product detail main view"
          className="w-full h-full object-cover object-center transition-all duration-300 animate-fade-in"
        />
      </div>
    </div>
  );
};
