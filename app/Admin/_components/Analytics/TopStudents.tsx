"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Search, 
  Filter, 
  ChevronRight, 
  Star,
  GraduationCap,
  Award,
  Medal
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface TopStudentsProps {
  students: Array<{
    studentName: string;
    email: string;
    batchName: string;
    averageScore: number;
  }>;
}

export function TopStudents({ students }: TopStudentsProps) {
  const t = useTranslations("Analytics");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredStudents = useMemo(() => {
    return students
      .filter(s => 
        (s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
         s.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === "all" || s.batchName === filterType)
      )
      .slice(0, 10);
  }, [students, searchTerm, filterType]);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Medal className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" size={24} />;
    if (index === 1) return <Medal className="text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]" size={24} />;
    if (index === 2) return <Medal className="text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" size={24} />;
    return <span className="text-muted-foreground font-black text-sm">#{index + 1}</span>;
  };

  return (
    <Card className="glassy border-border/40 overflow-hidden shadow-2xl backdrop-blur-3xl transition-all duration-700">
      <CardHeader className="pb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
              <Trophy className="text-yellow-500" size={20} />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight">Top Performers</CardTitle>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search students..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-border/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full sm:w-60 peer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["all", "Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterType(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border capitalize",
                filterType === filter 
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                  : "bg-white/5 text-muted-foreground border-border/40 hover:bg-white/10"
              )}
            >
              {filter === "all" ? "All Batches" : filter}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-0 sm:px-6">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student, idx) => (
              <motion.div
                key={student.email}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={cn(
                  "group relative flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-500 hover:bg-white/5 hover:backdrop-blur-xl border border-transparent hover:border-border/40",
                  idx < 3 && "bg-white/[0.02]"
                )}
              >
                {/* Rank Indicator */}
                <div className="w-10 flex justify-center shrink-0">
                  {getRankIcon(idx)}
                </div>

                {/* Avatar with Status */}
                <div className="relative shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-border/40 group-hover:border-blue-500/50 transition-all duration-500 ring-4 ring-transparent group-hover:ring-blue-500/10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.studentName}`} />
                    <AvatarFallback className="font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white uppercase">
                      {student.studentName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
                </div>

                {/* Info & Progress */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <div>
                      <h4 className="font-bold text-foreground truncate group-hover:text-blue-400 transition-colors">{student.studentName}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{student.email}</span>
                        <Badge variant="outline" className="text-[9px] h-4 bg-blue-500/5 px-2 border-blue-500/20 text-blue-400 font-black uppercase">
                          {student.batchName || "N/A"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-xl font-black text-foreground">{student.averageScore}%</span>
                        <Star size={14} className={cn(
                          "fill-current",
                          student.averageScore >= 90 ? "text-yellow-400" : "text-muted-foreground/30"
                        )} />
                      </div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1">Average Grade</p>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <Progress 
                      value={student.averageScore} 
                      className={cn(
                        "h-1.5 bg-white/5",
                        student.averageScore >= 90 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-blue-500"
                      )} 
                    />
                  </div>
                </div>

                {/* Action Arrow */}
                <div className="w-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                    <ChevronRight size={16} />
                  </div>
                </div>
                
                {/* Visual Accent */}
                {idx === 0 && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 p-1.5 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                    <Award size={14} className="text-yellow-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredStudents.length === 0 && (
            <div className="py-20 text-center animate-in fade-in duration-500">
              <div className="p-4 bg-white/5 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search size={32} className="text-muted-foreground/20" />
              </div>
              <h3 className="text-lg font-bold text-muted-foreground">No students found</h3>
              <p className="text-sm text-muted-foreground/60">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40 text-center">
           <button className="px-6 py-2 rounded-xl bg-white/5 border border-border/40 text-sm font-bold hover:bg-white/10 transition-all gap-2 inline-flex items-center">
              {t("viewAll")} <ChevronRight size={14} />
           </button>
        </div>
      </CardContent>
    </Card>
  );
}
