"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  const t = useTranslations("AboutUs");

  const supportTeam: { name: string; role: string; image: string; delay: number; imageClassName?: string; whatsapp?: string; email?: string }[] = [
    {
      name: t("saraName"),
      role: `${t("saraRole")} | ${t("saraExp2")}`,
      image: "/images/IMG_7031.JPEG",
      delay: 0.1,
      whatsapp: "201019804917",
    },
    {
      name: t("mahmoudMahmoudName"),
      role: t("mahmoudMahmoudRole"),
      image: "/team/mahmoud_mahmoud.png",
      delay: 0.2,
      imageClassName: "scale-[1.6] object-center",
      whatsapp: "201063264363",
    },
    {
      name: t("aHusseinName"),
      role: t("aHusseinRole"),
      image: "/team/alaa.png",
      delay: 0.3,
      whatsapp: "201061899428",
    },
    {
      name: t("hAttarName"),
      role: t("hAttarRole"),
      image: "/team/hala.png",
      delay: 0.4,
      whatsapp: "905313869483",
      email: "hala45515@gmail.com",
    },
  ];

  return (
    <section id="support-team" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Content */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
            {t("teamTitle")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium">{t("teamSubtitle")}</p>
            <div className="w-16 h-px bg-border" />
          </div>
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
              whatsapp={member.whatsapp}
              email={member.email}
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
              whatsapp={member.whatsapp}
              email={member.email}
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
