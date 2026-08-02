import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, MapPin } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export const Account = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useCart();
  const [activeTab, setActiveTab] = useState('orders');

  const mockOrders = [
    {
      id: 'NTL-2026-001',
      date: 'July 28, 2026',
      total: 878000,
      status: 'Processing',
      items: [
        { name: 'Alya Midi Dress (Noir Black / M)', price: 489000 },
        { name: 'Inner Rayon Long Sleeve (Dusty Rose / M)', price: 389000 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb items={[
        { label: 'My Account' }
      ]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E9E2E3] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-mega text-[#807779]">Client Portal</span>
          <h1 className="text-3xl font-serif text-[#181516]">Welcome, {user?.name || 'Valued Client'}</h1>
          <p className="text-xs text-[#807779]">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 border border-[#181516] text-[#181516] hover:bg-[#181516] hover:text-[#FAF9F7] px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Tabs (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'address', label: 'Saved Addresses', icon: MapPin }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3.5 text-xs uppercase tracking-widest font-medium rounded-sm border transition-colors ${
                  isActive
                    ? 'bg-[#181516] text-[#FAF9F7] border-[#181516]'
                    : 'bg-[#FFFFFF] text-[#181516] border-[#E9E2E3] hover:border-[#181516]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Pane (9 cols) */}
        <main className="lg:col-span-9 bg-[#FFFFFF] p-6 border border-[#E9E2E3] rounded-sm min-h-[400px]">
          
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
                Your Order History
              </h3>
              {mockOrders.length > 0 ? (
                mockOrders.map((order) => (
                  <div key={order.id} className="border border-[#E9E2E3] p-4 rounded-sm space-y-3 bg-[#FAF9F7]">
                    <div className="flex flex-wrap items-center justify-between text-xs border-b border-[#E9E2E3] pb-3">
                      <div>
                        <span className="font-mono font-bold text-[#181516]">#{order.id}</span>
                        <p className="text-[#807779] text-[11px]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-[#F6E0E3] text-[#181516] px-2.5 py-0.5 rounded-sm font-semibold uppercase text-[10px]">
                          {order.status}
                        </span>
                        <p className="font-semibold text-[#181516] mt-1">Rp{order.total.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs text-[#807779]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-[#181516]">Rp{item.price.toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#807779]">No orders placed yet.</p>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9E2E3]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516]">
                  Wishlist Items
                </h3>
                <Link to="/wishlist" className="text-xs underline text-[#181516]">View Full Wishlist Page →</Link>
              </div>
              {wishlist.length > 0 ? (
                <p className="text-xs text-[#807779]">You have {wishlist.length} item(s) saved in your wishlist.</p>
              ) : (
                <p className="text-xs text-[#807779]">Your wishlist is currently empty.</p>
              )}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
                Primary Shipping Address
              </h3>
              <div className="border border-[#E9E2E3] p-4 rounded-sm bg-[#FAF9F7] text-xs space-y-1">
                <p className="font-semibold text-[#181516]">{user?.name || 'Siti Nurhaliza'}</p>
                <p className="text-[#807779]">Jl. Senopati No. 45, Kebayoran Baru</p>
                <p className="text-[#807779]">Jakarta Selatan, DKI Jakarta 12190</p>
                <p className="text-[#807779]">Indonesia</p>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
