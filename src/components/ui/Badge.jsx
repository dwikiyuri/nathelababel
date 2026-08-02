import React from "react";

export const Badge = ({ children, variant = "brand" }) => {
  const styles = {
    brand: "bg-[#F6E0E3] text-[#181516]",
    dark: "bg-[#181516] text-[#FAF9F7]",
    outline: "border border-[#181516] text-[#181516]",
    subtle: "bg-[#FBF1F2] text-[#807779] border border-[#E9E2E3]",
  };

  return (
    <span
      className={`
        inline-block
        px-2.5
        py-0.5
        rounded-sm
        text-[10px]
        tracking-widest
        uppercase
        font-medium
        ${styles[variant] || styles.brand}
      `}
    >
      {children}
    </span>
  );
};
