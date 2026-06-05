"use client";

import { BookOpen, GitBranch, Share2, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      icon: <BookOpen size={22} />,
      step: t("step1Label"),
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      icon: <GitBranch size={22} />,
      step: t("step2Label"),
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      icon: <Share2 size={22} />,
      step: t("step3Label"),
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
    {
      icon: <Trophy size={22} />,
      step: t("step4Label"),
      title: t("step4Title"),
      desc: t("step4Desc"),
    },
  ];

  return (
    <section className="py-24 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
          {t("label")}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-px bg-border" />
          <p className="text-sm md:text-base text-foreground font-medium">{t("heading")}</p>
          <div className="w-16 h-px bg-border" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {t("desc")}
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto">

        {/* ── Mobile: vertical timeline ── */}
        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.35 }}
              className="flex gap-4"
            >
              {/* Left: icon + vertical line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shrink-0">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 w-px bg-border my-2" />
                )}
              </div>

              {/* Right: text */}
              <div className="pb-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                  {step.step}
                </p>
                <h3 className="text-base font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: horizontal ── */}
        <div className="hidden lg:grid grid-cols-4 gap-0">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              {/* Icon + connector */}
              <div className="flex items-center mb-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.35 }}
                  className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shrink-0"
                >
                  {step.icon}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-2" />
                )}
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.1, duration: 0.35 }}
                className="pe-6"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
                  {step.step}
                </p>
                <h3 className="text-base font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
