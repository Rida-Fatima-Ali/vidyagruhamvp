"use client";

import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import WhyCampusSection from "@/components/landing/WhyCampusSection";
import ResearchReferencesSection from "@/components/landing/ResearchReferencesSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

export default function ExplorePage() {
  return (
    <main
      style={{
        width: "100vw",
        maxWidth: "100vw",
        overflowX: "hidden",
        backgroundColor: "#030407",
        color: "#fff",
      }}
    >
      <LandingNavbar />
      <HeroSection />
      <AboutSection />
      <WhyCampusSection />
      <ResearchReferencesSection />
      <FinalCTASection />
    </main>
  );
}
