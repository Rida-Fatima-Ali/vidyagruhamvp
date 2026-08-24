"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  CalendarCheck,
  DoorOpen,
  GraduationCap,
  Inbox,
  LayoutGrid,
  Megaphone,
  Presentation,
  School,
  Sparkles,
  TriangleAlert,
  Users,
} from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { StatTiles, type StatTileItem } from "@/components/dashboard/stat-tiles";
import { Announcement } from "@/components/dashboard/announcement";
import { ModuleGrid, type ModuleGridItem } from "@/components/dashboard/module-grid";
import { DepartmentPerformance } from "@/components/admin/department-performance";
import { PendingApprovals } from "@/components/admin/pending-approvals";
import { InstitutionalActivity } from "@/components/admin/institutional-activity";
import { useAdminApprovalManager, useAdminDashboard } from "@/hooks/use-admin";
import { useAuth } from "@/hooks/use-auth";

const ADMIN_MODULES: ModuleGridItem[] = [
  { title: "Schedule", description: "Effective timetable and schedule changes.", icon: CalendarCheck, href: "/admin/schedule" },
  { title: "Students", description: "Division rosters and attendance standing.", icon: GraduationCap, href: "/admin/students" },
  { title: "Faculty", description: "Instructors and subject ownership.", icon: Users, href: "/admin/faculty" },
  { title: "Classes", description: "Division strengths and advisors.", icon: School, href: "/admin/classes" },
  { title: "Subjects", description: "Course master list and coverage.", icon: LayoutGrid, href: "/admin/subjects" },
  { title: "Departments", description: "Department structure and attendance.", icon: Building2, href: "/admin/departments" },
  { title: "Notices", description: "Publish campus and targeted notices.", icon: Megaphone, href: "/admin/notices" },
  { title: "Events", description: "Manage events and registrations.", icon: Sparkles, href: "/admin/events" },
  { title: "Approvals", description: "Enrollment and change requests.", icon: Inbox, href: "/admin/approvals" },
  { title: "Rooms", description: "Capacity and weekly utilization.", icon: DoorOpen, href: "/admin/rooms" },
  { title: "Analytics", description: "Academic and schedule insights.", icon: BarChart3, href: "/admin/analytics" },
  { title: "Attendance risk", description: "Students below threshold.", icon: TriangleAlert, href: "/admin/risk" },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { data, loading, error, refresh } = useAdminDashboard();
  const approvalsManager = useAdminApprovalManager();

  const tiles: StatTileItem[] = useMemo(
    () => [
      {
        id: "students",
        label: "Total students",
        value: data?.stats.totalStudents ?? 0,
        detail: "across 6 departments",
        tone: "primary",
        icon: Users,
      },
      {
        id: "faculty",
        label: "Active faculty",
        value: data?.stats.activeFaculty ?? 0,
        suffix: ` / ${data?.stats.facultyOnRoll ?? 0}`,
        detail: "12 on leave today",
        tone: "info",
        icon: Presentation,
      },
      {
        id: "attendance",
        label: "Attendance today",
        value: data?.stats.attendanceToday ?? 0,
        suffix: "%",
        detail:
          data && data.stats.attendanceTrend >= 0
            ? `+${data.stats.attendanceTrend.toFixed(1)} pts vs last week`
            : `${data?.stats.attendanceTrend.toFixed(1) ?? ""} pts vs last week`,
        tone: data && data.stats.attendanceTrend >= 0 ? "success" : "warning",
        icon: CalendarCheck,
      },
      {
        id: "approvals",
        label: "Pending approvals",
        value: data?.stats.pendingApprovals ?? 0,
        detail: data
          ? `${data.stats.newApprovals} new · ${data.stats.changedApprovals} changes`
          : "new · changes",
        tone: "warning",
        icon: Inbox,
      },
    ],
    [data],
  );

  const firstName = user?.name.split(" ")[0] ?? "there";
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          eyebrow="VidyaGruha · Administration"
          title={`${greeting}, ${firstName}`}
          description={
            data
              ? `Institution pulse for AY 2026-27 · ${data.departments.length} departments reporting, ${data.stats.pendingApprovals} approvals pending.`
              : "Loading the institution pulse for AY 2026-27…"
          }
          actions={<Badge variant="secondary">Academic Year 2026-27</Badge>}
        />

        {/* Live User Registration Requests Alert */}
        <RegistrationRequestsBanner />

        <StatTiles items={tiles} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DepartmentPerformance
              departments={data?.departments ?? []}
              loading={loading}
              error={error}
              onRetry={() => void refresh()}
            />
            <PendingApprovals
              approvals={data?.approvals ?? []}
              loading={loading}
              error={error}
              onRetry={() => void refresh()}
              limit={5}
              busy={approvalsManager.busy}
              onApprove={(approval) => {
                void approvalsManager.decide(approval.id, "approved").then((ok) => {
                  if (ok) void refresh();
                });
              }}
              onDefer={(approval) => {
                void approvalsManager.decide(approval.id, "deferred").then((ok) => {
                  if (ok) void refresh();
                });
              }}
            />
          </div>

          <div className="space-y-6">
            <InstitutionalActivity limit={6} />
            <Announcement />
          </div>
        </div>

        <ModuleGrid
          title="Administration modules"
          description="Everything you manage lives under one roof — dive into any area below."
          modules={ADMIN_MODULES}
        />
      </div>
    </PageTransition>
  );
}

import Link from "next/link";
import { CheckCircle2, ShieldAlert, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function RegistrationRequestsBanner() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadRequests() {
    try {
      const res = await fetch("/api/admin/approvals");
      const data = await res.json();
      if (data.success && Array.isArray(data.requests)) {
        setRequests(data.requests.filter((r: any) => r.status === "pending"));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRequests();
  }, []);

  async function handleQuickApprove(id: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, action: "approve" }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // ignore
    } finally {
      setBusyId(null);
    }
  }

  if (loading || requests.length === 0) return null;

  return (
    <div className="bg-warning/10 border border-warning/30 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-warning shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {requests.length} New User Registration Request{requests.length > 1 ? "s" : ""} Pending Approval
            </h4>
            <p className="text-xs text-muted-foreground">
              New prospective student or faculty members registered on the network and are awaiting credential activation.
            </p>
          </div>
        </div>

        <Link
          href="/admin/approvals"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-warning hover:underline shrink-0"
        >
          <span>Review All in Approvals</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
        {requests.slice(0, 3).map((req) => (
          <div
            key={req.id}
            className="bg-card border border-border p-3 rounded-xl flex items-center justify-between gap-2 shadow-xs"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-xs truncate">{req.displayName}</p>
              <p className="text-[11px] text-muted-foreground font-mono truncate">{req.email}</p>
              <span className="text-[10px] uppercase font-bold text-[#8B1E1E] dark:text-[#FF7575]">
                {req.role} · {req.department || "CMPN"}
              </span>
            </div>

            <Button
              size="sm"
              disabled={busyId === req.id}
              onClick={() => handleQuickApprove(req.id)}
              className="h-7 text-[11px] px-2.5 bg-success hover:bg-success/90 text-white shrink-0"
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>{busyId === req.id ? "Approving…" : "Approve"}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
