"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TeamCard from "./TeamCard";
import { string } from "zod";

export default function TeamSection() {
  const t = useTranslations("AboutUs");

  const supportTeam = [
 ,
    {
      name: t("mahmoudMahmoudName"),   
      role: t("mahmoudMahmoudRole"),
      image: "/team/mahmoud_mahmoud.png",
      delay: 0.2,
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
    <section className="py-24 bg-muted/30 dark:bg-muted/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Content */}
        <div className="text-center mb-20 space-y-4 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-foreground"
          >
            {t("teamTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            {t("teamSubtitle")}
          </motion.p>
        </div>

        {/* Support Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportTeam.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              delay={member.delay}
            />
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/5 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}
