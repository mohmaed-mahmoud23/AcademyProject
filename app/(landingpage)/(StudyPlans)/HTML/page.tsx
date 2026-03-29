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

export default function HtmlStudyPlanReal() {
  const t = useTranslations("StudyPlan");
  const th = useTranslations("StudyPlanHTML");

  const htmlStudyPlanReal = [
    {
      week: th("week1"),
      lessons: [
        { number: 1, title: th("w1l1"), type: t("theory") },
        { number: 2, title: th("w1l2"), type: t("theory") },
        { number: 3, title: th("w1l3"), type: t("theory") },
        { number: 4, title: th("w1l4"), type: t("theory") },
        { number: 5, title: th("w1l5"), type: t("practical") },
      ],
      assignments: [{ title: th("w1a1"), count: 5 }],
      keywords: [
        "HTML5",
        "Doctype",
        "Head Tag",
        "Body Tag",
        "Paragraph",
        "Heading",
        "Attributes",
      ],
    },
    {
      week: th("week2"),
      lessons: [
        { number: 6, title: th("w2l1"), type: t("theory") },
        { number: 7, title: th("w2l2"), type: t("theory") },
        { number: 8, title: th("w2l3"), type: t("theory") },
        { number: 9, title: th("w2l4"), type: t("theory") },
        { number: 10, title: th("w2l5"), type: t("practical") },
      ],
      assignments: [{ title: th("w2a1"), count: 6 }],
      keywords: [
        "Anchor Tag",
        "Href Attribute",
        "Ordered List",
        "Unordered List",
        "Nested Lists",
        "Text Formatting",
      ],
    },
    {
      week: th("week3"),
      lessons: [
        { number: 11, title: th("w3l1"), type: t("theory") },
        { number: 12, title: th("w3l2"), type: t("theory") },
        { number: 13, title: th("w3l3"), type: t("theory") },
        { number: 14, title: th("w3l4"), type: t("theory") },
        { number: 15, title: th("w3l5"), type: t("practical") },
      ],
      assignments: [{ title: th("w3a1"), count: 7 }],
      keywords: [
        "Image Tag",
        "Video Tag",
        "Audio Tag",
        "Input Types",
        "Form Validation",
        "Submit Button",
        "Labels",
      ],
    },
  ];
  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {th("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Accordion for weeks */}
      <div className="max-w-5xl mx-auto space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {htmlStudyPlanReal.map((week, idx) => (
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
                {/* Lessons List */}
                <div className="mb-6 space-y-2">
                  {week.lessons.map((lesson) => (
                    <Card
                      key={lesson.number}
                      className="bg-background/30 hover:bg-background/50 transition-all rounded-xl overflow-hidden"
                    >
                      <CardContent className="flex justify-between items-center">
                        <span className="text-sm md:text-base font-medium">
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
