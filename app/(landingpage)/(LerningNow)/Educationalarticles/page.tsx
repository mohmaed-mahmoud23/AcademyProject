"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const tagColors: Record<string, string> = {
  "Next.js": "bg-white/10 text-white border-white/20",
  "React": "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "JavaScript": "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
};

export default function Educationalarticles() {
  const t = useTranslations("EducationalArticlesPage");

  const articles = [
    {
      title: t("article1Title"),
      desc: t("article1Desc"),
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      tag: "Next.js",
      date: t("article1Date"),
      read: `6 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/nextjs-ui",
    },
    {
      title: t("article2Title"),
      desc: t("article2Desc"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: "React",
      date: t("article2Date"),
      read: `8 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/react-components",
    },
    {
      title: t("article3Title"),
      desc: t("article3Desc"),
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
      tag: "JavaScript",
      date: t("article3Date"),
      read: `5 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/js-tips",
    },
  ];

  const [featured, ...rest] = articles;

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="relative flex flex-col items-center text-center">
            <p className="text-2xl md:text-3xl font-bold uppercase tracking-[0.15em] text-primary mb-4">
              {t("title")}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-border" />
              <p className="text-sm md:text-base text-foreground font-medium">
                {t("subtitle")}
              </p>
              <div className="w-12 h-px bg-border" />
            </div>
            <Link
              href="/articles"
              className="absolute inset-e-0 bottom-0 hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
            >
              {t("viewAll")} <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href={featured.href} className="group block">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2">

                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-70 overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-card/60 hidden md:block" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-card/70 md:hidden" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[featured.tag] ?? "bg-muted text-foreground border-border"}`}>
                        {featured.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">{featured.date}</span>
                      <span className="ms-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        {t("featured")}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4 group-hover:text-primary transition-colors duration-200">
                      {featured.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {featured.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        M
                      </div>
                      <span className="text-sm font-medium">{t("by")} {featured.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {featured.read}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Link>
        </motion.div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
            >
              <Link href={article.href} className="group block h-full">
                <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${tagColors[article.tag] ?? "bg-background/80 text-foreground border-border/50"}`}>
                        {article.tag}
                      </span>
                      <span className="text-xs text-white/70 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {article.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">
                      {article.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          M
                        </div>
                        {t("by")} {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={11} />
                        {article.read}
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
