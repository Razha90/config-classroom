import connectDb from "@/lib/connectDb";
import tokenVerify from "@/lib/verifyToken";
import User from "@/schema/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { token } = body;
  let user;
  if (!token) {
    return NextResponse.json(
      { error: "Token not found", code: "EMPTY_TOKEN" },
      { status: 400 }
    );
  }
  const checked = tokenVerify(token);
  try{
    await connectDb();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { error: "Problem with server", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
  if (!checked.isValid) {
    if (checked.data) {
      try {
        // user = await User.findOne({ email: checked.data.email });
        user = await User.findOne({email:checked.data.email});
        if (!user) {
          return NextResponse.json(
            { error: "User not found", code: "WRONG_TOKEN" },
            { status: 404 }
          );
        }
        if (user.emailVerified) {
          return NextResponse.json(
            { error: "Token already expired", code: "TOKEN_EXPIRED" },
            { status: 404 }
          );
        }
        // await User.findOneAndDelete({ email: checked.data.email });
        await User.findOneAndDelete({email:checked.data.email});
        return NextResponse.json(
          { error: checked.error, code: "TOKEN_EXPIRED" },
          { status: 400 }
        );
      } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
          { error: "Problem with server", code: "SERVER_ERROR" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(
      { error: "Wrong Token", code: "WRONG_TOKEN" },
      { status: 400 }
    );
  }

  try {
    // user = await User.findOne({ email: checked.data.email });
    user = await User.findOne({email:checked.data.email});
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json(
      { error: "Problem with server", code: "FINDING_FAILED" },
      { status: 500 }
    );
  }

  if (!user) {
    console.log("user",user);

    return NextResponse.json(
      { error: "User not found", code: "WRONG_TOKEN" },
      { status: 404 }
    );
  }

  if (user.emailVerified) {
    return NextResponse.json(
      { error: "Token already expired", code: "TOKEN_EXPIRED" },
      { status: 400 }
    );
  }

  try {
    // await User.findUpdateOne({ email: checked.data.email }, { emailVerified: true });
    await User.findOneAndUpdate({email:checked.data.email},{emailVerified:true});
    return NextResponse.json(
      { message: "Email verified", code: "SUCCESS_VERIFIED" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Problem with server", code: "UPDATING_FAILED" },
      { status: 500 }
    );
  }
}
