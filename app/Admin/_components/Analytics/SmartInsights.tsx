"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  ArrowRight,
  BarChart2,
  Trophy,
  Users,
  ShieldCheck,
  Activity,
  Target
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { DashboardData } from "@/app/interfaces";

interface SmartInsightsProps {
  data: DashboardData;
}

export function SmartInsights({ data }: SmartInsightsProps) {
  const t = useTranslations("Analytics");

  const insights = useMemo(() => {
    const results = [];

    // 1. Top Track Insight (Performance Analysis)
    if (data.topTracks && data.topTracks.length > 0) {
      const topTrack = [...data.topTracks].sort((a, b) => b.averageScore - a.averageScore)[0];
      results.push({
        id: "top-track",
        title: t("batchPerformance"),
        description: `${topTrack.trackName} ${t("performanceBenchmark")} (${topTrack.averageScore.toFixed(1)}%).`,
        type: "success",
        icon: Activity,
        color: "emerald",
        metric: `${topTrack.averageScore.toFixed(1)}%`,
        action: t("viewAll"),
      });
    }

    // 2. Resource Management Analysis
    if (data.totalAdmins > 0) {
      const ratio = (data.totalStudents / data.totalAdmins).toFixed(1);
      results.push({
        id: "ratio",
        title: t("totalAdmins"),
        description: t("ratioAnalysis", { ratio }),
        type: "info",
        icon: ShieldCheck,
        color: "blue",
        metric: `${ratio}:1`,
        action: t("viewAll"),
      });
    }

    // 3. Top Student (Leadership Analysis)
    if (data.topStudents && data.topStudents.length > 0) {
      const topStudent = data.topStudents[0];
      results.push({
        id: "top-performer",
        title: t("smartInsights"),
        description: `${topStudent.studentName} (${topStudent.batchName}) ${t("performanceBenchmark")}.`,
        type: "suggestion",
        icon: Trophy,
        color: "amber",
        metric: t("viewAll").split(' ')[0],
        action: t("viewAll"),
      });
    }

    // 4. Enrollment Analysis
    if (data.topTracks && data.topTracks.length > 0) {
      const mostPopular = [...data.topTracks].sort((a, b) => b.studentCount - a.studentCount)[0];
      results.push({
        id: "popularity",
        title: t("trackPopularity"),
        description: t("enrollDensity", { count: mostPopular.studentCount }),
        type: "info",
        icon: Users,
        color: "indigo",
        metric: `${mostPopular.studentCount}`,
        action: t("viewAll"),
      });
    }

    return results;
  }, [data, t]);

  const colorConfig: Record<string, string> = {
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  };

  return (
    <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700 h-full flex flex-col">
      <CardHeader className="pb-4 sm:pb-8 bg-gradient-to-br from-purple-500/5 to-transparent border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)] animate-pulse">
              <Sparkles className="text-purple-500" size={24} />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-2xl font-black tracking-tight">{t("smartInsights")}</CardTitle>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">{t("realTimeStream")}</p>
            </div>
          </div>
          <BarChart2 className="text-muted-foreground opacity-20" size={20} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-8 flex-1">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className={cn(
              "p-6 rounded-[2.25rem] border transition-all duration-700 relative overflow-hidden",
              "bg-white/[0.03] border-white/5 group-hover:border-transparent group-hover:bg-white/[0.05] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]",
            )}>
              {/* Strategic Accent Line */}
              <div className={cn(
                "absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full transition-all duration-500 group-hover:h-1/2 opacity-50",
                insight.color === 'rose' && "bg-rose-500 shadow-[0_0_10px_#f43f5e]",
                insight.color === 'emerald' && "bg-emerald-500 shadow-[0_0_10px_#10b981]",
                insight.color === 'blue' && "bg-blue-500 shadow-[0_0_10px_#3b82f6]",
                insight.color === 'amber' && "bg-yellow-500 shadow-[0_0_10px_#eab308]",
                insight.color === 'indigo' && "bg-indigo-500 shadow-[0_0_10px_#6366f1]"
              )} />

              <div className="flex gap-5 relative z-10">
                <div className={cn("shrink-0 p-4 rounded-[1.25rem] h-fit transition-transform duration-500 group-hover:scale-110 shadow-lg", colorConfig[insight.color])}>
                  <insight.icon size={22} />
                </div>

                <div className="space-y-2 pr-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[11px] font-black text-foreground uppercase tracking-[0.15em] leading-none">{insight.title}</h5>
                    <span className={cn("text-[10px] font-black tabular-nums transition-colors",
                      insight.color === 'emerald' ? "text-emerald-500" :
                        insight.color === 'blue' ? "text-blue-500" : "text-muted-foreground"
                    )}>{insight.metric}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground/80 font-medium h-[40px] line-clamp-2">
                    {insight.description}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <button className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      {insight.action} <ArrowRight size={12} className="animate-in slide-in-from-left-2" />
                    </button>
                    <div className={cn("w-1.5 h-1.5 rounded-full",
                      insight.type === "warning" ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]" :
                        insight.type === "success" ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" :
                          "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                    )} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="pt-8 px-2 mt-auto">
          <div className="group/btn p-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent border border-indigo-500/20 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-indigo-500/40">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-2xl group-hover/btn:rotate-12 transition-transform">
                  <Target className="text-indigo-300" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white uppercase tracking-widest leading-tight">{t("strategicView")}</span>
                  <span className="text-[9px] text-indigo-300 font-bold uppercase tracking-tight">{t("proAnalytics")}</span>
                </div>
              </div>
              <ArrowRight size={20} className="text-indigo-400 group-hover/btn:translate-x-2 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000 blur-3xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
