import React, { useState } from "react";
import { ArrowUpRight, Mail, X } from "lucide-react";

export const PNotice = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#181516]/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="relative w-full max-w-sm bg-[#FAF9F7] border border-[#E9E2E3] shadow-2xl p-6 animate-slide-up">
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 text-[#807779] hover:text-[#181516] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="pr-5">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#807779]">
            Portfolio Project
          </span>

          <h2 className="mt-2 font-logo text-xl text-[#181516]">
            Unoficcial Website{" "}
          </h2>

          <p className="mt-3 text-xs leading-5 text-[#807779]">
            This website is a fashion e-commerce concept created as a portfolio
            project to showcase modern UI and frontend development.
          </p>

          <p className="mt-3 text-xs leading-5 text-[#807779]">
            Interested in creating a website like this for your brand?
          </p>

          {/* Contact */}
          <a
            href="mailto:dwikiyurii@gmail.com"
            className="mt-5 inline-flex items-center gap-2 bg-[#181516] px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] font-medium text-[#FAF9F7] hover:bg-[#807779] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact for Demo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
