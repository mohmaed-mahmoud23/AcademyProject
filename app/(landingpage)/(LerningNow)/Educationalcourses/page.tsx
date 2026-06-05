"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Clock4, Unlock } from "lucide-react";

const statusConfig: Record<string, { label: string; icon: React.ElementType; classes: string; glow: string }> = {
  Completed:    { label: "Completed",    icon: CheckCircle2, classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", glow: "hover:shadow-emerald-500/10" },
  "In Progress":{ label: "In Progress", icon: Clock4,       classes: "bg-blue-500/15 text-blue-400 border-blue-500/30",         glow: "hover:shadow-blue-500/10"   },
  "Always Open":{ label: "Always Open", icon: Unlock,       classes: "bg-orange-500/15 text-orange-400 border-orange-500/30",   glow: "hover:shadow-orange-500/10" },
};

const accentColors = [
  "from-blue-500/30",
  "from-orange-500/30",
  "from-purple-500/30",
  "from-emerald-500/30",
  "from-cyan-500/30",
];

export default function LearningPathsUpdated() {
  const t = useTranslations("EducationalCoursesPage");

  const courses = [
    {
      title: t("course1"),
      status: t("statusInProgress"),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("course2"),
      status: t("statusOpen"),
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("course3"),
      status: t("statusInProgress"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("course4"),
      status: t("statusCompleted"),
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: t("course5"),
      status: t("statusCompleted"),
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [featured, ...rest] = courses;
  const featuredStatus = statusConfig[featured.status] ?? statusConfig["Always Open"];
  const FeaturedIcon = featuredStatus.icon;

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-[0.15em] text-primary mb-4">
            {t("title")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium">
              {t("subtitle")}
            </p>
            <div className="w-12 h-px bg-border" />
          </div>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="group relative rounded-3xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300 bg-card">
            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="relative h-64 md:h-auto min-h-70 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-linear-to-r ${accentColors[0]} to-transparent opacity-60`} />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-card/60 hidden md:block" />

                {/* Step number */}
                <span className="absolute bottom-4 left-5 text-7xl font-black leading-none text-white/10 select-none">
                  01
                </span>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${featuredStatus.classes}`}>
                      <FeaturedIcon size={12} />
                      {featured.status}
                    </span>
                    <span className="ms-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      Featured
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4 group-hover:text-primary transition-colors duration-200">
                    {featured.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("startLearning")}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border">
                  <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200">
                    Start Path <ArrowRight size={15} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((course, index) => {
            const cfg = statusConfig[course.status] ?? statusConfig["Always Open"];
            const StatusIcon = cfg.icon;
            const step = String(index + 2).padStart(2, "0");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
              >
                <div className={`group h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${cfg.glow}`}>

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-linear-to-br ${accentColors[index + 1] ?? accentColors[0]} to-transparent opacity-50`} />
                    <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent" />

                    {/* Status badge */}
                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${cfg.classes}`}>
                      <StatusIcon size={11} />
                      {course.status}
                    </span>

                    {/* Step number */}
                    <span className="absolute bottom-3 right-4 text-5xl font-black leading-none text-white/10 select-none">
                      {step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t("startLearning")}
                    </p>
                    <button className="self-start flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all duration-200 pt-2 border-t border-border w-full">
                      Start Path <ArrowRight size={13} />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
