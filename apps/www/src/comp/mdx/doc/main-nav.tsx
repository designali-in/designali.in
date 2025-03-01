"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { DIcons } from "dicons";

import type { MainNavItem } from "./types";

import { cn } from "@/lib/utils";

import { MobileNav } from "./mobile-nav";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="grid gap-6 md:flex md:gap-10">
      {items.length ? (
        <nav className="grid gap-6 md:flex">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "hover:text-aired flex items-center text-lg font-medium transition-colors sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-black dark:text-white"
                  : "dark:slate-600 text-slate-400",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <DIcons.Close className="h-5 w-5" />
        ) : (
          <DIcons.Menu className="h-5 w-5" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
