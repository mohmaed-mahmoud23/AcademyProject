"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  const t = useTranslations("AboutUs");

  const supportTeam: { name: string; role: string; image: string; delay: number; imageClassName?: string }[] = [
    {
      name: t("saraName"),
      role: `${t("saraRole")} | ${t("saraExp2")}`,
      image: "/images/IMG_7031.JPEG",
      delay: 0.1,
    },
    {
      name: t("mahmoudMahmoudName"),
      role: t("mahmoudMahmoudRole"),
      image: "/team/mahmoud_mahmoud.png",
      delay: 0.2,
      imageClassName: "scale-[1.6] object-center",
    },
    {
      name: t("aHusseinName"),
      role: t("aHusseinRole"),
      image: "/team/alaa.png",
      delay: 0.3,
    },
    {
      name: t("hAttarName"),
      role: t("hAttarRole"),
      image: "/team/hala.png",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-32 bg-[#020617] dark:bg-[#020617] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Content */}
        <div className="text-center mb-24 space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("heroBadge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            {t("teamTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-400 font-medium"
          >
            {t("teamSubtitle")}
          </motion.p>
        </div>

        {/* Support Team Grid - Featured Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-10">
          {supportTeam.slice(0, 2).map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              delay={member.delay}
              imageClassName={member.imageClassName}
            />
          ))}
        </div>

        {/* Support Team Grid - Secondary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {supportTeam.slice(2).map((member, index) => (
            <TeamCard
              key={index + 2}
              name={member.name}
              role={member.role}
              image={member.image}
              delay={member.delay}
              imageClassName={member.imageClassName}
            />
          ))}
        </div>
      </div>

      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>
    </section>
  );
}
