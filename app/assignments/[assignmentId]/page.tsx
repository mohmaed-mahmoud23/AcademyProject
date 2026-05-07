"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, UploadCloud, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

import { toast } from "sonner";
import { useGetAssignmentByIdQuery, useGetAssignmentmysubmissionQuery, useSubmitAssignmentstudentsubMutation } from "@/app/redux/slices/ApiSlice";

type FormValues = { file: FileList };

export default function AssignmentDetailPage() {
  const t = useTranslations("AssignmentDetailPage");
  const params = useParams();
  const assignmentId = params?.assignmentId as string;
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: assignmentData, isLoading: loadingAssignment } =
    useGetAssignmentByIdQuery(assignmentId);
  const { data: submissionData } =
    useGetAssignmentmysubmissionQuery(assignmentId);

  const [submitAssignment, { isLoading: submitting }] =
    useSubmitAssignmentstudentsubMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  if (!assignmentId) return <div className="p-10 text-center font-bold">{t("invalidAssignment")}</div>;
  if (loadingAssignment)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );

  const assignment = assignmentData?.data;
  const submission = submissionData?.data;
  const isClosed = assignment?.isClosed;

  const onSubmit = async (data: FormValues) => {
    const file = data.file?.[0];
    if (!file) return;

    try {
      setServerError(null);
      const resalt = await submitAssignment({ assignmentId, file }).unwrap();
      toast.success(resalt.message || t("success"));
      reset();
    } catch (err: any) {
      setServerError(err?.data?.message || t("submissionFailed"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 w-full">
      <Card className="w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] border-0 rounded-3xl bg-card/60 backdrop-blur-xl">
        <CardHeader className="space-y-4 pb-6">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-black">{assignment?.title}</CardTitle>
            <CardDescription className="text-sm font-medium mt-1">
              {t("submitInstruction")}
            </CardDescription>
          </div>

          <div className="flex gap-2 flex-wrap pt-2">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold rounded-lg bg-primary/10 text-primary">
              {t("due")}:{" "}
              {assignment?.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString()
                : t("notAvailable")}
            </Badge>
            <Badge className="px-3 py-1 text-sm font-bold rounded-lg bg-foreground text-background">
              {t("maxScore")}: {assignment?.maxScore}
            </Badge>
            <Badge
              className={`px-3 py-1 text-sm font-bold rounded-lg ${isClosed ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
                }`}
            >
              {isClosed ? t("closed") : t("open")}
            </Badge>
          </div>
        </CardHeader>

        <Separator className="bg-border/50" />

        <CardContent className="pt-8 space-y-6">
          {submission ? (
            <div className="bg-muted/40 border p-6 rounded-2xl space-y-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2.5 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href={submission.fileUrl} target="_blank" className="text-blue-600 font-bold hover:underline truncate block">
                    {submission.fileUrl.split("/").pop()}
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("submittedFile")}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge className="px-3 py-1.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600">
                  {t("score")}:{" "}
                  {submission.score ? submission.score : <span className="font-medium ms-1 opacity-80">{t("waitingForScore")}</span>}
                </Badge>
                <Badge className={`px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm ${submission.isFinalized ? 'bg-primary text-primary-foreground' : 'bg-amber-500 text-white'}`}>
                  {submission.isFinalized ? t("finalized") : t("pendingReview")}
                </Badge>
              </div>

              {submission.feedback && (
                <div className="bg-card p-4 rounded-xl border shadow-sm">
                  <p className="text-sm font-bold text-foreground mb-1">{t("feedback")}:</p>
                  <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                </div>
              )}
            </div>
          ) : !isClosed ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${errors.file ? 'border-rose-500 bg-rose-500/5' : 'border-border hover:border-primary hover:bg-primary/5'}`}
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <UploadCloud className="w-8 h-8 text-primary" />
                </div>
                <p className="text-base font-bold mb-1">{t("uploadTitle")}</p>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {t("onlyPdfAllowed")}
                </p>
                <Input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  {...register("file", {
                    required: t("pdfRequired"),
                    validate: (files) =>
                      files?.[0]?.type === "application/pdf" || t("onlyPdfAllowed"),
                  })}
                />

                {errors.file && (
                  <p className="text-sm font-bold text-rose-500 mt-2 bg-rose-500/10 px-3 py-1 rounded-full">
                    {errors.file.message}
                  </p>
                )}
              </label>

              {serverError && (
                <div className="bg-rose-500/10 text-rose-600 font-bold text-sm p-4 rounded-2xl">
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl h-14 font-black tracking-wide text-[15px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                {submitting && <Loader2 className="me-2 h-5 w-5 animate-spin" />}
                {submitting ? t("submitting") : t("submitAssignment")}
              </Button>
            </form>
          ) : (
            <div className="text-center p-8 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex flex-col items-center justify-center">
              <span className="text-3xl mb-3">🔒</span>
              <p className="font-bold text-rose-600 text-lg">{t("assignmentClosed")}</p>
              <p className="text-sm font-medium text-rose-600/70 mt-1">{t("cannotSubmitAnymore")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
