import React from 'react';

export const ColorSwatches = ({ colors, selectedColor, onSelectColor }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs tracking-wider">
        <span className="uppercase text-[#807779]">Color:</span>
        <span className="font-medium text-[#181516]">{selectedColor ? selectedColor.name : colors[0].name}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {colors.map((color) => {
          const isSelected = selectedColor ? selectedColor.id === color.id : false;
          return (
            <button
              key={color.id}
              onClick={() => onSelectColor(color)}
              title={color.name}
              aria-label={`Select color ${color.name}`}
              className={`w-7 h-7 rounded-full p-0.5 transition-all flex items-center justify-center ${
                isSelected ? 'ring-2 ring-[#181516] ring-offset-2 ring-offset-[#FAF9F7]' : 'hover:scale-105'
              }`}
            >
              <span
                className="w-full h-full rounded-full border border-[#181516]/20 block"
                style={{ backgroundColor: color.hex || '#E9E2E3' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
