import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { buyerSchema } from "@/lib/validation/buyer";

// Named export for GET method
export async function GET() {
  return NextResponse.json({ 
    message: 'Buyers API is working!',
    methods: ['GET', 'POST'],
    timestamp: new Date().toISOString()
  });
}

// Named export for POST method
export async function POST(req: Request) {
  console.log("POST request received at /api/buyers");
  
  try {
    const body = await req.json();
    console.log("Request body:", body);
    
    const parsed = buyerSchema.parse(body);
    console.log("Parsed data:", parsed);

    // Temporarily comment out Prisma to test first
    // const newBuyer = await prisma.buyer.create({
    //   data: parsed,
    // });

    // Return mock response for now
    return NextResponse.json({ 
      message: "Success! Data validated and would be saved",
      data: parsed,
      id: "mock-id-123"
    }, { status: 201 });

    // Once this works, uncomment the Prisma code:
    // return NextResponse.json(newBuyer, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}