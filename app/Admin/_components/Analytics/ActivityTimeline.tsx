"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  GraduationCap,
  Clock,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { RecentUser } from "@/app/interfaces";

// Lightweight local alternative to date-fns to resolve module-not-found errors
function formatDistanceToNow(date: Date, options?: { addSuffix?: boolean }, locale?: string) {
  const diffInSeconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const isAr = locale === 'ar';

  if (diffInSeconds < 60) return isAr ? "الآن" : "Just now";
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return isAr ? `منذ ${mins} دقيقة` : `${mins}m ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return isAr ? `منذ ${days} يوم` : `${days}d ago`;
}

interface ActivityTimelineProps {
  recentUsers?: RecentUser[];
}

export function ActivityTimeline({ recentUsers = [] }: ActivityTimelineProps) {
  const t = useTranslations("Analytics");
  const [showAll, setShowAll] = useState(false);

  const displayedUsers = showAll ? recentUsers : recentUsers.slice(0, 5);

  const getIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin": return ShieldCheck;
      case "instructor": return GraduationCap;
      default: return UserPlus;
    }
  };

  const getColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin": return "purple";
      case "instructor": return "emerald";
      default: return "blue";
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "emerald": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "purple": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700 h-full flex flex-col">
      <CardHeader className="pb-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Clock className="text-indigo-500" size={20} />
            </div>
            <CardTitle className="text-xl font-black tracking-tight">{t("activityTimeline")}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="relative pt-6 px-6 flex-1">
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-8 pb-8">
            <AnimatePresence mode="popLayout">
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user, idx) => {
                  const Icon = getIcon(user.role);
                  const color = getColor(user.role);
                  const isAr = t("activity") === "نشاط";

                  return (
                    <motion.div
                      key={user.email + idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative flex gap-6 group"
                    >
                      <div className={cn(
                        "shrink-0 z-10 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                        getColorClass(color).split(' ')[0]
                      )}>
                        <Icon size={12} className={getColorClass(color).split(' ')[1]} />
                      </div>

                      <div className="flex-1 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className="text-sm font-black text-foreground">{user.fullName}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-border/40 tabular-nums">
                            {user.createdAt ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true }, isAr ? 'ar' : 'en') : t("noActivity")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground/80">
                          {t("activity")}: {t("syncComplete")}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-20 text-center opacity-50">
                  <UserCheck className="mx-auto mb-4" size={32} />
                  <p className="text-sm font-bold">{t("noActivity")}</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {recentUsers.length > 5 && (
          <div className="p-6 pt-0 mt-auto">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-4 rounded-[2rem] bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.25em] hover:bg-blue-500 hover:text-white hover:border-transparent transition-all duration-700 shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">{showAll ? t("insight1").split(' ').slice(0, 1).join('') === 'Most' ? "Show Less" : "عرض أقل" : t("viewAll")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
