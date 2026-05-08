"use client";

import React, { useMemo } from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Dot
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Users,
    Activity,
    ArrowUpRight,
    Sparkles,
    Trophy,
    Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TopTrack {
    trackName: string;
    averageScore: number;
    studentCount: number;
}

interface TracksAnalyticsChartProps {
    tracks: TopTrack[];
}

const CustomTooltip = ({ active, payload, label, t }: unknown) => {
    if (active && payload && payload.length) {
        return (
            <div className="glassy p-5 border border-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] backdrop-blur-3xl animate-in zoom-in-95 duration-200 min-w-[220px]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
                    <p className="text-sm font-black text-foreground tracking-tight py-1">
                        {label}
                    </p>
                </div>

                <div className="space-y-4">
                    {payload.map((entry: unknown, index: number) => (
                        <div key={index} className="group relative">
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentcolor]"
                                        style={{ color: entry.fill || entry.color }}
                                    />
                                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                        {entry.name === "studentCount" ? "عدد الطلاب" : "متوسط الدرجات"}
                                    </span>
                                </div>
                                <span className="text-lg font-black text-foreground tabular-nums tracking-tighter">
                                    {entry.value.toLocaleString()}
                                    {entry.name === "averageScore" ? "%" : ""}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                    <p className="text-[9px] text-muted-foreground font-medium italic opacity-60">
                        {t("realTimeStream")}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function TracksAnalyticsChart({ tracks }: TracksAnalyticsChartProps) {
    const t = useTranslations("Analytics");

    const processedData = useMemo(() => {
        if (!tracks) return [];
        return [...tracks].sort((a, b) => b.studentCount - a.studentCount);
    }, [tracks]);

    const insights = useMemo(() => {
        if (!processedData.length) return null;

        const mostPopular = processedData[0];
        const bestPerformance = [...processedData].sort((a, b) => b.averageScore - a.averageScore)[0];

        return {
            mostPopular,
            bestPerformance,
            text: `${mostPopular.trackName} هو الأكثر شعبية من حيث عدد الطلاب، بينما يحقق مسار ${bestPerformance.trackName} أعلى متوسط درجات بنسبة ${bestPerformance.averageScore}%`
        };
    }, [processedData]);

    if (!processedData.length) return null;

    return (
        <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700 group relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -ml-32 -mb-32" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-4 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <div className="relative p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                            <TrendingUp size={24} className="text-blue-500 animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            تحليل المسارات
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{t("realTimeStream")}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">الأكثر شعبية</span>
                        <span className="text-sm font-black text-blue-500 flex items-center gap-1">
                            <Flame size={14} />
                            {insights?.mostPopular.trackName}
                        </span>
                    </div>
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/20 transition-all group/btn shadow-inner">
                        <ArrowUpRight size={20} className="text-muted-foreground group-hover/btn:text-blue-500 transition-colors" />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="p-8 pt-4 relative z-10">
                <div className="h-[400px] w-full mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={processedData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="8 8"
                                vertical={false}
                                stroke="rgba(255,255,255,0.03)"
                            />

                            <XAxis
                                dataKey="trackName"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)", fontWeight: 700 }}
                                dy={15}
                            />

                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                            />

                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
                                unit="%"
                            />

                            <Tooltip
                                content={<CustomTooltip t={t} />}
                                cursor={{ fill: "rgba(255,255,255,0.03)", radius: 12 }}
                                animationDuration={300}
                            />

                            <Bar
                                yAxisId="left"
                                dataKey="studentCount"
                                name="studentCount"
                                radius={[12, 12, 4, 4]}
                                barSize={45}
                                animationDuration={2000}
                                animationEasing="ease-out"
                            >
                                {processedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill="url(#barGradient)"
                                        fillOpacity={index === 0 ? 1 : 0.7}
                                        className="transition-all duration-500 hover:fill-opacity-100 hover:brightness-125 cursor-pointer"
                                    />
                                ))}
                            </Bar>

                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="averageScore"
                                name="averageScore"
                                stroke="#6366f1"
                                strokeWidth={4}
                                dot={(props: unknown) => {
                                    const { cx, cy, index } = props;
                                    if (index === -1) return <></>;
                                    return (
                                        <g key={`dot-${index}`}>
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={8}
                                                fill="#6366f1"
                                                fillOpacity={0.2}
                                                className="animate-pulse"
                                            />
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={4}
                                                fill="#fff"
                                                stroke="#6366f1"
                                                strokeWidth={2}
                                            />
                                        </g>
                                    );
                                }}
                                activeDot={{
                                    r: 10,
                                    stroke: '#fff',
                                    strokeWidth: 2,
                                    fill: '#6366f1',
                                    filter: 'url(#glow)'
                                }}
                                animationDuration={2500}
                                className="drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Smart Insights Footer */}
                <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group/insight">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/insight:opacity-100 transition-opacity duration-700" />

                    <div className="relative">
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                            <Sparkles size={20} className="animate-spin-slow" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 relative">
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                رؤية ذكية
                            </span>
                            {insights?.mostPopular && (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                                    <Flame size={12} />
                                    الأكثر شعبية
                                </span>
                            )}
                        </div>
                        <p className="text-sm font-medium text-foreground/80 leading-relaxed max-w-4xl">
                            {insights?.text}
                        </p>
                    </div>

                    <div className="flex -space-x-3 rtl:space-x-reverse">
                        {processedData.slice(0, 3).map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold shadow-xl">
                                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
