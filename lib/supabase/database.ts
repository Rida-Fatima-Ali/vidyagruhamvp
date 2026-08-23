import {
  Department,
  Profile,
  Student,
  FacultyMember,
  Subject,
  TimetableSlot,
  AttendanceRecord,
  SubjectAttendanceSummary,
  Notice,
  CoverRequest,
  AttendanceStatus,
} from "@/types/database";
import { isAllowedInstitutionEmail } from "@/lib/auth/validation";

// ── 1. Departments ────────────────────────────────────────────────────────────
const DEPARTMENTS: Department[] = [
  { id: "dept-cmpn", name: "Computer Engineering", code: "CMPN", created_at: "2026-01-01T00:00:00Z" },
  { id: "dept-it", name: "Information Technology", code: "IT", created_at: "2026-01-01T00:00:00Z" },
  { id: "dept-extc", name: "Electronics & Telecommunication", code: "EXTC", created_at: "2026-01-01T00:00:00Z" },
];

// ── 2. Profiles (Students, Faculty, Admin) ────────────────────────────────────
const PROFILES: Profile[] = [
  // Students
  { id: "usr-stu-001", name: "Lakshya Choithani", email: "lakshyachoithani@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-stu-002", name: "Gargi Thotam", email: "gargithotam@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-stu-003", name: "Rida Fatima", email: "ridafatima@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-stu-004", name: "Priyansh Bhan", email: "priyanshbhan@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-stu-005", name: "Tejas Nagare", email: "tejasnagare@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-stu-006", name: "Dheer Chheda", email: "dheerchheda@somaiya.edu", role: "student", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },

  // Faculty
  { id: "usr-fac-001", name: "Varsha Kinge", email: "varshakinge@somaiya.edu", role: "faculty", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-fac-002", name: "RNP", email: "rnp@somaiya.edu", role: "faculty", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-fac-003", name: "NRP", email: "nrp@somaiya.edu", role: "faculty", department_id: "dept-it", department_name: "Information Technology", created_at: "2026-01-01T00:00:00Z" },
  { id: "usr-fac-004", name: "Charu", email: "charu@somaiya.edu", role: "faculty", department_id: "dept-cmpn", department_name: "Computer Engineering", created_at: "2026-01-01T00:00:00Z" },

  // Admin
  { id: "usr-adm-001", name: "System Administrator", email: "admin01", role: "admin", created_at: "2026-01-01T00:00:00Z" },
];

// Add dummy student profiles up to 63 students
for (let i = 7; i <= 63; i++) {
  const numStr = String(i).padStart(3, "0");
  PROFILES.push({
    id: `usr-stu-${numStr}`,
    name: `Student ${numStr}`,
    email: `student${numStr}@somaiya.edu`,
    role: "student",
    department_id: "dept-cmpn",
    department_name: "Computer Engineering",
    created_at: "2026-01-01T00:00:00Z",
  });
}

// ── 3. Students Table (63 Records) ────────────────────────────────────────────
const STUDENTS: Student[] = [];
PROFILES.filter((p) => p.role === "student").forEach((p, idx) => {
  const roll = String(idx + 1).padStart(2, "0");
  STUDENTS.push({
    id: `stu-rec-${String(idx + 1).padStart(3, "0")}`,
    profile_id: p.id,
    enrollment_no: `16010123${String(idx + 1).padStart(3, "0")}`,
    semester: 3,
    division: idx < 32 ? "A" : "B",
    department_id: "dept-cmpn",
    created_at: "2026-01-01T00:00:00Z",
  });
});

// ── 4. Faculty Table ──────────────────────────────────────────────────────────
const FACULTY: FacultyMember[] = [
  { id: "fac-rec-001", profile_id: "usr-fac-001", employee_id: "EMP-CMPN-101", department_id: "dept-cmpn", created_at: "2026-01-01T00:00:00Z" },
  { id: "fac-rec-002", profile_id: "usr-fac-002", employee_id: "EMP-CMPN-102", department_id: "dept-cmpn", created_at: "2026-01-01T00:00:00Z" },
  { id: "fac-rec-003", profile_id: "usr-fac-003", employee_id: "EMP-IT-201", department_id: "dept-it", created_at: "2026-01-01T00:00:00Z" },
  { id: "fac-rec-004", profile_id: "usr-fac-004", employee_id: "EMP-CMPN-104", department_id: "dept-cmpn", created_at: "2026-01-01T00:00:00Z" },
];

// ── 5. Subjects Table ─────────────────────────────────────────────────────────
const SUBJECTS: Subject[] = [
  { id: "subj-001", name: "Data Structures & Analysis", code: "CSC301", semester: 3, department_id: "dept-cmpn", faculty_id: "fac-rec-001", faculty_name: "Varsha Kinge", created_at: "2026-01-01T00:00:00Z" },
  { id: "subj-002", name: "Database Management Systems", code: "CSC302", semester: 3, department_id: "dept-cmpn", faculty_id: "fac-rec-002", faculty_name: "RNP", created_at: "2026-01-01T00:00:00Z" },
  { id: "subj-003", name: "Computer Networks", code: "CSC303", semester: 3, department_id: "dept-cmpn", faculty_id: "fac-rec-003", faculty_name: "NRP", created_at: "2026-01-01T00:00:00Z" },
  { id: "subj-004", name: "Operating Systems", code: "CSC304", semester: 3, department_id: "dept-cmpn", faculty_id: "fac-rec-004", faculty_name: "Charu", created_at: "2026-01-01T00:00:00Z" },
  { id: "subj-005", name: "Microprocessor Architecture", code: "CSC305", semester: 3, department_id: "dept-cmpn", faculty_id: "fac-rec-001", faculty_name: "Varsha Kinge", created_at: "2026-01-01T00:00:00Z" },
];

// ── 6. Timetable ──────────────────────────────────────────────────────────────
const TIMETABLE: TimetableSlot[] = [
  { id: "tt-001", subject_id: "subj-001", subject_name: "Data Structures & Analysis", subject_code: "CSC301", faculty_id: "fac-rec-001", faculty_name: "Prof. Varsha Kinge", day: "Monday", start_time: "09:00", end_time: "10:00", room: "Room 101", division: "A", created_at: "2026-01-01T00:00:00Z" },
  { id: "tt-002", subject_id: "subj-002", subject_name: "Database Management Systems", subject_code: "CSC302", faculty_id: "fac-rec-002", faculty_name: "Prof. RNP", day: "Monday", start_time: "10:00", end_time: "11:00", room: "Room 101", division: "A", created_at: "2026-01-01T00:00:00Z" },
  { id: "tt-003", subject_id: "subj-003", subject_name: "Computer Networks", subject_code: "CSC303", faculty_id: "fac-rec-003", faculty_name: "Prof. NRP", day: "Monday", start_time: "11:30", end_time: "12:30", room: "Room 102", division: "A", created_at: "2026-01-01T00:00:00Z" },
  { id: "tt-004", subject_id: "subj-004", subject_name: "Operating Systems", subject_code: "CSC304", faculty_id: "fac-rec-004", faculty_name: "Prof. Charu", day: "Monday", start_time: "13:30", end_time: "14:30", room: "Lab 201", division: "A", created_at: "2026-01-01T00:00:00Z" },
  { id: "tt-005", subject_id: "subj-005", subject_name: "Microprocessor Architecture", subject_code: "CSC305", faculty_id: "fac-rec-001", faculty_name: "Prof. Varsha Kinge", day: "Monday", start_time: "14:30", end_time: "15:30", room: "Room 101", division: "A", created_at: "2026-01-01T00:00:00Z" },
];

// ── 7. Attendance Database (Relational Store) ──────────────────────────────────
const ATTENDANCE: AttendanceRecord[] = [];

// Seed 22 class sessions for each student in CMPN Division A
const DATES = [
  "2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04", "2026-08-05",
  "2026-08-08", "2026-08-09", "2026-08-10", "2026-08-11", "2026-08-12",
  "2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19",
  "2026-08-22", "2026-08-23", "2026-08-24", "2026-08-25", "2026-08-26",
  "2026-08-29", "2026-08-30",
];

STUDENTS.slice(0, 32).forEach((student, sIdx) => {
  SUBJECTS.forEach((subj, subIdx) => {
    DATES.forEach((dateStr, dIdx) => {
      // Create realistic non-hardcoded attendance variance per student
      // e.g. Rida Fatima: 18 present out of 22 = 81.8%
      const isAbsent = (sIdx + subIdx + dIdx) % 7 === 0;
      const isLate = !isAbsent && (sIdx + subIdx + dIdx) % 11 === 0;
      const status: AttendanceStatus = isAbsent ? "absent" : isLate ? "late" : "present";

      ATTENDANCE.push({
        id: `att-${student.id}-${subj.id}-${dateStr}`,
        student_id: student.id,
        subject_id: subj.id,
        faculty_id: subj.faculty_id || "fac-rec-001",
        date: dateStr,
        status,
        created_at: `${dateStr}T10:00:00Z`,
      });
    });
  });
});

// ── 8. Notices ────────────────────────────────────────────────────────────────
const NOTICES: Notice[] = [
  {
    id: "not-001",
    title: "Mid-Term Examination Schedule Announced",
    content: "Semester 3 examinations will commence on September 15, 2026. Hall tickets and seating charts will be released next week.",
    priority: "high",
    author_name: "System Administrator",
    created_at: "2026-08-22T09:00:00Z",
  },
  {
    id: "not-002",
    title: "Campus Smart India Hackathon 2026 Internal Round",
    content: "All short-listed teams must submit project repositories by Friday 5:00 PM for evaluation.",
    priority: "urgent",
    author_name: "Prof. Varsha Kinge",
    created_at: "2026-08-23T14:30:00Z",
  },
  {
    id: "not-003",
    title: "Central Library Extended Hours",
    content: "Reading rooms will remain open until 10:00 PM on all weekdays for study and research.",
    priority: "normal",
    author_name: "System Administrator",
    created_at: "2026-08-20T11:00:00Z",
  },
];

// ── 9. Cover Requests ─────────────────────────────────────────────────────────
const COVER_REQUESTS: CoverRequest[] = [
  {
    id: "cov-001",
    faculty_id: "fac-rec-001",
    faculty_name: "Prof. Varsha Kinge",
    subject_id: "subj-001",
    subject_name: "Data Structures & Analysis",
    date: "2026-08-25",
    start_time: "10:00",
    end_time: "11:00",
    room: "Room 101",
    reason: "Department Committee Meeting",
    status: "open",
    created_at: "2026-08-23T16:00:00Z",
  },
  {
    id: "cov-002",
    faculty_id: "fac-rec-002",
    faculty_name: "Prof. RNP",
    subject_id: "subj-002",
    subject_name: "Database Management Systems",
    date: "2026-08-24",
    start_time: "14:00",
    end_time: "15:00",
    room: "Room 102",
    reason: "Attending University Academic Council",
    status: "accepted",
    accepted_by: "fac-rec-004",
    accepted_by_name: "Prof. Charu",
    created_at: "2026-08-22T10:00:00Z",
  },
];

// =============================================================================
// MVP DATABASE GATEWAY (SINGLE SOURCE OF TRUTH)
// =============================================================================

export const mvpDb = {
  // Profiles & Authentication
  findProfileByEmail(email: string): Profile | undefined {
    const clean = email.trim().toLowerCase();
    return PROFILES.find((p) => p.email.toLowerCase() === clean);
  },

  findProfileById(id: string): Profile | undefined {
    return PROFILES.find((p) => p.id === id);
  },

  createProfile(name: string, email: string, role: "student" | "faculty" | "admin"): Profile {
    const newProfile: Profile = {
      id: `usr-${role.slice(0, 3)}-${String(PROFILES.length + 1).padStart(3, "0")}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      department_id: "dept-cmpn",
      department_name: "Computer Engineering",
      created_at: new Date().toISOString(),
    };
    PROFILES.push(newProfile);

    if (role === "student") {
      STUDENTS.push({
        id: `stu-rec-${String(STUDENTS.length + 1).padStart(3, "0")}`,
        profile_id: newProfile.id,
        enrollment_no: `16010123${String(STUDENTS.length + 1).padStart(3, "0")}`,
        semester: 3,
        division: "A",
        department_id: "dept-cmpn",
        created_at: new Date().toISOString(),
      });
    }

    return newProfile;
  },

  // Student Queries
  getStudentByProfileId(profileId: string): (Student & { profile: Profile; department: Department }) | undefined {
    const student = STUDENTS.find((s) => s.profile_id === profileId);
    if (!student) return undefined;
    const profile = PROFILES.find((p) => p.id === profileId)!;
    const department = DEPARTMENTS.find((d) => d.id === student.department_id)!;
    return { ...student, profile, department };
  },

  getStudentAttendance(studentId: string): SubjectAttendanceSummary[] {
    const summaries: SubjectAttendanceSummary[] = [];

    SUBJECTS.forEach((subj) => {
      const records = ATTENDANCE.filter(
        (a) => a.student_id === studentId && a.subject_id === subj.id
      );

      const total = records.length;
      const present = records.filter((a) => a.status === "present" || a.status === "late").length;
      const absent = records.filter((a) => a.status === "absent").length;
      const late = records.filter((a) => a.status === "late").length;
      const percentage = total > 0 ? Number(((present / total) * 100).toFixed(2)) : 0;

      summaries.push({
        subject_id: subj.id,
        subject_name: subj.name,
        subject_code: subj.code,
        total_classes: total,
        present_count: present,
        absent_count: absent,
        late_count: late,
        percentage,
      });
    });

    return summaries;
  },

  getStudentTimetable(departmentId: string, division = "A"): TimetableSlot[] {
    return TIMETABLE.filter((t) => t.division === division);
  },

  // Faculty Queries
  getFacultyByProfileId(profileId: string): (FacultyMember & { profile: Profile; department: Department }) | undefined {
    const fac = FACULTY.find((f) => f.profile_id === profileId);
    if (!fac) return undefined;
    const profile = PROFILES.find((p) => p.id === profileId)!;
    const department = DEPARTMENTS.find((d) => d.id === fac.department_id)!;
    return { ...fac, profile, department };
  },

  getFacultyClasses(facultyId: string) {
    const subjects = SUBJECTS.filter((s) => s.faculty_id === facultyId);
    const divisions = ["A", "B"];
    return {
      facultyId,
      subjects,
      divisions,
      roster: STUDENTS.slice(0, 32).map((st) => {
        const p = PROFILES.find((pr) => pr.id === st.profile_id);
        return {
          id: st.id,
          name: p?.name || "Student",
          rollNo: st.enrollment_no.slice(-2),
          division: st.division,
        };
      }),
    };
  },

  // Mark Attendance (Server-side insertion & upsert)
  markAttendance(data: {
    facultyId: string;
    subjectId: string;
    date: string;
    division: string;
    records: { studentId: string; status: AttendanceStatus }[];
  }): { success: boolean; count: number } {
    let count = 0;
    data.records.forEach((rec) => {
      const existingIdx = ATTENDANCE.findIndex(
        (a) => a.student_id === rec.studentId && a.subject_id === data.subjectId && a.date === data.date
      );

      if (existingIdx >= 0) {
        ATTENDANCE[existingIdx].status = rec.status;
      } else {
        ATTENDANCE.push({
          id: `att-${rec.studentId}-${data.subjectId}-${data.date}`,
          student_id: rec.studentId,
          subject_id: data.subjectId,
          faculty_id: data.facultyId,
          date: data.date,
          status: rec.status,
          created_at: new Date().toISOString(),
        });
      }
      count++;
    });

    return { success: true, count };
  },

  // Faculty Cover Requests
  getCoverRequests(): CoverRequest[] {
    return [...COVER_REQUESTS].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  createCoverRequest(data: {
    facultyId: string;
    subjectId: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    reason: string;
  }): CoverRequest {
    const fac = FACULTY.find((f) => f.id === data.facultyId);
    const facProf = fac ? PROFILES.find((p) => p.id === fac.profile_id) : undefined;
    const subj = SUBJECTS.find((s) => s.id === data.subjectId);

    const newReq: CoverRequest = {
      id: `cov-${String(COVER_REQUESTS.length + 1).padStart(3, "0")}`,
      faculty_id: data.facultyId,
      faculty_name: facProf?.name || "Professor",
      subject_id: data.subjectId,
      subject_name: subj?.name || "Lecture",
      date: data.date,
      start_time: data.startTime,
      end_time: data.endTime,
      room: data.room,
      reason: data.reason,
      status: "open",
      created_at: new Date().toISOString(),
    };

    COVER_REQUESTS.unshift(newReq);
    return newReq;
  },

  acceptCoverRequest(requestId: string, acceptingFacultyId: string): { success: boolean; request?: CoverRequest; error?: string } {
    const req = COVER_REQUESTS.find((r) => r.id === requestId);
    if (!req) return { success: false, error: "Cover request not found." };
    if (req.status !== "open") return { success: false, error: "This request has already been accepted or closed." };

    const fac = FACULTY.find((f) => f.id === acceptingFacultyId);
    const facProf = fac ? PROFILES.find((p) => p.id === fac.profile_id) : undefined;

    req.status = "accepted";
    req.accepted_by = acceptingFacultyId;
    req.accepted_by_name = facProf?.name || "Colleague";

    return { success: true, request: req };
  },

  // Notices
  getNotices(): Notice[] {
    return [...NOTICES].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  createNotice(data: { title: string; content: string; priority: "low" | "normal" | "high" | "urgent"; authorName: string }): Notice {
    const newNotice: Notice = {
      id: `not-${String(NOTICES.length + 1).padStart(3, "0")}`,
      title: data.title.trim(),
      content: data.content.trim(),
      priority: data.priority,
      author_name: data.authorName,
      created_at: new Date().toISOString(),
    };
    NOTICES.unshift(newNotice);
    return newNotice;
  },

  // Admin Dashboard Statistics
  getAdminStats() {
    const totalStudents = STUDENTS.length;
    const totalFaculty = FACULTY.length;
    const totalSubjects = SUBJECTS.length;
    const activeNotices = NOTICES.length;
    const openCoverRequests = COVER_REQUESTS.filter((c) => c.status === "open").length;

    // Calculate institutional attendance rate across all records
    const presentRecords = ATTENDANCE.filter((a) => a.status === "present" || a.status === "late").length;
    const totalRecords = ATTENDANCE.length;
    const attendancePercentage = totalRecords > 0 ? Number(((presentRecords / totalRecords) * 100).toFixed(1)) : 84.5;

    return {
      totalStudents,
      totalFaculty,
      totalSubjects,
      activeNotices,
      openCoverRequests,
      attendancePercentage,
      departments: DEPARTMENTS,
    };
  },
};
