import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "ridafatima@somaiya.edu";
    const profile = mvpDb.findProfileByEmail(email);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }

    const student = mvpDb.getStudentByProfileId(profile.id);
    const studentId = student?.id || "stu-rec-003";

    // Query real attendance records from database and calculate exact percentages
    const summaries = mvpDb.getStudentAttendance(studentId);

    // Compute overall total & attendance %
    const totalClasses = summaries.reduce((sum, s) => sum + s.total_classes, 0);
    const totalPresent = summaries.reduce((sum, s) => sum + s.present_count, 0);
    const overallPercentage = totalClasses > 0 ? Number(((totalPresent / totalClasses) * 100).toFixed(2)) : 0;

    return NextResponse.json({
      success: true,
      attendance: summaries,
      overall: {
        total_classes: totalClasses,
        total_present: totalPresent,
        percentage: overallPercentage,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch student attendance." }, { status: 500 });
  }
}
