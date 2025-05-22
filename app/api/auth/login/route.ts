import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { verifyPassword } from "@/lib/auth";
import { SignInSchema } from "@/components/validation/auth-schemas";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Validate input using the same schema as the client-side
    try {
      SignInSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: { form: "Invalid input data" } },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { email: "Invalid email or password" } },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { password: "Invalid email or password" } },
        { status: 401 }
      );
    }

    // Don't return password in response
    const userWithoutPassword = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      referralSource: user.referralSource,
    };

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { success: false, error: { form: "Something went wrong" } },
      { status: 500 }
    );
  }
}
