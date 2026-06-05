"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Tracks() {
  const t = useTranslations("Tracks");
  const router = useRouter();

  const tracks = [
    {
      number: "01",
      title: "HTML",
      slug: "HTML",
      image: "/images/html5-original.svg",
      desc: t("htmlDesc"),
      level: t("beginner"),
      iconBg: "bg-orange-500",
    },
    {
      number: "02",
      title: "CSS",
      slug: "CSS",
      image: "/images/css3-original.svg",
      desc: t("cssDesc"),
      level: t("beginner"),
      iconBg: "bg-blue-600",
    },
    {
      number: "03",
      title: "JavaScript",
      slug: "JavaScript",
      image: "/images/javascript-original.svg",
      desc: t("jsDesc"),
      level: t("core"),
      iconBg: "bg-yellow-400",
    },
    {
      number: "04",
      title: "React",
      slug: "React",
      image: "/images/react-original.svg",
      desc: t("reactDesc"),
      level: t("intermediate"),
      iconBg: "bg-slate-800 dark:bg-slate-700",
    },
    {
      number: "05",
      title: "Tailwind",
      slug: "Tailwind",
      image: "/images/tailwindcss-icon.svg",
      desc: t("tailwindDesc"),
      level: t("intermediate"),
      iconBg: "bg-slate-800 dark:bg-slate-700",
    },
    {
      number: "06",
      title: "Next.js",
      slug: "Nextjs",
      image: "/images/nextjs-original.svg",
      desc: t("nextjsDesc"),
      level: t("advanced"),
      iconBg: "bg-slate-900 dark:bg-black",
    },
  ];

  return (
    <section className="py-24 px-6">
      {/* Header */}
      <div className="text-center mb-14">
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

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="border border-border rounded-full px-5 py-2 text-sm text-muted-foreground">
            {t("startZero")}
          </span>
          <div className="w-14 h-px bg-linear-to-r from-border to-primary" />
          <span className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-medium">
            {t("jobReady")}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onClick={() => track.slug && router.push(`/${track.slug}`)}
            className={`relative bg-card border border-border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 ${track.slug ? "cursor-pointer" : "cursor-default"}`}
          >
            {/* Faded background number */}
            <span
              aria-hidden
              className="absolute -top-3 right-3 text-[90px] font-black leading-none select-none text-foreground/4 pointer-events-none"
            >
              {track.number}
            </span>

            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-xl ${track.iconBg} flex items-center justify-center mb-5 relative z-10`}
            >
              <Image
                src={track.image}
                alt={track.title}
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2 relative z-10">{track.title}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 relative z-10">
              {track.desc}
            </p>

            {/* Level Badge */}
            <Badge variant="outline" className="text-xs relative z-10">
              {track.level}
            </Badge>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
