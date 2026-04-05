"use client";

import { useParams } from "next/navigation";
import { useGetlechtuertrackQuery } from "@/app/redux/slices/ApiSlice";
import LectureAccordion from "@/app/dashboard/(groub)/LectureAccordion/Page";
import { Lecturere } from "@/app/interfaces";
import { useTranslations } from "next-intl";
import { Loader2, BookOpen, AlertCircle } from "lucide-react";

export default function TrackLecturesPage() {
  const t = useTranslations("StudentLectures");
  const params = useParams();
  const trackId = params.trackId as string;

  const { data, isLoading, error } = useGetlechtuertrackQuery(trackId);

  if (isLoading) return (
    <div className="flex flex-col h-[70vh] justify-center items-center gap-4 text-muted-foreground animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <BookOpen className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="font-black text-xl tracking-tight uppercase opacity-50 animate-pulse">Initializing Path...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col h-[70vh] justify-center items-center gap-6 text-rose-500 animate-bounce-in">
       <div className="p-6 bg-rose-500/10 rounded-[2rem] border border-rose-500/20 shadow-2xl shadow-rose-500/10">
         <AlertCircle className="w-12 h-12" />
       </div>
       <div className="text-center space-y-1">
         <p className="font-black text-2xl tracking-tight">System Error</p>
         <p className="font-bold text-sm opacity-60">Unable to retrieve learning materials at this time.</p>
       </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-card/60 backdrop-blur-2xl border border-border/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-black/5">
           <div className="shrink-0 p-6 bg-gradient-to-br from-primary to-violet-600 rounded-3xl shadow-xl shadow-primary/20 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
             <BookOpen className="w-10 h-10 text-white" />
           </div>
           <div className="text-center md:text-start flex-1 space-y-2">
             <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-none">
               {t("trackLectures")}
             </h1>
             <p className="text-xs md:text-sm font-black text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
               <span className="w-8 h-px bg-primary/30 hidden md:block" />
               {t("learningMaterials")}
             </p>
           </div>
           <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-muted/30 rounded-2xl border border-border/40 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{t("lecture")}</p>
                <p className="text-xl font-black">{data?.data?.length || 0}</p>
              </div>
           </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {(data?.data?.length ?? 0) > 0 ? (
           data?.data?.map((lecture: Lecturere) => (
             <LectureAccordion key={lecture.id} lecture={lecture} />
           ))
        ) : (
           <div className="text-center p-12 bg-card/30 rounded-3xl border border-dashed text-muted-foreground font-bold">
              {t("noLecturesFound")}
           </div>
        )}
      </div>
    </div>
  );
}
