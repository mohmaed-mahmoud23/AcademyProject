"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Data moved inside component

import { useTranslations } from "next-intl";

export default function ProblemSolving() {
  const t = useTranslations("ProblemSolvingPage");

  const problemSolvingLessons = [
    {
      week: t("week1Title"),
      lessons: [
        {
          number: 1,
          title: t("w1l1Title"),
          type: t("w1l1Type"),
          link: "#",
        },
        {
          number: 2,
          title: t("w1l2Title"),
          type: t("w1l2Type"),
          link: "#",
        },
        {
          number: 3,
          title: t("w1l3Title"),
          type: t("w1l3Type"),
          link: "#",
        },
      ],
    },
    {
      week: t("week2Title"),
      lessons: [
        {
          number: 4,
          title: t("w2l1Title"),
          type: t("w2l1Type"),
          link: "#",
        },
        {
          number: 5,
          title: t("w2l2Title"),
          type: t("w2l2Type"),
          link: "#",
        },
        {
          number: 6,
          title: t("w2l3Title"),
          type: t("w2l3Type"),
          link: "#",
        },
      ],
    },
    {
      week: t("week3Title"),
      lessons: [
        {
          number: 7,
          title: t("w3l1Title"),
          type: t("w3l1Type"),
          link: "#",
        },
        {
          number: 8,
          title: t("w3l2Title"),
          type: t("w3l2Type"),
          link: "#",
        },
        {
          number: 9,
          title: t("w3l3Title"),
          type: t("w3l3Type"),
          link: "#",
        },
      ],
    },
  ];

  return (
    <section className="min-h-screen   px-6 py-16 bg-gray-200 dark:bg-transparent">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-400 mt-4 text-LG">
          {t("subtitle")}
        </p>
      </div>

      {/* Weeks */}
      <div className="space-y-14 max-w-5xl mx-auto">
        {problemSolvingLessons.map((week, idx) => (
          <div key={idx}>
            {/* Week Title */}
            <h2 className="text-2xl font-semibold mb-6 border-s-4 border-blue-500 ps-4">
              {week.week}
            </h2>

            {/* Lessons Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {week.lessons.map((lesson) => (
                <Card
                  key={lesson.number}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl 
                             hover:scale-[1.03] transition-all duration-300
                             hover:border-blue-500/40 group"
                >
                  <CardContent className="p-5 space-y-4">
                    {/* Top Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm ">
                        {t("lesson")} {lesson.number}
                      </span>

                      <Badge
                        className={
                          lesson.type === t("w1l1Type") || lesson.type === "Theory" || lesson.type === "نظري"
                            ? "bg-gray-700"
                            : lesson.type === t("w1l3Type") || lesson.type === "Practice" || lesson.type === "تطبيق عملي"
                              ? "bg-blue-600"
                              : "bg-purple-600"
                        }
                      >
                        {lesson.type}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
                      {lesson.title}
                    </h3>

                    {/* Action */}
                    <a
                      href={lesson.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                    >
                      {t("start")}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
