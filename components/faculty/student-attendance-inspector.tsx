"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarX,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Percent,
  Search,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/utils/cn";

interface StudentOption {
  id: string;
  name: string;
  rollNo: string;
  division: string;
  enrollmentNo: string;
}

export function StudentAttendanceInspector() {
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("stu-rec-003"); // Default to Rida Fatima
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-08");
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch student detailed attendance
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        let url = `/api/faculty/students/attendance?studentId=${encodeURIComponent(selectedStudentId)}&month=${encodeURIComponent(selectedMonth)}`;
        if (viewMode === "weekly" && selectedWeek) {
          url += `&week=${selectedWeek}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setData(json);
          if (json.students && students.length === 0) {
            setStudents(json.students);
          }
        }
      } catch (err) {
        console.error("Failed to load student attendance history", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedStudentId, selectedMonth, selectedWeek, viewMode, students.length]);

  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  return (
    <div className="card-surface rounded-2xl border border-border p-6 shadow-card space-y-6">
      {/* Header & Student Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E]">
            <CalendarCheck className="w-4 h-4" />
            <span>Student Attendance History & Verified Dates</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Individual Attendance Inspector
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect individual student lecture attendance, month/week breakdowns, and verified present dates.
          </p>
        </div>

        {/* Student Dropdown Selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="student-select" className="text-xs font-medium text-muted-foreground shrink-0 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Student:</span>
          </label>
          <div className="relative min-w-[240px]">
            <select
              id="student-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full h-10 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] transition-all cursor-pointer"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} (Roll {st.rollNo} · Div {st.division})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Controls: Month & Week Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary/50 p-3.5 rounded-xl border border-border">
        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setSelectedWeek(null);
            }}
            className="h-8 px-2.5 text-xs font-medium rounded-lg border border-border bg-background text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8B1E1E] cursor-pointer"
          >
            <option value="2026-08">August 2026</option>
            <option value="2026-07">July 2026</option>
            <option value="2026-09">September 2026</option>
          </select>
        </div>

        {/* View Mode: Monthly vs Weekly */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
            <button
              onClick={() => {
                setViewMode("monthly");
                setSelectedWeek(null);
              }}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "monthly"
                  ? "bg-[#1C1917] dark:bg-[#FAF9F5] text-white dark:text-[#1C1917] shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly View
            </button>
            <button
              onClick={() => {
                setViewMode("weekly");
                setSelectedWeek(1);
              }}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "weekly"
                  ? "bg-[#1C1917] dark:bg-[#FAF9F5] text-white dark:text-[#1C1917] shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Weekly View
            </button>
          </div>

          {/* Week Selector when in Weekly mode */}
          {viewMode === "weekly" && (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-md border transition-all",
                    selectedWeek === w
                      ? "border-[#8B1E1E] bg-[#8B1E1E] text-white font-semibold"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  Week {w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      {data?.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Percentage */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Attendance Rate
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className={cn(
                "text-2xl font-bold font-mono",
                data.stats.percentage >= 75 ? "text-success" : "text-destructive"
              )}>
                {data.stats.percentage}%
              </span>
              <span className="text-[11px] text-muted-foreground">
                ({data.stats.presentCount}/{data.stats.total})
              </span>
            </div>
          </div>

          {/* Card 2: Total Present */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Classes Present
            </span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-2xl font-bold font-mono text-foreground">
                {data.stats.presentCount}
              </span>
            </div>
          </div>

          {/* Card 3: Total Absent */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Classes Absent
            </span>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-2xl font-bold font-mono text-foreground">
                {data.stats.absentCount}
              </span>
            </div>
          </div>

          {/* Card 4: Total Late */}
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Late Arrivals
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              <span className="text-2xl font-bold font-mono text-foreground">
                {data.stats.lateCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actual Present Dates Section */}
      <div className="border border-border rounded-xl p-5 bg-card/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-success" />
            <h4 className="text-sm font-bold text-foreground">
              Actual Present Dates for {data?.student?.name || selectedStudent?.name || "Student"}
            </h4>
          </div>
          <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-0.5 rounded-full border border-success/20">
            {data?.presentDates?.length || 0} Attended Sessions
          </span>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-muted-foreground animate-pulse">
            Loading attendance records...
          </div>
        ) : data?.presentDates?.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            No present records found for this period.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {data?.presentDates?.map((dateStr: string) => (
              <div
                key={dateStr}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary hover:border-success/40 text-foreground text-xs font-mono transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                <span>{dateStr}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Session-by-Session Breakdown Table */}
      {data?.records && data.records.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Detailed Lecture Log
          </h4>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {data.records.map((rec: any) => (
                  <tr key={rec.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-foreground font-medium">
                      {rec.date}
                    </td>
                    <td className="px-4 py-2.5 text-foreground">
                      {rec.subject_name}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">
                      {rec.subject_code}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider",
                        rec.status === "present" && "bg-success/15 text-success border border-success/30",
                        rec.status === "late" && "bg-warning/15 text-warning border border-warning/30",
                        rec.status === "absent" && "bg-destructive/15 text-destructive border border-destructive/30"
                      )}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
