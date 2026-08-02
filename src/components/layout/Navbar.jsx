import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";

import { navigationData } from "../../data/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { MegaMenu } from "../navigation/MegaMenu";
import { MobileMenuDrawer } from "../navigation/MobileMenuDrawer";
import { SearchModal } from "../navigation/SearchModal";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartTotalItems, openCart, wishlist } = useCart();
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <>
      {/* HEADER */}
      <header
        onMouseLeave={() => setActiveMegaMenu(null)}
        className={`
          sticky top-0 z-50
          relative
          transition-all duration-300
          ${
            isScrolled || !isHomepage
              ? "bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E9E2E3] py-3.5 shadow-sm"
              : "bg-transparent py-5"
          }
        `}
      >
        {/* MAIN NAVBAR */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* MOBILE LEFT */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-1 transition-colors hover:text-[#807779]"
              >
                <Menu className="h-5 w-5 text-[#181516]" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="p-1 transition-colors hover:text-[#807779]"
              >
                <Search className="h-5 w-5 text-[#181516]" />
              </button>
            </div>

            {/* LOGO */}
            <div className="flex-1 text-center lg:flex-none lg:text-left">
              <Link to="/" className="group inline-flex items-center gap-2">
                {/* Logo Symbol */}
                <img
                  src="/logo/nuthelabel-logo.png"
                  alt="nuthelabel"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-8"
                />

                {/* Brand Name */}
                <span className="font-logo text-xl italic leading-none tracking-tight text-[#181516] transition-colors duration-300 group-hover:text-[#807779]">
                  nathelabel
                </span>
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navigationData.mainNav.map((item) => {
                const hasMegaMenu = Boolean(item.megaMenu);

                return (
                  <div
                    key={item.name}
                    className="py-2"
                    onMouseEnter={() => {
                      if (hasMegaMenu) {
                        setActiveMegaMenu(item.megaMenu);
                      } else {
                        setActiveMegaMenu(null);
                      }
                    }}
                  >
                    {hasMegaMenu ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMegaMenu(
                            activeMegaMenu === item.megaMenu
                              ? null
                              : item.megaMenu,
                          );
                        }}
                        className="
                          relative
                          py-1
                          text-xs
                          font-medium
                          uppercase
                          tracking-widest
                          text-[#181516]
                          transition-colors
                          hover:text-[#807779]

                          after:absolute
                          after:bottom-0
                          after:left-0
                          after:h-[1px]
                          after:w-0
                          after:bg-[#181516]
                          after:transition-all

                          hover:after:w-full
                        "
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className="
                          relative
                          py-1
                          text-xs
                          font-medium
                          uppercase
                          tracking-widest
                          text-[#181516]
                          transition-colors
                          hover:text-[#807779]

                          after:absolute
                          after:bottom-0
                          after:left-0
                          after:h-[1px]
                          after:w-0
                          after:bg-[#181516]
                          after:transition-all

                          hover:after:w-full
                        "
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* DESKTOP UTILITIES */}
            <div className="flex items-center gap-5">
              {/* SEARCH */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search catalog"
                className="
                  hidden
                  items-center
                  gap-2
                  p-1
                  text-xs
                  uppercase
                  tracking-widest
                  text-[#181516]
                  transition-colors
                  hover:text-[#807779]
                  lg:flex
                "
              >
                <Search className="h-4 w-4" />

                <span className="hidden xl:inline">Search</span>
              </button>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                aria-label="View Wishlist"
                className="
                  relative
                  hidden
                  items-center
                  gap-1.5
                  p-1
                  text-[#181516]
                  transition-colors
                  hover:text-[#807779]
                  sm:flex
                "
              >
                <Heart className="h-4 w-4" />

                {wishlist.length > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#181516]
                      bg-[#F6E0E3]
                      text-[9px]
                      font-bold
                      text-[#181516]
                    "
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* ACCOUNT */}
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                aria-label="Account"
                className="
                  p-1
                  text-[#181516]
                  transition-colors
                  hover:text-[#807779]
                "
              >
                <User className="h-4 w-4" />
              </Link>

              {/* BAG */}
              <button
                onClick={openCart}
                aria-label="View Bag"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-sm
                  bg-[#181516]
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  uppercase
                  tracking-widest
                  text-[#FAF9F7]
                  transition-colors
                  hover:bg-[#807779]
                "
              >
                <ShoppingBag className="h-3.5 w-3.5" />

                <span>Bag</span>

                {cartTotalItems > 0 && (
                  <span
                    className="
                      rounded-sm
                      bg-[#F6E0E3]
                      px-1.5
                      py-0.5
                      text-[10px]
                      font-bold
                      text-[#181516]
                    "
                  >
                    {cartTotalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MEGA MENU */}
        {activeMegaMenu && (
          <MegaMenu
            megaMenuData={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />
        )}
      </header>

      {/* MOBILE DRAWER */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
