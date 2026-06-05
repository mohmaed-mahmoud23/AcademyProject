"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutHero() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Centered Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
            {t("heroBadge")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium">{t("heroTitle")}</p>
            <div className="w-16 h-px bg-border" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6 text-start"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("heroDescription")}
            </p>

            <div className="flex flex-col gap-6 w-full max-w-lg mt-4">
              {/* Leader 1: Mahmoud Habib */}
              <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
                    <AvatarImage src="/WhatsApp Image 2026-06-05 at 17.54.18.jpeg" alt={t("ceoName")} className="object-cover" />
                    <AvatarFallback className="text-xl font-bold bg-secondary text-secondary-foreground">م</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{t("ceoName")}</h3>
                    <p className="text-sm font-medium text-primary">{t("ceoRole")}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t("ceoExpTitle")}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-xl font-black text-blue-400">{t("ceoExp1Num")}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{t("ceoExp1Label")}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-primary/10 border border-primary/20">
                      <span className="text-xl font-black text-primary">{t("ceoExp2Num")}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{t("ceoExp2Label")}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-xl font-black text-emerald-400">{t("ceoExp3Num")}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{t("ceoExp3Label")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sara Abdullah has been moved to her own section below */}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button size="lg" asChild className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                <Link href="/Learningpaths">{t("viewCourses")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 font-semibold hover:bg-muted transition-colors">
                <a href="https://wa.me/201064501682" target="_blank" rel="noopener noreferrer">{t("contactUs")}</a>
              </Button>
            </div>
          </motion.div>
          {/* Visual Side (CEO Avatar with Photo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-secondary/20" />
              {/* Modern Avatar with Actual Photo */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Avatar className="w-[85%] h-[85%] border-6 border-background/50 shadow-2xl">
                  <AvatarImage src="/WhatsApp Image 2026-06-05 at 17.54.18.jpeg" alt={t("ceoName")} className="object-cover" />
                  <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">MH</AvatarFallback>
                </Avatar>
              </div>

              {/* Glass Detail Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 right-10 p-4 rounded-2xl bg-background/60 backdrop-blur-md border border-white/20 shadow-xl hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["/team/hala.png", "/team/mahmoud_mahmoud.png", "/team/alaa.png", "/team/mohamed.png"].map((src, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-foreground/80">
                    {t("studentsJoined")}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Back Glow */}
            <div className="absolute inset-0 blur-[100px] bg-primary/20 -z-10 rounded-full sm:scale-110" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
