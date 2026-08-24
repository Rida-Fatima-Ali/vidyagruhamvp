import { NextResponse } from "next/server";
import { db } from "@/services/database";
import { mvpDb } from "@/lib/supabase/database";
import { isAllowedInstitutionEmail, getAllowedEmailDomain } from "@/lib/auth/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, displayName, email, password, role, department } = body;
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
    const existingMvp = mvpDb.findProfileByEmail(cleanEmail);
    const existingDb = db.findUserByLogin(cleanEmail);
    if (existingMvp || existingDb) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // 3. Create pending registration request for Admin review and approval
    const result = db.createRegistrationRequest({
      displayName: fullName,
      email: cleanEmail,
      role: role === "faculty" ? "faculty" : "student",
      department: department || "Computer Engineering",
      password,
    });

    if (!result.success || !result.request) {
      return NextResponse.json(
        { error: result.error || "Failed to create registration request." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully. Awaiting administrator approval.",
        request: result.request,
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
