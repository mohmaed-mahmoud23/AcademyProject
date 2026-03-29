"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  BookOpen,
  CheckCircle,
  Trophy,
  CalendarClock,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import { useTranslations } from "next-intl";
import { useGetStudentDashboardQuery } from "@/app/redux/slices/ApiSlice";

export default function StudentDashboard() {
  const { data, isLoading, error } = useGetStudentDashboardQuery();
  const t = useTranslations("StudentDashboard");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="space-y-3 text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );

  if (error || !data?.data)
    return (
      <div className="text-center text-red-500 font-medium">
        {t("error")}
      </div>
    );

  const dashboard = data.data;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="space-y-8 p-6">
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>

        <p className="text-muted-foreground">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* ================= STATS ================= */}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Tracks */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.04 }}
        >
          <Card className="relative overflow-hidden border hover:shadow-2xl transition">
            <div className="absolute end-0 top-0 h-full w-1 bg-blue-500" />

            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("enrolledTracks")}
              </CardTitle>

              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookOpen className="text-blue-500" size={18} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-4xl font-bold">
                {dashboard.enrolledTracksCount}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completed */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.04 }}
        >
          <Card className="relative overflow-hidden hover:shadow-2xl transition">
            <div className="absolute end-0 top-0 h-full w-1 bg-green-500" />

            <CardHeader className="flex justify-between flex-row items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("completedAssignments")}
              </CardTitle>

              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="text-green-500" size={18} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-4xl font-bold">
                {dashboard.completedAssignments}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Average */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.04 }}
        >
          <Card className="relative overflow-hidden hover:shadow-2xl transition">
            <div className="absolute end-0 top-0 h-full w-1 bg-yellow-500" />

            <CardHeader className="flex justify-between flex-row items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("averageGrade")}
              </CardTitle>

              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Trophy className="text-yellow-500" size={18} />
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="text-4xl font-bold">
                {dashboard.averageGrade}%
              </div>

              <Progress value={dashboard.averageGrade} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ================= UPCOMING ================= */}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarClock size={18} />
              {t("upcomingDeadlines")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboard.upcomingDeadlines.length === 0 ? (
              <p className="text-muted-foreground">{t("noDeadlines")}</p>
            ) : (
              <Accordion type="single" collapsible>
                {dashboard.upcomingDeadlines.map((item, index) => (
                  <AccordionItem key={index} value={String(index)}>
                    <AccordionTrigger>{item.assignmentTitle}</AccordionTrigger>

                    <AccordionContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("course")}</span>

                        <Badge>{item.courseName}</Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("due")}</span>

                        <span>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ================= GRADES ================= */}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center text-lg">
              <Star size={18} />
              {t("recentGrades")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboard.recentGrades.length === 0 ? (
              <p className="text-muted-foreground">{t("noGrades")}</p>
            ) : (
              <Accordion type="single" collapsible>
                {dashboard.recentGrades.map((grade, index) => (
                  <AccordionItem key={index} value={String(index)}>
                    <AccordionTrigger>{grade.assignmentTitle}</AccordionTrigger>

                    <AccordionContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>{t("grade")}</span>

                        <Badge className="bg-green-500">{grade.grade}%</Badge>
                      </div>

                      <Progress value={grade.grade} />

                      <div>
                        <span className="text-muted-foreground">{t("feedback")}</span>

                        <p className="mt-1 text-sm">{grade.feedback}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
