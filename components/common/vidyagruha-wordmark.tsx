"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";

interface VidyaGruhaWordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  subtitle?: boolean;
}

export function VidyaGruhaWordmark({
  className,
  size = "md",
  subtitle = true,
}: VidyaGruhaWordmarkProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={cn("inline-flex flex-col items-start select-none", className)}>
      <div className={cn("flex items-baseline gap-1 font-serif tracking-tight", sizeClasses[size])}>
        <span className="font-bold text-[#8B1E1E] dark:text-[#E53E3E]">
          Vidya
        </span>
        <span className="font-normal text-[#1C1917] dark:text-[#FAF9F5]">
          गृह
        </span>
      </div>
      {subtitle && (
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mt-0.5">
          Academic Intelligence
        </span>
      )}
    </div>
  );
}
