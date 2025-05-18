import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { SignUpSchema } from "@/components/validation/auth-schemas";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Validate input using the same schema as the client-side
    try {
      SignUpSchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: { form: "Invalid input data" } },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: { email: "Email already exists" } },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    // Don't return password in response
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json(
      { success: false, error: { form: "Something went wrong" } },
      { status: 500 }
    );
  }
}
