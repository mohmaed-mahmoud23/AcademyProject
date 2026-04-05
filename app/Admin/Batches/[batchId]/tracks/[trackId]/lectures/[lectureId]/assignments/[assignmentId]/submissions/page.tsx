"use client";

import {
  useGetAssignmentSubmissionsQuery,
  useGradeSubmissionMutation,
} from "@/app/redux/slices/ApiSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Filter,
  MoreVertical,
  ExternalLink,
  MessageSquare,
  Trophy,
  Users
} from "lucide-react";
import { createdegreSchema, createdegreSchemaval } from "@/lib/zodSecma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionsPage() {
  const t = useTranslations("AdminSubmissionsPage");
  const [gradeSubmission, { isLoading: isGrading }] = useGradeSubmissionMutation();
  const { assignmentId } = useParams() as { assignmentId: string };

  const degreForm = useForm<createdegreSchemaval>({
    resolver: zodResolver(createdegreSchema),
    defaultValues: {
      feedback: " ",
      score: 100,
    },
  });

  const onSubmit = async (data: { feedback: string; score: number }, submissionId: string) => {
    try {
      const res = await gradeSubmission({
        submissionId,
        score: data.score,
        feedback: data.feedback,
      }).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      const message = err?.data?.message || err?.error || t("failedToGrade");
      toast.error(message);
    }
  };

  const { data, isLoading, isError } = useGetAssignmentSubmissionsQuery(assignmentId);

  const submissions = useMemo(() => data?.data || [], [data]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const graded = submissions.filter((s: any) => s.isFinalized).length;
    const pending = total - graded;
    return { total, graded, pending };
  }, [submissions]);


  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
        <Skeleton className="h-10 w-1/4 rounded-xl mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <div className="space-y-4 pt-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 rounded-2xl w-full" />)}
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-rose-500/10 p-4 rounded-full">
          <Users className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-rose-500">{t("notFound")}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground font-medium">{t("noSubmissions") === " " ? "" : t("title")}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-0 shadow-sm bg-card/40 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t("student")}</p>
              <p className="text-3xl font-black">{stats.total}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm bg-card/40 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t("finalized")}</p>
              <p className="text-3xl font-black text-emerald-500">{stats.graded}</p>
            </div>
            <div className="bg-emerald-500/10 p-3 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-sm bg-card/40 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t("pending")}</p>
              <p className="text-3xl font-black text-amber-500">{stats.pending}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-2xl">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="space-y-4">
        <ScrollArea className="h-[600px] rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl p-4 md:p-6 shadow-inner">
          <div className="space-y-4">
            {submissions.length ? (
              submissions.map((submission: any) => (
                <div
                  key={submission.submissionId}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 text-start">
                    <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${submission.studentName}`} />
                      <AvatarFallback>{submission.studentName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-lg leading-none">{submission.studentName}</h3>
                      <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(submission.submittedAt).toLocaleDateString()} at {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
                    <div className="flex flex-col items-end gap-1 px-4 border-r border-border/30 hidden md:flex">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("score")}</span>
                      <span className={`font-black text-lg ${submission.score ? "text-primary" : "text-muted-foreground"}`}>
                        {submission.score ?? "--"}<span className="text-xs">/100</span>
                      </span>
                    </div>

                    <Badge className={`rounded-xl px-4 py-1.5 font-black text-[11px] border-0 shadow-sm ${submission.isFinalized ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}>
                      {submission.isFinalized ? t("finalized") : t("pending")}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(submission.fileUrl, "_blank")}
                        className="rounded-xl h-11 w-11 hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="rounded-xl font-bold h-11 px-6 shadow-md transition-all active:scale-95 bg-primary hover:bg-primary/90">
                            {submission.isFinalized ? t("grade") : t("addGrade")}
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="rounded-3xl p-8 max-w-md">
                          <DialogHeader className="mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                              <Trophy className="w-6 h-6 text-primary" />
                            </div>
                            <DialogTitle className="text-2xl font-black">{t("grade")}</DialogTitle>
                            <p className="text-muted-foreground font-medium">{submission.studentName}</p>
                          </DialogHeader>

                          <Form {...degreForm}>
                            <form
                              onSubmit={degreForm.handleSubmit((data) => onSubmit(data, submission.submissionId))}
                              className="space-y-6"
                            >
                              <FormField
                                control={degreForm.control}
                                name="score"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-bold text-foreground/80 flex items-center gap-2">
                                      <Trophy className="w-4 h-4" /> {t("score")}
                                    </FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input
                                          className="rounded-2xl h-14 bg-muted/50 border-0 shadow-inner px-6 text-lg font-black"
                                          type="number"
                                          placeholder={t("enterMaxScore")}
                                          {...field}
                                          onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-muted-foreground/50">/ 100</div>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={degreForm.control}
                                name="feedback"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-bold text-foreground/80 flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4" /> {t("feedback")}
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="rounded-2xl h-14 bg-muted/50 border-0 shadow-inner px-6"
                                        placeholder={t("enterFeedback")}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="flex gap-3 pt-2">
                                <DialogClose asChild>
                                  <Button variant="secondary" className="flex-1 rounded-xl h-12 font-bold">{t("cancel")}</Button>
                                </DialogClose>
                                <Button
                                  type="submit"
                                  disabled={isGrading}
                                  className="flex-1 rounded-xl font-bold h-12 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                >
                                  {isGrading ? t("grading") : (submission.isFinalized ? t("createScore") : t("createScore"))}
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-muted/10 rounded-3xl border-2 border-dashed border-border/50">
                <FileText className="w-16 h-16 text-muted-foreground/20" />
                <div className="space-y-1">
                  <p className="text-xl font-bold text-muted-foreground">{t("noSubmissions")}</p>
                  <p className="text-sm font-medium text-muted-foreground/60">{t("noSubmissionsDesc") || "No assignments have been submitted yet"}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
