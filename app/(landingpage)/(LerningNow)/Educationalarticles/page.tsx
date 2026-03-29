import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Educationalarticles() {
  const t = useTranslations("EducationalArticlesPage");

  const articles = [
    {
      title: t("article1Title"),
      desc: t("article1Desc"),
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      tag: "Next.js",
      date: "Mar 2026",
      read: `6 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/nextjs-ui",
    },
    {
      title: t("article2Title"),
      desc: t("article2Desc"),
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      tag: "React",
      date: "Feb 2026",
      read: `8 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/react-components",
    },
    {
      title: t("article3Title"),
      desc: t("article3Desc"),
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80",
      tag: "JavaScript",
      date: "Jan 2026",
      read: `5 ${t("min")} ${t("read")}`,
      author: "Mohamed",
      href: "/articles/js-tips",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">{t("title")}</h2>

          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-20 bg-gray-300" />
            <p className="text-sm md:text-base ">
              {t("subtitle")}
            </p>
            <span className="h-px w-20 bg-gray-300" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link key={index} href={article.href} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Top meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {article.tag}
                    </span>

                    <span className="text-xs text-gray-400">
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {article.desc}
                  </p>

                  {/* Bottom meta */}
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                    <span>{t("by")} {article.author}</span>
                    <span>{article.read}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
