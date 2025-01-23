import User from "@/schema/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await User.findByIdAndDelete("678f231e1dad9d2c3148beb5");
    return NextResponse.json(
      {
        success: true,
        message: "User deleted.",
        code: "USER_DELETED",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.error(error);
  }
}
