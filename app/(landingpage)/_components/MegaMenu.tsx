"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MegaMenu({ nav }: unknown) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("MegaMenu");

  useEffect(() => {
    function handleClickOutside(e: unknown) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative hidden md:block">
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-sm px-2 py-1 hover:text-primary transition"
      >
        {nav.title}
        <ChevronDown
          size={16}
          className={`transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      )}

      {/* Menu */}
      <div
        className={`
          absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 top-full mt-4 z-50
          w-[90vw] max-w-[700px]
          max-h-[80vh] overflow-y-auto
          rounded-2xl border bg-white dark:bg-zinc-900 shadow-2xl
          p-4 sm:p-6
          transition-all duration-300
          ${open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {nav.items.map((item: unknown) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col gap-1 p-3 sm:p-4 rounded-xl border hover:border-primary/40 hover:bg-muted/50 transition"
            >
              <span className="font-semibold group-hover:text-primary transition">
                {item.title}
              </span>

              <span className="text-xs sm:text-sm text-muted-foreground">
                {t("clickToEnter")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
