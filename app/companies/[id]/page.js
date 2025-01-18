'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default function CompanyDetailPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const id = pathname?.split('/').pop();

  useEffect(() => {
    if (!id) return;

    const fetchCompany = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch company details');
        }
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="text-2xl font-semibold text-gray-800">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="text-2xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="text-2xl font-semibold text-gray-800">Company not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{company.name}</h1>
          <p className="text-lg md:text-xl text-gray-600 mt-4">
            Established on {formatDate(company.dateEstablished || new Date())}
          </p>
        </div>

        {/* Company Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About the Company</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {company.about || 'No information available.'}
          </p>

          {/* Directors Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Directors</h3>
            {company.directors && company.directors.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-lg">
                {company.directors.map((director) => (
                  <li key={director.id}>{director.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No directors listed for this company.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
