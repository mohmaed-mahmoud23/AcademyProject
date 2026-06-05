"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Star, ChevronRight, Target, TrendingUp, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TopStudent {
  studentName?: string;
  email?: string;
  averageScore?: number;
  batchName?: string;
}

interface TopStudentsLeaderboardProps {
  students?: TopStudent[];
}

export function TopStudentsLeaderboard({ students = [] }: TopStudentsLeaderboardProps) {
  const t = useTranslations("Analytics");
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => (b.averageScore ?? 0) - (a.averageScore ?? 0)).slice(0, 10);
  }, [students]);

  const globalAverage = useMemo(() => {
    if (students.length === 0) return 0;
    return students.reduce((acc, s) => acc + (s.averageScore ?? 0), 0) / students.length;
  }, [students]);

  const getRankBadge = (index: number) => {
    if (index === 0) return <Medal className="text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]" size={28} />;
    if (index === 1) return <Medal className="text-slate-300 drop-shadow-[0_0_12px_rgba(203,213,225,0.6)]" size={28} />;
    if (index === 2) return <Medal className="text-amber-600 drop-shadow-[0_0_12px_rgba(217,119,6,0.6)]" size={28} />;
    return <span className="text-muted-foreground font-black text-[10px] w-12 text-center tabular-nums uppercase tracking-tighter">{t("rank")} <br /> {index + 1}</span>;
  };

  const getTier = (score: number) => {
    if (score >= 95) return { label: t("platinum"), color: "blue" };
    if (score >= 85) return { label: t("gold"), color: "yellow" };
    if (score >= 75) return { label: t("silver"), color: "slate" };
    return { label: t("competent"), color: "emerald" };
  };

  return (
    <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700 h-full">
      <CardHeader className="pb-8 border-b border-white/5 bg-white/[0.02]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-[1.25rem] bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <Trophy className="text-yellow-500" size={24} />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-2xl font-black tracking-tight">{t("academicElite")}</CardTitle>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                <Target size={10} className="text-blue-500" />
                {t("globalAvg")}: <span className="text-blue-500 tabular-nums">{globalAverage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 w-fit">
            <div className="flex flex-col items-center border-r border-white/10 pr-4">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">{t("totalStudents").split(' ').slice(-1)[0]}</span>
              <span className="text-lg font-black text-foreground tabular-nums">{students.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase text-emerald-500 tracking-tighter">{t("velocity")}</span>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px] p-6 space-y-3">
            <AnimatePresence>
              {sortedStudents.map((student, idx) => {
                const tier = getTier(student.averageScore ?? 0);
                return (
                  <motion.div
                    key={student.email}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.01, x: 10, transition: { duration: 0.2 } }}
                    className="group relative flex items-center gap-6 p-5 rounded-[1.75rem] transition-all duration-500 hover:bg-white/[0.04] border border-transparent hover:border-white/10 hover:shadow-2xl"
                  >
                    <div className="shrink-0 flex items-center justify-center w-10">
                      {getRankBadge(idx)}
                    </div>

                    <div className="relative shrink-0">
                      <Avatar className="h-14 w-14 border-2 border-border/40 group-hover:border-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-700">
                        <AvatarFallback className="font-black bg-gradient-to-br from-blue-500 to-indigo-600 text-white uppercase text-lg">
                          {student.studentName?.substring(0, 2) ?? '??'}
                        </AvatarFallback>
                      </Avatar>
                      {idx < 3 && (
                        <div className="absolute -top-1 -right-1 p-1 bg-background border border-border/40 rounded-full shadow-lg">
                          <Award className={cn("fill-current", tier.color === 'yellow' ? "text-yellow-400" : tier.color === 'blue' ? "text-blue-400" : "text-slate-400")} size={12} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 space-y-1">
                        <h4 className="font-black text-base text-foreground truncate leading-none group-hover:text-blue-400 transition-colors">{student.studentName}</h4>
                        <span className="text-[10px] text-muted-foreground font-bold tracking-tight block truncate opacity-70 group-hover:opacity-100 transition-opacity">{student.email}</span>
                      </div>

                      <div className="col-span-3">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{tier.label} {t("performanceTier").split(' ').slice(-1)[0]}</span>
                            <span className="text-[9px] font-black text-foreground">{student.averageScore ?? 0}%</span>
                          </div>
                          <Progress
                            value={student.averageScore ?? 0}
                            className={cn(
                              "h-2 bg-white/5 rounded-full overflow-hidden self-center",
                              tier.color === 'emerald' ? "[&>div]:bg-emerald-500" :
                                tier.color === 'yellow' ? "[&>div]:bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]" :
                                  tier.color === 'blue' ? "[&>div]:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" :
                                    "[&>div]:bg-slate-400"
                            )}
                          />
                        </div>
                      </div>

                      <div className="col-span-3 px-4">
                        <Badge variant="outline" className="w-full justify-center py-1.5 bg-white/5 border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all font-black text-[10px] tracking-tight uppercase">
                          {student.batchName}
                        </Badge>
                      </div>

                      {/* <div className="col-span-2 text-right">
                        <button className="p-2.5 rounded-2xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500 hover:bg-blue-500 hover:text-white hover:border-transparent cursor-pointer">
                          <ChevronRight size={16} className={t("activity") === "نشاط" ? "rotate-180" : ""} />
                        </button>
                      </div> */}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 pt-0 mt-4">
          <button className="group/all w-full py-4 rounded-[2rem] bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-blue-500 hover:text-white hover:border-transparent transition-all duration-700 shadow-lg relative overflow-hidden">
            <span className="relative z-10">{t("expandReport")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover/all:translate-y-0 transition-transform duration-700" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
