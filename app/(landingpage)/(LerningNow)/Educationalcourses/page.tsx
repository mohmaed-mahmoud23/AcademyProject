"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Data moved inside component

import { useTranslations } from "next-intl";

export default function LearningPathsUpdated() {
  const t = useTranslations("EducationalCoursesPage");

  const courses = [
    {
      title: t("course1"),
      status: t("statusInProgress"),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      title: t("course2"),
      status: t("statusOpen"),
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19",
    },
    {
      title: t("course3"),
      status: t("statusInProgress"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      title: t("course4"),
      status: t("statusCompleted"),
      image: "https://images.unsplash.com/photo-1522202224011-723e0d6e4f69",
    },
    {
      title: t("course5"),
      status: t("statusCompleted"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >

            <Card className="overflow-hidden border border-border/50 bg-card/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">

              {/* Image */}
              <div className="relative group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
              </div>

              {/* Header */}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {course.title}
                  </CardTitle>

                  <Badge
                    className={
                      course.status === t("statusCompleted")
                        ? "bg-green-500 text-white"
                        : course.status === t("statusInProgress")
                          ? "bg-blue-500 text-white"
                          : "bg-orange-500 text-white"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("startLearning")}
                </p>
              </CardContent>

            </Card>
          </motion.div>
        ))}

      </div>
    </section>
  );
}