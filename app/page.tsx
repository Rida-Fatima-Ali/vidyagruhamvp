"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Users,
  ShieldCheck,
  Radar,
} from "lucide-react";
import EditorialNavbar from "@/components/editorial/EditorialNavbar";
import { useTheme } from "@/components/provider/theme-provider";
import { VidyaGruhaWordmark } from "@/components/common/vidyagruha-wordmark";

export default function PrimaryEditorialLandingPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-[#8B1E1E] selection:text-[#FAF9F5] transition-colors duration-300">
      {/* Fixed Editorial Top Navbar with Theme Toggle */}
      <EditorialNavbar />

      {/* =========================================================================
          SLIDE 1 (Reference 1) — HERO EDITORIAL COMPOSITION (100vh)
          ========================================================================= */}
      <section
        id="slide-1"
        className="min-h-screen w-full flex items-center justify-center pt-24 pb-12 px-6 sm:px-10 max-w-[1440px] mx-auto relative border-b border-border"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Actions (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start pr-0 lg:pr-6"
          >
            {/* Small uppercase kicker */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-[#8B1E1E] dark:bg-[#FF5C5C]" />
              <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8B1E1E] dark:text-[#FF7575]">
                Academic Intelligence Platform
              </span>
            </div>

            {/* Dominant Serif Headline */}
            <h1 className="text-[3.25rem] sm:text-[4.25rem] lg:text-[4.75rem] font-normal leading-[1.04] tracking-[-0.02em] font-serif text-[#1C1917] dark:text-[#FFFFFF] mb-6">
              Your Campus,
              <br />
              <span className="italic font-serif text-[#8B1E1E] dark:text-[#FF5C5C]">Connected.</span>
            </h1>

            {/* Supporting Copy with Enhanced Dark Mode Contrast */}
            <p className="text-[15px] sm:text-[16px] text-[#6B665E] dark:text-[#D6D3CC] leading-[1.65] max-w-[460px] font-normal mb-8">
              One unified, architectural workspace designed specifically for college students, faculty members, and institutional administrators.
            </p>

            {/* Primary Action Button (Sign In + Sign Up + Explore) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={() => router.push("/login")}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1C1917] dark:bg-[#FAF9F5] hover:bg-[#8B1E1E] dark:hover:bg-[#8B1E1E] text-white dark:text-[#1C1917] dark:hover:text-white text-[13px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer rounded-sm"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#8B1E1E] dark:border-[#FF5C5C] bg-[#8B1E1E]/06 dark:bg-[#FF5C5C]/10 hover:bg-[#8B1E1E] hover:text-[#FAF9F5] text-[#8B1E1E] dark:text-[#FF7575] text-[13px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 rounded-sm"
              >
                <span>Sign Up</span>
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-border hover:border-foreground text-foreground text-[13px] font-medium tracking-[0.16em] uppercase transition-all duration-200 rounded-sm"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>

            {/* Direct Role Entry Links */}
            <div className="pt-6 border-t border-border w-full">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8C877D] dark:text-[#ABA69C] mb-3">
                Direct Workspace Access
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/student/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-foreground dark:bg-[#1E1E1C] dark:hover:bg-[#2A2A27] dark:text-[#FAF9F5] dark:border dark:border-[#383734] text-[12px] font-medium transition-colors duration-150"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#FF5C5C]" />
                  <span>Student</span>
                </Link>
                <Link
                  href="/faculty/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-foreground dark:bg-[#1E1E1C] dark:hover:bg-[#2A2A27] dark:text-[#FAF9F5] dark:border dark:border-[#383734] text-[12px] font-medium transition-colors duration-150"
                >
                  <Users className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#FF5C5C]" />
                  <span>Faculty</span>
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-foreground dark:bg-[#1E1E1C] dark:hover:bg-[#2A2A27] dark:text-[#FAF9F5] dark:border dark:border-[#383734] text-[12px] font-medium transition-colors duration-150"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#FF5C5C]" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Photography Frame (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 relative w-full flex items-center justify-center lg:justify-end"
          >
            {/* Fine border line frame */}
            <div className="hidden sm:block absolute -top-6 -left-6 w-full h-full border border-border pointer-events-none rounded-sm z-0" />

            {/* Primary Editorial Image Card */}
            <div className="relative z-10 w-full max-w-[560px] aspect-[4/3] sm:aspect-[14/11] lg:aspect-[4/3] overflow-hidden rounded-sm bg-card border border-border shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <Image
                src="/hero-student.jpg"
                alt="VidyaGruha Academic Community"
                fill
                priority
                className="object-cover object-center filter grayscale-[15%] contrast-[102%] hover:scale-102 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF9F5] text-[11px] font-mono tracking-wider">
                <span className="bg-[#1C1917]/85 backdrop-blur-md px-2.5 py-1 rounded">
                  COLLEGE ECOSYSTEM
                </span>
                <span className="bg-[#1C1917]/85 backdrop-blur-md px-2.5 py-1 rounded">
                  01 / 03
                </span>
              </div>
            </div>

            {/* Small Overlapping Secondary Photo Frame */}
            <div className="hidden xl:block absolute -bottom-8 -left-10 z-20 w-44 aspect-[3/4] overflow-hidden rounded-sm border-2 border-background shadow-xl bg-card">
              <Image
                src="/campus-space.jpg"
                alt="VidyaGruha Minimal Workspace"
                fill
                className="object-cover filter grayscale-[25%] contrast-[105%]"
                sizes="180px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SLIDE 2 (Reference 2) — MINIMALIST LUXURY BRANDING SECTION (100vh)
          ========================================================================= */}
      <section
        id="slide-2"
        className="min-h-screen w-full flex items-center justify-center py-20 px-6 sm:px-10 max-w-[1440px] mx-auto relative border-b border-border"
      >
        {/* Delicate decorative horizontal hairline rule */}
        <div className="hidden lg:block absolute left-10 right-10 top-1/2 -translate-y-1/2 h-px bg-border pointer-events-none z-0" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Asymmetric Stacked Art Frame (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-sm overflow-hidden border border-border shadow-sm bg-card">
              <Image
                src="/campus-space.jpg"
                alt="Campus Detail"
                fill
                className="object-cover filter grayscale-[30%]"
                sizes="280px"
              />
            </div>

            <div className="p-5 bg-card border border-border rounded-sm shadow-sm max-w-[280px] dark:bg-[#161615] dark:border-[#2C2C29]">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B1E1E] dark:text-[#FF5C5C] mb-1.5 font-bold">
                OPERATIONAL PRECISION
              </p>
              <p className="text-[13px] text-[#6B665E] dark:text-[#D6D3CC] leading-relaxed">
                6-second attendance undo & faculty cover marketplace ready in one click.
              </p>
            </div>
          </motion.div>

          {/* Center Column: Dominant Editorial Statement (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-center text-center px-4"
          >
            {/* Refined Brand Wordmark */}
            <div className="mb-8 flex justify-center">
              <VidyaGruhaWordmark size="xl" className="items-center" />
            </div>

            <h2 className="text-[2.75rem] sm:text-[3.75rem] lg:text-[4.25rem] font-normal leading-[1.08] tracking-[-0.02em] font-serif text-[#1C1917] dark:text-[#FFFFFF] mb-6">
              Unified Academic
              <br />
              <span className="italic font-serif text-[#8B1E1E] dark:text-[#FF5C5C]">Intelligence</span>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#6B665E] dark:text-[#D6D3CC] leading-[1.7] max-w-[480px] font-normal mb-8">
              Engineered to eliminate administrative friction with real-time timetable tracking, instant doubt verification, and live room clash prevention.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-foreground hover:bg-[#1C1917] dark:hover:bg-[#FAF9F5] hover:text-white dark:hover:text-[#1C1917] text-foreground text-[12px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Right Column: Tall Editorial Photography (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-sm overflow-hidden border border-border shadow-[0_8px_24px_rgba(0,0,0,0.05)] bg-card">
              <Image
                src="/slide2-library.jpg"
                alt="VidyaGruha Academic Community"
                fill
                className="object-cover filter grayscale-[10%] contrast-[102%]"
                sizes="300px"
              />
              <div className="absolute bottom-3 left-3 bg-[#1C1917]/85 backdrop-blur-md px-2.5 py-1 rounded text-[#FAF9F5] text-[10px] font-mono tracking-wider">
                02 / 03
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SLIDE 3 (Reference 3) — ARCHITECTURAL INTERIOR DESIGN STYLE (100vh)
          ========================================================================= */}
      <section
        id="slide-3"
        className="min-h-screen w-full flex items-center justify-center py-20 px-6 sm:px-10 max-w-[1440px] mx-auto relative"
      >
        <div className="w-full relative border border-border p-8 sm:p-12 lg:p-16 bg-card shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden dark:bg-[#161615] dark:border-[#2C2C29]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info & Actions (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-start"
            >
              <div className="h-0.5 w-8 bg-[#8B1E1E] dark:bg-[#FF5C5C] mb-6" />

              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C877D] dark:text-[#ABA69C] mb-2">
                INSTITUTIONAL SUITE
              </span>

              <h2 className="text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-normal leading-[1.06] tracking-[-0.02em] font-serif text-[#1C1917] dark:text-[#FFFFFF] mb-6">
                Architectural
                <br />
                Campus Management
              </h2>

              <p className="text-[14.5px] text-[#6B665E] dark:text-[#D6D3CC] leading-[1.65] font-normal mb-8 max-w-[420px]">
                From high-density room clash radar matrices to institutional notice reach visualization, engineered specifically for high-performing colleges.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#1C1917] dark:bg-[#FAF9F5] hover:bg-[#8B1E1E] dark:hover:bg-[#8B1E1E] text-white dark:text-[#1C1917] dark:hover:text-white text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-sm rounded-sm"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#8B1E1E] dark:border-[#FF5C5C] bg-[#8B1E1E]/06 dark:bg-[#FF5C5C]/10 hover:bg-[#8B1E1E] hover:text-[#FAF9F5] text-[#8B1E1E] dark:text-[#FF7575] text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 rounded-sm"
                >
                  <span>Sign Up</span>
                </Link>

                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border hover:border-foreground text-foreground text-[12px] font-medium tracking-[0.14em] uppercase transition-all rounded-sm"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Composition (7 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative flex items-center justify-center w-full"
            >
              {/* Main Photo Card - Completely contained with clean aspect ratio */}
              <div className="relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[14/10] overflow-hidden rounded-xl border border-border shadow-lg bg-card">
                <Image
                  src="/slide3-campus.jpg"
                  alt="VidyaGruha Architecture"
                  fill
                  className="object-cover object-center filter grayscale-[10%] contrast-[103%]"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
                
                {/* Embedded detail overlay safely inside the image */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-background/95 dark:bg-[#161615]/95 backdrop-blur-md px-3.5 py-2.5 border border-border shadow-md rounded-lg max-w-[200px] sm:max-w-[220px]">
                  <div className="flex items-center gap-1.5 text-[#8B1E1E] dark:text-[#FF5C5C] text-[10px] font-bold tracking-wider uppercase mb-0.5">
                    <Radar className="w-3 h-3" />
                    <span>Room Radar</span>
                  </div>
                  <p className="text-[10.5px] text-[#6B665E] dark:text-[#D6D3CC] leading-tight">
                    Zero clash scheduling across campus.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom metadata tags */}
          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C877D] dark:text-[#ABA69C] font-mono tracking-wider">
            <span>VIDYAGRUHA · HIGHER EDUCATION SUITE</span>
            <span className="mt-2 sm:mt-0">03 / 03 — COMPLETE PLATFORM</span>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="w-full bg-background border-t border-border py-8 px-6 sm:px-10 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VidyaGruhaWordmark size="sm" subtitle={false} />
            <span className="text-[12px] text-[#8C877D] dark:text-[#ABA69C]">· All Rights Reserved 2026</span>
          </div>

          <div className="flex items-center gap-6 text-[12px] font-medium tracking-wider uppercase text-[#6B665E] dark:text-[#D6D3CC]">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/explore" className="hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link href="/student/dashboard" className="hover:text-foreground transition-colors">
              Student
            </Link>
            <Link href="/faculty/dashboard" className="hover:text-foreground transition-colors">
              Faculty
            </Link>
            <Link href="/admin/dashboard" className="hover:text-foreground transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
