import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";
import { isAllowedInstitutionEmail, getAllowedEmailDomain } from "@/lib/auth/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, displayName, email, password } = body;
    const fullName = displayName || name;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // 1. Single source of truth domain validation
    if (!isAllowedInstitutionEmail(cleanEmail)) {
      const domain = getAllowedEmailDomain();
      return NextResponse.json(
        { error: `Registration rejected. Only institutional emails ending with @${domain} are allowed.` },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters in length." },
        { status: 400 }
      );
    }

    // 2. Prevent duplicate email accounts
    const existing = mvpDb.findProfileByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // 3. Security: Default new public registrations strictly to "student"
    const newProfile = mvpDb.createProfile(fullName, cleanEmail, "student");

    return NextResponse.json(
      {
        success: true,
        message: "Account registered successfully.",
        user: {
          id: newProfile.id,
          name: newProfile.name,
          displayName: newProfile.name,
          email: newProfile.email,
          role: newProfile.role,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
