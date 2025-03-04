"use client";

import { DIcons } from "dicons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <DIcons.Sun
        strokeWidth={1}
        className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 "
        aria-hidden="true"
      />
      <DIcons.Moon
        strokeWidth={1}
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 "
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
