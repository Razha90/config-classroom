import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import sendMail from "@/lib/sendMail";

export async function GET() {
  const upload = await sendMail({to:"razhajamsiksyah@gmail.com", subject:"Test", text:"Test"});
    return NextResponse.json({ upload  }, { status: 200 });


}