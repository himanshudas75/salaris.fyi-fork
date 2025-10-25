"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="bg-gradient-to-r from-slate-200 to-slate-300 shadow-lg border-b border-slate-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img 
                  src="/icon.png" 
                  alt="Salaris.fyi Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-700 group-hover:text-slate-800 transition-colors">
                salaris.fyi
              </h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {/* Full-time Salaries Link */}
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-800 transition-colors font-medium px-2 py-2 rounded-lg hover:bg-slate-200/50"
            >
              Full-time
            </Link>

            {/* Internships Link */}
            <Link
              href="/internships"
              className="text-slate-600 hover:text-slate-800 transition-colors font-medium px-2 py-2 rounded-lg hover:bg-slate-200/50"
            >
              Internships
            </Link>

            {/* University Link */}
            <Link
              href="/university"
              className="text-slate-600 hover:text-slate-800 transition-colors font-medium px-2 py-2 rounded-lg hover:bg-slate-200/50"
            >
              University
            </Link>

            {/* Community Link */}
            <Link
              href="/community"
              className="text-slate-600 hover:text-slate-800 transition-colors font-medium px-2 py-2 rounded-lg hover:bg-slate-200/50"
            >
              Community
            </Link>


            {/* Auth Button */}
            <Link
              href="/auth"
              className="bg-slate-400/20 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-400/30 transition-colors font-medium border border-slate-400/30 hover:border-slate-400/50"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                // Mobile menu toggle logic would go here
                console.log("Mobile menu toggle");
              }}
              className="text-[#F0F0F0] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
