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

export default function PythonStudyPlan() {
  const t = useTranslations("StudyPlan");
  const tp = useTranslations("StudyPlanPython");

  const pythonStudyPlan = [
    {
      week: tp("week1"),
      lessons: [
        { number: 1, title: tp("w1l1"), type: t("theory") },
        { number: 2, title: tp("w1l2"), type: t("practical") },
        { number: 3, title: tp("w1l3"), type: t("theory") },
        { number: 4, title: tp("w1l4"), type: t("practical") },
        { number: 5, title: tp("w1l5"), type: t("theory") },
      ],
      assignments: [{ title: tp("w1a1"), count: 10 }],
      keywords: ["Python", "Variables", "Input", "Output", "Data Types"],
    },
    {
      week: tp("week2"),
      lessons: [
        { number: 6, title: tp("w2l1"), type: t("theory") },
        { number: 7, title: tp("w2l2"), type: t("theory") },
        { number: 8, title: tp("w2l3"), type: t("theory") },
        { number: 9, title: tp("w2l4"), type: t("practical") },
        { number: 10, title: tp("w2l5"), type: t("practical") },
      ],
      assignments: [{ title: tp("w2a1"), count: 12 }],
      keywords: ["Loops", "Conditions", "Logic", "Iteration"],
    },
    {
      week: tp("week3"),
      lessons: [
        { number: 11, title: tp("w3l1"), type: t("theory") },
        { number: 12, title: tp("w3l2"), type: t("theory") },
        { number: 13, title: tp("w3l3"), type: t("theory") },
        { number: 14, title: tp("w3l4"), type: t("theory") },
        { number: 15, title: tp("w3l5"), type: t("practical") },
      ],
      assignments: [{ title: tp("w3a1"), count: 14 }],
      keywords: ["Functions", "Lists", "Dict", "Tuples", "Sets"],
    },
    {
      week: tp("week4"),
      lessons: [
        { number: 16, title: tp("w4l1"), type: t("theory") },
        { number: 17, title: tp("w4l2"), type: t("theory") },
        { number: 18, title: tp("w4l3"), type: t("theory") },
        { number: 19, title: tp("w4l4"), type: t("theory") },
        { number: 20, title: tp("w4l5"), type: t("practical") },
      ],
      assignments: [{ title: tp("w4a1"), count: 15 }],
      keywords: ["OOP", "Classes", "Inheritance", "Encapsulation"],
    },
    {
      week: tp("week5"),
      lessons: [
        { number: 21, title: tp("w5l1"), type: t("theory") },
        { number: 22, title: tp("w5l2"), type: t("practical") },
        { number: 23, title: tp("w5l3"), type: t("theory") },
        { number: 24, title: tp("w5l4"), type: t("theory") },
        { number: 25, title: tp("w5l5"), type: t("practical") },
      ],
      assignments: [{ title: tp("w5a1"), count: 16 }],
      keywords: ["Files", "Modules", "Errors", "IO", "Libraries"],
    },
    {
      week: tp("week6"),
      lessons: [
        { number: 26, title: tp("w6l1"), type: t("theory") },
        { number: 27, title: tp("w6l2"), type: t("practical") },
        { number: 28, title: tp("w6l3"), type: t("theory") },
        { number: 29, title: tp("w6l4"), type: t("practical") },
        { number: 30, title: tp("w6l5"), type: t("practical") },
      ],
      assignments: [{ title: tp("w6a1"), count: 20 }],
      keywords: ["API", "Requests", "JSON", "Automation", "Projects"],
    },
  ];
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">{tp("title")}</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {tp("desc")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {pythonStudyPlan.map((week, idx) => (
            <AccordionItem key={idx} value={`week-${idx}`} className="border border-border/50 rounded-xl bg-card/70 backdrop-blur-xl hover:shadow-xl transition-all">
              <AccordionTrigger className="px-6 py-4 font-semibold flex justify-between items-center text-start">
                {week.week}
                <Badge variant="secondary" className="ms-2">{week.lessons.length} {t("lessons")}</Badge>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="space-y-2 mb-6">
                  {week.lessons.map((lesson) => (
                    <Card key={lesson.number} className="bg-background/30 hover:bg-background/50 transition-all rounded-xl">
                      <CardContent className="flex justify-between items-center">
                        <span className="text-sm md:text-base font-medium">{lesson.title}</span>
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
                    {week.assignments.map((a, i) => (
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
                    {week.keywords.map((k, i) => (
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
