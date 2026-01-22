import { NextResponse } from "next/server";

const PHONES = [
  {
    id: "1",
    name: "iPhone 14",
    brand: "Apple",
    price: 999,
  },
  {
    id: "2",
    name: "Galaxy S23",
    brand: "Samsung",
    price: 899,
  },
  {
    id: "3",
    name: "Pixel 8",
    brand: "Google",
    price: 799,
  },
];

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const phone = PHONES.find((p) => p.id === params.id);

  if (!phone) {
    return NextResponse.json(
      { ok: false, message: "Phone not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    data: phone,
  });
}
