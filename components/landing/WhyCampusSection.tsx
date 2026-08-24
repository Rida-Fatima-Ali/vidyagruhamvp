"use client";

import { motion } from "framer-motion";
import ShapeGrid from "./ShapeGrid";
import { Award, BookOpen, Layers, LineChart } from "lucide-react";

export default function WhyCampusSection() {
  return (
    <section
      id="section-why"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "85vh",
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        background: "linear-gradient(180deg, #080d10 0%, #0d1a14 60%, #0a100d 100%)",
      }}
    >
      {/* Shape Grid background */}
      <ShapeGrid
        borderColor="rgba(52,211,153,0.10)"
        squareSize={56}
        speed={0.06}
        shape="square"
        direction="right"
      />

      {/* Overlay — fade edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(8,13,16,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              border: "1px solid rgba(52,211,153,0.28)",
              background: "rgba(52,211,153,0.08)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(110,231,183,0.90)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Core Institutional Benefits
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
            }}
          >
            Why Choose{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #6ee7b7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VidyaGruha?
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.7,
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            Designed specifically around the rhythm of college semesters, VidyaGruha replaces fragmented communication with structured, accountable academic workflows.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Card 1: Faculty Workflow */}
          <div
            style={{
              background: "rgba(13, 26, 20, 0.70)",
              border: "1px solid rgba(52, 211, 153, 0.15)",
              padding: "1.75rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "rgba(52, 211, 153, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                marginBottom: "1rem",
              }}
            >
              <BookOpen size={18} />
            </div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Streamlined Faculty Workflow
            </h4>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Teaching staff manage lecture rosters, track lab submissions, and broadcast academic circulars without navigating cumbersome enterprise ERP systems.
            </p>
          </div>

          {/* Card 2: Student Records */}
          <div
            style={{
              background: "rgba(13, 26, 20, 0.70)",
              border: "1px solid rgba(52, 211, 153, 0.15)",
              padding: "1.75rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "rgba(52, 211, 153, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                marginBottom: "1rem",
              }}
            >
              <Layers size={18} />
            </div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Organized Student Records
            </h4>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Enrollment details, division assignments, subject performance, and semester standing are neatly indexed and accessible according to privacy roles.
            </p>
          </div>

          {/* Card 3: Institutional Transparency */}
          <div
            style={{
              background: "rgba(13, 26, 20, 0.70)",
              border: "1px solid rgba(52, 211, 153, 0.15)",
              padding: "1.75rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "rgba(52, 211, 153, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                marginBottom: "1rem",
              }}
            >
              <Award size={18} />
            </div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Full Visibility & Trust
            </h4>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Attendance calculations and timetable allocations are completely deterministic and transparent, removing disputes and promoting institutional integrity.
            </p>
          </div>

          {/* Card 4: Administrative Decision Support */}
          <div
            style={{
              background: "rgba(13, 26, 20, 0.70)",
              border: "1px solid rgba(52, 211, 153, 0.15)",
              padding: "1.75rem",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: "rgba(52, 211, 153, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                marginBottom: "1rem",
              }}
            >
              <LineChart size={18} />
            </div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Actionable Decision Support
            </h4>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Leadership gains instant insights into departmental attendance risk, classroom occupancy bottlenecks, and teacher substitution health in real time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
