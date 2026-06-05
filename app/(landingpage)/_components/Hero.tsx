import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return ( 
    <section className="bg-gray-900 text-white lg:pt-40 sm:pt-40 dark:bg-transparent dark:text-foreground pt-40">
      {" "}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-1 text-sm text-black dark:text-white"
          >
            {t("badge")}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {t("title")}
          </h1>

          {/* Description */}
          <p className="max-w-[650px] text-white/80 md:text-lg leading-relaxed dark:text-muted-foreground">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/Learningpaths"
              className={buttonVariants({
                size: "lg",
              })}
            >
              {t("startLearning")}
            </Link>

            <Link
              href="/Login"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
              })}
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>
      {/* 🔥 Waves */}
      <div className="mt-16">
        <svg
          className="waves w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 
           58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>

          <g className="parallax">
            <use
              href="#wave-path"
              x="48"
              y="0"
              className="fill-gray-200 dark:fill-gray-800 opacity-70"
            />
            <use
              href="#wave-path"
              x="48"
              y="3"
              className="fill-gray-300 dark:fill-gray-700 opacity-50"
            />
            <use
              href="#wave-path"
              x="48"
              y="5"
              className="fill-gray-400 dark:fill-gray-600 opacity-30"
            />
            <use
              href="#wave-path"
              x="48"
              y="7"
              className="fill-white dark:fill-neutral-900"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}