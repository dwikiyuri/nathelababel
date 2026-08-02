import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ProductAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="border-t border-[#E9E2E3] divide-y divide-[#E9E2E3]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-4">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between text-left text-xs uppercase tracking-widest font-semibold text-[#181516] hover:text-[#807779] transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown className={`w-4 h-4 text-[#807779] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="mt-3 text-xs leading-relaxed text-[#807779] font-light animate-fade-in">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
