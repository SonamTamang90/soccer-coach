import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { SignUpSchema } from "@/lib/validations";
import { Error as MongooseError } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Validate input using Zod schema
    const validationResult = SignUpSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors
        .map((err) => ({
          [err.path[0]]: err.message,
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    const { firstname, lastname, email, password, referralsource } =
      validationResult.data;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: { email: "Email already exists" } },
        { status: 409 }
      );
    }

    try {
      // Create new user
      const newUser = new User({
        firstname,
        lastname,
        email,
        password,
        referralSource: referralsource,
      });

      await newUser.save();

      // Don't return password in response
      const userWithoutPassword = {
        _id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        fullName: newUser.fullName,
        email: newUser.email,
        referralSource: newUser.referralSource,
        createdAt: newUser.createdAt,
      };

      return NextResponse.json(
        { success: true, data: userWithoutPassword },
        { status: 201 }
      );
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      // Handle database errors
      if (saveError instanceof MongooseError.ValidationError) {
        return NextResponse.json(
          { success: false, error: { form: "Database validation failed" } },
          { status: 400 }
        );
      }
      throw saveError; // Re-throw other errors to be caught by outer catch
    }
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json(
      { success: false, error: { form: "Something went wrong" } },
      { status: 500 }
    );
  }
}
