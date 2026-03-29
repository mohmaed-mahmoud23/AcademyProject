import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function LatestVideos() {
  const t = await getTranslations("Videos");

  const videos = [
    {
      title: t("react"),
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: "React",
      href: "/videos/react-course",
    },
    {
      title: t("nextjs"),
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
      tag: "Next.js",
      href: "/videos/nextjs-masterclass",
    },
    {
      title: t("jsTips"),
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
      tag: "JavaScript",
      href: "/videos/js-tips",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-200 dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">{t("title")}</h2>

          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-20 bg-gray-300" />
            <p className="text-sm md:text-base">{t("subtitle")}</p>
            <span className="h-px w-20 bg-gray-300" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Link key={index} href={video.href} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-black text-xl">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="inline-block text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full mb-3">
                    {video.tag}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {video.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
