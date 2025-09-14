// app/api/buyers/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buyerSchema } from "@/lib/validation/buyer";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const buyer = await prisma.buyer.findUnique({
      where: { id: Number(params.id) },
    });

    if (!buyer) {
      return NextResponse.json({ error: "Buyer not found" }, { status: 404 });
    }

    return NextResponse.json(buyer);
  } catch {
    return NextResponse.json({ error: "Failed to fetch buyer" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = buyerSchema.parse(body);

    const updatedBuyer = await prisma.buyer.update({
      where: { id: Number(params.id) },
      data: parsed,
    });

    return NextResponse.json(updatedBuyer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update buyer" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.buyer.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Buyer deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete buyer" }, { status: 500 });
  }
}
