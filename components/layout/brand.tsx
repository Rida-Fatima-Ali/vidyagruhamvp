"use client";

import { VidyaGruhaWordmark } from "@/components/common/vidyagruha-wordmark";
import { cn } from "@/utils/cn";

export function Brand({
  className,
  compact = false,
  size = "normal",
}: {
  className?: string;
  compact?: boolean;
  size?: "small" | "normal" | "large";
}) {
  const wordmarkSize = size === "large" ? "lg" : compact || size === "small" ? "sm" : "md";

  return (
    <div className={cn("flex items-center select-none", className)}>
      <VidyaGruhaWordmark size={wordmarkSize} subtitle={!compact && size === "large"} />
    </div>
  );
}
