"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useCloseAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentByIdQuery,
} from "@/app/redux/slices/ApiSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Trophy, 
  Clock, 
  FileText, 
  Users, 
  BarChart3, 
  Trash2, 
  Lock, 
  Eye, 
  ExternalLink,
  BookOpen,
  Layout
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssignmentDetailsPage() {
  const t = useTranslations("AdminAssignmentDetailsPage");
  const { assignmentId, batchId, lectureId, trackId } = useParams() as {
    assignmentId: string;
    trackId: string;
    batchId: string;
    lectureId: string;
  };
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  const [closeAssignment, { isLoading: isClosing }] = useCloseAssignmentMutation();
  const [deleteAssignment, { isLoading: isDeleting }] = useDeleteAssignmentMutation();
  const { data, isLoading, isError } = useGetAssignmentByIdQuery(assignmentId);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 animate-pulse max-w-7xl mx-auto mt-8">
        <Skeleton className="h-10 w-1/3 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[400px] rounded-3xl" />
          <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-rose-500/10 p-4 rounded-full">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-rose-500">{t("notFound")}</h2>
        <Button variant="outline" onClick={() => router.back()}>{t("cancel")}</Button>
      </div>
    );
  }

  const assignment = data.data;

  const handleDelete = async () => {
    try {
      const res = await deleteAssignment(assignment.id).unwrap();
      toast.success(res.message);
      router.push(`/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments`);
    } catch {
      toast.error(t("deleteFailed"));
    }
  };

  const handleClose = async () => {
    try {
      const res = await closeAssignment(assignment.id).unwrap();
      toast.success(res.message);
    } catch {
      toast.error(t("closeFailed"));
    }
  };

  const isClosed = assignment.isClosed;
  const dueDate = new Date(assignment.dueDate);
  const isPastDue = dueDate < new Date();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-3xl shadow-sm">
        <div className="space-y-1.5 text-start">
          <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
            <Layout className="w-4 h-4" /> {t("title")}
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{assignment.title}</h1>
          <div className="flex flex-wrap gap-3 items-center text-muted-foreground font-medium text-sm">
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {assignment.lectureTitle}
            </Badge>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5">
              <Layout className="w-4 h-4 opacity-70" /> {assignment.trackName}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-xl font-bold h-12 px-6 shadow-sm hover:bg-primary/5 hover:text-primary transition-all border-border/60"
            onClick={() => router.push(`/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments/${assignment.id}/submissions`)}
          >
            <Users className="w-4 h-4 me-2" /> {t("viewSubmissions")}
          </Button>
          <Button
            className="rounded-xl font-bold h-12 px-6 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all"
            onClick={() => router.push(`/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments/${assignment.id}/stats`)}
          >
            <BarChart3 className="w-4 h-4 me-2" /> {t("viewStats")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 text-start">
          <Card className="rounded-3xl border-0 shadow-sm bg-card/60 overflow-hidden">
            <CardHeader className="border-b border-border/30 bg-muted/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{t("description")}</CardTitle>
                  <CardDescription className="font-medium">{assignment.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground font-medium bg-muted/10 p-6 rounded-2xl border border-dashed border-border/50">
                  {/* Assuming content exists or just showing a placeholder if title is all we have */}
                  {assignment.title} - {t("description")}
                </p>
              </div>

              {assignment.fileUrl && (
                <div className="mt-8 flex items-center justify-between p-5 bg-primary/5 border border-primary/10 rounded-2xl group hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{t("File")}</p>
                      <p className="text-xs font-medium text-muted-foreground uppercase">{t("File")}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20" asChild>
                    <a href={assignment.fileUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant={isClosed ? "secondary" : "destructive"}
              disabled={isClosed || isClosing}
              onClick={handleClose}
              className="flex-1 rounded-2xl font-bold h-14 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-5 h-5 me-2" />
              {isClosed ? t("alreadyClosed") : t("closeAssignment")}
            </Button>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 rounded-2xl font-bold h-14 border-2 hover:bg-rose-500/5 hover:text-rose-500 hover:border-rose-500/20 transition-all active:scale-95">
                  <Trash2 className="w-5 h-5 me-2" /> {t("deleteAssignment")}
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl p-8 max-w-md">
                <DialogHeader className="space-y-3">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-2">
                    <Trash2 className="w-6 h-6 text-rose-500" />
                  </div>
                  <DialogTitle className="text-2xl font-black text-rose-500">{t("deleteAssignment")}</DialogTitle>
                  <p className="text-muted-foreground font-medium leading-relaxed">{t("deleteWarning")}</p>
                </DialogHeader>
                <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary" className="rounded-xl h-12 font-bold flex-1">{t("cancel")}</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="rounded-xl h-12 font-bold flex-1 shadow-lg bg-rose-500 hover:bg-rose-600">
                    {t("delete")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-0 shadow-sm bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Clock className="w-4 h-4 text-primary" /> {t("statusIndicator")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className={`rounded-lg px-4 py-1.5 font-black text-sm border-0 shadow-sm ${
                  isClosed ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {isClosed ? t("closed") : t("open")}
                </Badge>
                <div className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isClosed ? "bg-rose-500" : "bg-emerald-500"}`} />
                  {isClosed ? "No submissions allowed" : "Active & Accepting"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm bg-card/60 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-violet-500" /> {t("dueDate")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-2xl font-black">{dueDate.toLocaleDateString()}</p>
                <p className="text-sm font-bold text-muted-foreground">{dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">{t("deadlineProximity")}</p>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isPastDue ? "bg-rose-500" : "bg-primary"}`} 
                    style={{ width: isPastDue ? "100%" : "60%" }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Trophy className="w-4 h-4 text-amber-500" /> {t("maxScore")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-amber-500">{assignment.maxScore}</span>
                <span className="text-sm font-bold text-muted-foreground">pts</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground mt-2">Maximum attainable grade for this task.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  );
}
