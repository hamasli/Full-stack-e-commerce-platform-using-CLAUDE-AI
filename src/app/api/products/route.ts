import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, price, image, stock, category } = body;

  if (!name || !description || !price) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: { name, description, price: parseFloat(price), image, stock: parseInt(stock) || 0, category },
  });

  return Response.json(product, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return Response.json({ success: true });
}
