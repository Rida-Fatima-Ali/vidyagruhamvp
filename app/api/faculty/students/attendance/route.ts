import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const month = searchParams.get("month") || "2026-08";
    const weekParam = searchParams.get("week");
    const week = weekParam ? parseInt(weekParam, 10) : undefined;

    // List all students for dropdown selection
    const allStudents = mvpDb.getAllStudents();

    const selectedId = studentId || allStudents[2]?.id || allStudents[0]?.id || "stu-rec-003";
    const data = mvpDb.getStudentDetailedAttendance(selectedId, { month, week });

    return NextResponse.json({
      success: true,
      students: allStudents,
      selectedStudentId: selectedId,
      filter: { month, week },
      ...data,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch student attendance history." },
      { status: 500 }
    );
  }
}
