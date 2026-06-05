"use client";

import Logo from "@/public/habib-logo.jpg";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  const services = [
    { label: t("service2"), href: "/Learningpaths" },
    { label: t("service3"), href: "/Softwarechallenges" },
    { label: t("service4"), href: "/HTML" },
  ];

  const company = [
    { label: t("company1"), href: "/about" },
    { label: t("company2"), href: "/activate" },
  ];

  const support = [
    { label: t("support1"), href: "/#support-team" },
    { label: t("support2"), href: "#" },
    { label: t("support3"), href: "#" },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src={Logo} alt="Habib Academy" width={42} height={42} />
              <span className="font-bold text-lg">
                Habib <span className="text-primary">Academy</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              <Link
                href="https://www.youtube.com/@YallaCode-Habib"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500 transition-colors duration-200"
              >
                <Play size={13} fill="currentColor" />
              </Link>
              <Link
                href="https://www.instagram.com/mahmoudhabib9090?igsh=MTV6N2RmbjN0aTdlMw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:border-pink-500 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/share/18fKrhcmuw/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@mahmoudhabib18?_r=1&_t=ZS-96xVlei6zsf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{t("services")}</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{t("company")}</h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{t("support")}</h3>
            <ul className="space-y-3">
              {support.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <span>{t("copyright")}</span>
          <span>{t("developer")}</span>
        </div>
      </div>
    </footer>
  );
}
