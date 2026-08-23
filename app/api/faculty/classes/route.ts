import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "varshakinge@somaiya.edu";
    const profile = mvpDb.findProfileByEmail(email);

    if (!profile) {
      return NextResponse.json({ error: "Faculty profile not found." }, { status: 404 });
    }

    const fac = mvpDb.getFacultyByProfileId(profile.id);
    const facId = fac?.id || "fac-rec-001";
    const data = mvpDb.getFacultyClasses(facId);

    return NextResponse.json({ success: true, ...data, profile });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch faculty classes." }, { status: 500 });
  }
}
