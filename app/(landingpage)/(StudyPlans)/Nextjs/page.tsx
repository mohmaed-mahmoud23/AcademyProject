"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function NextjsStudyPlan() {
  const t = useTranslations("StudyPlan");
  const tr = useTranslations("StudyPlanNextjs");

  const studyPlan = [
    {
      week: tr("week1"),
      lessons: [
        { number: 1,  title: tr("w1l1"), type: t("theory")    },
        { number: 2,  title: tr("w1l2"), type: t("theory")    },
        { number: 3,  title: tr("w1l3"), type: t("theory")    },
        { number: 4,  title: tr("w1l4"), type: t("theory")    },
        { number: 5,  title: tr("w1l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w1a1"), count: 10 }],
      keywords: ["Next.js", "App Router", "Layouts", "File Routing", "Pages"],
    },
    {
      week: tr("week2"),
      lessons: [
        { number: 6,  title: tr("w2l1"), type: t("theory")    },
        { number: 7,  title: tr("w2l2"), type: t("theory")    },
        { number: 8,  title: tr("w2l3"), type: t("theory")    },
        { number: 9,  title: tr("w2l4"), type: t("theory")    },
        { number: 10, title: tr("w2l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w2a1"), count: 12 }],
      keywords: ["Server Components", "Client Components", "use client", "Suspense", "SSR"],
    },
    {
      week: tr("week3"),
      lessons: [
        { number: 11, title: tr("w3l1"), type: t("theory")    },
        { number: 12, title: tr("w3l2"), type: t("theory")    },
        { number: 13, title: tr("w3l3"), type: t("theory")    },
        { number: 14, title: tr("w3l4"), type: t("theory")    },
        { number: 15, title: tr("w3l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w3a1"), count: 12 }],
      keywords: ["fetch", "SSG", "SSR", "Caching", "Revalidation"],
    },
    {
      week: tr("week4"),
      lessons: [
        { number: 16, title: tr("w4l1"), type: t("theory")    },
        { number: 17, title: tr("w4l2"), type: t("theory")    },
        { number: 18, title: tr("w4l3"), type: t("theory")    },
        { number: 19, title: tr("w4l4"), type: t("theory")    },
        { number: 20, title: tr("w4l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w4a1"), count: 14 }],
      keywords: ["Dynamic Routes", "slug", "Route Handlers", "Server Actions", "API"],
    },
    {
      week: tr("week5"),
      lessons: [
        { number: 21, title: tr("w5l1"), type: t("theory")    },
        { number: 22, title: tr("w5l2"), type: t("theory")    },
        { number: 23, title: tr("w5l3"), type: t("theory")    },
        { number: 24, title: tr("w5l4"), type: t("theory")    },
        { number: 25, title: tr("w5l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w5a1"), count: 14 }],
      keywords: ["Middleware", "NextAuth", "Auth", "Cookies", "Sessions"],
    },
    {
      week: tr("week6"),
      lessons: [
        { number: 26, title: tr("w6l1"), type: t("theory")    },
        { number: 27, title: tr("w6l2"), type: t("theory")    },
        { number: 28, title: tr("w6l3"), type: t("theory")    },
        { number: 29, title: tr("w6l4"), type: t("practical") },
        { number: 30, title: tr("w6l5"), type: t("practical") },
      ],
      assignments: [{ title: tr("w6a1"), count: 20 }],
      keywords: ["next/image", "next/font", "SEO", "Metadata", "Vercel"],
    },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {tr("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {tr("desc")}
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {studyPlan.map((week, idx) => (
            <AccordionItem
              key={idx}
              value={`week-${idx}`}
              className="border border-border/50 rounded-xl bg-card/70 backdrop-blur-xl hover:shadow-xl transition-all"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold flex justify-between items-center text-start">
                {week.week}
                <Badge variant="secondary" className="ms-2">
                  {week.lessons.length} {t("lessons")}
                </Badge>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">

                {/* Lessons */}
                <div className="mb-6 space-y-2">
                  {week.lessons.map((lesson) => (
                    <Card
                      key={lesson.number}
                      className="bg-background/30 hover:bg-background/50 transition-all rounded-xl"
                    >
                      <CardContent className="flex justify-between items-center">
                        <span>{lesson.number}. {lesson.title}</span>
                        <Badge variant={lesson.type === t("theory") ? "outline" : "secondary"}>
                          {lesson.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Assignments */}
                <Card className="mb-6 bg-background/20 rounded-xl">
                  <CardHeader>
                    <CardTitle>{t("assignments")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {week.assignments.map((a, i) => (
                      <p key={i}>{a.title} [ {a.count} {t("assignments")} ]</p>
                    ))}
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card className="bg-background/10 rounded-xl">
                  <CardHeader>
                    <CardTitle>{t("keywords")}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {week.keywords.map((kw, i) => (
                      <Badge key={i} variant="outline">{kw}</Badge>
                    ))}
                  </CardContent>
                </Card>

              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </section>
  );
}
