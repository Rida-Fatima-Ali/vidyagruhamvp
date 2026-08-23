import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get("division") || "A";
    const departmentId = searchParams.get("department_id") || "dept-cmpn";

    const slots = mvpDb.getStudentTimetable(departmentId, division);
    return NextResponse.json({ success: true, timetable: slots });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch timetable." }, { status: 500 });
  }
}
