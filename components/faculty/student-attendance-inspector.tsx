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
  Coffee,
  GraduationCap,
  Info,
  Percent,
  Search,
  Sparkles,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [viewMode, setViewMode] = useState<"calendar" | "weekly" | "table">("calendar");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<"all" | "present" | "absent" | "holidays">("all");

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

  // Calendar Generation for Selected Month
  const calendarDays = useMemo(() => {
    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1; // 0-indexed

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Mon...
    // Normalize to Monday = 0, Sunday = 6
    const startOffset = (firstDayOfWeek + 6) % 7;

    const days = [];

    // Empty padding days for previous month
    for (let i = 0; i < startOffset; i++) {
      days.push({ type: "empty", dayNum: null, dateStr: null });
    }

    // Days 1 to daysInMonth
    for (let d = 1; d <= daysInMonth; d++) {
      const dayFormatted = d < 10 ? `0${d}` : `${d}`;
      const monthFormatted = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
      const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;
      const dateObj = new Date(year, month, d);
      const dayOfWeek = dateObj.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday

      // Look up attendance records for this day
      const dayRecords = data?.records?.filter((r: any) => r.date === dateStr) || [];
      const hasPresent = dayRecords.some((r: any) => r.status === "present" || r.status === "late");
      const hasAbsent = dayRecords.some((r: any) => r.status === "absent");
      const isLate = dayRecords.some((r: any) => r.status === "late");

      days.push({
        type: "day",
        dayNum: d,
        dateStr,
        dayOfWeek,
        isWeekend,
        dayRecords,
        hasPresent,
        hasAbsent,
        isLate,
      });
    }

    return days;
  }, [selectedMonth, data?.records]);

  return (
    <div className="card-surface rounded-2xl border border-border p-6 shadow-card space-y-6">
      {/* Header & Student Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E]">
            <CalendarCheck className="w-4 h-4" />
            <span>Student Attendance & Monthly Calendar</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mt-1">
            Student Attendance Inspector
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            View monthly visual attendance calendar with weekend holidays and verified present days.
          </p>
        </div>

        {/* Student Dropdown Selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="student-select" className="text-xs font-medium text-muted-foreground shrink-0 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Select Student:</span>
          </label>
          <div className="relative min-w-[260px]">
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

      {/* Filter Controls: Month & View Mode */}
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
            className="h-8 px-3 text-xs font-medium rounded-lg border border-border bg-background text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8B1E1E] cursor-pointer"
          >
            <option value="2026-08">August 2026</option>
            <option value="2026-07">July 2026</option>
            <option value="2026-09">September 2026</option>
          </select>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
            <button
              onClick={() => {
                setViewMode("calendar");
                setSelectedWeek(null);
              }}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "calendar"
                  ? "bg-[#1C1917] dark:bg-[#FAF9F5] text-white dark:text-[#1C1917] shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly Calendar
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
            <button
              onClick={() => {
                setViewMode("table");
                setSelectedWeek(null);
              }}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                viewMode === "table"
                  ? "bg-[#1C1917] dark:bg-[#FAF9F5] text-white dark:text-[#1C1917] shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Log Table
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

      {/* MONTHLY CALENDAR VIEW (Requested Feature) */}
      {viewMode === "calendar" && (
        <div className="border border-border rounded-xl p-5 bg-card/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[#8B1E1E]" />
              <h4 className="text-base font-bold text-foreground">
                Monthly Attendance Calendar · {selectedMonth === "2026-08" ? "August 2026" : selectedMonth}
              </h4>
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-success/20 border border-success flex items-center justify-center text-[8px] text-success font-bold">✓</span>
                <span className="text-muted-foreground">Present (Attended)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-destructive/20 border border-destructive flex items-center justify-center text-[8px] text-destructive font-bold">✗</span>
                <span className="text-muted-foreground">Absent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-secondary border border-border flex items-center justify-center text-[8px] text-muted-foreground font-mono">H</span>
                <span className="text-muted-foreground">Sat / Sun (Holiday)</span>
              </div>
            </div>
          </div>

          {/* Calendar 7-Column Grid */}
          <div className="space-y-2">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground py-2 border-b border-border/60">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span className="text-muted-foreground/60">Sat (Holiday)</span>
              <span className="text-muted-foreground/60">Sun (Holiday)</span>
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((item, idx) => {
                if (item.type === "empty") {
                  return (
                    <div
                      key={`empty-${idx}`}
                      className="min-h-[85px] rounded-xl border border-dashed border-border/30 bg-secondary/10 opacity-30"
                    />
                  );
                }

                const isSat = item.dayOfWeek === 6;
                const isSun = item.dayOfWeek === 0;
                const isHoliday = isSat || isSun;

                return (
                  <div
                    key={`day-${item.dayNum}`}
                    className={cn(
                      "min-h-[85px] p-2.5 rounded-xl border flex flex-col justify-between transition-all relative overflow-hidden",
                      // Holiday / Weekend
                      isHoliday && "bg-secondary/40 border-border/60 text-muted-foreground/75",
                      // Class Day - Present
                      !isHoliday && item.hasPresent && "bg-success/10 border-success/40 text-foreground ring-1 ring-success/20",
                      // Class Day - Absent
                      !isHoliday && item.hasAbsent && !item.hasPresent && "bg-destructive/10 border-destructive/40 text-foreground ring-1 ring-destructive/20",
                      // Class Day - No recorded lecture
                      !isHoliday && !item.hasPresent && !item.hasAbsent && "bg-card border-border text-foreground"
                    )}
                  >
                    {/* Day number & Tag */}
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-sm font-bold font-mono",
                        item.hasPresent && "text-success font-extrabold",
                        item.hasAbsent && !item.hasPresent && "text-destructive font-extrabold",
                        isHoliday && "text-muted-foreground"
                      )}>
                        {item.dayNum}
                      </span>

                      {isHoliday ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-secondary text-muted-foreground">
                          <Coffee className="w-2.5 h-2.5" />
                          <span>Off</span>
                        </span>
                      ) : item.hasPresent ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-success/20 text-success border border-success/30">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Present</span>
                        </span>
                      ) : item.hasAbsent ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-destructive/20 text-destructive border border-destructive/30">
                          <XCircle className="w-2.5 h-2.5" />
                          <span>Absent</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/60">No class</span>
                      )}
                    </div>

                    {/* Sub-details inside day box */}
                    <div className="mt-1.5 text-[10px]">
                      {isHoliday ? (
                        <span className="text-muted-foreground/60 italic block">
                          {isSat ? "Saturday Holiday" : "Sunday Holiday"}
                        </span>
                      ) : item.dayRecords.length > 0 ? (
                        <div className="space-y-0.5">
                          {item.dayRecords.slice(0, 2).map((r: any) => (
                            <div key={r.id} className="truncate text-muted-foreground flex items-center gap-1">
                              <span className={cn(
                                "w-1.5 h-1.5 rounded-full shrink-0",
                                r.status === "present" ? "bg-success" : r.status === "late" ? "bg-warning" : "bg-destructive"
                              )} />
                              <span className="font-mono text-[9.5px] truncate font-medium">{r.subject_code}</span>
                            </div>
                          ))}
                          {item.dayRecords.length > 2 && (
                            <span className="text-[9px] text-muted-foreground/75 font-mono">
                              +{item.dayRecords.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground/40 italic">Scheduled free</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* WEEKLY VIEW */}
      {viewMode === "weekly" && (
        <div className="border border-border rounded-xl p-5 bg-card/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">
              Weekly Attendance Breakdown · Week {selectedWeek || 1}
            </h4>
            <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-0.5 rounded-full border border-success/20">
              {data?.presentDates?.length || 0} Attended Classes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((dayName, dIdx) => (
              <div key={dayName} className="border border-border bg-card p-3 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-1">
                  {dayName}
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-success/10 border border-success/20 flex items-center justify-between text-xs">
                    <span className="font-semibold text-success">Lecture Attendance</span>
                    <span className="font-mono text-success font-bold">Present</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOG TABLE VIEW */}
      {viewMode === "table" && data?.records && data.records.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Detailed Class Log
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
