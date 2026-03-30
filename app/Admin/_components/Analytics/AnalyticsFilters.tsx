"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Filter, 
  ChevronDown, 
  RefreshCcw,
  Search,
  LayoutGrid,
  Layers,
  ArrowRight
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AnalyticsFilters() {
  const t = useTranslations("Analytics");
  const [selectedRange, setSelectedRange] = useState("last7days");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dateRanges = [
    { id: "today", label: "Today" },
    { id: "last7days", label: "Last 7 Days" },
    { id: "last30days", label: "Last 30 Days" },
    { id: "allTime", label: "All Time" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white/5 backdrop-blur-3xl p-2 rounded-[2.5rem] border border-border/40 shadow-2xl relative z-20">
      {/* Date Range Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="rounded-full px-6 h-12 bg-white/5 border border-border/40 hover:bg-white/10 hover:border-blue-500/50 transition-all flex items-center gap-3 group"
          >
            <Calendar size={16} className="text-blue-500" />
            <span className="text-sm font-bold text-foreground">
              {dateRanges.find(r => r.id === selectedRange)?.label}
            </span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-3xl border-border/40 bg-background/95 backdrop-blur-xl p-2 min-w-[200px]">
          {dateRanges.map((range) => (
            <DropdownMenuItem 
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className="rounded-2xl px-4 py-2 text-sm font-bold hover:bg-blue-500/10 hover:text-blue-500 transition-colors cursor-pointer"
            >
              {range.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Track Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="rounded-full px-6 h-12 bg-white/5 border border-border/40 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center gap-3 group"
          >
            <Filter size={16} className="text-purple-500" />
            <span className="text-sm font-bold text-foreground">
              {selectedTrack === "all" ? t("allTracks") : selectedTrack}
            </span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-3xl border-border/40 bg-background/95 backdrop-blur-xl p-2 min-w-[200px]">
          {["all", "Frontend", "Backend", "Basics"].map((track) => (
            <DropdownMenuItem 
              key={track}
              onClick={() => setSelectedTrack(track)}
              className="rounded-2xl px-4 py-2 text-sm font-bold hover:bg-purple-500/10 hover:text-purple-500 transition-colors cursor-pointer capitalize"
            >
              {track === "all" ? t("allTracks") : track}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-auto pr-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className={cn(
            "p-3 rounded-full bg-white/5 border border-border/40 hover:bg-white/10 hover:border-emerald-500/50 transition-all",
            isRefreshing && "animate-spin"
          )}
        >
          <RefreshCcw size={18} className="text-emerald-500" />
        </motion.button>

        <div className="h-8 w-px bg-border/40 mx-2 hidden sm:block" />

        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 rounded-full shadow-lg shadow-blue-600/30 text-white font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
        >
          Apply Filters <ArrowRight size={14} />
        </motion.button>
      </div>
    </div>
  );
}
