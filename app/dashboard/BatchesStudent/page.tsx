"use client";

import { useGetBatchQuery } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { useTranslations, useLocale } from "next-intl";
import { 
  Calendar, 
  Users, 
  Layers, 
  ArrowRight, 
  GraduationCap,
  Sparkles,
  Search,
  LayoutGrid
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BatchesStudent() {
  const { data, isLoading } = useGetBatchQuery();
  const router = useRouter();
  const t = useTranslations("BatchesStudent");
  const locale = useLocale();

  if (isLoading) {
    return (
      <div className="p-10 max-w-7xl mx-auto space-y-12">
        <Skeleton className="h-64 w-full rounded-[2.5rem]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  const batches = data?.data?.items || [];

  return (
    <div className="min-h-[90vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Professional Header Section (Same style as Create Admin) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-14 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900/20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-start">
            <div className="flex-shrink-0 h-24 w-24 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <GraduationCap className="w-12 h-12 text-white drop-shadow-md" />
            </div>
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                <ReactTyped
                  strings={[t("welcome1"), t("welcome2"), t("welcome3")]}
                  typeSpeed={50}
                  backSpeed={30}
                  loop
                />
              </h1>
              <p className="text-base sm:text-lg text-indigo-100 font-medium max-w-2xl">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Clean Card Grid */}
        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {batches.map((batch, idx) => (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group h-full"
              >
                <Card 
                  className="h-full bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                  onClick={() => router.push(`/dashboard/BatchesStudent/${batch.id}`)}
                >
                  <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                       <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none px-2 py-0 h-5 font-bold text-[10px] uppercase">
                            {t("active")}
                          </Badge>
                       </div>
                       <h3 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {batch.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <LayoutGrid className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("tracks")}</span>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Layers className="w-4 h-4 text-indigo-500" />
                          <span className="font-bold">{t("tracksCount", { count: batch.trackCount })}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("students")}</span>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span className="font-bold">{t("studentsCount", { count: batch.studentCount })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {new Date(batch.startDate).toLocaleDateString(locale, { dateStyle: 'medium' })}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="rounded-xl text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                      >
                        {t("viewBatch")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Search className="w-12 h-12 text-slate-300" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                {t("noBatches")}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                {t("subtitle")}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
