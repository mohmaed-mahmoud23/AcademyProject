"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TopTrack {
  trackName: string;
  averageScore: number;
  studentCount: number;
}

interface AnalyticsChartsProps {
  tracks: TopTrack[];
  type: "popularity" | "performance" | "growth";
  trend?: { date: string; count: number }[];
}

const CustomTooltip = ({ active, payload, label }: unknown) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassy p-6 border border-border/40 shadow-2xl rounded-3xl backdrop-blur-3xl animate-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black text-muted-foreground uppercase mb-3 tracking-widest leading-none bg-white/5 px-2 py-1 rounded-full w-fit">
          {label}
        </p>
        <div className="space-y-3">
          {payload.map((entry: unknown, index: number) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: entry.color || entry.fill }} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{entry.name}</span>
                <span className="text-lg font-black text-foreground tabular-nums">
                  {entry.value.toLocaleString()}
                  {entry.name.toLowerCase().includes('score') || entry.name.toLowerCase().includes('velocity') ? '%' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function AnalyticsCharts({ tracks, type, trend = [] }: AnalyticsChartsProps) {
  const t = useTranslations("Analytics");

  const chartData = useMemo(() => {
    if (type === "popularity") {
      return [...tracks].sort((a, b) => b.studentCount - a.studentCount).map(t => ({ name: t.trackName, count: t.studentCount }));
    }
    if (type === "performance") {
      return [...tracks].sort((a, b) => b.averageScore - a.averageScore).map(t => ({ name: t.trackName, score: t.averageScore }));
    }
    if (type === "growth" && trend.length > 0) {
      return trend.map(t => ({ name: t.date, students: t.count }));
    }
    // Analytical fallback: Show track size comparison if growth history is missing
    return tracks.map(t => ({ name: t.trackName, capacity: t.studentCount * 1.2, occupied: t.studentCount }));
  }, [tracks, type, trend]);

  const config = {
    popularity: {
      title: t("trackPopularity"),
      icon: Users,
      color: "#3b82f6",
      key: "count",
      gradient: "from-blue-500 to-indigo-500"
    },
    performance: {
      title: t("batchPerformance"),
      icon: Activity,
      color: "#a855f7",
      key: "score",
      gradient: "from-purple-500 to-rose-500"
    },
    growth: {
      title: t("studentGrowth"),
      icon: PieChart,
      color: "#10b981",
      key: "occupied",
      gradient: "from-emerald-500 to-teal-500"
    }
  };

  const { title, icon: Icon, color, key } = config[type];

  return (
    <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700 h-full group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-2xl border transition-all duration-500 group-hover:scale-110 shadow-lg",
            type === 'popularity' ? "bg-blue-500/10 border-blue-500/20" :
              type === 'performance' ? "bg-purple-500/10 border-purple-500/20" :
                "bg-emerald-500/10 border-emerald-500/20"
          )}>
            <Icon size={22} style={{ color }} className="animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <CardTitle className="text-2xl font-black tracking-tight">{title}</CardTitle>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">{t("realTimeStream")}</p>
          </div>
        </div>
        <button className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/btn shadow-inner">
          <ArrowUpRight size={18} className="text-muted-foreground group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </CardHeader>

      <CardContent className="h-[350px] pr-4 relative">
        <div className="absolute top-0 left-12 right-12 h-px bg-white/5" />
        <ResponsiveContainer width="100%" height="100%">
          {type === "popularity" ? (
            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.5)", fontWeight: "bold" }}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey={key} radius={[0, 15, 15, 0]} barSize={24}>
                {chartData.map((_entry: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={`url(#gradient-${type})`} fillOpacity={0.9} />
                ))}
              </Bar>
              <defs>
                <linearGradient id={`gradient-popularity`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          ) : (
            <AreaChart data={chartData} margin={{ left: 0, right: 10, bottom: 0 }}>
              <defs>
                <linearGradient id={`color-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`stroke-${type}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor={type === 'performance' ? '#f43f5e' : '#2dd4bf'} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)", fontWeight: "bold" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={key}
                stroke={`url(#stroke-${type})`}
                strokeWidth={5}
                fillOpacity={1}
                fill={`url(#color-${type})`}
                animationDuration={2500}
              />
              {type === "growth" && !trend.length && (
                <Area
                  type="monotone"
                  dataKey="capacity"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                  animationDuration={2500}
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>

      {type === "growth" && trend.length === 0 && (
        <div className="px-6 pb-6 mt-4">
          <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-center">
            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-tighter">
              {t("realTimeStream")}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
