"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRef, useLayoutEffect, useState } from "react";
import { Star } from "lucide-react";

const proofImages = [
  "/WhatsApp Image 2026-06-05 at 20.23.55.jpeg",
  "/WhatsApp Image 2026-06-05 at 20.23.55 (1).jpeg",
  "/WhatsApp Image 2026-06-05 at 20.23.55 (2).jpeg",
];

const scrollImages = [
  "/WhatsApp Image 2026-06-05 at 21.14.19.jpeg",
  "/WhatsApp Image 2026-06-05 at 21.14.19 (1).jpeg",
  "/WhatsApp Image 2026-06-05 at 21.14.19 (2).jpeg",
  "/WhatsApp Image 2026-06-05 at 21.14.19 (3).jpeg",
];

export default function FloatingCards() {
  const t = useTranslations("FloatingCards");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const repeated = [...scrollImages, ...scrollImages];

  const ScrollRow = ({
    reverse = false,
    duration = 25,
  }: {
    reverse?: boolean;
    duration?: number;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 2);
      }
    }, []);

    const direction = (isRTL ? 1 : -1) * (reverse ? -1 : 1);

    return (
      <div className="overflow-hidden w-full">
        <motion.div
          ref={containerRef}
          className="flex gap-10 w-max"
          animate={{ x: width ? direction * width : 0 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {repeated.map((img, i) => (
            <div
              key={i}
              className="relative w-105 h-105 shrink-0 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src={img} alt="student" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-32 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
          {t("title")}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-border" />
          <p className="text-sm md:text-base text-foreground font-medium whitespace-nowrap">
            {t("subtitle")}
          </p>
          <div className="w-16 h-px bg-border" />
        </div>
      </div>

      {/* Scrolling testimonial cards */}
      <ScrollRow />

      {/* Success Story Section */}
      <div className="max-w-5xl mx-auto px-6 mt-28">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
            {t("successTitle")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium whitespace-nowrap">
              {t("successSubtitle")}
            </p>
            <div className="w-16 h-px bg-border" />
          </div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary to-transparent" />

          {/* Screenshots */}
          <div className="p-4 md:p-5 border-b border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              {t("salaryProof")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {proofImages.map((src, i) => (
                <div key={i} className="relative bg-white rounded-2xl overflow-hidden h-64 sm:h-80">
                  <Image src={src} alt={`Proof ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="p-5 md:p-6 flex flex-col gap-4">
            <div className="text-5xl text-primary/20 font-serif leading-none select-none">&ldquo;</div>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed -mt-3">
              {t("quote")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  M
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t("studentName")}</p>
                  <p className="text-xs text-muted-foreground">{t("studentRole")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em]">Habib Academy</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-primary/2 pointer-events-none rounded-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
