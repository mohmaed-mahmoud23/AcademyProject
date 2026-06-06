"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Trophy,
  Calendar,
  GraduationCap,
  Star,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { StatCard } from "./StatCard";
import { ProfileCard } from "./ProfileCard";
import { ChartCard } from "./ChartCard";
import { useTranslations } from "next-intl";
import { useGetMeQuery } from "@/app/redux/slices/ApiSlice";

interface DashboardData {
  enrolledTracksCount: number;
  completedAssignments: number;
  averageGrade: number;
  upcomingDeadlines: Array<{
    assignmentTitle: string;
    courseName: string;
    dueDate: string;
  }>;
  recentGrades: Array<{
    assignmentTitle: string;
    grade: number;
    feedback: string;
  }>;
}

interface ModernStudentDashboardProps {
  data: DashboardData;
}

export function ModernStudentDashboard({ data }: ModernStudentDashboardProps) {
  const t = useTranslations("StudentDashboard");
  const { data: userData, isLoading: userLoading } = useGetMeQuery();

  const stats = [
    {
      title: t("enrolledTracks"),
      value: data.enrolledTracksCount,
      icon: GraduationCap,
      color: "blue"
    },
    {
      title: t("completedAssignments"),
      value: data.completedAssignments,
      icon: CheckCircle,
      color: "green"
    },
    {
      title: t("averageGrade"),
      value: `${data.averageGrade}%`,
      icon: Trophy,
      color: "yellow"
    },
  ];

  const chartData = data.recentGrades.map(g => ({
    name: g.assignmentTitle.substring(0, 10),
    value: g.grade
  })).slice(0, 7);

  const radialData = [
    { name: t("average"), value: data.averageGrade, fill: "#3b82f6" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-1 flex">
          {userLoading ? (
            <div className="w-full bg-card rounded-[2.5rem] p-8 border border-border/50 animate-pulse flex flex-col items-center space-y-4">
              <div className="w-28 h-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ) : (
            <ProfileCard
              name={userData?.fullName || t("student")}
              email={userData?.email || ""}
              roles={userData?.roles || [t("student")]}
              avatarUrl={userData?.profileImageUrl ?? undefined}
              phoneNumber={userData?.phoneNumber ?? undefined}
            />
          )}
        </div>
        <div className="lg:col-span-2 glassy rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-xl flex flex-col justify-center relative overflow-hidden group transition-all duration-300 bg-white dark:bg-slate-900/80">
          <div className="absolute -end-20 -bottom-20 w-80 h-80 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{t("studentPortal")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              {t("title")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {t("levelUp")}
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg max-w-xl leading-relaxed">
              {t("subtitle")}. {t("youCompleted")} <span className="text-foreground font-bold">{data.completedAssignments}</span> {t("keepPushing")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color as "blue" | "green" | "yellow"} delay={idx * 0.1} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartCard
            title={t("recentGrades")}
            type="bar"
            data={chartData.length > 0 ? chartData : [{ name: t("start"), value: 0 }]}
            delay={0.6}
          />
        </div>
        <div>
          <ChartCard
            title={t("averageGrade")}
            type="radial"
            data={radialData}
            delay={0.7}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card rounded-[2.5rem] p-8 shadow-sm border border-border/50 dark:border-slate-800 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              {t("upcomingDeadlines")}
            </h3>
            <span className="text-xs font-bold text-muted-foreground uppercase">{t("pending", { count: data.upcomingDeadlines.length })}</span>
          </div>
          <div className="space-y-4">
            {data.upcomingDeadlines.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl">
                <p className="text-muted-foreground text-sm italic">{t("noDeadlines")}</p>
              </div>
            ) : (
              data.upcomingDeadlines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 border border-transparent hover:border-border hover:shadow-md group">
                  <div className="flex gap-5 items-center">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      <Clock size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-1">{item.assignmentTitle}</h4>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.courseName}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                      {new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase">{t("dueDate")}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-card rounded-[2.5rem] p-8 shadow-sm border border-border/50 dark:border-slate-800 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <MessageSquare size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              {t("feedback")}
            </h3>
          </div>
          <div className="space-y-4">
            {data.recentGrades.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl">
                <p className="text-muted-foreground text-sm italic">{t("noGrades")}</p>
              </div>
            ) : (
              data.recentGrades.map((grade, idx) => (
                <div key={idx} className="p-6 rounded-3xl border border-border/40 bg-slate-50/50 dark:bg-slate-900/30 space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                        <Star size={16} className="text-yellow-600 fill-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{grade.assignmentTitle}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-black">{t("grade")}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-green-600 dark:text-green-400">
                        {grade.grade}%
                      </span>
                    </div>
                  </div>
                  {grade.feedback && (
                    <div className="relative">
                      <div className="absolute start-0 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/50 rounded-full" />
                      <p className="text-sm text-muted-foreground leading-relaxed ps-4 italic">
                        &quot;{grade.feedback}&quot;
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
