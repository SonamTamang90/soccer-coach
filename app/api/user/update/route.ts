import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { verifyPassword } from "@/lib/auth";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    console.log("Connected to MongoDB");

    // Parse the request body
    const body = await req.json();
    const { userId, currentPassword, ...updateData } = body;
    console.log("Update request for user ID:", userId);
    console.log("Update data:", JSON.stringify(updateData, null, 2));

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid user ID:", userId);
      return NextResponse.json(
        { success: false, error: { form: "Invalid user ID" } },
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found with ID:", userId);
      return NextResponse.json(
        { success: false, error: { form: "User not found" } },
        { status: 404 }
      );
    }
    console.log("Found user in database:", user.name, user.email);
    console.log(
      "Current user fields:",
      JSON.stringify(
        {
          name: user.name,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          location: user.location,
          avatar: user.avatar ? "Has avatar" : "No avatar",
        },
        null,
        2
      )
    );

    // If password is being changed, verify current password
    if (updateData.password) {
      if (!currentPassword) {
        console.log("Password update attempted without current password");
        return NextResponse.json(
          {
            success: false,
            error: { currentPassword: "Current password is required" },
          },
          { status: 400 }
        );
      }

      // Verify current password
      const isPasswordValid = await verifyPassword(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        console.log("Invalid current password provided for password change");
        return NextResponse.json(
          {
            success: false,
            error: { currentPassword: "Current password is incorrect" },
          },
          { status: 401 }
        );
      }
      console.log("Password validation successful");
    }

    // Update user fields directly
    console.log(
      "Before update - user object:",
      JSON.stringify(
        {
          name: user.name,
          bio: user.bio,
          phone: user.phone,
          location: user.location,
          avatar: user.avatar ? "Has avatar" : "No avatar",
        },
        null,
        2
      )
    );

    // Update specific fields directly to avoid issues
    if (updateData.name) user.name = updateData.name;
    if (updateData.bio !== undefined) user.bio = updateData.bio;
    if (updateData.phone !== undefined) user.phone = updateData.phone;
    if (updateData.location !== undefined) user.location = updateData.location;
    if (updateData.avatar !== undefined) user.avatar = updateData.avatar;
    if (updateData.password) user.password = updateData.password;

    console.log(
      "After update - user object:",
      JSON.stringify(
        {
          name: user.name,
          bio: user.bio,
          phone: user.phone,
          location: user.location,
          avatar: user.avatar ? "Has avatar" : "No avatar",
        },
        null,
        2
      )
    );

    // Use updateOne to ensure all fields get updated in MongoDB
    console.log("Saving updated user to database...");
    const updateResult = await User.updateOne(
      { _id: userId },
      {
        $set: {
          name: user.name,
          bio: user.bio || "",
          phone: user.phone || "",
          location: user.location || "",
          avatar: user.avatar || "",
          ...(updateData.password && { password: user.password }),
        },
      }
    );
    console.log("Update result:", updateResult);

    // Get the freshly updated user from database
    const updatedUser = await User.findById(userId);
    console.log(
      "Updated user from database:",
      JSON.stringify(
        {
          name: updatedUser?.name,
          bio: updatedUser?.bio,
          phone: updatedUser?.phone,
          location: updatedUser?.location,
          avatar: updatedUser?.avatar ? "Has avatar" : "No avatar",
        },
        null,
        2
      )
    );

    // Return user data without password
    const userWithoutPassword = {
      _id: updatedUser?._id || user._id,
      name: updatedUser?.name || user.name,
      email: updatedUser?.email || user.email,
      avatar: updatedUser?.avatar || user.avatar,
      bio: updatedUser?.bio || user.bio,
      phone: updatedUser?.phone || user.phone,
      location: updatedUser?.location || user.location,
      createdAt: updatedUser?.createdAt || user.createdAt,
      updatedAt: updatedUser?.updatedAt || user.updatedAt,
    };

    console.log(
      "Returning updated user data:",
      JSON.stringify(
        {
          name: userWithoutPassword.name,
          bio: userWithoutPassword.bio,
          phone: userWithoutPassword.phone,
          location: userWithoutPassword.location,
          avatar: userWithoutPassword.avatar ? "Has avatar" : "No avatar",
        },
        null,
        2
      )
    );

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: { form: "Something went wrong" } },
      { status: 500 }
    );
  }
}
