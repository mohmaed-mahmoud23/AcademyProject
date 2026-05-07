"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, GraduationCap } from "lucide-react";

export default function AboutHero() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-background">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6 text-start"
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary rounded-full">
              {t("heroBadge")}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              {t("heroTitle")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("heroDescription")}
            </p>

            <div className="flex flex-col gap-6 w-full max-w-lg mt-4">
              {/* Leader 1: Mahmoud Habib */}
              <div className="p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
                    <AvatarImage src="/Habib.png" alt={t("ceoName")} className="object-cover" />
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                        <Briefcase size={18} />
                      </div>
                      {t("ceoExp1")}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                        <GraduationCap size={18} />
                      </div>
                      {t("ceoExp2")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sara Abdullah has been moved to her own section below */}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                {t("viewCourses")}
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold hover:bg-muted transition-colors">
                {t("contactUs")}
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
                  <AvatarImage src="/Habib.png" alt={t("ceoName")} className="object-cover" />
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
                    {[1, 2, 3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-foreground/80 lowercase">
                    +500 students joined this week
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
