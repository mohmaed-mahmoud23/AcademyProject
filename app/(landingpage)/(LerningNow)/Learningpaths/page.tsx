"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Data moved inside component

import { useTranslations } from "next-intl";

export default function Learningpaths() {
  const t = useTranslations("LearningPathsPage");

  const paths = [
    {
      title: t("path1Title"),
      desc: t("path1Desc"),
      level: t("path1Level"),
      items: t.raw ? t.raw("path1Items") : [t("path1Items.0"), t("path1Items.1"), t("path1Items.2"), t("path1Items.3")],
    },
    {
      title: t("path2Title"),
      desc: t("path2Desc"),
      level: t("path2Level"),
      items: t.raw ? t.raw("path2Items") : [t("path2Items.0"), t("path2Items.1"), t("path2Items.2")],
    },
    {
      title: t("path3Title"),
      desc: t("path3Desc"),
      level: t("path3Level"),
      items: t.raw ? t.raw("path3Items") : [t("path3Items.0"), t("path3Items.1"), t("path3Items.2"), t("path3Items.3")],
    },
    {
      title: t("path4Title"),
      desc: t("path4Desc"),
      level: t("path4Level"),
      items: t.raw ? t.raw("path4Items") : [t("path4Items.0"), t("path4Items.1"), t("path4Items.2"), t("path4Items.3")],
    },
    {
      title: t("path5Title"),
      desc: t("path5Desc"),
      level: t("path5Level"),
      items: t.raw ? t.raw("path5Items") : [t("path5Items.0"), t("path5Items.1"), t("path5Items.2"), t("path5Items.3")],
    },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-muted/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    {path.title}
                  </CardTitle>
                  <Badge variant="secondary">{path.level}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {path.desc}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {path.items.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="text-sm bg-muted/50 px-3 py-1 rounded-md"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
