import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-[#0a0a0a] text-[#d4af37] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link to="/dashboard/products">
          <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37] hover:shadow-[0_0_15px_#d4af37] transition cursor-pointer">
            <div className="mb-4">
              <svg className="w-12 h-12 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Product Management</h2>
            <p className="text-gray-400 text-sm">Manage products, categories, and inventory</p>
          </div>
        </Link>
        
        <Link to="/dashboard/reports">
          <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37] hover:shadow-[0_0_15px_#d4af37] transition cursor-pointer">
            <div className="mb-4">
              <svg className="w-12 h-12 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <p className="text-gray-400 text-sm">View sales and analytics</p>
          </div>
        </Link>
        
        <Link to="/staff">
          <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37] hover:shadow-[0_0_15px_#d4af37] transition cursor-pointer">
            <div className="mb-4">
              <svg className="w-12 h-12 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Staff Management</h2>
            <p className="text-gray-400 text-sm">Manage staff members</p>
          </div>
        </Link>
        
        <Link to="/dashboard/gallery">
          <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37] hover:shadow-[0_0_15px_#d4af37] transition cursor-pointer">
            <div className="mb-4">
              <svg className="w-12 h-12 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Gallery Management</h2>
            <p className="text-gray-400 text-sm">Manage gallery photos</p>
          </div>
        </Link>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/dashboard/products">
            <button className="gold-btn px-6 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
              Add New Product
            </button>
          </Link>
          <Link to="/staff/add">
            <button className="px-6 py-2 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition">
              Add Staff Member
            </button>
          </Link>
          <Link to="/dashboard/gallery">
            <button className="px-6 py-2 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition">
              Manage Gallery
            </button>
          </Link>
          <Link to="/">
            <button className="px-6 py-2 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition">
              View Website
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


