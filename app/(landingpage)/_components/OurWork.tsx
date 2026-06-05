"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const screenshots = [
  "/Screenshot 2026-06-02 at 11.43.11.png",
  "/Screenshot 2026-06-02 at 11.43.28.png",
  "/Screenshot 2026-06-02 at 11.44.00.png",
];

export default function OurWork() {
  const t = useTranslations("OurWork");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
            {t("label")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium">{t("subtitle")}</p>
            <div className="w-16 h-px bg-border" />
          </div>
        </motion.div>

        {/* Project card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
        >
          {/* Browser mockup */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-border bg-muted shadow-2xl">
            {/* Chrome bar */}
            <div className="bg-muted/90 px-4 py-2.5 flex items-center gap-2 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 bg-background/70 rounded px-3 py-0.5 text-xs text-muted-foreground truncate">
                app.oms.dashboard / dashboard
              </div>
            </div>

            {/* Screenshot carousel */}
            <div className="relative aspect-video overflow-hidden bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screenshots[current]}
                    alt={`Project screenshot ${current + 1}`}
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-1.5 py-3">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-5" : "bg-border w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 bg-primary/5 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("badge")}
            </span>

            <h3 className="text-3xl md:text-4xl font-black leading-tight uppercase">
              {t("projectTitle")}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("projectDesc")}
            </p>

            <div className="flex flex-wrap gap-2">
              {(t.raw("tags") as string[]).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs border border-border rounded-lg px-3 py-1.5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
