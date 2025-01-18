// app/api/company/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// GET method for fetching all companies (by ID)
export async function GET() {
  try {
    // Fetch all companies, returning only their IDs and names
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        about:true,
        directors:true,
        dateEstablished:true,
      },
    });
    return new Response(JSON.stringify(companies), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching companies', error }), { status: 500 });
  }
}

// GET method for fetching a single company by ID
export async function GET_SINGLE(req) {
  try {
    // Extract company ID from the URL parameters
    const { companyId } = req.url.searchParams;

    // Fetch the company by ID, including its directors
    const company = await prisma.company.findUnique({
      where: {
        id: parseInt(companyId), // Match by company ID
      },
      include: {
        directors: true, // Include directors in the response
      },
    });

    if (!company) {
      return new Response(JSON.stringify({ message: 'Company not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(company), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching company details', error }), { status: 500 });
  }
}



// POST method
export async function POST(req) {
  try {
    const { name, dateEstablished, about, directors } = await req.json();

    // Create a new company and its directors
    const newCompany = await prisma.company.create({
      data: {
        name,
        dateEstablished: new Date(dateEstablished), // Convert date string to Date object
        about,
        directors: {
          create: directors, // Assuming 'directors' is an array of director objects
        },
      },
    });

    return new Response(JSON.stringify(newCompany), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating company', error }), { status: 500 });
  }
}
