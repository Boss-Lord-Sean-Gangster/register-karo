import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    // Extract company ID from the dynamic URL parameter
    const { id } = await params;  

    // Fetch the company by ID, including its directors
    const company = await prisma.company.findUnique({
      where: {
        id: parseInt(id), // Match by company ID
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
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
