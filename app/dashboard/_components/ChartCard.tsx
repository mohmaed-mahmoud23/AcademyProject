"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ChartCardProps {
  title: string;
  type: "bar" | "radial";
  data: any[];
  height?: number;
  delay?: number;
}

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 p-3 shadow-xl rounded-2xl border border-gray-100 dark:border-slate-800">
        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{label}</p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          Score: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ChartCard({
  title,
  type,
  data,
  height = 300,
  delay = 0,
}: ChartCardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height }} />;

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 dark:border-slate-800 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="flex-1 w-full" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#f1f5f9"} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11, fontWeight: 500 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#1e293b' : '#f8fafc', radius: 8 }} />
              <Bar 
                dataKey="value" 
                fill={isDark ? "#60a5fa" : "#2563eb"} 
                radius={[8, 8, 0, 0]} 
                barSize={32}
                animationDuration={1500}
              />
            </BarChart>
          ) : (
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="65%" 
              outerRadius="100%" 
              barSize={12} 
              data={data}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar
                background={{ fill: isDark ? '#1e293b' : '#f1f5f9' }}
                dataKey="value"
                cornerRadius={12}
                animationDuration={1500}
              />
              <Tooltip />
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-4xl font-black fill-foreground"
              >
                {data[0]?.value}%
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-muted-foreground uppercase tracking-widest"
              >
                Score
              </text>
            </RadialBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
