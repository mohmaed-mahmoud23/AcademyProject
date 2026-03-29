"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Image1 from "@/public/images/632619688_18103404310882673_4786930282516106349_n.webp";
import { useTranslations, useLocale } from "next-intl";
import { useRef, useLayoutEffect, useState } from "react";

export default function FloatingCards() {
  const t = useTranslations("FloatingCards");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const images = Array(6).fill(Image1);

  const Row = ({
    reverse = false,
    duration = 25,
  }: {
    reverse?: boolean;
    duration?: number;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const repeated = [...images, ...images];

    // مهم: أسرع وأدق من useEffect
    useLayoutEffect(() => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 2);
      }
    }, []);

    // 🔥 منطق اتجاه بسيط وواضح (يشتغل RTL و LTR بدون تعقيد)
    const direction = (isRTL ? 1 : -1) * (reverse ? -1 : 1);

    return (
      <div className="overflow-hidden w-full">
        <motion.div
          ref={containerRef}
          className="flex gap-10 w-max"
          animate={{
            x: width ? direction * width : 0,
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {repeated.map((img, i) => (
            <div
              key={i}
              className="relative w-[420px] h-[420px] shrink-0 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src={img} alt="student" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-32 overflow-hidden">
      <h1 className="text-4xl text-center mb-16">{t("title")}</h1>

      {/* Row 1 */}
      <Row />

      {/* لو عايز صف تاني عكس الاتجاه (اختياري) */}
      {/* <div className="mt-10">
        <Row reverse />
      </div> */}
    </section>
  );
}
