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

export default function Cplus() {
  const t = useTranslations("StudyPlan");
  const tc = useTranslations("StudyPlanCplus");

  const cppStudyPlan = [
    {
      week: tc("week1"),
      lessons: [
        { number: 1, title: tc("w1l1"), type: t("theory") },
        { number: 2, title: tc("w1l2"), type: t("practical") },
        { number: 3, title: tc("w1l3"), type: t("theory") },
        { number: 4, title: tc("w1l4"), type: t("practical") },
        { number: 5, title: tc("w1l5"), type: t("theory") },
      ],
      assignments: [{ title: tc("w1a1"), count: 10 }],
      keywords: ["C++", "Variables", "Input", "Output", "Data Types"],
    },
    {
      week: tc("week2"),
      lessons: [
        { number: 6, title: tc("w2l1"), type: t("theory") },
        { number: 7, title: tc("w2l2"), type: t("theory") },
        { number: 8, title: tc("w2l3"), type: t("theory") },
        { number: 9, title: tc("w2l4"), type: t("practical") },
        { number: 10, title: tc("w2l5"), type: t("practical") },
      ],
      assignments: [{ title: tc("w2a1"), count: 12 }],
      keywords: ["Loops", "Conditions", "Logic", "Iteration"],
    },
    {
      week: tc("week3"),
      lessons: [
        { number: 11, title: tc("w3l1"), type: t("theory") },
        { number: 12, title: tc("w3l2"), type: t("theory") },
        { number: 13, title: tc("w3l3"), type: t("theory") },
        { number: 14, title: tc("w3l4"), type: t("theory") },
        { number: 15, title: tc("w3l5"), type: t("practical") },
      ],
      assignments: [{ title: tc("w3a1"), count: 14 }],
      keywords: ["Functions", "Arrays", "Pointers", "Memory"],
    },
    {
      week: tc("week4"),
      lessons: [
        { number: 16, title: tc("w4l1"), type: t("theory") },
        { number: 17, title: tc("w4l2"), type: t("theory") },
        { number: 18, title: tc("w4l3"), type: t("theory") },
        { number: 19, title: tc("w4l4"), type: t("theory") },
        { number: 20, title: tc("w4l5"), type: t("practical") },
      ],
      assignments: [{ title: tc("w4a1"), count: 15 }],
      keywords: ["OOP", "Classes", "Inheritance", "Encapsulation"],
    },
    {
      week: tc("week5"),
      lessons: [
        { number: 21, title: tc("w5l1"), type: t("theory") },
        { number: 22, title: tc("w5l2"), type: t("practical") },
        { number: 23, title: tc("w5l3"), type: t("theory") },
        { number: 24, title: tc("w5l4"), type: t("theory") },
        { number: 25, title: tc("w5l5"), type: t("practical") },
      ],
      assignments: [{ title: tc("w5a1"), count: 16 }],
      keywords: ["Files", "Modules", "Errors", "IO", "Libraries"],
    },
    {
      week: tc("week6"),
      lessons: [
        { number: 26, title: tc("w6l1"), type: t("theory") },
        { number: 27, title: tc("w6l2"), type: t("practical") },
        { number: 28, title: tc("w6l3"), type: t("theory") },
        { number: 29, title: tc("w6l4"), type: t("practical") },
        { number: 30, title: tc("w6l5"), type: t("practical") },
      ],
      assignments: [{ title: tc("w6a1"), count: 20 }],
      keywords: ["Algorithms", "Data Structures", "STL", "Projects"],
    },
  ];
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {tc("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {tc("desc")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {cppStudyPlan.map((week: unknown, idx: number) => (
            <AccordionItem key={idx} value={`week-${idx}`} className="border border-border/50 rounded-xl bg-card/70 backdrop-blur-xl hover:shadow-xl transition-all">
              <AccordionTrigger className="px-6 py-4 font-semibold flex justify-between items-center text-start">
                {week.week}
                <Badge variant="secondary" className="ms-2">{week.lessons.length} {t("lessons")}</Badge>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="space-y-2 mb-6">
                  {week.lessons.map((lesson: unknown) => (
                    <Card key={lesson.number} className="bg-background/30 hover:bg-background/50 transition-all rounded-xl">
                      <CardContent className="flex justify-between items-center">
                        <span className="text-sm md:text-base font-medium font-medium">{lesson.title}</span>
                        <Badge variant={lesson.type === t("theory") ? "outline" : "secondary"}>
                          {lesson.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mb-4 bg-background/20 rounded-xl">
                  <CardHeader>
                    <CardTitle>{t("assignments")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {week.assignments.map((a: unknown, i: number) => (
                      <p key={i}>
                        {a.title} ({a.count} {t("assignments")})
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-background/10 rounded-xl">
                  <CardHeader>
                    <CardTitle>{t("keywords")}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {week.keywords.map((k: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {k}
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
