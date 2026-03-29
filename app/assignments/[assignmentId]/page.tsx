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
import { Loader2, UploadCloud, FileText, CheckCircle } from "lucide-react";


import { toast } from "sonner";
import { useGetAssignmentByIdQuery, useGetAssignmentmysubmissionQuery, useSubmitAssignmentstudentsubMutation } from "@/app/redux/slices/ApiSlice";

type FormValues = { file: FileList };

export default function AssignmentDetailPage() {
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

  if (!assignmentId) return <div>Invalid assignment</div>;
  if (loadingAssignment)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-6 h-6" />
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
      toast.success(resalt.message);
      reset();
    } catch (err: any) {
      setServerError(err?.data?.message || "Submission failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-2xl shadow-xl border-0 rounded-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold">
            {assignment?.title}
          </CardTitle>
          <CardDescription>
            Submit your PDF solution before deadline.
          </CardDescription>
          <div className="flex gap-3 flex-wrap">
            <Badge variant="secondary">
              Due:{" "}
              {assignment?.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString()
                : "N/A"}
            </Badge>
            <Badge className="bg-primary text-white">
              Max Score: {assignment?.maxScore}
            </Badge>
            <Badge
              className={
                isClosed ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }
            >
              {isClosed ? "Closed" : "Open"}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          {/* لو فيه submission */}
          {submission ? (
            <Card className=" p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {submission.fileUrl.split("/").pop()}
                </a>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-500">
                  Score:{" "}
                  {submission.score ? (
                    <>{submission.score}</>
                  ) : (
                    <>
                      <p> whaite for Score you..</p>
                    </>
                  )}
                </Badge>
                <Badge className="bg-blue-500 text-white">
                  {submission.isFinalized
                    ? "Finalized"
                    : "Pleas Whait is Pending for submitoin..."}
                </Badge>
              </div>
              {submission.feedback && (
                <p className="text-muted-foreground">
                  Feedback: {submission.feedback}
                </p>
              )}
            </Card>
          ) : !isClosed ? (
            // لو مفيش submission وassignment مفتوح
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary transition">
                <UploadCloud className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />
                <Input
                  type="file"
                  accept="application/pdf"
                  className="cursor-pointer"
                  {...register("file", {
                    required: "PDF file is required",
                    validate: (files) =>
                      files?.[0]?.type === "application/pdf" ||
                      "Only PDF files are allowed",
                  })}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Only PDF files are allowed
                </p>
                {errors.file && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.file.message}
                  </p>
                )}
              </div>
              {serverError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                  {serverError}
                </div>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl text-base"
                size="lg"
              >
                {submitting && (
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                )}
                {submitting ? "Submitting..." : "Submit Assignment"}
              </Button>
            </form>
          ) : (
            // لو مفيش submission وassignment مقفول
            <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
              ❌ Assignment is closed. You can't submit anymore.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
