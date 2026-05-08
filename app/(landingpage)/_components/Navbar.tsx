/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import MegaMenu from "./MegaMenu";
import LoGO from "@/public/images/Habib academy svg Logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemToggle } from "@/components/ui/themToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");
  const tNav = useTranslations("Navigation");
  const locale = useLocale();

  const navigationData = [
    {
      title: tNav("learningPaths"),
      items: [{ title: tNav("frontEnd"), href: "/Learningpaths" }],
    },
    {
      title: tNav("learningNow"),
      items: [
        { title: tNav("articles"), href: "/Educationalarticles" },
        { title: tNav("courses"), href: "/Educationalcourses" },
        { title: tNav("challenges"), href: "/Softwarechallenges" },
      ],
    },
    {
      title: tNav("studyPlans"),
      items: [
        { title: "HTML", href: "/HTML" },
        { title: "CSS", href: "/CSS" },
        { title: "JavaScript", href: "/JavaScript" },
        { title: "SASS", href: "/SASS" },
        { title: "TypeScript", href: "/TypeScript" },
        { title: "PHP", href: "/PHP" },
        { title: "Python", href: "/Python" },
        { title: "React", href: "/React" },
        { title: "Tailwind", href: "/Tailwind" },
      ],
    },
    {
      title: tNav("fromChannel"),
      items: [
        { title: tNav("problemSolving"), href: "/ProblemSolving" },
        { title: tNav("whatNew"), href: "/plans/6" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between h-16 px-6 gap-4">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <div className="relative">
            <Image src={LoGO} alt="Logo" width={55} height={55} className="rounded-2xl shadow-lg" />
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="hidden sm:block font-black text-xl tracking-tighter ml-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t("brand")}
          </span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-1 lg:gap-4">
          {navigationData.map((nav) => (
            <MegaMenu key={nav.title} nav={nav} />
          ))}
        </nav>

        {/* 🚀 Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-muted/50 border border-white/5">
            <ThemToggle />
            <LanguageSwitcher />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link href="/Login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors px-4">
              {t("login")}
            </Link>
            <Link href="/activate">
              <Button size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95">
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/* 📱 Hamburger */}
          <button 
            className="md:hidden p-2.5 rounded-xl bg-primary/5 border border-primary/10 text-primary transition-all active:scale-90" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden border-b bg-background/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 space-y-8 max-h-[85vh] overflow-y-auto">
                <div className="grid gap-6">
                  {navigationData.map((nav, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary/40 rounded-full" />
                        <h3 className="font-black text-sm uppercase tracking-[0.2em] text-foreground/50">{nav.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {nav.items.map((item: any) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center p-4 rounded-2xl bg-muted/20 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group"
                            onClick={() => setOpen(false)}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary/20 mr-4 transition-all group-hover:bg-primary group-hover:scale-125 shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 pt-8 border-t border-white/10">
                  <Link href="/Login" className="w-full" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest border-2 hover:bg-muted/50">
                      {t("login")}
                    </Button>
                  </Link>

                  <Link href="/activate" className="w-full" onClick={() => setOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-[0.98]">
                      {t("getStarted")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
