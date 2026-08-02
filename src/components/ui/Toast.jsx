import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();
  const { notification } = useAuth();

  const activeMessage = toastMessage || (notification ? notification.msg : null);
  const type = notification ? notification.type : 'success';

  if (!activeMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 bg-[#181516] text-[#FAF9F7] px-5 py-3.5 shadow-elevated border border-[#807779]/30 text-xs tracking-wide">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#F6E0E3] shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-[#F6E0E3] shrink-0" />
      )}
      <span className="font-medium">{activeMessage}</span>
    </div>
  );
};
