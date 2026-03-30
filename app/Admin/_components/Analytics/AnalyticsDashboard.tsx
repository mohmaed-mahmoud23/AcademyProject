"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGetAdminDashboardQuery, ApiSlice } from "@/app/redux/slices/ApiSlice";
import { useDispatch } from "react-redux";
import { startNotificationConnection } from "@/lib/signalr";
import { AnalyticsSkeleton } from "./Common/AnalyticsSkeleton";
import { AnalyticsErrorBoundary } from "./Common/AnalyticsErrorBoundary";
import { SectionCards } from "./SectionCards";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { TopStudentsLeaderboard } from "./TopStudentsLeaderboard";
import { SmartInsights } from "@/app/Admin/_components/Analytics/SmartInsights";
import { ActivityTimeline } from "./ActivityTimeline";
import { AnalyticsFilters } from "./AnalyticsFilters";
import { LayoutDashboard, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function AnalyticsDashboard() {
  const t = useTranslations("Analytics");
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetAdminDashboardQuery();

  // SignalR Real-time Integration
  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const connection = await startNotificationConnection();
        if (connection) {
          connection.on("StudentJoined", () => {
            dispatch(ApiSlice.util.invalidateTags(["Dashboard"]));
          });
          connection.on("AssignmentSubmitted", () => {
            dispatch(ApiSlice.util.invalidateTags(["Dashboard"]));
          });
          connection.on("BatchCreated", () => {
            dispatch(ApiSlice.util.invalidateTags(["Dashboard"]));
          });
        }
      } catch (err) {
        console.warn("SignalR Dashboard Connection Error:", err);
      }
    };
    setupSignalR();
  }, [dispatch]);

  const dashboardData = useMemo(() => {
    if (!data?.data) return null;
    return data.data;
  }, [data]);

  if (isLoading) return <AnalyticsSkeleton />;

  if (isError || !dashboardData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <AnalyticsErrorBoundary
          title={t("errorTitle")}
          description={t("errorDesc")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 🚀 Header & Global Controls */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 relative">
        <div className="space-y-3 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <LayoutDashboard size={22} className="text-blue-500 animate-pulse" />
            </div>
            <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{t("title")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]"
          >
            {t("headerTitle").split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 hover:from-purple-500 hover:to-blue-500 cursor-default transition-all duration-1000">
              {t("headerTitle").split(' ').slice(2).join(' ')}.
            </span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium tracking-tight opacity-80">{t("headerSubtitle")}</p>
        </div>


        {/* Dynamic Background Glow */}
        <div className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
      </header>

      {/* 📊 1. Hero Summary (SectionCards) */}
      <section className="relative z-10">
        <SectionCards data={dashboardData} />
      </section>

      {/* 🧩 2. Core Analytics Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">

        {/* Left Side: Deep Analytics & Leaders */}
        <div className="xl:col-span-8 space-y-12">

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalyticsErrorBoundary>
              <AnalyticsCharts tracks={dashboardData.topTracks} type="popularity" />
            </AnalyticsErrorBoundary>
            <AnalyticsErrorBoundary>
              <AnalyticsCharts tracks={dashboardData.topTracks} type="growth" />
            </AnalyticsErrorBoundary>
          </div>

          {/* Leaders Table */}
          <AnalyticsErrorBoundary>
            <TopStudentsLeaderboard students={dashboardData.topStudents} />
          </AnalyticsErrorBoundary>

        </div>

        {/* Right Side: Smart Context & Feed */}
        <div className="xl:col-span-4 space-y-12">

          {/* AI Insights */}
          <AnalyticsErrorBoundary>
            <SmartInsights data={dashboardData} />
          </AnalyticsErrorBoundary>

          {/* Real-time Activity Feed */}
          <AnalyticsErrorBoundary>
            <ActivityTimeline recentUsers={dashboardData.recentUsers} />
          </AnalyticsErrorBoundary>

        </div>

      </div>
    </div>
  );
}
