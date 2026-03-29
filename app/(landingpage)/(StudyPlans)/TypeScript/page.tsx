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

export default function TypeScriptStudyPlan() {
  const t = useTranslations("StudyPlan");
  const tt = useTranslations("StudyPlanTypeScript");

  const tsStudyPlan = [
    {
      week: tt("week1"),
      lessons: [
        { number: 1, title: tt("w1l1"), type: t("theory") },
        { number: 2, title: tt("w1l2"), type: t("practical") },
        { number: 3, title: tt("w1l3"), type: t("theory") },
        { number: 4, title: tt("w1l4"), type: t("theory") },
        { number: 5, title: tt("w1l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w1a1"), count: 8 }],
      keywords: ["TypeScript", "Typing", "Annotation", "Static Types", "Compile"],
    },
    {
      week: tt("week2"),
      lessons: [
        { number: 6, title: tt("w2l1"), type: t("theory") },
        { number: 7, title: tt("w2l2"), type: t("theory") },
        { number: 8, title: tt("w2l3"), type: t("theory") },
        { number: 9, title: tt("w2l4"), type: t("theory") },
        { number: 10, title: tt("w2l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w2a1"), count: 10 }],
      keywords: ["Interfaces", "Enums", "Tuples", "Any", "Unknown"],
    },
    {
      week: tt("week3"),
      lessons: [
        { number: 11, title: tt("w3l1"), type: t("theory") },
        { number: 12, title: tt("w3l2"), type: t("theory") },
        { number: 13, title: tt("w3l3"), type: t("theory") },
        { number: 14, title: tt("w3l4"), type: t("theory") },
        { number: 15, title: tt("w3l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w3a1"), count: 9 }],
      keywords: ["Functions", "Objects", "Readonly", "Optional", "Typing"],
    },
    {
      week: tt("week4"),
      lessons: [
        { number: 16, title: tt("w4l1"), type: t("theory") },
        { number: 17, title: tt("w4l2"), type: t("theory") },
        { number: 18, title: tt("w4l3"), type: t("theory") },
        { number: 19, title: tt("w4l4"), type: t("theory") },
        { number: 20, title: tt("w4l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w4a1"), count: 12 }],
      keywords: ["OOP", "Classes", "Inheritance", "Encapsulation", "Modifiers"],
    },
    {
      week: tt("week5"),
      lessons: [
        { number: 21, title: tt("w5l1"), type: t("theory") },
        { number: 22, title: tt("w5l2"), type: t("theory") },
        { number: 23, title: tt("w5l3"), type: t("theory") },
        { number: 24, title: tt("w5l4"), type: t("theory") },
        { number: 25, title: tt("w5l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w5a1"), count: 15 }],
      keywords: ["Generics", "Utility Types", "Reusable Code", "API Layer"],
    },
    {
      week: tt("week6"),
      lessons: [
        { number: 26, title: tt("w6l1"), type: t("practical") },
        { number: 27, title: tt("w6l2"), type: t("theory") },
        { number: 28, title: tt("w6l3"), type: t("theory") },
        { number: 29, title: tt("w6l4"), type: t("theory") },
        { number: 30, title: tt("w6l5"), type: t("practical") },
      ],
      assignments: [{ title: tt("w6a1"), count: 18 }],
      keywords: ["React", "Props", "State", "Events", "Type Safety"],
    },
  ];
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {tt("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {tt("desc")}
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {tsStudyPlan.map((week, idx) => (
            <AccordionItem
              key={idx}
              value={`week-${idx}`}
              className="border border-border/50 rounded-xl bg-card/70 backdrop-blur-xl hover:shadow-xl transition-all"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold flex justify-between items-center text-start">
                {week.week}
                <Badge variant="secondary" className="ms-2">{week.lessons.length} {t("lessons")}</Badge>
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
                        <span>
                          {lesson.number}. {lesson.title}
                        </span>
                        <Badge
                          variant={
                            lesson.type === t("theory") ? "outline" : "secondary"
                          }
                        >
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
                      <p key={i}>
                        {a.title} [ {a.count} {t("assignments")} ]
                      </p>
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
                      <Badge key={i} variant="outline">
                        {kw}
                      </Badge>
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
