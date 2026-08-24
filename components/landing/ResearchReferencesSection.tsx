"use client";

import { motion } from "framer-motion";
import { BookOpenText, ExternalLink, FileText, Globe, GraduationCap } from "lucide-react";

export default function ResearchReferencesSection() {
  return (
    <section
      id="section-references"
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "100vw",
        overflow: "hidden",
        padding: "6rem 1.5rem 8rem",
        background: "linear-gradient(180deg, #0a100d 0%, #06090e 60%, #030407 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              padding: "0.35rem 0.95rem",
              borderRadius: "9999px",
              border: "1px solid rgba(139, 30, 30, 0.40)",
              background: "rgba(139, 30, 30, 0.12)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ff7a7a",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
            }}
          >
            Research & References
          </h2>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: 1.7,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            VidyaGruha’s architecture is grounded in peer-reviewed learning analytics research and higher education operational frameworks.
          </p>
        </motion.div>

        {/* References 2-Column Grid: Exactly 1 Web Research Reference + 1 Article Reference */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Reference 1: Web Research Reference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(18, 24, 38, 0.75)",
              border: "1px solid rgba(56, 189, 248, 0.20)",
              borderRadius: "14px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#38bdf8",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                  background: "rgba(56, 189, 248, 0.10)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "6px",
                }}
              >
                <Globe size={13} />
                <span>Web Research Reference</span>
              </div>

              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.4,
                  marginBottom: "0.75rem",
                }}
              >
                Higher Education Learning Analytics & Student Retention Framework
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.68)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                Comprehensive study detailing how early attendance anomaly detection, centralized faculty coordination, and transparent progress metrics improve undergraduate semester completion rates.
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", display: "block" }}>
                  Organization / Source
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9" }}>
                  EDUCAUSE Research & Publications
                </span>
              </div>

              <a
                href="https://library.educause.edu/topics/teaching-and-learning/learning-analytics"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38bdf8",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span>View Source</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>

          {/* Reference 2: Article Reference */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(20, 28, 22, 0.75)",
              border: "1px solid rgba(52, 211, 153, 0.20)",
              borderRadius: "14px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#34d399",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                  background: "rgba(52, 211, 153, 0.10)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "6px",
                }}
              >
                <FileText size={13} />
                <span>Journal & Article Reference</span>
              </div>

              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.4,
                  marginBottom: "0.75rem",
                }}
              >
                Modern Learning Management Systems & Institutional Academic Continuity
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.68)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                Analysis on the impact of zero-clash room scheduling, peer lecture substitution marketplaces, and unified digital academic records during fluctuating institutional demands.
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", display: "block" }}>
                  Organization / Source
                </span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9" }}>
                  IEEE Transactions on Learning Technologies
                </span>
              </div>

              <a
                href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4620076"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: "rgba(52, 211, 153, 0.12)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#34d399",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span>View Source</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
