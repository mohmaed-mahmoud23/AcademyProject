"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  PieChart as PieChartIcon, 
  Activity,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedChartsProps {
  type: "growth" | "popularity" | "performance" | "dropoff";
  data: unknown;
}

const CustomTooltip = ({ active, payload, label }: unknown) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassy p-4 border border-border/40 shadow-2xl rounded-2xl backdrop-blur-3xl">
        <p className="text-xs font-bold text-muted-foreground uppercase mb-2 tracking-widest">{label}</p>
        {payload.map((entry: unknown, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <p className="text-sm font-black text-foreground">
              {entry.name}: <span className="text-blue-500">{entry.value.toLocaleString()}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AdvancedCharts({ type, data }: AdvancedChartsProps) {
  const t = useTranslations("Analytics");

  const chartInfo = {
    growth: {
      title: t("studentGrowth"),
      icon: TrendingUp,
      color: "#3b82f6",
    },
    popularity: {
      title: t("trackPopularity"),
      icon: BarChart3,
      color: "#a855f7",
    },
    performance: {
      title: t("batchPerformance"),
      icon: Activity,
      color: "#10b981",
    },
    dropoff: {
      title: t("dropOffRate"),
      icon: PieChartIcon,
      color: "#f59e0b",
    },
  };

  const { title, icon: Icon, color } = chartInfo[type];

  // Mock data generators for visual representation of the analytics
  const processedData = useMemo(() => {
    switch (type) {
      case "growth":
        return [
          { name: "Jan", students: 120, active: 80 },
          { name: "Feb", students: 210, active: 150 },
          { name: "Mar", students: 450, active: 310 },
          { name: "Apr", students: 780, active: 520 },
          { name: "May", students: 1100, active: 890 },
          { name: "Jun", students: 1450, active: 1100 },
          { name: "Jul", students: 1890, active: 1450 },
        ];
      case "popularity":
        return [
          { name: "Frontend", value: 850, color: "#3b82f6" },
          { name: "Backend", value: 620, color: "#a855f7" },
          { name: "UI/UX", value: 410, color: "#f59e0b" },
          { name: "Python", value: 340, color: "#10b981" },
          { name: "Basics", value: 290, color: "#6366f1" },
        ];
      case "performance":
        return [
          { name: "Batch 1", completion: 92, engagement: 88 },
          { name: "Batch 2", completion: 85, engagement: 76 },
          { name: "Batch 3", completion: 78, engagement: 91 },
          { name: "Batch 4", completion: 95, engagement: 98 },
          { name: "Batch 5", completion: 81, engagement: 84 },
        ];
      case "dropoff":
        return [
          { name: "Completed", value: 78, color: "#10b981" },
          { name: "In Progress", value: 15, color: "#3b82f6" },
          { name: "Dropped", value: 7, color: "#f43f5e" },
        ];
      default:
        return [];
    }
  }, [type]);

  const renderChart = () => {
    switch (type) {
      case "growth":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={processedData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="students" 
                name="Total Students"
                stroke={color} 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorStudents)" 
              />
              <Area 
                type="monotone" 
                dataKey="active" 
                name="Active Users"
                stroke="#6366f1" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "popularity":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)", fontWeight: "bold" }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                {processedData.map((entry: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case "performance":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line 
                type="stepAfter" 
                dataKey="completion" 
                name="Completion Rate"
                stroke={color} 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: "#000" }} 
              />
              <Line 
                type="stepAfter" 
                dataKey="engagement" 
                name="Engagement"
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: "#000" }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "dropoff":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processedData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {processedData.map((entry: unknown, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="glassy border-border/40 h-full overflow-hidden flex flex-col group backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-transparent hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 transition-colors duration-500">
                <Icon size={20} style={{ color: color }} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight">{title}</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <ArrowUpRight size={16} className="text-muted-foreground" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-[300px] relative z-10">
          {renderChart()}
        </CardContent>
      </Card>
    </motion.div>
  );
}
