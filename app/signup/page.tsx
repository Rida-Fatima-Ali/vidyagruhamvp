"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
} from "lucide-react";
import { VidyaGruhaWordmark } from "@/components/common/vidyagruha-wordmark";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { cn } from "@/utils/cn";

type SignupRole = "student" | "faculty";

export default function SignupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("Computer Engineering");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();

    // Frontend validation
    if (!displayName.trim()) {
      setError("Please enter your full display name.");
      return;
    }

    if (!cleanEmail.endsWith("@somaiya.edu")) {
      setError("Institutional email required. Address must end with @somaiya.edu");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          email: cleanEmail,
          role: selectedRole,
          password,
          department: dept,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSubmittedRequest(data.request);
      setSubmitted(true);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col justify-between selection:bg-[#8B1E1E] selection:text-[#FAF9F5] transition-colors duration-300">
      {/* Top Navbar */}
      <header className="w-full bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-30">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <VidyaGruhaWordmark size="md" subtitle={false} />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-[12px] font-semibold tracking-[0.14em] uppercase text-foreground hover:text-[#8B1E1E] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/explore"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-full border border-border text-[11px] font-semibold tracking-[0.14em] uppercase text-foreground hover:bg-[#8B1E1E] hover:text-[#FAF9F5] transition-all"
            >
              Explore
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 sm:px-10 py-10 lg:py-16 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT ROLE */}
          {!selectedRole && !submitted && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E1E]/08 dark:bg-[#FF5C5C]/15 border border-[#8B1E1E]/15 dark:border-[#FF5C5C]/25 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8B1E1E] dark:text-[#FF7575] mb-3">
                  <span>Create Your Account</span>
                </div>
                <h1 className="text-[2.5rem] sm:text-[3.25rem] font-normal leading-[1.08] tracking-[-0.02em] font-serif text-foreground mb-3">
                  Join Your Institutional Portal
                </h1>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Select your academic role to proceed with registration on the Somaiya VidyaGruha network.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("student")}
                  className="group relative bg-card border border-border hover:border-[#8B1E1E] dark:hover:border-[#FF5C5C] rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-lg flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/08 dark:bg-[#FF5C5C]/15 text-[#8B1E1E] dark:text-[#FF7575] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-[#8B1E1E] dark:group-hover:text-[#FF7575] transition-colors">
                      Student Access
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      For undergraduate & postgraduate students. Access timetables, live attendance records, syllabus tracking, and submission portals.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B1E1E] dark:text-[#FF7575]">
                    <span>Continue as Student</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Faculty Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("faculty")}
                  className="group relative bg-card border border-border hover:border-[#8B1E1E] dark:hover:border-[#FF5C5C] rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-lg flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary text-foreground flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-[#8B1E1E] dark:group-hover:text-[#FF7575] transition-colors">
                      Faculty Member
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      For professors, lecturers, and lab instructors. Take attendance with 6s undo, review coursework, manage schedules, and coordinate cover requests.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground group-hover:text-[#8B1E1E] dark:group-hover:text-[#FF7575] transition-colors">
                    <span>Continue as Faculty</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FILL REGISTRATION FORM */}
          {selectedRole && !submitted && (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mx-auto w-full bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-sm"
            >
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change role</span>
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8B1E1E]/08 dark:bg-[#FF5C5C]/15 text-[#8B1E1E] dark:text-[#FF7575] text-[10px] font-bold uppercase tracking-wider mb-2">
                  {selectedRole === "student" ? "Student Registration" : "Faculty Registration"}
                </div>
                <h2 className="text-2xl font-serif text-foreground">
                  Complete Your Profile
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use your institutional Somaiya credentials for validation.
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/8 p-3.5 text-xs text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Full Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Lakshya Choithani"
                    className="w-full rounded-xl border border-border dark:border-white/15 bg-white/70 dark:bg-white/[0.06] backdrop-blur-md px-4 py-3 text-sm text-[#1C1917] dark:text-[#FAF9F5] placeholder:text-muted-foreground/50 outline-none focus:border-[#8B1E1E] dark:focus:border-[#FF5C5C] focus:bg-white/90 dark:focus:bg-white/[0.1] focus:ring-1 focus:ring-[#8B1E1E] transition-all shadow-inner"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    This is your human-readable name shown across the dashboard.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Somaiya Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@somaiya.edu"
                    className="w-full rounded-xl border border-border dark:border-white/15 bg-white/70 dark:bg-white/[0.06] backdrop-blur-md px-4 py-3 text-sm text-[#1C1917] dark:text-[#FAF9F5] placeholder:text-muted-foreground/50 outline-none focus:border-[#8B1E1E] dark:focus:border-[#FF5C5C] focus:bg-white/90 dark:focus:bg-white/[0.1] focus:ring-1 focus:ring-[#8B1E1E] transition-all shadow-inner"
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Must end with <code className="text-[#8B1E1E] dark:text-[#FF5C5C]">@somaiya.edu</code>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border border-border dark:border-white/15 bg-white/70 dark:bg-white/[0.06] backdrop-blur-md px-4 py-3 text-sm text-[#1C1917] dark:text-[#FAF9F5] placeholder:text-muted-foreground/50 outline-none focus:border-[#8B1E1E] dark:focus:border-[#FF5C5C] focus:bg-white/90 dark:focus:bg-white/[0.1] focus:ring-1 focus:ring-[#8B1E1E] transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Department / Programme
                  </label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full rounded-xl border border-border dark:border-white/15 bg-white/70 dark:bg-card backdrop-blur-md px-4 py-3 text-sm text-[#1C1917] dark:text-[#FAF9F5] outline-none focus:border-[#8B1E1E] dark:focus:border-[#FF5C5C] transition-all cursor-pointer"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Industrial Engineering">Industrial Engineering</option>
                    <option value="Electronics Engineering">Electronics Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                    <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1C1917] dark:bg-[#FAF9F5] hover:bg-[#8B1E1E] dark:hover:bg-[#8B1E1E] text-white dark:text-[#1C1917] dark:hover:text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {loading ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <span>Submit Registration Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: REGISTRATION SUBMITTED / APPROVAL PENDING */}
          {submitted && (
            <motion.div
              key="submitted-step"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto w-full bg-card border border-border rounded-2xl p-8 sm:p-10 text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-warning/10 text-warning border border-warning/20 mx-auto flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 border border-warning/20 text-[11px] font-semibold tracking-wider uppercase text-warning mb-3">
                <span>Account Awaiting Verification</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-3">
                Registration Request Submitted
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
                Your account registration for <strong className="text-foreground">{displayName}</strong> has been logged. In accordance with Somaiya campus governance, institutional accounts undergo approval before credentials activate.
              </p>

              {submittedRequest && (
                <div className="bg-secondary/50 border border-border rounded-xl p-4 text-left text-xs space-y-2 mb-8 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-border pb-1.5">
                    <span className="text-muted-foreground">Request ID:</span>
                    <span className="font-mono font-medium text-foreground">{submittedRequest.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-1.5">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{submittedRequest.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-1.5">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-semibold uppercase text-[#8B1E1E] dark:text-[#FF7575]">{submittedRequest.role}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-1.5">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium text-foreground">{dept}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-warning font-semibold">Pending Admin Review</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1C1917] dark:bg-[#FAF9F5] hover:bg-[#8B1E1E] dark:hover:bg-[#8B1E1E] text-white dark:text-[#1C1917] dark:hover:text-white text-xs font-semibold tracking-wider uppercase transition-all"
                >
                  <span>Return to Sign In</span>
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-xs font-semibold tracking-wider uppercase text-foreground hover:bg-secondary transition-all"
                >
                  <span>Home</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground tracking-wider uppercase">
        <div>
          <span>VidyaGruha</span> · <span>Institutional Registration Portal</span>
        </div>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link href="/explore" className="hover:text-foreground transition-colors">
            Explore
          </Link>
        </div>
      </footer>
    </div>
  );
}
