"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { Lock, Clock } from "lucide-react";

export default function ProblemSolving() {
  const t = useTranslations("ProblemSolvingPage");

  const problemSolvingLessons = [
    {
      week: t("week1Title"),
      lessons: [
        { number: 1, title: t("w1l1Title"), type: t("w1l1Type"), link: "#" },
        { number: 2, title: t("w1l2Title"), type: t("w1l2Type"), link: "#" },
        { number: 3, title: t("w1l3Title"), type: t("w1l3Type"), link: "#" },
      ],
    },
    {
      week: t("week2Title"),
      lessons: [
        { number: 4, title: t("w2l1Title"), type: t("w2l1Type"), link: "#" },
        { number: 5, title: t("w2l2Title"), type: t("w2l2Type"), link: "#" },
        { number: 6, title: t("w2l3Title"), type: t("w2l3Type"), link: "#" },
      ],
    },
    {
      week: t("week3Title"),
      lessons: [
        { number: 7, title: t("w3l1Title"), type: t("w3l1Type"), link: "#" },
        { number: 8, title: t("w3l2Title"), type: t("w3l2Type"), link: "#" },
        { number: 9, title: t("w3l3Title"), type: t("w3l3Type"), link: "#" },
      ],
    },
  ];

  return (
    <section className="min-h-screen px-6 py-16 bg-background text-foreground">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          {/* Coming Soon Badge */}
          <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
            <Clock size={12} />
            قريباً
          </span>
        </div>
        <p className="text-muted-foreground mt-2 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Blurred content with lock overlay */}
      <div className="relative max-w-5xl mx-auto">
        {/* Blur overlay */}
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-background/60 rounded-3xl flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lock size={28} className="text-primary" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl font-bold">المحتوى قادم قريباً</p>
            <p className="text-muted-foreground text-sm max-w-xs">
              بنشتغل على المحتوى ده وهيكون جاهز قريباً — ترقبوا التحديثات
            </p>
          </div>
          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full">
            <Clock size={14} />
            قريباً
          </span>
        </div>

        {/* Content (blurred underneath) */}
        <div className="space-y-14 pointer-events-none select-none">
          {problemSolvingLessons.map((week, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold mb-6 border-s-4 border-blue-500 ps-4">
                {week.week}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {week.lessons.map((lesson) => (
                  <Card
                    key={lesson.number}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl"
                  >
                    <CardContent className="p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t("lesson")} {lesson.number}</span>
                        <Badge className="bg-gray-700">{lesson.type}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
