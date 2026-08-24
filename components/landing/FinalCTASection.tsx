"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SpecularButton from "./SpecularButton";

export default function FinalCTASection() {
  const router = useRouter();

  return (
    <section
      id="section-cta"
      style={{
        position: "relative",
        width: "100vw",
        height: "32vh",
        minHeight: "240px",
        maxWidth: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06090e",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Subtle top divider glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "360px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "640px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          Ready to Enter VidyaGruha?
        </h2>

        <p
          style={{
            fontSize: "clamp(0.875rem, 1.8vw, 1.05rem)",
            color: "rgba(255,255,255,0.60)",
            lineHeight: 1.65,
            marginBottom: "1.75rem",
          }}
        >
          Join your institutional academic network with seamless timetable tracking, attendance transparency, and faculty coordination.
        </p>

        <SpecularButton
          size="lg"
          onClick={() => router.push("/login")}
          radius={22}
          tintOpacity={0.12}
          blur={10}
          intensity={1.25}
          shineSize={9}
          shineFade={38}
        >
          Sign In to VidyaGruha →
        </SpecularButton>
      </motion.div>
    </section>
  );
}
