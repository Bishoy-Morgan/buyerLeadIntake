import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buyerSchema } from "@/lib/validation/buyer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = buyerSchema.parse(body);

    const newBuyer = await prisma.buyer.create({
      data: parsed,
    });

    return NextResponse.json(newBuyer, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
