"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("FAQ");

  const questions = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-black transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-start"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.q}
                </span>

                <span className="text-xl text-gray-500 shrink-0 ms-3">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                  }`}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
