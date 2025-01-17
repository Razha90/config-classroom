import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export async function GET() {
  const allowedHost = "localhost:3000"; // Ganti dengan domain Anda tanpa 'http://'
  const header = await headers()
  const requestHost = header.get('host')

  if (requestHost !== allowedHost) {
    // return res.status(403).json({ message: "Access denied" });
    return NextResponse.json({ error: "Gagal" }, { status: 401 });

  }
  return NextResponse.json({ error: "Unauthorized Diterima" }, { status: 200 });
  

}