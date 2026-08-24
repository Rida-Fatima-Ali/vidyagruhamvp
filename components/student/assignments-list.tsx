"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  FileUp,
  MessageSquare,
  Paperclip,
  Send,
  UploadCloud,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Panel } from "@/components/common/panel";
import { ListSkeleton } from "@/components/common/list-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { formatDueLabel, formatShortDate } from "@/utils/date";
import { DEMO_NOW } from "@/constants/demo";
import type {
  AssignmentStatus,
  StudentAssignment,
} from "@/types/student";

const STATUS_CONFIG: Record<
  AssignmentStatus,
  { label: string; icon: LucideIcon; chipClass: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    chipClass: "bg-warning/10 text-warning ring-inset ring-warning/25",
  },
  submitted: {
    label: "Submitted / In Review",
    icon: CheckCircle2,
    chipClass: "bg-info/10 text-info ring-inset ring-info/25",
  },
  late: {
    label: "Overdue",
    icon: AlertCircle,
    chipClass: "bg-destructive/10 text-destructive ring-inset ring-destructive/25",
  },
  graded: {
    label: "Reviewed & Graded",
    icon: Award,
    chipClass: "bg-success/10 text-success ring-inset ring-success/25",
  },
};

const SORT_ORDER: Record<AssignmentStatus, number> = {
  late: 0,
  pending: 1,
  submitted: 2,
  graded: 3,
};

function sortAssignments(assignments: StudentAssignment[]): StudentAssignment[] {
  return [...assignments].sort((a, b) => {
    const orderDiff = SORT_ORDER[a.status] - SORT_ORDER[b.status];
    if (orderDiff !== 0) return orderDiff;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

function urgency(assignment: StudentAssignment): {
  label: string;
  tone: "destructive" | "warning" | "muted";
} | null {
  if (assignment.status !== "pending" && assignment.status !== "late") return null;
  const diffMs = new Date(assignment.dueDate).getTime() - DEMO_NOW.getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days < 0 || assignment.status === "late")
    return { label: `Overdue ${Math.abs(days)}d`, tone: "destructive" };
  if (days === 0) return { label: "Due today", tone: "destructive" };
  if (days === 1) return { label: "Due tomorrow", tone: "warning" };
  if (days <= 3) return { label: `${days} days left`, tone: "warning" };
  return { label: `Due ${formatShortDate(assignment.dueDate)}`, tone: "muted" };
}

export interface AssignmentsListProps {
  assignments: StudentAssignment[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  onSubmit?: (assignmentId: string) => void;
  submittingId?: string | null;
  statusFilter?: AssignmentStatus;
  limit?: number;
  showViewAll?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function AssignmentsList({
  assignments: initialAssignments,
  loading,
  error,
  onRetry,
  onSubmit,
  submittingId,
  statusFilter,
  limit,
  showViewAll = true,
  emptyTitle = "No assignments to show",
  emptyDescription = "New assignments from your faculty will appear here with their due dates.",
}: AssignmentsListProps) {
  const reduceMotion = useReducedMotion();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeModal, setActiveModal] = useState<"submit" | "review" | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<StudentAssignment | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync state if props change
  if (assignments !== initialAssignments && initialAssignments.length > 0 && assignments.length === 0) {
    setAssignments(initialAssignments);
  }

  const filtered = statusFilter
    ? assignments.filter((assignment) => assignment.status === statusFilter)
    : assignments;
  const visible = sortAssignments(filtered).slice(0, limit);

  function handleOpenSubmit(assignment: StudentAssignment) {
    setSelectedAssignment(assignment);
    setSelectedFile(null);
    setSubmissionNotes("");
    setActiveModal("submit");
  }

  function handleOpenReview(assignment: StudentAssignment) {
    setSelectedAssignment(assignment);
    setActiveModal("review");
  }

  async function handleConfirmSubmit() {
    if (!selectedAssignment) return;
    setIsSubmitting(true);
    
    // Simulate submission flow
    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id
            ? {
                ...a,
                status: "submitted",
                submittedAt: new Date().toISOString(),
                submissionFile: selectedFile?.name || "16010123003_Assignment_Submission.pdf",
                reviewRemarks: "Awaiting faculty evaluation. Initial file receipt verified.",
              }
            : a
        )
      );
      setIsSubmitting(false);
      setActiveModal(null);
      onSubmit?.(selectedAssignment.id);
    }, 600);
  }

  return (
    <>
      <Panel
        title="Assignments & Coursework"
        description={statusFilter ? undefined : "Submit coursework, browse files, and inspect faculty review remarks."}
        flush
        action={
          showViewAll ? (
            <Link
              href="/student/assignments"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ) : null
        }
      >
        {loading ? (
          <ListSkeleton rows={3} />
        ) : error ? (
          <ErrorState className="border-0 py-10" onRetry={onRetry} description={error} />
        ) : visible.length === 0 ? (
          <EmptyState
            className="border-0 py-12"
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          <ul className="divide-y divide-border">
            {visible.map((assignment, index) => {
              const config = STATUS_CONFIG[assignment.status] ?? STATUS_CONFIG.pending;
              const Icon = config.icon;
              const urgent = urgency(assignment);
              const isPending = assignment.status === "pending" || assignment.status === "late";

              return (
                <motion.li
                  key={assignment.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.32,
                    delay: Math.min(index * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "group relative flex items-start gap-3.5 px-5 py-3.5 transition-colors duration-200 cursor-pointer",
                    "hover:bg-secondary/40",
                    assignment.status === "late" &&
                      "before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-full before:bg-destructive/70 before:content-['']",
                  )}
                  onClick={() => {
                    if (isPending) {
                      handleOpenSubmit(assignment);
                    } else {
                      handleOpenReview(assignment);
                    }
                  }}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ring-border/60",
                      config.chipClass,
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {assignment.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {assignment.subject}
                      <span className="meta ml-1.5 text-muted-foreground font-mono">{assignment.code}</span>
                      {assignment.priority === "high" ? (
                        <span className="ml-2 text-[10px] uppercase font-bold text-destructive">High priority</span>
                      ) : null}
                    </p>
                    {urgent ? (
                      <p className="mt-1 flex items-center gap-1.5 text-xs">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            urgent.tone === "destructive" && "bg-destructive",
                            urgent.tone === "warning" && "bg-warning",
                            urgent.tone === "muted" && "bg-muted-foreground/60",
                          )}
                        />
                        <span
                          className={cn(
                            urgent.tone === "destructive" && "font-medium text-destructive",
                            urgent.tone === "warning" && "font-medium text-warning",
                            urgent.tone === "muted" && "text-muted-foreground",
                          )}
                        >
                          {urgent.label}
                        </span>
                        {assignment.status === "pending" ? (
                          <span className="text-muted-foreground">
                            · {formatDueLabel(assignment.dueDate)}
                          </span>
                        ) : null}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                        <span>Submitted {formatShortDate(assignment.submittedAt ?? assignment.dueDate)}</span>
                        {assignment.grade ? (
                          <span className="font-semibold text-success font-mono bg-success/10 px-1.5 py-0.2 rounded border border-success/20">
                            Grade {assignment.grade}
                          </span>
                        ) : (
                          <span className="text-[11px] text-primary underline">View Review Feedback</span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Action zone */}
                  <div className="flex shrink-0 items-center gap-2">
                    {isPending ? (
                      <Button
                        variant={assignment.status === "late" ? "destructive" : "default"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenSubmit(assignment);
                        }}
                      >
                        <FileUp className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                        <span>Browse & Send</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReview(assignment);
                        }}
                      >
                        <MessageSquare className="h-3.5 w-3.5 mr-1 text-primary" aria-hidden="true" />
                        <span>Review</span>
                      </Button>
                    )}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
                        config.chipClass,
                      )}
                    >
                      {config.label}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </Panel>

      {/* MODAL 1: BROWSE & SEND ASSIGNMENT SUBMISSION */}
      {activeModal === "submit" && selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                  Coursework Submission
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  {selectedAssignment.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-secondary/40 p-3 rounded-xl border border-border space-y-1">
                <p className="font-semibold text-foreground">{selectedAssignment.subject} ({selectedAssignment.code})</p>
                <p className="text-muted-foreground">Due Date: {formatDueLabel(selectedAssignment.dueDate)} · Max Marks: 20</p>
              </div>

              {/* File Attachment Dropzone */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-primary" />
                  <span>Attach Submission File (PDF, ZIP, DOCX, Code):</span>
                </label>
                <div className="border-2 border-dashed border-border hover:border-primary/50 bg-secondary/20 p-5 rounded-xl text-center cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="font-semibold text-foreground">{selectedFile.name}</p>
                      <p className="text-muted-foreground text-[11px]">{(selectedFile.size / 1024).toFixed(1)} KB · Ready to send</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-foreground">Click to browse or drag file here</p>
                      <p className="text-muted-foreground text-[11px]">Supports PDF, Source Code, ZIP up to 25MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Notes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">
                  Student Comments & Submission Remarks:
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="e.g. Completed all lab exercises and attached test outputs..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
              <Button size="sm" disabled={isSubmitting} onClick={handleConfirmSubmit}>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                <span>{isSubmitting ? "Uploading & Sending…" : "Send to Faculty"}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: VIEW FACULTY REVIEW REMARKS & SUBMISSION */}
      {activeModal === "review" && selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submission & Faculty Review</span>
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  {selectedAssignment.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Submission Status & Grade */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary/40 p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Status</span>
                  <span className="text-xs font-semibold text-success">Submitted & Verified</span>
                </div>
                <div className="bg-secondary/40 p-3 rounded-xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Evaluation Grade</span>
                  <span className="text-xs font-bold font-mono text-primary">{selectedAssignment.grade || "18 / 20 (Grade A)"}</span>
                </div>
              </div>

              {/* Faculty Review Remarks (Requested Feature) */}
              <div className="bg-success/10 border border-success/30 p-4 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-success font-bold text-xs">
                  <MessageSquare className="w-4 h-4" />
                  <span>Faculty Review Remarks</span>
                </div>
                <p className="text-foreground leading-relaxed text-xs">
                  {selectedAssignment.reviewRemarks || "Excellent work on the assignment. Data structures implementation is accurate, edge cases are properly handled, and asymptotic analysis is thorough."}
                </p>
                <span className="text-[10px] text-muted-foreground block pt-1">
                  Reviewed by: Prof. Varsha Kinge · Verified Academic Submission
                </span>
              </div>

              {/* Submitted File Details */}
              <div className="border border-border p-3.5 rounded-xl bg-card space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Submitted Document
                </span>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{selectedAssignment.submissionFile || "16010123003_CSC301_Assignment.pdf"}</p>
                      <p className="text-[10px] text-muted-foreground">PDF Document · 1.4 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <Button size="sm" onClick={() => setActiveModal(null)}>
                Close Review
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
