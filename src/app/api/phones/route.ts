// app/api/phones/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'iPhone 15' },
    { id: 2, name: 'Pixel 8' },
  ]);
}
