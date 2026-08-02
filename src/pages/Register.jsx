import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, User, ArrowRight } from "lucide-react";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    register(formData);
    navigate("/account");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-mega text-[#807779]">
          New Client Registration
        </span>
        <h1 className="text-3xl font-serif text-[#181516]">Join nathelabel</h1>
        <p className="text-xs text-[#807779]">
          Create an account to track orders and save your modesty wishlist.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] p-8 border border-[#E9E2E3] rounded-sm space-y-4 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Alya"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nabila"
              className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
            />
          </div>
        </div>

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
            placeholder="alya@example.com"
            className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#807779] mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-[#FAF9F7] border border-[#E9E2E3] px-3 py-2 text-xs text-[#181516] focus:outline-none focus:border-[#181516] rounded-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#181516] text-[#FAF9F7] hover:bg-[#807779] py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <span>CREATE ACCOUNT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center text-xs text-[#807779]">
        <span>Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold text-[#181516] hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
