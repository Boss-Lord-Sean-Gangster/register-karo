// components/Navbar.js
'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          RegisterKaro
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <Link href="/services" className="hover:text-gray-200">
            Services
          </Link>
          <Link href="/companies" className="hover:text-gray-200">
            Companies
          </Link>
          <Link href="/about" className="hover:text-gray-200">
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
