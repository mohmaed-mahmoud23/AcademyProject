"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Layers, ShieldCheck, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SectionCardsProps {
  data: {
    totalStudents: number;
    totalAdmins: number;
    totalTracks: number;
    totalBatches: number;
  };
}

export function SectionCards({ data }: SectionCardsProps) {
  const t = useTranslations("Analytics");

  const ratio = data.totalAdmins > 0 ? (data.totalStudents / data.totalAdmins).toFixed(1) : data.totalStudents;

  const stats = [
    {
      title: t("totalStudents"),
      value: data.totalStudents,
      icon: Users,
      color: "blue",
      analysis: t("syncComplete"),
    },
    {
      title: t("totalTracks"),
      value: data.totalTracks,
      icon: GraduationCap,
      color: "purple",
      analysis: t("academicSubjects"),
    },
    {
      title: t("totalBatches"),
      value: data.totalBatches,
      icon: Layers,
      color: "indigo",
      analysis: t("activeCohorts"),
    },
    {
      title: t("totalAdmins"),
      value: data.totalAdmins,
      icon: ShieldCheck,
      color: "emerald",
      analysis: t("managementTeam"),
    }
  ];

  const colorVariants: Record<string, string> = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="glassy border-border/40 overflow-hidden relative group hover:border-transparent transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</span>
              <div className={cn("p-2.5 rounded-2xl border transition-all duration-500 group-hover:scale-110", colorVariants[stat.color])}>
                <stat.icon size={18} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <div className="text-4xl font-black tracking-tight mb-2 flex items-baseline gap-1 tabular-nums">
                {stat.value.toLocaleString()}
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t("title").split(' ')[0]}
                </span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                        stat.color === 'blue' && "bg-blue-500 shadow-[0_0_8px_#3b82f6]",
                        stat.color === 'purple' && "bg-purple-500 shadow-[0_0_8px_#a855f7]",
                        stat.color === 'indigo' && "bg-indigo-500 shadow-[0_0_8px_#6366f1]",
                        stat.color === 'emerald' && "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                    )} />
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.analysis}</span>
                 </div>
                 <Activity size={12} className="text-muted-foreground opacity-20 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </CardContent>
            
            {/* Glossy Background Decoration */}
            <div className={cn(
              "absolute -bottom-16 -right-16 w-38 h-38 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none",
              stat.color === 'blue' && "bg-blue-500",
              stat.color === 'purple' && "bg-purple-500",
              stat.color === 'indigo' && "bg-indigo-500",
              stat.color === 'emerald' && "bg-emerald-500"
            )} />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
