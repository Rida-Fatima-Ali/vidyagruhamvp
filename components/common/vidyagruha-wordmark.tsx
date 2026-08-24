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
        <span className="font-bold text-[#8B1E1E] dark:text-[#FF5C5C] [html[data-theme='dark']_&]:text-[#FF5C5C] transition-colors duration-200">
          Vidya
        </span>
        <span className="font-normal text-[#1C1917] dark:text-[#FFFFFF] [html[data-theme='dark']_&]:text-[#FFFFFF] transition-colors duration-200">
          गृह
        </span>
      </div>
      {subtitle && (
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground dark:text-[#A9A59D] [html[data-theme='dark']_&]:text-[#A9A59D] mt-0.5 transition-colors duration-200">
          Academic Intelligence
        </span>
      )}
    </div>
  );
}
