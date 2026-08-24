"use client";

import { useMemo, useState } from "react";
import {
  CheckCheck,
  ClipboardCheck,
  Clock4,
  Download,
  FileCheck,
  FileText,
  FileX,
  MessageSquare,
  Paperclip,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Panel } from "@/components/common/panel";
import { ListSkeleton } from "@/components/common/list-skeleton";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  useFacultyAssignments,
  useGradeSubmission,
  useSubmissions,
} from "@/hooks/use-faculty";
import { formatRelativeTime } from "@/utils/date";
import { cn } from "@/utils/cn";
import type { FacultySubmission, SubmissionState } from "@/types/faculty";

const STATE_META: Record<SubmissionState, { label: string; variant: "success" | "warning" | "destructive" }> = {
  submitted: { label: "Submitted", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  missing: { label: "Missing", variant: "destructive" },
};

export interface SubmissionsManagerProps {
  initialAssignmentId?: string | null;
}

export function SubmissionsManager({ initialAssignmentId }: SubmissionsManagerProps) {
  const { user } = useAuth();
  const { data: assignments, loading: assignmentsLoading } = useFacultyAssignments(user);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialAssignmentId && assignments?.some((a) => a.id === initialAssignmentId)
      ? initialAssignmentId
      : null,
  );
  const effectiveId =
    selectedId ?? assignments?.find((a) => new Date(a.dueDate) >= new Date())?.id ?? assignments?.[0]?.id ?? null;
  const { data: view, loading, error, refresh } = useSubmissions(user, effectiveId);
  const grader = useGradeSubmission(user);

  // Review Modal State
  const [reviewingSubmission, setReviewingSubmission] = useState<FacultySubmission | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState<string>("");
  const [reviewGrade, setReviewGrade] = useState<string>("");
  const [savingReview, setSavingReview] = useState<boolean>(false);

  const sorted = useMemo(() => {
    const list = view?.submissions ?? [];
    const order: Record<SubmissionState, number> = { pending: 0, submitted: 1, missing: 2 };
    return [...list].sort((a, b) => order[a.status] - order[b.status]);
  }, [view]);

  function handleOpenReviewModal(sub: FacultySubmission) {
    setReviewingSubmission(sub);
    setReviewFeedback(sub.feedback || "Good effort. Implementation logic is verified and correct.");
    setReviewGrade(typeof sub.grade === "number" ? String(sub.grade) : String(Math.floor((view?.assignment.maxMarks ?? 20) * 0.9)));
  }

  async function handleSaveReviewModal() {
    if (!reviewingSubmission) return;
    setSavingReview(true);
    const numeric = Number(reviewGrade);
    const ok = await grader.grade(
      reviewingSubmission.id,
      Number.isFinite(numeric) ? numeric : 18,
      reviewFeedback
    );
    setSavingReview(false);
    if (ok) {
      void refresh();
      setReviewingSubmission(null);
    }
  }

  if (assignmentsLoading) {
    return <ListSkeleton rows={6} />;
  }

  if (!assignments || assignments.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />}
        title="Nothing to review yet"
        description="Publish an assignment and submissions will appear here for grading."
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Assignment selector tabs */}
      <div
        role="tablist"
        aria-label="Choose an assignment"
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {assignments.map((assignment) => {
          const isActive = assignment.id === effectiveId;
          return (
            <button
              key={assignment.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedId(assignment.id)}
              className={cn(
                "flex min-w-0 shrink-0 cursor-pointer flex-col items-start gap-0.5 rounded-xl border px-4 py-2.5 text-left transition-colors duration-150 focus-visible:outline-none",
                isActive
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="max-w-[16rem] truncate text-sm font-medium">
                {assignment.title}
              </span>
              <span className="tabular text-[11px] opacity-70">
                {assignment.subject} · {assignment.code}
              </span>
            </button>
          );
        })}
      </div>

      {view ? (
        <SubmissionSummary
          submitted={view.stats.submitted}
          pending={view.stats.pending}
          missing={view.stats.missing}
          graded={view.stats.graded}
          avgGrade={view.stats.avgGrade}
          maxMarks={view.assignment.maxMarks}
        />
      ) : null}

      <Panel
        title={view?.assignment.title ?? "Submissions"}
        description={view ? `${view.assignment.subject} · ${view.assignment.code} · ${view.assignment.maxMarks} marks` : "Choose an assignment above"}
        flush
      >
        {loading ? (
          <ListSkeleton rows={6} />
        ) : error ? (
          <ErrorState
            className="m-5"
            description={error}
            onRetry={() => void refresh()}
          />
        ) : sorted.length === 0 ? (
          <div className="p-5">
            <EmptyState
              icon={<FileX className="h-5 w-5" aria-hidden="true" />}
              title="No submissions"
              description="Students haven't submitted for this assignment yet."
            />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {sorted.map((submission) => (
              <li
                key={submission.id}
                className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Avatar name={submission.studentName} size="sm" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <p className="truncate text-sm font-medium text-foreground">
                        {submission.studentName}
                      </p>
                      <span className="tabular text-xs text-muted-foreground font-mono">
                        Roll {submission.rollNo}
                      </span>
                      <Badge variant={STATE_META[submission.status].variant}>
                        {STATE_META[submission.status].label}
                      </Badge>
                      {typeof submission.grade === "number" && (
                        <span className="text-[11px] font-bold text-success font-mono bg-success/10 px-1.5 py-0.2 rounded border border-success/20">
                          {submission.grade} / {view?.assignment.maxMarks}
                        </span>
                      )}
                    </div>
                    {submission.submittedAt ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Submitted {formatRelativeTime(submission.submittedAt)} · File: <span className="font-mono text-foreground font-medium">{submission.rollNo}_CSC301.pdf</span>
                      </p>
                    ) : null}
                    {submission.feedback ? (
                      <p className="mt-0.5 text-xs italic text-foreground/80 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-primary shrink-0 inline" />
                        <span>“{submission.feedback}”</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenReviewModal(submission)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span>Review Submission</span>
                  </Button>

                  <GradeField
                    key={`${submission.id}-${submission.grade ?? "none"}`}
                    submission={submission}
                    maxMarks={view?.assignment.maxMarks ?? 10}
                    busy={grader.busy}
                    onGraded={async (value, feedback) => {
                      const ok = await grader.grade(submission.id, value, feedback);
                      if (ok) void refresh();
                      return ok;
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {/* MODAL: FACULTY REVIEW & EVALUATION DRAWER */}
      {reviewingSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                  Faculty Assignment Review
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  Reviewing {reviewingSubmission.studentName}
                </h3>
              </div>
              <button
                onClick={() => setReviewingSubmission(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Student Metadata Card */}
              <div className="bg-secondary/40 p-3.5 rounded-xl border border-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">{reviewingSubmission.studentName}</p>
                  <p className="text-muted-foreground">Roll No: {reviewingSubmission.rollNo} · Division A</p>
                </div>
                <Badge variant={STATE_META[reviewingSubmission.status].variant}>
                  {STATE_META[reviewingSubmission.status].label}
                </Badge>
              </div>

              {/* Submitted File Preview Card */}
              <div className="border border-border p-3.5 rounded-xl bg-card space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Submitted Assignment Document
                </span>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{reviewingSubmission.rollNo}_CSC301_Assignment.pdf</p>
                      <p className="text-[10px] text-muted-foreground">PDF Document · 1.4 MB · Uploaded on time</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>

              {/* Faculty Review Remarks Input */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  <span>Faculty Review Remarks & Detailed Feedback:</span>
                </label>
                <textarea
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Provide feedback on the submission, code quality, and test results..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* Assigned Marks */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">
                  Evaluation Marks (out of {view?.assignment.maxMarks ?? 20}):
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={view?.assignment.maxMarks ?? 20}
                    value={reviewGrade}
                    onChange={(e) => setReviewGrade(e.target.value)}
                    className="h-9 w-24 tabular text-foreground font-mono font-bold"
                  />
                  <span className="text-muted-foreground">/ {view?.assignment.maxMarks ?? 20} Marks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setReviewingSubmission(null)}>
                Cancel
              </Button>
              <Button size="sm" disabled={savingReview} onClick={handleSaveReviewModal}>
                <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                <span>{savingReview ? "Saving Review…" : "Approve & Save Review"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubmissionSummary({
  submitted,
  pending,
  missing,
  graded,
  avgGrade,
  maxMarks,
}: {
  submitted: number;
  pending: number;
  missing: number;
  graded: number;
  avgGrade: number | null;
  maxMarks: number;
}) {
  const tiles = [
    { label: "Submitted", value: submitted, icon: CheckCheck, tone: "text-success" },
    { label: "Pending", value: pending, icon: Clock4, tone: "text-warning" },
    { label: "Missing", value: missing, icon: FileX, tone: "text-destructive" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card"
        >
          <tile.icon className={cn("h-4 w-4 shrink-0", tile.tone)} aria-hidden="true" />
          <div>
            <p className="tabular font-heading text-lg font-bold leading-none">
              {tile.value}
            </p>
            <p className="mt-1 text-[11px] font-medium text-muted-foreground">
              {tile.label}
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
        <ClipboardCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="tabular font-heading text-lg font-bold leading-none">
            {avgGrade === null ? "—" : avgGrade}
            {avgGrade !== null ? (
              <span className="text-xs font-medium text-muted-foreground">
                /{maxMarks}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
            {graded} graded · Avg
          </p>
        </div>
      </div>
    </div>
  );
}

function GradeField({
  submission,
  maxMarks,
  busy,
  onGraded,
}: {
  submission: FacultySubmission;
  maxMarks: number;
  busy: boolean;
  onGraded: (value: number, feedback?: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState(
    typeof submission.grade === "number" ? String(submission.grade) : "",
  );
  const [saving, setSaving] = useState(false);
  const hasGrade = typeof submission.grade === "number";
  const changed = value !== String(submission.grade ?? "");

  async function save(): Promise<void> {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) return;
    setSaving(true);
    const ok = await onGraded(Math.min(numeric, maxMarks));
    setSaving(false);
    if (!ok) setValue(submission.grade !== undefined ? String(submission.grade) : "");
  }

  return (
    <div className="flex shrink-0 items-center gap-2 sm:ml-2">
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          min={0}
          max={maxMarks}
          value={value}
          disabled={busy}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void save();
          }}
          aria-label={`Grade for ${submission.studentName}`}
          className={cn(
            "h-8 w-20 text-right tabular",
            hasGrade && !changed && "text-success",
          )}
        />
        <span className="text-xs text-muted-foreground">/{maxMarks}</span>
      </div>
      {changed ? (
        <Button
          variant="default"
          size="sm"
          disabled={busy || saving || value === ""}
          onClick={() => void save()}
        >
          {busy || saving ? "Saving…" : "Save"}
        </Button>
      ) : hasGrade ? (
        <Badge variant="success">Graded</Badge>
      ) : null}
    </div>
  );
}
