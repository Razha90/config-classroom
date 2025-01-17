import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export async function GET() {

    // return res.status(403).json({ message: "Access denied" });
    return NextResponse.json({ error: "Berhasil" }, { status: 200 });


}