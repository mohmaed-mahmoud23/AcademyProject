import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Play } from "lucide-react";

export default async function LatestVideos() {
  const t = await getTranslations("Videos");

  const videos = [
    {
      title: t("react"),
      desc: t("reactDesc"),
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      tag: t("reactTag"),
      href: "/videos/react-course",
    },
    {
      title: t("nextjs"),
      desc: t("nextjsDesc"),
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
      tag: t("nextjsTag"),
      href: "/videos/nextjs-masterclass",
    },
    {
      title: t("jsTips"),
      desc: t("jsTipsDesc"),
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
      tag: t("jsTipsTag"),
      href: "/videos/js-tips",
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
              href="/videos"
              className="absolute inset-e-0 flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
            >
              {t("viewAll")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video, index) => (
            <Link key={index} href={video.href} className="group">
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Thumbnail with badge + play overlay */}
                <div className="relative overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Tag badge */}
                  <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground rounded-full border border-border/50">
                    {video.tag}
                  </span>

                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Play size={18} fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1.5">{video.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.desc}
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
