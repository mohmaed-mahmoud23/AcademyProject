"use client";

import { motion } from "framer-motion";
import { BookOpen, MapPin, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TrackCardProps {
    name: string;
    category: string;
    color: "blue" | "purple" | "emerald" | "amber";
    delay?: number;
}

const colorStyles = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        fill: "bg-blue-600",
        shadow: "shadow-blue-500/20",
        gradient: "from-blue-600 to-indigo-600",
        border: "border-blue-200/50 dark:border-blue-900/30"
    },
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        fill: "bg-purple-600",
        shadow: "shadow-purple-500/20",
        gradient: "from-purple-600 to-pink-600",
        border: "border-purple-200/50 dark:border-purple-900/30"
    },
    emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        fill: "bg-emerald-600",
        shadow: "shadow-emerald-500/20",
        gradient: "from-emerald-600 to-teal-600",
        border: "border-emerald-200/50 dark:border-emerald-900/30"
    },
    amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-600 dark:text-amber-400",
        fill: "bg-amber-600",
        shadow: "shadow-amber-500/20",
        gradient: "from-amber-600 to-orange-600",
        border: "border-amber-200/50 dark:border-amber-900/30"
    }
};

export function TrackCard({
    name,
    category,
    color,
    delay = 0,
}: TrackCardProps) {
    const t = useTranslations("TrackCard");
    const styles = colorStyles[color];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={cn(
                "group relative glassy overflow-hidden rounded-[2rem] p-6 shadow-lg transition-all duration-300",
                "bg-white dark:bg-slate-900/80 border border-gray-100 dark:border-slate-800",
                "hover:shadow-xl dark:hover:shadow-primary/10"
            )}
        >
            <div className={cn("absolute -end-4 -top-4 h-24 w-24 rounded-full blur-3xl opacity-20", styles.fill)} />

            <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", styles.bg, styles.text)}>
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">4.9</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {name}
                    </h3>
                </div>



                <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 text-sm font-bold text-gray-700 dark:text-slate-300">
                    {t("continue")}
                    <ArrowRight size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
                </button>
            </div>
        </motion.div>
    );
}
