export type UserRole = "student" | "faculty" | "admin";
export type AttendanceStatus = "present" | "absent" | "late";
export type NoticePriority = "low" | "normal" | "high" | "urgent";
export type CoverRequestStatus = "open" | "accepted" | "cancelled";

export interface Department {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department_id?: string;
  department_name?: string;
  created_at: string;
}

export interface Student {
  id: string;
  profile_id: string;
  enrollment_no: string;
  semester: number;
  division: string;
  department_id: string;
  department?: Department;
  profile?: Profile;
  created_at: string;
}

export interface FacultyMember {
  id: string;
  profile_id: string;
  employee_id: string;
  department_id: string;
  department?: Department;
  profile?: Profile;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  department_id: string;
  faculty_id?: string;
  faculty_name?: string;
  created_at: string;
}

export interface TimetableSlot {
  id: string;
  subject_id: string;
  subject_name?: string;
  subject_code?: string;
  faculty_id: string;
  faculty_name?: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  start_time: string;
  end_time: string;
  room: string;
  division: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name?: string;
  roll_no?: string;
  subject_id: string;
  subject_name?: string;
  faculty_id: string;
  date: string;
  status: AttendanceStatus;
  created_at: string;
}

export interface SubjectAttendanceSummary {
  subject_id: string;
  subject_name: string;
  subject_code: string;
  total_classes: number;
  present_count: number;
  absent_count: number;
  late_count: number;
  percentage: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: NoticePriority;
  created_by?: string;
  author_name?: string;
  created_at: string;
}

export interface CoverRequest {
  id: string;
  faculty_id: string;
  faculty_name?: string;
  subject_id: string;
  subject_name?: string;
  date: string;
  start_time: string;
  end_time: string;
  room: string;
  reason: string;
  status: CoverRequestStatus;
  accepted_by?: string;
  accepted_by_name?: string;
  created_at: string;
}
