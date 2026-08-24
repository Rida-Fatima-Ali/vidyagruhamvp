import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";
import {
  createStudentXmlBackup,
  cleanupXmlBackup,
  retainFailedXmlBackup,
} from "@/lib/xml/backup";

export async function GET() {
  try {
    const students = mvpDb.getAllStudents();
    return NextResponse.json({ success: true, students });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch student records." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let backupFile: string | null = null;
  try {
    const body = await request.json();
    const { name, email, departmentId, semester, division } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Student name and email are required." },
        { status: 400 }
      );
    }

    const enrollmentNo = `16010123${Math.floor(100 + Math.random() * 900)}`;

    // Step 1: Create local temporary XML backup before DB write
    const backup = createStudentXmlBackup({
      name,
      email,
      enrollmentNo,
      departmentId: departmentId || "dept-cmpn",
      semester: semester || 3,
      division: division || "A",
    });
    backupFile = backup.filePath;

    // Step 2: Perform DB creation
    const profile = mvpDb.createProfile(name, email, "student");

    // Step 3: Confirmed DB write — remove temporary XML
    if (profile && backupFile) {
      cleanupXmlBackup(backupFile);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Student record created successfully.",
        student: profile,
      },
      { status: 201 }
    );
  } catch (err: any) {
    // Step 4: DB failure — retain XML backup
    if (backupFile) {
      retainFailedXmlBackup(backupFile, err);
    }

    return NextResponse.json(
      { error: "Failed to create student record. Backup retained." },
      { status: 500 }
    );
  }
}
