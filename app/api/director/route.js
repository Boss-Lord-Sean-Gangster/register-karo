// app/api/director/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method for fetching directors by company name
export async function GET(req) {
  try {
    // Extract company name from the query parameters
    const { companyName } = req.url.searchParams;

    // Find the company by name
    const company = await prisma.company.findUnique({
      where: {
        name: companyName, // Assuming company name is unique
      },
      include: {
        directors: true, // Include directors associated with the company
      },
    });

    if (!company) {
      return new Response(JSON.stringify({ message: 'Company not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(company.directors), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching directors', error }), { status: 500 });
  }
}

// POST method for creating a new director
export async function POST(req) {
  try {
    const { name, achievements, companyName } = await req.json();

    // Fetch the company by name to get the companyId
    const company = await prisma.company.findUnique({
      where: {
        name: companyName, // Assuming company name is unique
      },
    });

    if (!company) {
      return new Response(JSON.stringify({ message: 'Company not found' }), { status: 404 });
    }

    // Create a new director and associate it with the company
    const newDirector = await prisma.director.create({
      data: {
        name,
        achievements,
        companyId: company.id, // Use the companyId from the found company
      },
    });

    return new Response(JSON.stringify(newDirector), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating director', error }), { status: 500 });
  }
}
