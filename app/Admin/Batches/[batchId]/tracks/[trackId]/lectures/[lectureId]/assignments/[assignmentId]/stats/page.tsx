"use client";

import { useGetAssignmentStatsQuery } from "@/app/redux/slices/ApiSlice";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Target, 
  TrendingUp, 
  BarChart4, 
  ArrowUpRight,
  Info
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function AssignmentStatsPage() {
  const t = useTranslations("AdminAssignmentStatsPage");
  const { assignmentId } = useParams() as { assignmentId: string };
  const { data, isLoading, isError } = useGetAssignmentStatsQuery(assignmentId);

  const stats = useMemo(() => data?.data || null, [data]);

  const completionRate = useMemo(() => {
    if (!stats || !stats.totalStudents || stats.totalStudents === 0) return 0;
    const rate = (stats.submittedCount || 0) / stats.totalStudents;
    return Math.min(100, Math.round(rate * 100));
  }, [stats]);

  const insights = useMemo(() => {
    if (!stats || !stats.totalStudents) return [];
    const list = [];
    if (completionRate >= 80) list.push(t("excellentPerformance"));
    if ((stats.notSubmittedCount || 0) > stats.totalStudents * 0.3) list.push(t("needsAttention"));
    if ((stats.submittedCount || 0) > stats.totalStudents * 0.5 && (stats.averageScore || 0) > 70) list.push(t("mostPassed"));
    return list;
  }, [stats, completionRate, t]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-8 max-w-7xl mx-auto animate-pulse">
        <Skeleton className="h-10 w-1/3 rounded-xl mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
        </div>
        <Skeleton className="h-64 rounded-3xl w-full" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-rose-500/10 p-4 rounded-full">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-rose-500">{t("noData")}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-2">
          <BarChart4 className="w-3 h-3" /> {t("title")}
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
          Comprehensive overview of student performance and submission engagement for this assignment.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title={t("totalStudents")} 
          value={stats.totalStudents} 
          icon={<Users className="w-6 h-6 text-blue-500" />} 
          color="blue"
        />
        <MetricCard 
          title={t("submittedCount")} 
          value={stats.submittedCount} 
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />} 
          color="emerald"
          badge={`${completionRate}%`}
        />
        <MetricCard 
          title={t("notSubmittedCount")} 
          value={stats.notSubmittedCount} 
          icon={<AlertCircle className="w-6 h-6 text-rose-500" />} 
          color="rose"
        />
        <MetricCard 
          title={t("averageScore")} 
          value={`${Math.round(stats.averageScore || 0)}%`} 
          icon={<Trophy className="w-6 h-6 text-amber-500" />} 
          color="amber"
          desc="Overall Class Average"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Progress & Detailed Stats column */}
        <div className="lg:col-span-12 space-y-8">
          <Card className="rounded-3xl border-0 shadow-lg shadow-black/5 bg-card/60 backdrop-blur-xl overflow-hidden">
            <CardHeader className="pb-0 border-0">
               <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> {t("completionRate")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-muted/30" strokeWidth="12" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                    <circle className="text-primary transition-all duration-1000 ease-out" strokeWidth="12" strokeDasharray={2 * Math.PI * 80} strokeDashoffset={2 * Math.PI * 80 * (1 - completionRate / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-black leading-none">{completionRate}%</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">{t("submittedCount")}</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-6">
                  <div className="p-6 rounded-[2rem] bg-muted/40 border border-border/40 shadow-inner flex flex-col gap-4">
                    <div className="flex justify-between items-center px-2">
                       <span className="text-xs font-black text-muted-foreground uppercase opacity-40">{t("completionRate")}</span>
                       <span className="text-sm font-black text-primary">{stats.submittedCount} / {stats.totalStudents}</span>
                    </div>
                    <Progress value={completionRate} className="h-4 rounded-full shadow-inner" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t("averageScore")}</p>
                        <p className="text-2xl font-black text-primary">{Math.round(stats.averageScore || 0)}%</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{t("notSubmittedCount")}</p>
                        <p className="text-2xl font-black text-rose-500">{stats.notSubmittedCount}</p>
                     </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights Grid */}
          <div className="bg-card/30 rounded-3xl border border-border/40 p-1">
             <div className="p-4 border-b border-border/40 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">{t("insights")}</h3>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.length > 0 ? (
                  insights.map((insight, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-border/20 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Info className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold leading-relaxed">{insight}</p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center py-4 text-muted-foreground font-medium italic">No specific engagement trends detected for this current data set.</p>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, desc, badge }: unknown) {
  const bgMap: unknown = {
    blue: "bg-blue-500/10",
    emerald: "bg-emerald-500/10",
    rose: "bg-rose-500/10",
    amber: "bg-amber-500/10"
  };
  
  return (
    <Card className="rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-card/60 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgMap[color] || "bg-primary/10"} rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black tracking-tight">{value}</p>
                {badge && (
                  <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> {badge}
                  </div>
                )}
              </div>
            </div>
            {desc && <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">{desc}</p>}
          </div>
          <div className={`${bgMap[color] || "bg-primary/10"} p-3 rounded-2xl`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
