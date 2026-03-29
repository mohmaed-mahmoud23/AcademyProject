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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createdegreSchema, createdegreSchemaval } from "@/lib/zodSecma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function SubmissionsPage() {
  const [gradeSubmission, { isLoading: isGrading }] =
    useGradeSubmissionMutation();
  const { assignmentId } = useParams() as { assignmentId: string };
  const degreForm = useForm<createdegreSchemaval>({
    resolver: zodResolver(createdegreSchema),
    defaultValues: {
      feedback: " ",
      score: 100,
    },
  });
  const onSubmit = async (
    data: { feedback: string; score: number },
    submissionId: string,
  ) => {
    try {
      const res = await gradeSubmission({
        submissionId,
        score: data.score,
        feedback: data.feedback,
      }).unwrap();

      toast.success(res.message);

      console.log("graded", res);
    } catch (err: any) {
      // err ممكن يبقى object من RTK Query
      const message =
        err?.data?.message || err?.error || "Failed to grade submission";
      toast.error(message);
    }
  };
  const { data, isLoading, isError } =
    useGetAssignmentSubmissionsQuery(assignmentId);

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading submissions...</p>
    );

  if (isError || !data?.data)
    return (
      <p className="text-center mt-10 text-red-500">Submissions not found</p>
    );

  const submissions = data.data;
  console.log("submissions", submissions);
  return (
    <div className="max-w-full w-full mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Assignment Submissions
      </h1>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {submissions.length ? (
          submissions.map((submission, index) => (
            <AccordionItem
              key={submission.submissionId}
              value={submission.submissionId}
              className="border rounded-lg shadow-sm"
            >
              <AccordionTrigger className="text-lg font-semibold px-4">
                <div className="flex justify-between w-full pe-4">
                  <span>{submission.studentName}</span>

                  <span
                    className={
                      submission.isFinalized
                        ? "text-green-600 font-bold"
                        : "text-yellow-600 font-bold"
                    }
                  >
                    {submission.isFinalized ? "Finalized" : "Pending"}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 space-y-3">
                {/* Student ID */}
                <div className="flex justify-between"></div>

                {/* Submission ID */}

                {/* Score */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Score</span>
                  <span className="font-medium">
                    {submission.score ?? "Not graded yet"}
                  </span>
                </div>

                {/* Submitted At */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted At</span>
                  <span className="font-medium">{submission.submittedAt}</span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(submission.fileUrl, "_blank")}
                  >
                    View File
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        add Grade
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle> Grade</DialogTitle>
                      </DialogHeader>
                      <Form {...degreForm}>
                        <form
                          onSubmit={degreForm.handleSubmit((data) =>
                            onSubmit(data, submission.submissionId)
                          )}
                        >

                          <FormField
                            control={degreForm.control}
                            name="feedback"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>feedback</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your feedback"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={degreForm.control}
                            name="score"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Score</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter max score"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" disabled={isGrading}>
                            {isGrading ? "Grading..." : "Create score"}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <>No Assignment Submissions yet</>
        )}
      </Accordion>
    </div>
  );
}
