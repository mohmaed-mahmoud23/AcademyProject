"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useUpdateAssignmentMutation } from "@/app/redux/slices/ApiSlice";
import {
  updateAssignmentSchema,
  UpdateAssignmentFormValues,
} from "@/lib/zodSecma";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Assignment, Lectureredetails } from "@/app/interfaces";
import {
  useDeleteLectureMutation,
  useGetlecturesidassignmentsQuery,
  useGetlecturesidQuery,
  usePostAssignmentMutation,
  usePostLectureMutation,
} from "@/app/redux/slices/ApiSlice";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  CreateAssignmentFormValues,
  createAssignmentSchema,
  CreateLectureFormValues,
} from "@/lib/zodSecma";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { DeleteIcon } from "lucide-react";

export default function LectureIdPage() {
  const [postAssignment] = usePostAssignmentMutation();
  const [updateAssignment, { isLoading: isUpdating }] =
    useUpdateAssignmentMutation()
  const router = useRouter();
  const { batchId, trackId, lectureId } = useParams() as {
    batchId: string;
    trackId: string;
    lectureId: string;
  };
  const LectcherassomentForm = useForm<CreateAssignmentFormValues>({
    resolver: zodResolver(createAssignmentSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      maxScore: 100,
    },
  });

  
const updateForm = useForm<UpdateAssignmentFormValues>({
  resolver: zodResolver(updateAssignmentSchema),
  defaultValues: {
    title: "",
    maxScore: 100,
    dueDate: "",
  },
});



const handleUpdateAssignment = async (
  data: UpdateAssignmentFormValues,
  assignmentId: string,
) => {
  try {
    const formattedDate =
      data.dueDate.length === 16 ? data.dueDate + ":00" : data.dueDate;

    const res = await updateAssignment({
      assignmentId,
      title: data.title,
      maxScore: data.maxScore,
      dueDate: formattedDate,
    }).unwrap();

    toast.success(res.message || "Assignment updated");
  } catch (err: any) {
    toast.error(err?.data?.message || "Update failed");
  }
};

  const onLectcherassomentForm = async (data: CreateAssignmentFormValues) => {
    try {
      const formattedDate =
        data.dueDate.length === 16 ? data.dueDate + ":00" : data.dueDate;

      const resalt = await postAssignment({
        lectureId,
        title: data.title,
        maxScore: data.maxScore,
        dueDate: formattedDate,
      }).unwrap();

      toast.success(resalt.message);

      LectcherassomentForm.reset();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Assignment Created success ordy!!";

      toast.error(errorMessage);
      console.log("Backend Error:", err);
    }
  };

  const { data, isLoading, isError } = useGetlecturesidQuery(lectureId);
  const { data: assignmentlecture } =
    useGetlecturesidassignmentsQuery(lectureId);

  console.log("Assignment", assignmentlecture);

  const lectureData = data?.data;

  console.log();
  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Loading lecture...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        Failed to load lecture.
      </p>
    );

  if (!lectureData)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Lecture not found
      </p>
    );

  const lecturesArray = Array.isArray(lectureData)
    ? lectureData
    : [lectureData];

  return (
    <div className="max-w-full w-full mx-auto mt-10 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lecture Details</h1>

        {/* زر Create Assignment */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Create Assignment
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle> Create Assignment</DialogTitle>
            </DialogHeader>
            <Form {...LectcherassomentForm}>
              <form
                onSubmit={LectcherassomentForm.handleSubmit(
                  onLectcherassomentForm,
                )}
              >
                <FormField
                  control={LectcherassomentForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>titel</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your titel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={LectcherassomentForm.control}
                  name="maxScore"
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
                <FormField
                  control={LectcherassomentForm.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Create lecture </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {lecturesArray.map((lecture: Lectureredetails) => (
          <AccordionItem
            key={lecture.id}
            value={lecture.id}
            className="border rounded-lg px-4 shadow-sm"
          >
            <AccordionTrigger className="text-lg font-semibold">
              {lecture.title}
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4 mt-3">
                {/* Content */}
                <div>
                  <p className="text-sm text-gray-500">Content</p>
                  <p className="font-medium">{lecture.contentText}</p>
                </div>

                {/* Assignment Count */}
                <div>
                  <p className="text-sm text-gray-500">Assignments</p>
                  <p className="font-medium">{lecture.assignmentCount}</p>
                </div>

                {/* Drive Link */}
                <div>
                  <p className="text-sm text-gray-500">Drive Link</p>
                  <a
                    href={lecture.driveLink}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Open Google Drive
                  </a>
                </div>

                {/* File */}
                <div>
                  <p className="text-sm text-gray-500">Lecture File</p>
                  <a
                    href={lecture.fileUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View / Download File
                  </a>
                </div>
              </div>
            
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {assignmentlecture?.data.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignmentlecture.data.map((assignment) => {
            const isClosed = assignment.isClosed;

            return (
              <div
                key={assignment.id}
                onClick={() =>
                  router.push(
                    `/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments/${assignment.id}`,
                  )
                }
                className="group relative p-6 rounded-2xl border bg-background hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Glow Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-purple-500/10" />

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition">
                    {assignment.title}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  isClosed
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
                  >
                    {isClosed ? "Closed" : "Open"}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">
                      Max Score:
                    </span>{" "}
                    {assignment.maxScore}
                  </p>

                  <p>
                    <span className="font-medium text-foreground">
                      Due Date:
                    </span>{" "}
                    {new Date(assignment.dueDate).toLocaleDateString()} -{" "}
                    {new Date(assignment.dueDate).toLocaleTimeString()}
                  </p>
                </div>

                {/* Button */}
                {!isClosed && (
                  <button className="mt-5 w-full rounded-xl bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition">
                    Submit Assignment
                  </button>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-3"
                      onClick={(e) => {
                        e.stopPropagation();

                        updateForm.reset({
                          title: assignment.title,
                          maxScore: assignment.maxScore,
                          dueDate: assignment.dueDate.slice(0, 16),
                        });
                      }}
                    >
                      Edit Assignment
                    </Button>
                  </DialogTrigger>

                  <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle>Edit Assignment</DialogTitle>
                    </DialogHeader>

                    <Form {...updateForm}>
                      <form
                        onSubmit={updateForm.handleSubmit((data) =>
                          handleUpdateAssignment(data, assignment.id),
                        )}
                        className="space-y-4"
                      >
                        {/* title */}
                        <FormField
                          control={updateForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Assignment title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* max score */}
                        <FormField
                          control={updateForm.control}
                          name="maxScore"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Score</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
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

                        {/* due date */}
                        <FormField
                          control={updateForm.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input type="datetime-local" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          disabled={isUpdating}
                          type="submit"
                          className="w-full"
                        >
                          {isUpdating ? "Updating..." : "Update Assignment"}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No assignments available 🚀
          </p>
        </div>
      )}
    </div>
  );
}
