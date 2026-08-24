"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { useTheme } from "@/components/provider/theme-provider";
import SpecularButton from "@/components/landing/SpecularButton";

export default function EditorialNavbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 sm:h-12 w-44 sm:w-56 flex items-center">
            <Image
              src={theme === "dark" ? "/vidyagruha-logo-light.png" : "/vidyagruha-logo.png"}
              alt="VidyaGruha"
              width={260}
              height={64}
              priority
              className="object-contain object-left h-9 sm:h-11 w-auto transition-opacity duration-200 group-hover:opacity-85"
            />
          </div>
        </Link>

        {/* Center: Minimalist Editorial Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link
            href="/explore"
            className="text-[12px] font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Explore
          </Link>
          <Link
            href="/explore#section-about"
            className="text-[12px] font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/explore#section-why"
            className="text-[12px] font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Features
          </Link>
        </nav>

        {/* Right: Theme Toggle + Login + Sign Up CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          <Link
            href="/login"
            className="text-[12px] font-semibold tracking-[0.16em] uppercase text-foreground hover:text-[#8B1E1E] transition-colors"
          >
            Log In
          </Link>
          <SpecularButton
            size="sm"
            onClick={() => router.push("/signup")}
            radius={20}
            tintOpacity={0.16}
            blur={10}
            intensity={1.25}
            lineColor="#ff4d4d"
            baseColor="#8B1E1E"
            textColor="#ffffff"
            className="!text-[11px] !font-semibold !tracking-[0.16em] !uppercase !px-4 !py-2 shadow-sm"
          >
            Sign Up
          </SpecularButton>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-[11px] font-semibold tracking-[0.16em] uppercase text-foreground hover:border-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-[#FAF9F5] transition-all duration-300"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-full bg-[#1C1917] dark:bg-[#FAF9F5] text-white dark:text-[#1C1917] text-[11px] font-medium tracking-[0.1em] uppercase"
          >
            Sign In
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground hover:text-muted-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-semibold tracking-[0.18em] uppercase text-foreground py-1 border-b border-border"
          >
            Sign In Directly
          </Link>
          <Link
            href="/signup"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#8B1E1E] py-1 border-b border-border"
          >
            Create Account (Sign Up)
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-medium tracking-[0.18em] uppercase text-muted-foreground py-1"
          >
            Explore Experience
          </Link>
          <Link
            href="/explore#section-about"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-medium tracking-[0.18em] uppercase text-muted-foreground py-1"
          >
            About VidyaGruha
          </Link>
          <Link
            href="/explore#section-why"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-medium tracking-[0.18em] uppercase text-muted-foreground py-1"
          >
            Features & Capabilities
          </Link>
        </div>
      )}
    </header>
  );
}
