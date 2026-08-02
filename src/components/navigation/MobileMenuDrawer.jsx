import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  ChevronRight,
  ShoppingBag,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { navigationData } from "../../data/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartTotalItems, wishlist } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181516]/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xs bg-[#FAF9F7] h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-up">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-[#E9E2E3]">
            <Link
              to="/"
              onClick={onClose}
              className="group inline-flex items-center gap-1"
            >
              <img
                src="/logo/nuthelabel-logo.png"
                alt="nuthelabel"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />

              <span
                className="
        font-logo
        text-lg
        italic
        leading-none
        tracking-tight
        text-[#181516]
        transition-colors
        duration-300
        group-hover:text-[#807779]
      "
              >
                nuthelabel
              </span>
            </Link>

            <button
              onClick={onClose}
              aria-label="Close mobile navigation"
              className="p-2 hover:bg-[#F6E0E3]/40 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#181516]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-6">
            {navigationData.mainNav.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between text-lg font-serif text-[#181516] hover:text-[#807779] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#A39C9E]" />
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* User Account & Actions Footer */}
        <div className="p-6 bg-[#FBF1F2] border-t border-[#E9E2E3] space-y-4">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#807779]">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-[#181516]">
                    {user.name}
                  </p>
                </div>
                <Link
                  to="/account"
                  onClick={onClose}
                  className="text-xs underline tracking-widest text-[#181516] hover:text-[#807779]"
                >
                  Account
                </Link>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest bg-transparent border border-[#181516] py-2 text-[#181516] hover:bg-[#181516] hover:text-[#FAF9F7] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={onClose}
                className="text-center text-xs uppercase tracking-widest bg-[#181516] text-[#FAF9F7] py-2.5 px-4 rounded-sm hover:bg-[#807779] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="text-center text-xs uppercase tracking-widest bg-transparent border border-[#181516] text-[#181516] py-2.5 px-4 rounded-sm hover:bg-[#181516] hover:text-[#FAF9F7] transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <div className="pt-2 border-t border-[#E9E2E3] flex items-center justify-around text-xs tracking-widest uppercase">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center gap-1.5 text-[#181516]"
            >
              <Heart className="w-4 h-4 text-[#181516]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center gap-1.5 text-[#181516]"
            >
              <ShoppingBag className="w-4 h-4 text-[#181516]" />
              <span>Bag ({cartTotalItems})</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
