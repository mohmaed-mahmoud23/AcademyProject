"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

import Link from "next/link";
import {
  useDeleteLectureMutation,
  useGetlechtuertrackQuery,
  useGettracksdetailsQuery,
  usePostLectureMutation,
} from "@/app/redux/slices/ApiSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateLectureFormValues, createLectureSchema } from "@/lib/zodSecma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Lecturere } from "@/app/interfaces";

import { useState } from "react";
import EditLectureModal from "@/components/EditLectureModal";
import { 
  ArrowRight, 
  Edit, 
  Link as LinkIcon, 
  Trash2, 
  Folder, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Presentation,
  ExternalLink,
  BookOpen,
  Layout,
  MoreVertical,
  Minus
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TrackDetails() {
  const t = useTranslations("AdminTrackDetails");
  const { batchId, trackId } = useParams() as {
    batchId: string;
    trackId: string;
  };

  const [postLecture] = usePostLectureMutation();
  const { data: lecture } = useGetlechtuertrackQuery(trackId);
  const lectureTracks: Lecturere[] = lecture?.data || [];
  
  const LectcherForm = useForm<CreateLectureFormValues>({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      ContentText: "",
      DriveLink: "",
      file: "",
      title: "",
    },
  });

  const onLectuherSubmit = async (data: CreateLectureFormValues) => {
    try {
      const resalt = await postLecture({
        ContentText: data.ContentText,
        DriveLink: data.DriveLink || "",
        file: data.file,
        title: data.title,
        trackId,
      }).unwrap();
      toast.success(resalt.message || t("lectureCreated"));
    } catch (err) {
      toast.error(t("lectureCreateError"));
    }
  };

  const { data: trackData } = useGettracksdetailsQuery(trackId);
  const [deleteLecture, { isLoading: isDeleting }] = useDeleteLectureMutation();

  const handleDelete = async (lectureId: string) => {
    try {
      await deleteLecture(lectureId).unwrap();
      toast.success(t("lectureDeleted"));
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || t("deleteFailed");
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="relative group overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-primary/10 rounded-[1.5rem] shadow-inner">
              <Layout className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2 text-start">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest px-3">
                  {t("trackDetails")}
                </Badge>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Path</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">{trackData?.data.name || t("loading")}</h1>
              <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground/70">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/40 rounded-full">
                  <Presentation className="w-4 h-4 text-primary" /> {t("lectureCount", { count: trackData?.data.lectureCount || 0 })}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/40 rounded-full">
                  <BookOpen className="w-4 h-4 text-violet-500" /> {lectureTracks.length} Resources
                </div>
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-[1.2rem] font-black h-14 px-8 shadow-2xl shadow-primary/20 flex items-center gap-2 text-lg transition-all active:scale-95 group">
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> {t("createLectureBtn")}
              </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[2.5rem] p-8 max-w-lg">
              <DialogHeader className="mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <DialogTitle className="text-3xl font-black tracking-tight">{t("createLectureTitle")}</DialogTitle>
                <p className="text-muted-foreground font-medium italic">Add a new session to your learning path.</p>
              </DialogHeader>
              <Form {...LectcherForm}>
                <form onSubmit={LectcherForm.handleSubmit(onLectuherSubmit)} className="space-y-5">
                  <FormField control={LectcherForm.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80 text-xs uppercase tracking-widest">{t("titleLabel")}</FormLabel>
                      <FormControl>
                        <Input className="h-14 rounded-2xl bg-muted/50 border-0 px-6 font-bold shadow-inner" placeholder={t("titlePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={LectcherForm.control} name="ContentText" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80 text-xs uppercase tracking-widest">{t("contentLabel")}</FormLabel>
                      <FormControl>
                        <Input className="h-14 rounded-2xl bg-muted/50 border-0 px-6 font-medium shadow-inner" placeholder={t("contentPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 gap-5">
                    <FormField control={LectcherForm.control} name="DriveLink" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-foreground/80 text-xs uppercase tracking-widest">{t("driveLinkLabel")}</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50 group-focus-within:text-primary transition-colors" />
                            <Input className="h-14 rounded-2xl bg-muted/50 border-0 pl-11 pr-6 font-medium shadow-inner" placeholder="https://drive.google.com/..." {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={LectcherForm.control} name="file" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-foreground/80 text-xs uppercase tracking-widest">{t("fileLabel")}</FormLabel>
                        <FormControl>
                          <Input type="file" className="h-14 pt-4 rounded-2xl bg-muted/50 border-0 px-6 shadow-inner cursor-pointer" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <DialogClose asChild>
                      <Button variant="secondary" className="flex-1 h-14 rounded-2xl font-bold">{t("cancel")}</Button>
                    </DialogClose>
                    <Button type="submit" className="flex-1 h-14 rounded-2xl font-black shadow-xl shadow-primary/20">
                      {t("createLectureTitle")}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lectures List Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-3">
              <Minus className="w-6 h-6 text-primary" /> Learning Journey <Minus className="w-6 h-6 text-primary" />
            </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-5">
          {lectureTracks.length ? (
            lectureTracks.map((lecture, index) => (
              <AccordionItem
                key={lecture.id}
                value={lecture.id}
                className={cn(
                  "border-0 rounded-[2rem] overflow-hidden transition-all duration-500",
                  "bg-card/40 backdrop-blur-sm shadow-sm border border-border/30 hover:border-primary/20 hover:shadow-md"
                )}
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline group transition-colors">
                  <div className="flex items-center text-start gap-6 w-full">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <span className="absolute -top-2 -left-2 w-6 h-6 bg-background border border-border/50 rounded-full flex items-center justify-center text-[10px] font-black text-muted-foreground/60 shadow-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{lecture.title}</h3>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="ghost" className="h-5 px-2 text-[10px] bg-muted/60 text-muted-foreground/80 font-bold tracking-wider uppercase">
                          {t("clickToView")}
                        </Badge>
                        {lecture.fileUrl && <Badge variant="ghost" className="h-5 px-2 bg-violet-500/10 text-violet-500"><FileText className="w-2.5 h-2.5 me-1" /> PDF</Badge>}
                        {lecture.driveLink && <Badge variant="ghost" className="h-5 px-2 bg-blue-500/10 text-blue-500"><LinkIcon className="w-2.5 h-2.5 me-1" /> Link</Badge>}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-8 pb-8 pt-2 border-t border-border/20">
                  <div className="space-y-8 mt-6">
                    <div className="relative p-6 rounded-[1.5rem] bg-muted/20 border border-dashed border-border/60">
                      <div className="absolute top-4 right-4 opacity-10">
                        <FileText className="w-12 h-12" />
                      </div>
                      <h4 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-3">Topic Summary</h4>
                      <p className="text-base leading-relaxed text-foreground font-medium">
                        {lecture.contentText}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {lecture.driveLink && (
                        <a
                          href={lecture.driveLink}
                          target="_blank"
                          className="flex items-center justify-between p-4 bg-card/60 border border-border/40 rounded-2xl group hover:border-primary/40 hover:bg-primary/[0.02] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl">
                              <LinkIcon className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="font-bold text-sm">{t("openDrive")}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                        </a>
                      )}
                      {lecture.fileUrl && (
                        <a
                          href={lecture.fileUrl}
                          target="_blank"
                          className="flex items-center justify-between p-4 bg-card/60 border border-border/40 rounded-2xl group hover:border-violet-400/40 hover:bg-violet-500/[0.02] transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-violet-500/10 rounded-xl">
                              <FileText className="w-5 h-5 text-violet-500" />
                            </div>
                            <span className="font-bold text-sm">{t("viewFile")}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-violet-500 transition-colors" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border/30">
                      <Button asChild className="w-full sm:flex-[2] h-12 rounded-[1rem] font-black shadow-lg shadow-primary/20 brightness-110 active:scale-[0.98] transition-all">
                        <Link href={`/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lecture.id}`}>
                           {t("goToLecture")} <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                        </Link>
                      </Button>

                      <div className="w-full sm:flex-1">
                        <EditLectureModal lecture={lecture} trackId={trackId} />
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors border border-border/40">
                             <Trash2 className="w-5 h-5" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="rounded-[2rem] p-8 max-w-md">
                          <DialogHeader className="space-y-4">
                            <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center">
                               <Trash2 className="w-7 h-7 text-rose-500" />
                            </div>
                            <DialogTitle className="text-2xl font-black text-rose-500 leading-tight">{t("deleteLectureTitle")}</DialogTitle>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                              {t("deleteConfirm")}
                            </p>
                          </DialogHeader>
                          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                            <DialogClose asChild>
                              <Button variant="secondary" className="flex-1 rounded-xl h-12 font-bold">{t("cancel")}</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              disabled={isDeleting}
                              onClick={() => handleDelete(lecture.id)}
                              className="flex-1 rounded-xl h-12 font-extrabold shadow-lg bg-rose-500 hover:bg-rose-600"
                            >
                              {t("delete")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-card/20 border-2 border-dashed border-border/40 rounded-[2.5rem] p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-muted/40 rounded-[2rem] flex items-center justify-center">
                 <Presentation className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold italic text-muted-foreground/60">{t("noTracksYet")}</p>
                <p className="text-sm font-bold text-muted-foreground/30 uppercase tracking-widest">Kick off the path by adding the first lecture</p>
              </div>
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
}
