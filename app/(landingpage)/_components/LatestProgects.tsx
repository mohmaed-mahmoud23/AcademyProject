import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

export default async function LatestProjects() {
  const t = await getTranslations("Projects");

  const projects = [
    {
      title: t("hangman"),
      desc: t("hangmanDesc"),
      image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
      tag: t("hangmanTag"),
      href: "/projects/hangman-game",
    },
    {
      title: t("scroll"),
      desc: t("scrollDesc"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: t("scrollTag"),
      href: "/projects/scroll-progress",
    },
    {
      title: t("weather"),
      desc: t("weatherDesc"),
      image: "https://i.pinimg.com/736x/9d/09/c7/9d09c73ec5decc01aa987de7d053fef4.jpg",
      tag: t("weatherTag"),
      href: "/projects/weather-dashboard",
    },
  ];

  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-primary mb-5 text-center">
            {t("title")}
          </h2>

          <div className="relative flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-border" />
            <p className="text-sm md:text-base text-foreground font-medium whitespace-nowrap">
              {t("subtitle")}
            </p>
            <div className="w-16 h-px bg-border" />

            <Link
              href="/projects"
              className="absolute end-0 flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
            >
              {t("viewAll")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <Link key={index} href={project.href} className="group">
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Image with badge */}
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground rounded-full border border-border/50">
                    {project.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1.5">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
