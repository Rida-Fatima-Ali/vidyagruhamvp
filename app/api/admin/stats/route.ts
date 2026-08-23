import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET() {
  try {
    const stats = mvpDb.getAdminStats();
    return NextResponse.json({ success: true, stats });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch admin statistics." }, { status: 500 });
  }
}
