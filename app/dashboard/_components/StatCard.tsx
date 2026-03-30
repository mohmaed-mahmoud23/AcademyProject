"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "red" | "purple" | "orange" | "yellow";
  delay?: number;
}

const colorStyles = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
      className="rounded-2xl bg-card p-6 shadow-sm border border-border/50 dark:border-slate-800 hover:shadow-md transition-shadow group relative overflow-hidden"
    >
      {/* Glow Effect Link */}
      <div className={cn("absolute -right-4 -top-4 h-16 w-16 blur-2xl opacity-10", colorStyles[color])} />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground truncate">{value}</h3>
          
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  trend.isPositive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs period</span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl transition-all group-hover:scale-110 duration-300 shadow-sm", colorStyles[color])}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}
