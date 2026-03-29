"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Tracks() {
  const t = useTranslations("Tracks");

  const tracks = [
    { title: "HTML", image: "/images/html5-original.svg" },
    { title: "CSS", image: "/images/css3-original.svg" },
    { title: "JavaScript", image: "/images/javascript-original.svg" },
    { title: "SASS", image: "/images/sass-original.svg" },
    { title: "TypeScript", image: "/images/typescript-original.svg" },
    { title: "C++", image: "/images/cplusplus-original.svg" },
    { title: "PHP", image: "/images/php-original.svg" },
    { title: "Python", image: "/images/python-original.svg" },
    { title: "React", image: "/images/react-original.svg" },
    { title: "Tailwind", image: "/images/tailwindcss-icon.svg" },
  ];

  return (
    <div className="py-16 px-6 min-h-screen">
      {/* Title */}
      <h1 className="text-7xl font-bold text-center mb-4">{t("title")}</h1>

      <p className="text-center mb-10">{t("subtitle")}</p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer dark:bg-muted/30 dark:hover:bg-muted/60"
          >
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <Image
                src={track.image}
                alt={track.title}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-foreground">
              {track.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
