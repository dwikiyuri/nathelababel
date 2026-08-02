import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 animate-fade-in">
      
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-mega text-[#807779]">Client Portal</span>
        <h1 className="text-3xl font-serif text-[#181516]">Sign In to nuthelabel</h1>
        <p className="text-xs text-[#807779]">Access your saved wishlist, bag, and order history.</p>
      </div>

      {location.state?.from && (
        <div className="bg-[#FBF1F2] border border-[#E9E2E3] p-3 text-center text-xs text-[#181516]">
          Please sign in to view your bag and continue.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-8 border border-[#E9E2E3] rounded-sm space-y-5 shadow-sm">
        
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-[#807779] absolute left-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] pl-9 pr-3 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-[#807779] absolute left-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] pl-9 pr-3 py-2.5 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#807779]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-[#181516]" />
            <span>Remember me</span>
          </label>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to ' + email); }} className="hover:text-[#181516] underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
        >
          <span>SIGN IN</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-[#A39C9E] text-center italic">
          * Demo Mode: Enter any email/password to sign in.
        </p>

      </form>

      <div className="text-center text-xs text-[#807779]">
        <span>Don't have an account? </span>
        <Link to="/register" className="font-semibold text-[#181516] hover:underline">
          Create one
        </Link>
      </div>

    </div>
  );
};
