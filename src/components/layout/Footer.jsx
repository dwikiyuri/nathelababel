import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigationData } from "../../data/navigation";
import { ArrowRight, Check } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#181516] text-[#FAF9F7] pt-16 pb-12 border-t border-[#332E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#332E30]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo/nuthelabel-logo.png"
                alt="nuthelabel"
                className="h-7 object-contain brightness-200"
              />
            </Link>
            <p className="text-xs text-[#A39C9E] max-w-sm leading-relaxed font-light">
              nuthelabel is a premium minimalist Muslim women's fashion studio.
              Thoughtfully designed modest silhouettes, soft palettes, and
              elevated tactile craftsmanship.
            </p>

            {/* Newsletter Form */}
            <div className="pt-4 space-y-3">
              <p className="text-xs uppercase tracking-widest font-medium text-[#F6E0E3]">
                A softer way to stay in touch
              </p>
              <p className="text-xs text-[#A39C9E]">
                Sign up for new collections, editorial stories, and private
                updates.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#F6E0E3] bg-[#332E30] p-3 rounded-sm">
                  <Check className="w-4 h-4" />
                  <span>Thank you for subscribing to nuthelabel updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#272324] text-xs text-[#FAF9F7] px-4 py-3 border border-[#443E40] focus:outline-none focus:border-[#F6E0E3] placeholder:text-[#807779]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="bg-[#F6E0E3] text-[#181516] hover:bg-[#FAF9F7] px-5 py-3 text-xs uppercase tracking-widest font-medium transition-colors flex items-center shrink-0"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F6E0E3] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5">
              {navigationData.footer.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs text-[#A39C9E] hover:text-[#FAF9F7] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F6E0E3] mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5">
              {navigationData.footer.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs text-[#A39C9E] hover:text-[#FAF9F7] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#F6E0E3] mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5">
              {navigationData.footer.about.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#A39C9E] hover:text-[#FAF9F7] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-xs text-[#A39C9E] hover:text-[#FAF9F7] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#807779] gap-4">
          <p>
            {" "}
            Unofficial Website for © 2026 nuthelabel. All rights reserved.
            Designed by Yuri.
          </p>
          <div className="flex gap-6">
            <Link
              to="/about"
              className="hover:text-[#A39C9E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/about"
              className="hover:text-[#A39C9E] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/about"
              className="hover:text-[#A39C9E] transition-colors"
            >
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
