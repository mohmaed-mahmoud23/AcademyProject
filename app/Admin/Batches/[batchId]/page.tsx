/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslations } from "next-intl";
import {
  BatchDatadetails,
  BatchStudent,
  CreateStudentResponse,
  Track,
} from "@/app/interfaces";

import { Eye, Trash2, GraduationCap, Calendar, BarChart3, Layers, Target, Trophy, Clock, TrendingUp, Search, Users, Presentation, Plus } from "lucide-react";
import {
  useADminCreatestudentMutation,
  useDeleteStudentMutation,
  useDeleteTrackMutation,
  useGetBatchdetailsQuery,
  useGetBatchStudentsQuery,
  useGetBatchtracksQuery,
  usePostbatchTracksMutation,
} from "@/app/redux/slices/ApiSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateStudentFormValues,
  createStudentSchema,
  secmanametrack,
} from "@/lib/zodSecma";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useParams } from "next/navigation";
import EditTrackModal from "@/components/EditTrackModal";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function BatchDetails() {
  const t = useTranslations("BatchDetails");
  const { batchId } = useParams() as { batchId: string };

  const [deleteStudent] = useDeleteStudentMutation();
  const [createTrack] = usePostbatchTracksMutation();
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [trackDialogOpen, setTrackDialogOpen] = useState(false);

  const { data: batchRes, isLoading: batchLoading } = useGetBatchdetailsQuery(batchId);
  const [Createstudent] = useADminCreatestudentMutation();

  const studentForm = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
    },
  });

  const onStudentSubmit = async (data: CreateStudentFormValues) => {
    try {
      await Createstudent({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        batchId: batchId,
      }).unwrap();
      toast.success(t("studentCreated"));
      studentForm.reset();
      setStudentDialogOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || t("error"));
    }
  };

  const trackForm = useForm({
    resolver: zodResolver(secmanametrack),
    defaultValues: { name: "" },
  });

  const onTrackSubmit = async (data: { name: string }) => {
    try {
      const result = await createTrack({ batchId, name: data.name }).unwrap();
      toast.success(result.message || t("trackCreated"));
      trackForm.reset();
      setTrackDialogOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || t("error"));
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await deleteStudent({ batchId, studentId }).unwrap();
      toast.success(t("studentDeleted"));
    } catch (error: any) {
      toast.error(error.data?.message || t("error"));
    }
  };

  const { data: studentsRes, isLoading: studentsLoading } = useGetBatchStudentsQuery(batchId);
  const [deleteTrack] = useDeleteTrackMutation();
  const { data: tracksRes, isLoading: tracksLoading } = useGetBatchtracksQuery(batchId);

  const handleDeleteTrack = async (trackId: string) => {
    try {
      const result = await deleteTrack(trackId).unwrap();
      toast.success(result.message || t("trackDeleted"));
    } catch (err: any) {
      toast.error(err?.data?.message || t("error"));
    }
  };

  const scoreDistribution = useMemo(() => {
    if (!studentsRes?.data) return [];
    const bins = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
    studentsRes.data.forEach((s: any) => {
      const score = s.averageScore || 0;
      if (score <= 20) bins['0-20']++;
      else if (score <= 40) bins['21-40']++;
      else if (score <= 60) bins['41-60']++;
      else if (score <= 80) bins['61-80']++;
      else bins['81-100']++;
    });
    return Object.entries(bins).map(([name, count]) => ({ name, count }));
  }, [studentsRes]);

  if (batchLoading || studentsLoading || tracksLoading) {
    return (
      <div className="space-y-6 p-6 md:px-8 animate-pulse max-w-7xl mx-auto">
        <Skeleton className="h-10 w-1/4 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Skeleton className="lg:col-span-2 h-[500px] rounded-3xl" />
          <Skeleton className="lg:col-span-1 h-[500px] rounded-3xl" />
        </div>
      </div>
    );
  }

  const batch: BatchDatadetails | undefined = batchRes?.data;
  const students: BatchStudent[] = studentsRes?.data ?? [];
  const tracks: Track[] = tracksRes?.data ?? [];

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          {batch?.name || t("loading")}
        </h1>
        <p className="text-muted-foreground font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {batch ? new Date(batch.startDate).toLocaleDateString() : "-"}
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] bg-card/50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("students")}</p>
                <p className="text-4xl font-black">{students.length}</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                <span>{t("capacity")}</span>
                <span>{Math.round((students.length / 50) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((students.length / 50) * 100, 100)}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] bg-card/50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("tracks")}</p>
                <p className="text-4xl font-black">{tracks.length}</p>
              </div>
              <div className="bg-violet-500/10 p-3 rounded-2xl">
                <Layers className="w-6 h-6 text-violet-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs font-semibold text-muted-foreground">
              {t("activeTracksRunning")}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] bg-card/50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("avgPerformance")}</p>
                <p className="text-4xl font-black">
                  {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + (s.averageScore || 0), 0) / students.length) : 0}%
                </p>
              </div>
              <div className="bg-emerald-500/10 p-3 rounded-2xl">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> <span>{t("globalAvgStatus")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: 8 cols for Students, 4 cols for Charts + Tracks */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Students Smart Layout */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-card/60 p-6 rounded-[2rem] border border-border/40 shadow-sm">
            <div className="px-2">
              <h2 className="text-2xl font-black tracking-tight mb-1">{t("batchStudents")}</h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> {t("totalEnrolled")}: {students.length}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">

              <Dialog open={studentDialogOpen} onOpenChange={setStudentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-2xl shadow-lg font-bold px-6 h-11 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {t("addStudent")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl p-8 max-w-md">
                  <DialogHeader className="mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight">{t("addNewStudent")}</DialogTitle>
                    <p className="text-muted-foreground font-medium">Register a new student to this batch.</p>
                  </DialogHeader>
                  <Form {...studentForm}>
                    <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-5">
                      <FormField control={studentForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 font-bold text-xs uppercase tracking-wider">{t("email")}</FormLabel>
                          <FormControl>
                            <Input className="rounded-xl bg-muted/50 border-0 h-12 px-4 shadow-inner font-medium" placeholder="student@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={studentForm.control} name="firstName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 font-bold text-xs uppercase tracking-wider">{t("firstName")}</FormLabel>
                            <FormControl>
                              <Input className="rounded-xl bg-muted/50 border-0 h-12 px-4 shadow-inner font-medium" placeholder={t("firstName")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={studentForm.control} name="lastName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80 font-bold text-xs uppercase tracking-wider">{t("lastName")}</FormLabel>
                            <FormControl>
                              <Input className="rounded-xl bg-muted/50 border-0 h-12 px-4 shadow-inner font-medium" placeholder={t("lastName")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={studentForm.control} name="gender" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 font-bold text-xs uppercase tracking-wider">{t("gender")}</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="rounded-xl bg-muted/50 border-0 h-12 px-4 shadow-inner focus:ring-primary/20 font-medium">
                                <SelectValue placeholder={t("selectGender")} />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-border/40 shadow-2xl p-1">
                                <SelectItem className="rounded-xl cursor-pointer py-2.5" value="male">{t("male")}</SelectItem>
                                <SelectItem className="rounded-xl cursor-pointer py-2.5" value="female">{t("female")}</SelectItem>
                                <SelectItem className="rounded-xl cursor-pointer py-2.5" value="other">{t("other")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="flex gap-3 pt-4">
                        <DialogClose asChild>
                          <Button variant="secondary" className="flex-1 h-12 rounded-xl font-bold">{t("cancel")}</Button>
                        </DialogClose>
                        <Button type="submit" className="flex-1 h-12 rounded-xl font-extrabold shadow-lg shadow-primary/20">{t("createStudent")}</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
            {students.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
                {students.map((student) => {
                  const isHigh = student.averageScore >= 80;
                  const isMedium = student.averageScore >= 50 && student.averageScore < 80;
                  const progressColor = isHigh ? "bg-emerald-500" : isMedium ? "bg-amber-500" : "bg-rose-500";
                  const bgProgressColor = isHigh ? "bg-emerald-500/10" : isMedium ? "bg-amber-500/10" : "bg-rose-500/10";
                  const textColor = isHigh ? "text-emerald-600 dark:text-emerald-400" : isMedium ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";

                  return (
                    <Card key={student.studentId} className="flex flex-col bg-card/40 border-border/40 shadow-sm p-0 rounded-[2rem] overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 border-0">
                      <div className="p-5 flex flex-col h-full bg-card/60 backdrop-blur-sm border border-border/40 rounded-[2rem]">
                        <div className="flex items-center gap-4 w-full mb-6">
                          <div className="relative">
                            <Avatar className="w-14 h-14 border-2 border-background shadow-md group-hover:scale-105 transition-transform duration-500">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.fullName}`} />
                              <AvatarFallback className="bg-primary/10 text-primary font-black">{student.fullName[0]}</AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center shadow-sm",
                              student.rank === 1 ? "bg-amber-400" : "bg-muted text-muted-foreground"
                            )}>
                              {student.rank === 1 ? <Trophy className="w-3 h-3 text-white" /> : <span className="text-[10px] font-black">{student.rank}</span>}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0 text-start">
                            <h4 className="font-black text-lg truncate tracking-tight">{student.fullName}</h4>
                            <p className="text-xs font-bold text-muted-foreground/60 truncate uppercase tracking-widest" dir="ltr">{student.email}</p>
                          </div>
                        </div>

                        <div className="w-full flex flex-col gap-2 mb-6 px-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] opacity-60 font-mono">{t("score")}</span>
                            <span className={cn("font-black text-base flex items-center gap-1", textColor)}>
                              {student.averageScore}%
                            </span>
                          </div>
                          <div className={cn("w-full h-1.5 rounded-full overflow-hidden p-[2px]", bgProgressColor)}>
                            <div className={cn("h-full rounded-full transition-all duration-1000 ease-out", progressColor)} style={{ width: `${student.averageScore}%` }} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                          {tracks[0]?.id ? (
                            <Button
                              asChild
                              variant="secondary"
                              className="flex-1 rounded-2xl font-bold h-11 bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/40"
                            >
                              <Link href={`/Admin/Batches/${batchId}/tracks/${tracks[0].id}/students/${student.studentId}/progress`}>
                                <Eye className="w-4 h-4 me-2" /> {t("view")}
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              variant="secondary"
                              disabled
                              className="flex-1 rounded-2xl font-bold h-11 bg-background/50 opacity-50 cursor-not-allowed border border-border/40"
                            >
                              <Eye className="w-4 h-4 me-2" /> {t("view")}
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteStudent(student.studentId)}
                            className="rounded-2xl h-11 w-11 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors border border-transparent hover:border-rose-500/20"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center bg-card/20 rounded-[2.5rem] border-2 border-dashed border-border/40">
                <div className="w-16 h-16 rounded-3xl bg-muted/50 flex items-center justify-center mb-4">
                  <UsersIcon className="w-8 h-8 text-muted-foreground/20" />
                </div>
                <p className="text-xl font-extrabold text-muted-foreground italic">{t("noStudents")}</p>
                <p className="text-xs font-bold text-muted-foreground/40 mt-1 uppercase tracking-widest">{t("addFirstStudent")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Charts & Tracks */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          <Card className="rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] bg-card/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> {t("performanceChart")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }} className="rtl-axis" />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="count" name={t("studentsCount")} stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-card/60 backdrop-blur-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-border/30 px-8 pt-8">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-primary" /> {t("batchTracks")}
                </CardTitle>
                <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">{tracks.length} Curriculums</p>
              </div>
              <Dialog open={trackDialogOpen} onOpenChange={setTrackDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="default" className="rounded-2xl shadow-lg font-black h-11 px-6 bg-primary hover:bg-primary/90 transition-all border-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Plus className="w-4 h-4 me-2" /> {t("createTrack")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem] p-8 max-w-md">
                  <DialogHeader className="mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight">{t("createTrack")}</DialogTitle>
                    <p className="text-muted-foreground font-medium italic">Define a new learning path for this batch.</p>
                  </DialogHeader>
                  <Form {...trackForm}>
                    <form onSubmit={trackForm.handleSubmit(onTrackSubmit)} className="space-y-5">
                      <FormField control={trackForm.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-foreground/80 text-xs uppercase tracking-widest">{t("trackName")}</FormLabel>
                          <FormControl>
                            <Input className="rounded-xl h-14 bg-muted/50 border-0 shadow-inner px-6 font-bold" placeholder={t("trackName")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="flex gap-3 pt-4">
                        <DialogClose asChild>
                          <Button variant="secondary" className="flex-1 h-14 rounded-2xl font-bold">{t("cancel")}</Button>
                        </DialogClose>
                        <Button type="submit" className="flex-1 h-14 rounded-2xl font-black shadow-xl shadow-primary/20">{t("createTrack")}</Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto scrollbar-hide">
              {tracks.length > 0 ? (
                <div className="space-y-3 p-2">
                  {tracks.map((track) => (
                    <div key={track.id} className="group relative bg-background/40 hover:bg-background/80 border border-border/40 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1.5 flex-1 min-w-0 px-1">
                            <h4 className="font-black text-lg truncate tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{track.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary font-bold text-[10px] px-2.5 h-5 flex items-center gap-1.5 border-0">
                                <Presentation className="w-3 h-3" /> {t("lecturesCount", { count: track.lectureCount })}
                              </Badge>
                              <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">Modules</span>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditTrackModal track={track} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Button asChild variant="secondary" size="sm" className="flex-1 rounded-2xl h-10 font-bold bg-muted/40 hover:bg-primary hover:text-primary-foreground border-0 transition-all duration-300">
                            <Link href={`/Admin/Batches/${batchId}/tracks/${track.id}`}>
                              <Eye className="w-4 h-4 me-2" /> {t("view")}
                            </Link>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="icon" variant="ghost" className="rounded-2xl h-10 w-10 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 border border-transparent hover:border-rose-500/20 transition-all">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-[2rem] p-8 max-w-md">
                              <DialogHeader className="space-y-4">
                                <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center">
                                  <Trash2 className="w-7 h-7 text-rose-500" />
                                </div>
                                <DialogTitle className="text-2xl font-black text-rose-500 leading-tight">{t("deleteTrack")}</DialogTitle>
                                <p className="text-muted-foreground font-medium leading-relaxed italic">{t("deleteTrackConfirm")}</p>
                              </DialogHeader>
                              <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                                <DialogClose asChild><Button variant="secondary" className="flex-1 rounded-xl h-12 font-bold">{t("cancel")}</Button></DialogClose>
                                <Button variant="destructive" onClick={() => handleDeleteTrack(track.id)} className="flex-1 rounded-xl h-12 font-extrabold shadow-lg bg-rose-500 hover:bg-rose-600">{t("delete")}</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4 bg-muted/20 rounded-[2rem] border-2 border-dashed border-border/40 m-2">
                  <Layers className="w-12 h-12 text-muted-foreground/20" />
                  <div className="space-y-1">
                    <p className="text-lg font-black italic text-muted-foreground/60">{t("noTracks")}</p>
                    <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">Connect knowledge to this batch</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Ensure the icon doesn't break if unset
function UsersIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
