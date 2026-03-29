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

export default function SASSStudyPlan() {
  const t = useTranslations("StudyPlan");
  const ts = useTranslations("StudyPlanSASS");

  const sassStudyPlan = [
    {
      week: ts("week1"),
      lessons: [
        { number: 1, title: ts("w1l1"), type: t("theory") },
        { number: 2, title: ts("w1l2"), type: t("theory") },
        { number: 3, title: ts("w1l3"), type: t("practical") },
        { number: 4, title: ts("w1l4"), type: t("practical") },
      ],
      assignments: [{ title: ts("w1a1"), count: 4 }],
      keywords: ["SASS", "Preprocessor", "SCSS", "CSS Compilation", "Variables"],
    },
    {
      week: ts("week2"),
      lessons: [
        { number: 5, title: ts("w2l1"), type: t("theory") },
        { number: 6, title: ts("w2l2"), type: t("theory") },
        { number: 7, title: ts("w2l3"), type: t("theory") },
        { number: 8, title: ts("w2l4"), type: t("practical") },
      ],
      assignments: [{ title: ts("w2a1"), count: 6 }],
      keywords: [
        "$variable",
        "Nesting",
        "& Selector",
        "Code Reusability",
        "SCSS Syntax",
      ],
    },
    {
      week: ts("week3"),
      lessons: [
        { number: 9, title: ts("w3l1"), type: t("theory") },
        { number: 10, title: ts("w3l2"), type: t("theory") },
        { number: 11, title: ts("w3l3"), type: t("theory") },
        { number: 12, title: ts("w3l4"), type: t("practical") },
      ],
      assignments: [{ title: ts("w3a1"), count: 7 }],
      keywords: [
        "@mixin",
        "@include",
        "Reusable Styles",
        "Functions",
        "Parameters",
      ],
    },
    {
      week: ts("week4"),
      lessons: [
        { number: 13, title: ts("w4l1"), type: t("theory") },
        { number: 14, title: ts("w4l2"), type: t("theory") },
        { number: 15, title: ts("w4l3"), type: t("practical") },
      ],
      assignments: [{ title: ts("w4a1"), count: 5 }],
      keywords: ["Partials", "_file.scss", "@use", "@import", "File Structure"],
    },
    {
      week: ts("week5"),
      lessons: [
        { number: 16, title: ts("w5l1"), type: t("theory") },
        { number: 17, title: ts("w5l2"), type: t("theory") },
        { number: 18, title: ts("w5l3"), type: t("theory") },
        { number: 19, title: ts("w5l4"), type: t("practical") },
      ],
      assignments: [{ title: ts("w5a1"), count: 8 }],
      keywords: ["@for", "@each", "@if", "Maps", "Logic in CSS", "Automation"],
    },
  ];
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {ts("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {ts("desc")}
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {sassStudyPlan.map((week, idx) => (
            <AccordionItem
              key={idx}
              value={`week-${idx}`}
              className="border border-border/50 rounded-xl bg-card/70 backdrop-blur-xl hover:shadow-lg transition-all"
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
