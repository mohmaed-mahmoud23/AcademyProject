/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Boxes, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Award,
  Wallet 
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface HeroStatsProps {
  data: {
    totalStudents: number;
    totalAdmins: number;
    totalTracks: number;
    totalBatches: number;
  };
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate(value) {
        setDisplayValue(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function Sparkline({ color, data }: { color: string; data: any[] }) {
  return (
    <div className="h-12 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HeroStats({ data }: HeroStatsProps) {
  const t = useTranslations("Analytics");

  // Generate mock sparkline data for visual excellence
  const generateSparkData = (base: number) => {
    return [...Array(10)].map((_, i) => ({
      v: base + Math.floor(Math.random() * (base * 0.2)) - (base * 0.1)
    }));
  };

  const stats = [
    {
      title: t("totalStudents"),
      value: data.totalStudents,
      icon: Users,
      trend: "+12%",
      trendDir: "up",
      color: "blue",
      sparkData: useMemo(() => generateSparkData(20), [])
    },
    {
      title: t("totalTracks"),
      value: data.totalTracks,
      icon: GraduationCap,
      trend: "+5%",
      trendDir: "up",
      color: "purple",
      sparkData: useMemo(() => generateSparkData(20), [])
    },
    {
      title: t("totalBatches"),
      value: data.totalBatches,
      icon: Boxes,
      trend: "-2%",
      trendDir: "down",
      color: "indigo",
      sparkData: useMemo(() => generateSparkData(20), [])
    },
    {
      title: t("activeToday"),
      value: Math.floor(data.totalStudents * 0.65), // Simulated active
      icon: Activity,
      trend: "+18%",
      trendDir: "up",
      color: "green",
      sparkData: useMemo(() => generateSparkData(20), [])
    },
    {
      title: t("completionRate"),
      value: 78, // Simulated %
      suffix: "%",
      icon: Award,
      trend: "+4%",
      trendDir: "up",
      color: "yellow",
      sparkData: useMemo(() => generateSparkData(20), [])
    },
    {
       title: t("revenue"),
       value: 12450, // Simulated
       prefix: "$",
       icon: Wallet,
       trend: "+24%",
       trendDir: "up",
       color: "pink",
       sparkData: useMemo(() => generateSparkData(20), [])
    }
  ];

  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    green: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    yellow: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    pink: "text-pink-500 bg-pink-500/10 border-pink-500/20",
  };

  const chartColorMap: Record<string, string> = {
    blue: "#3b82f6",
    purple: "#a855f7",
    indigo: "#6366f1",
    green: "#10b981",
    yellow: "#f59e0b",
    pink: "#ec4899",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group"
        >
          <Card className="relative glassy border-border/40 overflow-hidden backdrop-blur-3xl shadow-xl hover:shadow-2xl hover:border-transparent transition-all duration-500">
            {/* Animated Glow on Hover */}
            <div className={cn(
              "absolute -inset-[100%] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-gradient-to-r pointer-events-none blur-[60px]",
              stat.color === 'blue' && "from-blue-500 to-transparent",
              stat.color === 'purple' && "from-purple-500 to-transparent",
              stat.color === 'indigo' && "from-indigo-500 to-transparent",
              stat.color === 'green' && "from-emerald-500 to-transparent",
              stat.color === 'yellow' && "from-amber-500 to-transparent",
              stat.color === 'pink' && "from-pink-500 to-transparent"
            )} />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</span>
              <div className={cn("p-2 rounded-xl border", colorMap[stat.color])}>
                <stat.icon size={18} />
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-1">
                {stat.prefix && <span className="text-xl font-bold opacity-70">{stat.prefix}</span>}
                <div className="text-3xl font-black tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </div>
                {stat.suffix && <span className="text-xl font-bold opacity-70">{stat.suffix}</span>}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className={cn(
                  "flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full border",
                  stat.trendDir === "up" 
                    ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                    : "text-rose-500 bg-rose-500/10 border-rose-500/20"
                )}>
                  {stat.trendDir === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.trend}
                </div>
                
                <div className="flex-1 max-w-[80px]">
                  <Sparkline 
                    color={chartColorMap[stat.color]} 
                    data={stat.sparkData} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
