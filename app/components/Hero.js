// components/Hero.js
'use client';

import React from 'react';
import Image from 'next/image'; // Import for handling the vector image

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-8">
        {/* Left Text Section */}
        <div className="text-center md:text-left md:max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Trusted Partner for Compliance Business Needs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            We help startups, organizations, and businesses meet compliance needs effortlessly.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Talk to an Expert
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition">
              See How It Works
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2 mb-10 md:mb-0">
          <Image
            src="/Group 3.png" // Replace with the actual image path
            alt="Vector Illustration"
            width={500} // Adjust width to match design
            height={500} // Adjust height to match design
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
