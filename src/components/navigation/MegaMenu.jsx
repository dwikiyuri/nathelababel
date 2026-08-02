import React from "react";
import { Link } from "react-router-dom";

export const MegaMenu = ({ megaMenuData, onClose }) => {
  if (!megaMenuData) return null;

  return (
    <div
      className="
        absolute
        left-0
        top-full
        z-50
        w-full
        border-b
        border-[#E9E2E3]
        bg-[#FAF9F7]
        shadow-[0_12px_40px_rgba(24,21,22,0.08)]
      "
      onMouseEnter={() => {}}
    >
      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="grid grid-cols-4 gap-12">
          {megaMenuData.map((column) => (
            <div key={column.title}>
              <h4
                className="
                  mb-5
                  border-b
                  border-[#E9E2E3]
                  pb-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#181516]
                "
              >
                {column.title}
              </h4>

              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="
                        block
                        text-sm
                        tracking-wide
                        text-[#807779]
                        transition-all
                        duration-200
                        hover:translate-x-1
                        hover:text-[#181516]
                      "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* FEATURED */}
          <div
            className="
              flex
              min-h-[230px]
              flex-col
              justify-between
              border
              border-[#E9E2E3]
              bg-[#FBF1F2]
              p-7
            "
          >
            <div>
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-[#807779]
                "
              >
                Featured Edit
              </span>

              <h4
                className="
                  mt-3
                  font-serif
                  text-xl
                  leading-tight
                  text-[#181516]
                "
              >
                Rayon Essentials
              </h4>

              <p
                className="
                  mt-3
                  max-w-[220px]
                  text-xs
                  leading-relaxed
                  text-[#807779]
                "
              >
                Soft, breathable, and fluidly tailored pieces designed for
                everyday modesty.
              </p>
            </div>

            <Link
              to="/shop?collection=rayon"
              onClick={onClose}
              className="
                mt-8
                inline-flex
                w-fit
                border-b
                border-[#181516]
                pb-1
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[#181516]
                transition-colors
                hover:border-[#807779]
                hover:text-[#807779]
              "
            >
              Explore Collection →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
