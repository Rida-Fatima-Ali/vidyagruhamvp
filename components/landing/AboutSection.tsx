"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Users, CalendarCheck, ShieldCheck } from "lucide-react";

// Dynamically import MagicRings (Three.js) — no SSR
const MagicRings = dynamic(() => import("./MagicRings"), { ssr: false });

export default function AboutSection() {
  return (
    <section
      id="section-about"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        background: "linear-gradient(160deg, #050d1a 0%, #0a1628 50%, #050a18 100%)",
      }}
    >
      {/* Magic Rings — centered depth effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <MagicRings
          color="#0ea5e9"
          colorTwo="#7c3aed"
          ringCount={6}
          opacity={0.65}
          speed={0.75}
          lineThickness={2.0}
        />
      </div>

      {/* Radial overlay so text stays perfectly readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(5,13,26,0.15) 0%, rgba(5,13,26,0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1080px",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.35rem 0.95rem",
              borderRadius: "9999px",
              border: "1px solid rgba(14,165,233,0.30)",
              background: "rgba(14,165,233,0.10)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(125,211,252,0.90)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Institutional Purpose
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
            }}
          >
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VidyaGruha
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.7,
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            VidyaGruha is built to solve the daily operational disconnection in higher education institutions. Rather than forcing departments into disjointed spreadsheets and isolated portals, VidyaGruha delivers one centralized, role-aware academic system.
          </p>
        </div>

        {/* 3 Academic Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {/* Pillar 1: Academic Coordination */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "2rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: "rgba(14, 165, 233, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                marginBottom: "1.25rem",
              }}
            >
              <Users size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
              Academic Coordination
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Eliminates friction across students, faculty, and college administrators. Routine notices, class notifications, and academic circulars reach verified institutional stakeholders instantly through authenticated channels.
            </p>
          </div>

          {/* Pillar 2: Centralized Attendance & Records */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "2rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: "rgba(14, 165, 233, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                marginBottom: "1.25rem",
              }}
            >
              <CalendarCheck size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
              Centralized Attendance
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Teachers take attendance with one-click batch sessions and 6-second undo protection. Students gain transparent, real-time access to exact present dates, subject totals, and dynamically computed percentages without end-of-term surprises.
            </p>
          </div>

          {/* Pillar 3: Transparency & Decision Support */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "2rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "8px",
                background: "rgba(14, 165, 233, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                marginBottom: "1.25rem",
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
              Academic Continuity
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              When instructors are on academic duty or leave, the peer cover request marketplace enables colleagues in the same department to accept and substitute classes seamlessly, ensuring zero timetable disruption for students.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
