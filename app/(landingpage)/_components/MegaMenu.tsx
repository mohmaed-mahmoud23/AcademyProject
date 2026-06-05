/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MegaMenu({ nav }: any) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isGrid = nav.items.length > 3;

  return (
    <div ref={menuRef} className="relative hidden md:block">

      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className={`group flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
          open ? "text-primary" : "text-foreground/70 hover:text-foreground"
        }`}
      >
        {nav.title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-s-0 top-[calc(100%+12px)] z-50 ${isGrid ? "w-72" : "w-56"}`}
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

            <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">

              {/* Header strip */}
              <div className="px-4 py-3 border-b border-border/40 bg-primary/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">
                  {nav.title}
                </p>
              </div>

              {/* Items */}
              <div className={`p-2 ${isGrid ? "grid grid-cols-2 gap-1" : "flex flex-col gap-0.5"}`}>
                {nav.items.map((item: any, i: number) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.2 }}
                      onHoverStart={() => setHovered(i)}
                      onHoverEnd={() => setHovered(null)}
                      className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer overflow-hidden"
                    >
                      {/* Hover bg */}
                      {hovered === i && (
                        <motion.div
                          layoutId="hover-bg"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          transition={{ duration: 0.15 }}
                        />
                      )}

                      {/* Number badge */}
                      <span className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-lg text-[10px] font-black shrink-0 transition-colors duration-150 ${
                        hovered === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className={`relative z-10 text-sm font-semibold transition-colors duration-150 ${
                        hovered === i ? "text-primary" : "text-foreground/75"
                      }`}>
                        {item.title}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
