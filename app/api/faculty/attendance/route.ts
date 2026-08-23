import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";
import { AttendanceStatus } from "@/types/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facultyId, subjectId, date, division, records } = body;

    if (!subjectId || !date || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { error: "Subject, date, and attendance records are required." },
        { status: 400 }
      );
    }

    const result = mvpDb.markAttendance({
      facultyId: facultyId || "fac-rec-001",
      subjectId,
      date,
      division: division || "A",
      records: records as { studentId: string; status: AttendanceStatus }[],
    });

    return NextResponse.json({
      success: true,
      message: `Attendance marked successfully for ${result.count} students.`,
      count: result.count,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit attendance." }, { status: 500 });
  }
}
