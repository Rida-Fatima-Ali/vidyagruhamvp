import fs from "node:fs";
import path from "node:path";

// Server-side private temporary directory (outside public/static)
const BACKUP_DIR = path.join(process.cwd(), ".temp_xml_backups");

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

/**
 * Generates and stages a temporary XML backup for attendance records before DB commit.
 */
export function createAttendanceXmlBackup(data: {
  facultyId: string;
  subjectId: string;
  date: string;
  division: string;
  records: { studentId: string; status: string }[];
}): { filePath: string; xmlContent: string } {
  ensureBackupDir();

  const timestamp = new Date().toISOString();
  const fileId = `attendance_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.xml`;
  const filePath = path.join(BACKUP_DIR, fileId);

  const xmlRecords = data.records
    .map(
      (r) => `    <attendance>
      <studentId>${r.studentId}</studentId>
      <status>${r.status}</status>
    </attendance>`
    )
    .join("\n");

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<attendanceBackup timestamp="${timestamp}">
  <facultyId>${data.facultyId}</facultyId>
  <subjectId>${data.subjectId}</subjectId>
  <date>${data.date}</date>
  <division>${data.division}</division>
  <records>
${xmlRecords}
  </records>
</attendanceBackup>`;

  fs.writeFileSync(filePath, xmlContent, "utf-8");
  return { filePath, xmlContent };
}

/**
 * Generates and stages a temporary XML backup for student records before DB commit.
 */
export function createStudentXmlBackup(data: {
  name: string;
  email: string;
  enrollmentNo: string;
  departmentId: string;
  semester: number;
  division: string;
}): { filePath: string; xmlContent: string } {
  ensureBackupDir();

  const timestamp = new Date().toISOString();
  const fileId = `student_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.xml`;
  const filePath = path.join(BACKUP_DIR, fileId);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<studentBackup timestamp="${timestamp}">
  <name>${data.name}</name>
  <email>${data.email}</email>
  <enrollmentNo>${data.enrollmentNo}</enrollmentNo>
  <departmentId>${data.departmentId}</departmentId>
  <semester>${data.semester}</semester>
  <division>${data.division}</division>
</studentBackup>`;

  fs.writeFileSync(filePath, xmlContent, "utf-8");
  return { filePath, xmlContent };
}

/**
 * Cleans up and deletes the temporary XML backup only after a confirmed DB success.
 */
export function cleanupXmlBackup(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Failed to delete temporary XML backup at ${filePath}:`, err);
    return false;
  }
}

/**
 * Retains failed XML backup and logs reason for manual/automated recovery.
 */
export function retainFailedXmlBackup(filePath: string, error: any): void {
  console.warn(
    `[XML-BACKUP-RETAINED] Database operation failed. Staged XML retained at ${filePath}. Reason:`,
    error
  );
}
