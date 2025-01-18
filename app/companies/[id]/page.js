'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';  // Correct import for Next 13+ with App Directory

// Helper function to format date in a presentable way (optional)
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default function CompanyDetailPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the search parameters from URL

  // Extract the 'id' from the pathname (assumes your dynamic route is /company/[id])
  const id = pathname?.split("/").pop(); // Extracts the ID from the URL path

  useEffect(() => {
    if (!id) return; // Wait for the id to be available in the URL

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Company not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{company.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-4">
          <strong>Established:</strong> {formatDate(company.dateEstablished || new Date())}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>About:</strong> {company.about || 'No information available'}
        </p>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Directors:</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {company.directors && company.directors.map((director) => (
              <li key={director.id}>{director.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
