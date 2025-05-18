import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, text } = body;

    // Validate required fields
    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Mock implementation - no actual email is sent
    console.log("Email would be sent:", { to, subject });

    return NextResponse.json({
      message: "Email functionality is disabled. This is a frontend-only demo.",
      mock: true,
    });
  } catch (error: unknown) {
    console.error("Error processing email request:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to process email request", details: errorMessage },
      { status: 500 }
    );
  }
}
