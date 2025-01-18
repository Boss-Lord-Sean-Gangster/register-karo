'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open/close
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          RegisterKaro
        </Link>

        {/* Hamburger Icon for mobile */}
        <div className="lg:hidden flex flex-col gap-4 items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`lg:flex ${isMenuOpen ? 'flex-col items-center absolute top-16 left-0 right-0 bg-blue-600 p-4' : 'hidden'}`}
        >
          <Link href="/services" className="hover:text-gray-200 py-2">
            Services
          </Link>
          <Link href="/companies" className="hover:text-gray-200 py-2">
            Companies
          </Link>
          <Link href="/about" className="hover:text-gray-200 py-2">
            About Us
          </Link>
        </div>

        {/* Button */}
        <Link
          href="/login"
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
