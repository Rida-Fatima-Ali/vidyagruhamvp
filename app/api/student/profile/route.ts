import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "ridafatima@somaiya.edu";
    const profile = mvpDb.findProfileByEmail(email);

    if (!profile) {
      return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
    }

    const student = mvpDb.getStudentByProfileId(profile.id);
    return NextResponse.json({ success: true, student, profile });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch student profile." }, { status: 500 });
  }
}
