"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  BookOpen,
  FileText,
  ExternalLink,
  CalendarDays,
  Award,
  ChevronRight,
  Target,
  Sparkles
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

import { useGetlecturesidassignmentsQuery } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";
import { Lecturere } from "@/app/interfaces";

interface Props {
  lecture: Lecturere;
}

export default function LectureAccordion({ lecture }: Props) {
  const t = useTranslations("StudentLectures");
  const { data: assignmentsData, isLoading } = useGetlecturesidassignmentsQuery(
    lecture.id,
  );
  const router = useRouter();

  const assignments = assignmentsData?.data || [];

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem
        value={lecture.id}
        className="rounded-[2rem] border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-card/60 backdrop-blur-xl overflow-hidden transition-all duration-500 group data-[state=open]:shadow-2xl data-[state=open]:shadow-primary/5 data-[state=open]:bg-card/90"
      >
        <AccordionTrigger className="px-6 md:px-10 py-8 hover:no-underline border-b border-transparent data-[state=open]:border-border/40 transition-all duration-500">
          <div className="flex items-center justify-between w-full gap-6">
            <div className="flex items-center gap-6 min-w-0">
               <div className="shrink-0 w-16 h-16 rounded-[1.5rem] bg-background/50 border border-border/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                 <div className="p-3 bg-primary/10 rounded-2xl relative">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                 </div>
               </div>

               <div className="flex flex-col text-start space-y-1 min-w-0">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">{t("lecture")}</span>
                 <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight truncate leading-tight">
                   {lecture.title}
                 </h3>
                 <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-muted/50 border-0 flex items-center gap-1.5">
                       <FileText className="w-3 h-3 text-muted-foreground/60" />
                       {assignments.length} {t("assignments")}
                    </Badge>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <p className="text-xs font-bold text-muted-foreground/60 truncate italic max-w-[200px]">
                      {lecture.contentText}
                    </p>
                 </div>
               </div>
            </div>

            <div className="shrink-0 hidden md:block">
               <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center group-data-[state=open]:rotate-180 transition-transform duration-500 bg-background/30">
                 <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-8 md:px-12 pb-10 pt-8 animate-in slide-in-from-top-4 duration-500">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left side: Description & Source */}
            <div className="lg:col-span-12 space-y-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground font-mono">
                      {t("description")}
                    </h4>
                 </div>
                 <div className="p-6 rounded-3xl bg-muted/20 border border-border/10">
                    <p className="text-base font-semibold leading-relaxed text-muted-foreground/80">
                      {lecture.contentText}
                    </p>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lecture.driveLink && (
                  <Button
                    asChild
                    variant="outline"
                    className="h-14 rounded-2xl font-black border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-sm text-sm group/btn"
                  >
                    <a
                      href={lecture.driveLink}
                      target="_blank"
                      className="flex items-center justify-center gap-2.5"
                    >
                      <div className="p-1.5 bg-primary/10 rounded-lg group-hover/btn:scale-110 transition-transform">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                      {t("openResources")}
                    </a>
                  </Button>
                )}

                {lecture.fileUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="h-14 rounded-2xl font-black border-2 border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5 shadow-sm text-sm group/btn"
                  >
                    <a
                      href={lecture.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5"
                    >
                      <div className="p-1.5 bg-violet-500/10 rounded-lg group-hover/btn:scale-110 transition-transform">
                        <FileText className="w-4 h-4 text-violet-500" />
                      </div>
                      {t("viewFile")}
                    </a>
                  </Button>
                )}
              </div>

              <Separator className="bg-border/40" />

              {/* Assignment Deck */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-2xl">
                       <Award className="w-5 h-5 text-amber-500" />
                    </div>
                    <h4 className="font-black text-lg tracking-tight">
                      {t("assignments")}
                    </h4>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-muted/40 text-[10px] font-black text-muted-foreground/60 border border-border/20 uppercase tracking-widest">
                    {assignments.length} Total
                  </div>
                </div>

                {isLoading ? (
                  <div className="space-y-3">
                     {[1, 2].map(i => <Skeleton key={i} className="h-20 rounded-2xl w-full" />)}
                  </div>
                ) : assignments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 rounded-[2.5rem] bg-muted/20 border-2 border-dashed border-border/40 text-center space-y-3 mx-2">
                    <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center">
                       <Sparkles className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground italic">
                      {t("noAssignments")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl-grid">
                    {assignments.map((assignment: unknown) => (
                      <div
                        key={assignment.id}
                        className="group/item relative bg-background/40 hover:bg-background/80 border border-border/40 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col justify-between min-h-[160px]"
                      >
                        <div
                          onClick={() =>
                            router.push(`/assignments/${assignment.id}`)
                          }
                          className="cursor-pointer space-y-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                               <h5 className="font-black text-base truncate tracking-tight text-foreground/90 group-hover/item:text-primary transition-colors">
                                 {assignment.title}
                               </h5>
                               <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                  <div className="flex items-center gap-1.5">
                                    <CalendarDays className="w-3 h-3" />
                                    <span>{t("dueDate")}: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                  </div>
                               </div>
                            </div>
                            <div className="shrink-0 p-2 bg-muted/30 rounded-xl group-hover/item:bg-primary/10 transition-colors">
                               <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-transform rtl-rotate-180" />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                             <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-600 flex items-center gap-2 uppercase">
                                <Target className="w-3 h-3" /> {t("maxScore")}: {assignment.maxScore}
                             </div>
                          </div>
                        </div>

                        {assignment.fileUrl && (
                          <div className="mt-4 pt-4 border-t border-border/20">
                            <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="w-full rounded-xl h-10 font-bold bg-muted/20 hover:bg-violet-500 hover:text-white transition-all text-[10px] uppercase tracking-widest"
                            >
                              <a
                                href={assignment.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {t("viewAssignmentFile")}
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
