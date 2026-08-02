import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const CheckoutForm = ({ onSubmitOrder }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.name || '',
    phone: '',
    address: '',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    postalCode: '12190',
    shippingMethod: 'regular',
    paymentMethod: 'bank_transfer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitOrder(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Contact Info */}
      <div className="bg-[#FFFFFF] p-6 border border-[#E9E2E3] rounded-sm space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
          1. Contact Information
        </h3>
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3.5 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-[#FFFFFF] p-6 border border-[#E9E2E3] rounded-sm space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
          2. Shipping Address
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Siti Nurhaliza"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3.5 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+62 812 3456 7890"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3.5 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Jl. Senopati No. 45, Kebayoran Baru"
            className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3.5 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              Province
            </label>
            <input
              type="text"
              name="province"
              required
              value={formData.province}
              onChange={handleChange}
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-[#FFFFFF] p-6 border border-[#E9E2E3] rounded-sm space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
          3. Shipping Method
        </h3>
        <div className="space-y-3">
          <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${formData.shippingMethod === 'regular' ? 'border-[#181516] bg-[#FBF1F2]' : 'border-[#E9E2E3]'}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shippingMethod"
                value="regular"
                checked={formData.shippingMethod === 'regular'}
                onChange={handleChange}
                className="accent-[#181516]"
              />
              <div>
                <p className="text-xs font-medium text-[#181516]">Standard Delivery (2-3 Business Days)</p>
                <p className="text-[11px] text-[#807779]">JNE / J&T Express</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#181516]">Rp25.000</span>
          </label>

          <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${formData.shippingMethod === 'express' ? 'border-[#181516] bg-[#FBF1F2]' : 'border-[#E9E2E3]'}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shippingMethod"
                value="express"
                checked={formData.shippingMethod === 'express'}
                onChange={handleChange}
                className="accent-[#181516]"
              />
              <div>
                <p className="text-xs font-medium text-[#181516]">Express Courier (Same Day / Next Day)</p>
                <p className="text-[11px] text-[#807779]">Gojek / Grab Instant</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#181516]">Rp45.000</span>
          </label>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-[#FFFFFF] p-6 border border-[#E9E2E3] rounded-sm space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-[#181516] pb-3 border-b border-[#E9E2E3]">
          4. Payment Method
        </h3>
        <div className="space-y-3">
          {[
            { id: 'bank_transfer', label: 'Bank Transfer (BCA, Mandiri, BSI)', desc: 'Automatic verification via Virtual Account' },
            { id: 'ewallet', label: 'E-Wallet (GoPay, QRIS, ShopeePay)', desc: 'Scan QR code instantly' },
            { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay upon parcel arrival' }
          ].map((pm) => (
            <label key={pm.id} className={`flex items-start gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors ${formData.paymentMethod === pm.id ? 'border-[#181516] bg-[#FBF1F2]' : 'border-[#E9E2E3]'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value={pm.id}
                checked={formData.paymentMethod === pm.id}
                onChange={handleChange}
                className="accent-[#181516] mt-0.5"
              />
              <div>
                <p className="text-xs font-medium text-[#181516]">{pm.label}</p>
                <p className="text-[11px] text-[#807779]">{pm.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-4 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors shadow-md"
      >
        PLACE ORDER
      </button>

    </form>
  );
};
