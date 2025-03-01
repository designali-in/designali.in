// Dependencies: pnpm install lucide-react

"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Badge>
      Removable
      <button
        className="-my-px -me-1.5 -ms-px inline-flex size-5 shrink-0 items-center justify-center rounded-[inherit] p-0 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
        onClick={() => setIsActive(false)}
      >
        <X size={12} strokeWidth={2} aria-hidden="true" />
      </button>
    </Badge>
  );
}
