'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper function to format date in a presentable way (optional)
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all companies when the component mounts
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`);
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await res.json();

        // Ensure data is an array before setting it to state
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          throw new Error('The data is not in the expected array format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">All Companies</h1>

      {/* Grid layout for displaying companies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companies.length === 0 ? (
          <div className="col-span-full text-center text-lg">No companies available.</div>
        ) : (
          companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              passHref
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Company Name */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{company.name}</h2>

              {/* Established Date */}
              <p className="text-gray-600 mb-4">
                Established: {formatDate(company.dateEstablished || new Date())}
              </p>

              {/* About Company (showing first 20% of the description) */}
              <p className="text-gray-700 mb-4">
                About: {company.about ? company.about.substring(0, Math.floor(company.about.length * 0.2)) + '...' : 'No information available'}
              </p>

              {/* Directors Section */}
              {company.directors && company.directors.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Directors:</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {company.directors.map((director) => (
                      <li key={director.id}>{director.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
