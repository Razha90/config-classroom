import sendMail from "@/lib/sendMail";
import tokenCreate from "@/lib/tokenCreate";
import { NextResponse } from "next/server";
import User from "@/schema/user";
import connectDb from "@/lib/connectDb";

export async function POST(req) {
  // Parse the JSON body from the request
  const body = await req.json();
  const { name, email, phone, password, gender } = body;
  let user;
  let token;
  // Initialize an error state
  const errors = {};

  // Validation rules
  if (!name || name.trim() === "") {
    errors.name = "Name is required and cannot be empty.";
  } else if (/^\s|\s$/.test(name)) {
    errors.name = "Name cannot start or end with spaces.";
  } else if (/\d/.test(name)) {
    errors.name = "Name cannot contain numbers.";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required and cannot be empty.";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Email must be a valid email address.";
  }

  if (!phone || phone.trim() === "") {
    errors.phone = "Phone number is required and cannot be empty.";
  } else if (!/^\d{5,15}$/.test(phone)) {
    errors.phone = "Phone number must contain 5 to 15 digits.";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required and cannot be empty.";
  } else if (password.length < 7) {
    errors.password = "Password must be at least 7 characters long.";
  } else if (/^\s|\s$/.test(password)) {
    errors.password = "Password cannot start or end with spaces.";
  }

  if (!gender) {
    errors.gender = "Gender is required.";
  } else if (!["male", "female"].includes(gender.toLowerCase())) {
    errors.gender = "Gender must be either 'male' or 'female'.";
  }

  // If there are errors, return them as a JSON response
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation errors occurred.",
        errors,
        code: "VALIDATION_ERRORS",
      },
      { status: 400 }
    );
  }

  try {
    await connectDb();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user.",
        code: "ERROR_SERVER",
      },
      { status: 500 }
    );
  }

  try {
    const userExists = await User.findOne({ email:email });
    if (userExists) {
      if (userExists.emailVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists.",
            code: "USER_EXISTS",
          },
          { status: 400 }
        );
      }
      try {
        // await User.findOneAndDelete({ _id:new ObjectId(userExists._id) });
        await User.findByIdAndDelete(userExists._id);
      } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
          {
            success: false,
            message: "Error registering user.",
            code: "ERROR_SERVER",
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user.",
        code: "ERROR_SERVER",
      },
      { status: 500 }
    );
  }

  try {
    // user = await User.createOne(name, email,password, phone, gender);
    user = await User({
      name,
      email,
      password,
      phone_number:phone,
      gender
    });
    await user.save();
    token = tokenCreate({id:user._id, email});
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user.",
        code: "ERROR_REGISTERING_USER",
      },
      { status: 500 }
    );
  }

  try {
    await sendMail({
      to: email,
      subject: "Email Verification",
      text: `Remember invalid acces in 1 hour. Click on the following link to verify your email: ${process.env.NEXT_PUBLIC_VERIFICATION_URL}${process.env.NEXT_PATH_VERIFICATION_URL}${token}`,
      html: `<p>Remember invalid acces in 1 hour. Click on the following link to verify your email: <a href="${process.env.NEXT_PUBLIC_VERIFICATION_URL}${process.env.NEXT_PATH_VERIFICATION_URL}${token}">${process.env.NEXT_PUBLIC_VERIFICATION_URL}${process.env.NEXT_PATH_VERIFICATION_URL}${token}</a></p>`,
    });
    return NextResponse.json(
      {
        success: true,
        message: "User successfully registered.",
        code: "USER_REGISTERED",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending email verification:", error);
    try {
      // await User.findOneAndDelete({ _id: new ObjectId(user._id) });
      await User.findByIdAndDelete(user._id);
      console.log("User deleted due to email sending failure.");
    } catch (deleteError) {
      console.error("Error deleting user:", deleteError);
    }
    return NextResponse.json(
      {
        success: false,
        message: "Error sending email verification.",
        code: "ERROR_SENDING_EMAIL_VERIFICATION",
      },
      { status: 500 }
    );
  }
}
