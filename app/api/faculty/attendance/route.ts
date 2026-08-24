import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";
import { AttendanceStatus } from "@/types/database";
import {
  createAttendanceXmlBackup,
  cleanupXmlBackup,
  retainFailedXmlBackup,
} from "@/lib/xml/backup";

export async function POST(request: Request) {
  let backupFile: string | null = null;
  try {
    const body = await request.json();
    const { facultyId, subjectId, date, division, records } = body;

    if (!subjectId || !date || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { error: "Subject, date, and attendance records are required." },
        { status: 400 }
      );
    }

    // Step 1: Create local temporary XML backup before attempting DB write
    const backup = createAttendanceXmlBackup({
      facultyId: facultyId || "fac-rec-001",
      subjectId,
      date,
      division: division || "A",
      records,
    });
    backupFile = backup.filePath;

    // Step 2: Perform database insertion / update
    const result = mvpDb.markAttendance({
      facultyId: facultyId || "fac-rec-001",
      subjectId,
      date,
      division: division || "A",
      records: records as { studentId: string; status: AttendanceStatus }[],
    });

    // Step 3: Confirmed successful DB operation — delete temporary XML backup
    if (result.success && backupFile) {
      cleanupXmlBackup(backupFile);
    }

    return NextResponse.json({
      success: true,
      message: `Attendance marked successfully for ${result.count} students.`,
      count: result.count,
    });
  } catch (err: any) {
    // Step 4: DB failure — retain temporary XML backup for recovery
    if (backupFile) {
      retainFailedXmlBackup(backupFile, err);
    }

    return NextResponse.json(
      { error: "Failed to submit attendance. Backup retained." },
      { status: 500 }
    );
  }
}
