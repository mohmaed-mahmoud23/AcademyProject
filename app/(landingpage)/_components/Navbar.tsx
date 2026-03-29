"use client";

import Image from "next/image";
import MegaMenu from "./MegaMenu";
import LoGO from "@/public/images/Habib academy svg Logo.svg";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemToggle } from "@/components/ui/themToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 gap-4">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center">
          <Image src={LoGO} alt="Logo" width={60} height={20}   className="rounded-4xl"/>
          <span className="hidden sm:block font-semibold text-base md:px-2">
            {t("brand")}.
          </span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-6">
          {navigationData.map((nav) => (
            <MegaMenu key={nav.title} nav={nav} />
          ))}

          <Link href="/aboutme" className="hidden sm:flex">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
               hover:from-pink-500 hover:to-purple-500
               animate-pulse transition-all duration-700"
            >
              {t("aboutMe")}
            </Button>
          </Link>
        </nav>

        {/* 🚀 Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemToggle />
          <LanguageSwitcher />

          <Link href="/Login" className="hidden sm:flex">
            <span className={buttonVariants({ variant: "secondary" })}>
              {t("login")}
            </span>
          </Link>

          <Link href="/activate" className="hidden sm:block">
            <Button size="sm">{t("getStarted")}</Button>
          </Link>

          {/* 📱 Hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          {navigationData.map((nav, i) => (
            <div key={i} className="mb-3">
              <details className="group">
                <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-sm">
                  {nav.title}
                </summary>

                <div className="mt-2 flex flex-col gap-2 ps-2">
                  {nav.items.map((item: any) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/Login">
              <Button variant="secondary" className="w-full">
                {t("login")}
              </Button>
            </Link>

            <Link href="/activate">
              <Button className="w-full">{t("getStarted")}</Button>
            </Link>

            <Link href="/aboutme">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
               hover:from-pink-500 hover:to-purple-500 w-full
               animate-pulse transition-all duration-700"
              >
                {t("aboutMe")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
