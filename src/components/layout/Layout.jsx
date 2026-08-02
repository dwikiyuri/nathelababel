import React from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { Toast } from '../ui/Toast';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#181516]">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};
