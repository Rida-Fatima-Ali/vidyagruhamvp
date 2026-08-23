import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";
import { validateLoginIdentifier } from "@/lib/auth/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password, role } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/email and password are required." },
        { status: 400 }
      );
    }

    const cleanId = String(identifier).trim().toLowerCase();

    // 1. Enforce Somaiya domain validation server-side (single source of truth)
    const validation = validateLoginIdentifier(cleanId, role);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 2. Query Profile from database by email/identifier
    const profile = mvpDb.findProfileByEmail(cleanId);
    if (!profile) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // 3. Security: Role MUST come from the database (never trusted blindly from frontend)
    if (role && profile.role !== role) {
      return NextResponse.json(
        { error: "Invalid account type selected for this user." },
        { status: 403 }
      );
    }

    // 4. Verify password (prototype password check)
    if (password !== "kjsp@123") {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Determine role-based redirection URL
    let redirectUrl = "/student/dashboard";
    if (profile.role === "faculty") redirectUrl = "/faculty/dashboard";
    if (profile.role === "admin") redirectUrl = "/admin/dashboard";

    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        name: profile.name,
        displayName: profile.name,
        email: profile.email,
        username: profile.email,
        role: profile.role,
        department_name: profile.department_name,
      },
      redirectUrl,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
