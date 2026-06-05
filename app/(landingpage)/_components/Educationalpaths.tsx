"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Educationalpaths() {
  const t = useTranslations("Paths");

  const paths = [
    {
      title: t("frontEnd"),
      desc: t("frontEndDesc"),
      image: "/1055687.png",
      tags: [t("frontEndTag1"), t("frontEndTag2")],
      href: "/Learningpaths",
    },
    {
      title: t("backEnd"),
      desc: t("backEndDesc"),
      image: "/2721297.png",
      tags: [t("backEndTag1"), t("backEndTag2")],
      href: "/Backendpath",
    },
    {
      title: t("basics"),
      desc: t("basicsDesc"),
      image: "/6062646.png",
      tags: [t("basicsTag1"), t("basicsTag2")],
      href: "/Basicspath",
    },
  ];

  return (
    <section className="py-24 px-6">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5">
          {t("label")}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-border" />
          <p className="text-sm md:text-base text-foreground font-medium">{t("title")}</p>
          <div className="w-16 h-px bg-border" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {paths.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
          <Link href={item.href} className="group flex flex-col bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
            {/* Image container */}
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5 shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                width={44}
                height={44}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
              {item.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Explore link */}
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
              {t("explore")}
              <ArrowRight size={15} />
            </span>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
