"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Educationalpaths() {
  const t = useTranslations("Paths");

  const paths = [
    {
      title: t("frontEnd"),
      image: "/1055687.png",
    },
    {
      title: t("backEnd"),
      image: "/2721297.png",
    },
    {
      title: t("basics"),
      image: "/6062646.png",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-transparent">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">{t("title")}</h2>
        <p>{t("subtitle")}</p>
        {/* Line */}
        <div className="w-32 h-[2px] bg-blue-500 mx-auto mt-4"></div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {paths.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer dark:bg-card dark:border-border"
          >
            {/* Image */}
            <div className="flex justify-center mb-6">
              <Image
                src={item.image}
                alt={item.title}
                width={90}
                height={90}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition dark:text-foreground">
              {item.title}
            </h3>

            {/* Line bottom */}
            <div className="h-[2px] w-0 bg-blue-500 mx-auto mt-4 transition-all duration-300 group-hover:w-16"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
