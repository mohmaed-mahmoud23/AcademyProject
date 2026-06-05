"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Database, Server, Globe, Lock, Rocket, Check } from "lucide-react";

const cardStyles = [
  { accent: "border-l-green-500",  glow: "hover:shadow-green-500/10",  iconBg: "bg-green-500/10 text-green-400",  badgeClass: "bg-green-500/10 text-green-400 border-green-500/30",  Icon: Server   },
  { accent: "border-l-blue-500",   glow: "hover:shadow-blue-500/10",   iconBg: "bg-blue-500/10 text-blue-400",   badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",   Icon: Database },
  { accent: "border-l-orange-500", glow: "hover:shadow-orange-500/10", iconBg: "bg-orange-500/10 text-orange-400",badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/30",Icon: Globe   },
  { accent: "border-l-purple-500", glow: "hover:shadow-purple-500/10", iconBg: "bg-purple-500/10 text-purple-400",badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",Icon: Lock   },
  { accent: "border-l-rose-500",   glow: "hover:shadow-rose-500/10",   iconBg: "bg-rose-500/10 text-rose-400",   badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",   Icon: Rocket  },
];

export default function Backendpath() {
  const t = useTranslations("BackendPathPage");

  const paths = [
    { title: t("path1Title"), desc: t("path1Desc"), level: t("path1Level"), items: t.raw("path1Items") as string[] },
    { title: t("path2Title"), desc: t("path2Desc"), level: t("path2Level"), items: t.raw("path2Items") as string[] },
    { title: t("path3Title"), desc: t("path3Desc"), level: t("path3Level"), items: t.raw("path3Items") as string[] },
    { title: t("path4Title"), desc: t("path4Desc"), level: t("path4Level"), items: t.raw("path4Items") as string[] },
    { title: t("path5Title"), desc: t("path5Desc"), level: t("path5Level"), items: t.raw("path5Items") as string[] },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
            {t("label")}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium">{t("title")}</p>
            <div className="w-16 h-px bg-border" />
          </div>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 bg-card border border-border rounded-2xl px-8 py-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t("statPhases")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">18+</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t("statTopics")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{t("statJourneyValue")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t("statJourney")}</p>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paths.map((path, index) => {
            const style = cardStyles[index];
            const { Icon } = style;
            const step = String(index + 1).padStart(2, "0");
            const isLast = index === paths.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={isLast ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className={`relative h-full bg-card border border-border border-l-4 ${style.accent} rounded-2xl p-6 overflow-hidden hover:shadow-2xl ${style.glow} hover:-translate-y-1 transition-all duration-300`}>
                  <span aria-hidden className="absolute -top-2 right-4 text-[80px] font-black leading-none select-none text-foreground/4 pointer-events-none">{step}</span>

                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className={`w-11 h-11 rounded-xl ${style.iconBg} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${style.badgeClass}`}>
                      {path.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-1.5 relative z-10">{path.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">{path.desc}</p>

                  <ul className="space-y-2 relative z-10">
                    {path.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80">
                        <span className={`w-4 h-4 rounded-full ${style.iconBg} flex items-center justify-center shrink-0`}>
                          <Check size={10} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
