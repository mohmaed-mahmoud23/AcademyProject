import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function LatestProjects() {
  const t = await getTranslations("Projects");

  const projects = [
    {
      title: t("hangman"),
      image:
        "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80",
      tag: "Game",
      href: "/projects/hangman-game",
    },
    {
      title: t("scroll"),
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: "UI Component",
      href: "/projects/scroll-progress",
    },
    {
      title: t("scroll"),
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: "UI Component",
      href: "/projects/scroll-progress",
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
          {projects.map((project, index) => (
            <Link key={index} href={project.href} className="group">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="inline-block text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full mb-3">
                    {project.tag}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {project.title}
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
