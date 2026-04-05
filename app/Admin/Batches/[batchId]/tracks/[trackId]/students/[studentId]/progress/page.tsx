"use client";

import { useGetStudentProgressQuery } from "@/app/redux/slices/ApiSlice";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  Trophy,
  Target,
  AlertCircle,
  ArrowLeft,
  TrendingUp,
  Mail,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function StudentProgressPage() {
  const t = useTranslations("StudentProgressAdmin");
  const params = useParams();
  const router = useRouter();

  const studentId = params.studentId as string;
  const trackId = params.trackId as string;
  const batchId = params.batchId as string;

  const { data, isLoading, isError } = useGetStudentProgressQuery({
    studentId,
    trackId,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">
          {t("loading")}
        </p>
      </div>
    );

  if (isError || !data || !data.data)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{t("noData")}</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm mx-auto">
          {t("notStarted")}
        </p>
        <Button onClick={() => router.back()} className="rounded-2xl px-12 h-14 font-black shadow-lg shadow-indigo-500/10 transition-transform active:scale-95">
          {t("back")}
        </Button>
      </div>
    );

  const { rank, averageScore, studentName, studentEmail, completionPercentage } = data.data;

  return (
    <div className="min-h-screen bg-slate-50/20 dark:bg-transparent pb-28 pt-8 px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-4">
            <Badge className="bg-indigo-500 text-white border-0 px-4 py-1 rounded-full font-black uppercase tracking-widest text-[10px]">
              {t("overallPerformance")}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              {studentName}
            </h1>
            <div className="flex items-center gap-2 text-slate-500 font-bold text-lg">
              <Mail className="w-5 h-5 text-indigo-500/50" />
              <span>{studentEmail}</span>
            </div>
          </div>
          <Button onClick={() => router.back()} variant="outline" className="rounded-2xl h-14 px-8 font-black border-2 gap-3 group transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
            <span>{t("back")}</span>
          </Button>
        </motion.div>
        {/* BENTO STATS GRID */}
        <div className="grid sm:grid-cols-2 gap-8">

          {/* Rank Card */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-2 border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 p-10 h-full flex items-center gap-8 shadow-sm transition-transform hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-[1.8rem] flex items-center justify-center border border-amber-500/10 shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t("rank")}</p>
                <p className="text-5xl font-black text-slate-900 dark:text-white leading-none">#{rank}</p>
              </div>
            </Card>
          </motion.div>

          {/* Score Card */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-[2.5rem] border-2 border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 p-10 h-full flex items-center gap-8 shadow-sm transition-transform hover:translate-y-[-5px]">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-[1.8rem] flex items-center justify-center border border-emerald-500/10 shadow-inner">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t("averageScore")}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-emerald-500 leading-none">{averageScore}%</p>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{t("averageScore")}</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
