"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/provider/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="relative overflow-hidden cursor-pointer w-9 h-9 rounded-full hover:bg-secondary transition-colors duration-150"
    >
      <Sun
        className={`h-4 w-4 transition-all duration-200 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-warning"
            : "-rotate-90 scale-0 opacity-0 absolute text-foreground"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`h-4 w-4 transition-all duration-200 ${
          theme === "dark"
            ? "rotate-90 scale-0 opacity-0 absolute text-foreground"
            : "rotate-0 scale-100 opacity-100 text-foreground"
        }`}
        aria-hidden="true"
      />
    </Button>
  );
}
