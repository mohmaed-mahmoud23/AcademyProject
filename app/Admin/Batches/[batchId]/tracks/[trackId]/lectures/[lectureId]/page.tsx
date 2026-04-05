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
import { AlertCircle, Calendar, CheckCircle, FileText, Globe, Layers, Link as LinkIcon, Loader2, Plus, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export default function LectureIdPage() {
  const t = useTranslations("AdminLectureDetails");
  const [postAssignment] = usePostAssignmentMutation();
  const [updateAssignment, { isLoading: isUpdating }] = useUpdateAssignmentMutation();
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
      fileAsimment: undefined,
    },
  });

  const updateForm = useForm<UpdateAssignmentFormValues>({
    resolver: zodResolver(updateAssignmentSchema),
    defaultValues: {
      title: "",
      maxScore: 100,
      dueDate: "",
      fileAsimment: undefined,
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
      file: data.fileAsimment,
    }).unwrap();

    toast.success(res.message || t("assignmentUpdated"));
  } catch (err: any) {
    toast.error(err?.data?.message || t("updateFailed"));
  }
};

  const onLectcherassomentForm = async (data: CreateAssignmentFormValues) => {
    try {
      const formattedDate = data.dueDate.length === 16 ? data.dueDate + ":00" : data.dueDate;

      const resalt = await postAssignment({
        lectureId,
        title: data.title,
        maxScore: data.maxScore,
        dueDate: formattedDate,
          file: data.fileAsimment, // ✅

      }).unwrap();

      toast.success(resalt.message || t("assignmentCreated"));
      LectcherassomentForm.reset();
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || t("assignmentCreateError");
      toast.error(errorMessage);
    }
  };

  const { data, isLoading, isError } = useGetlecturesidQuery(lectureId);
  const { data: assignmentlecture } = useGetlecturesidassignmentsQuery(lectureId);

  const lectureData = data?.data;

  if (isLoading) return (
    <div className="flex flex-col h-[60vh] justify-center items-center text-muted-foreground gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="font-bold text-lg">{t("loadingLecture")}</p>
    </div>
  );

  if (isError) return (
    <div className="flex flex-col h-[60vh] justify-center items-center text-rose-500 gap-4">
      <AlertCircle className="w-12 h-12" />
      <p className="font-bold text-lg">{t("failedToLoad")}</p>
    </div>
  );

  if (!lectureData) return (
    <div className="flex flex-col h-[60vh] justify-center items-center text-muted-foreground text-lg font-bold">
      {t("notFound")}
    </div>
  );

  const lecturesArray = Array.isArray(lectureData) ? lectureData : [lectureData];
console.log( "asssimaent",assignmentlecture?.data);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <Layers className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {t("lectureDetails")}
            </h1>
            <p className="text-sm font-semibold text-muted-foreground uppercase">
              {t("adminView")}
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-xl font-bold h-12 px-6 shadow-lg bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 me-2" /> {t("createAssignmentBtn")}
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-3xl p-8">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">
                {t("createAssignmentTitle")}
              </DialogTitle>
            </DialogHeader>
            <Form {...LectcherassomentForm}>
              <form
                onSubmit={LectcherassomentForm.handleSubmit(
                  onLectcherassomentForm,
                )}
                className="space-y-4"
              >
                <FormField
                  control={LectcherassomentForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        {t("titleLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                          placeholder={t("titlePlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={LectcherassomentForm.control}
                    name="maxScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          {t("maxScoreLabel")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                            placeholder="100"
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
                        <FormLabel className="font-semibold">
                          {t("dueDateLabel")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={LectcherassomentForm.control}
                    name="fileAsimment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Upload PDF
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="application/pdf"
                            className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-bold shadow-lg mt-4"
                >
                  {t("createAssignmentSubmit")}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={lecturesArray[0]?.id}
      >
        {lecturesArray.map((lecture: Lectureredetails) => (
          <AccordionItem
            key={lecture.id}
            value={lecture.id}
            className="border-0 bg-card rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-start overflow-hidden mb-8"
          >
            <AccordionTrigger className="px-8 py-6 text-xl font-black bg-muted/20 hover:no-underline">
              {lecture.title}
            </AccordionTrigger>

            <AccordionContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      {t("content")}
                    </p>
                    <p className="font-medium text-[15px] leading-relaxed bg-muted/30 p-4 rounded-2xl">
                      {lecture.contentText}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      {t("assignments")}
                    </p>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <p className="font-black text-2xl">
                        {lecture.assignmentCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    {t("resources")}
                  </p>
                  {lecture.driveLink && (
                    <a
                      href={lecture.driveLink}
                      target="_blank"
                      className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition shadow-sm group"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-xl group-hover:scale-110 transition">
                        <Globe className="text-blue-500 w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm">
                        {t("openGoogleDrive")}
                      </span>
                    </a>
                  )}
                  {lecture.fileUrl && (
                    <a
                      href={lecture.fileUrl}
                      target="_blank"
                      className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition shadow-sm group"
                    >
                      <div className="p-2 bg-purple-500/10 rounded-xl group-hover:scale-110 transition">
                        <FileText className="text-purple-500 w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm">
                        {t("viewFileLink")}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center gap-3 pt-4">
        <Target className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-black">{t("createdAssignments")}</h2>
      </div>
      {assignmentlecture?.data.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
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
                className="group relative p-6 rounded-[2rem] border-0 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden text-start"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5" />

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold group-hover:text-primary transition line-clamp-2 pr-2">
                    {assignment.title}
                  </h3>
                  <Badge
                    className={`shrink-0 ${isClosed ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"} shadow-none`}
                  >
                    {isClosed ? t("closedStatus") : t("openStatus")}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {t("maxScoreCard")}
                    </span>
                    <span className="font-black text-foreground">
                      {assignment.maxScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {t("dueDateCard")}
                    </span>
                    <div className="text-end font-semibold text-sm">
                      {new Date(assignment.dueDate).toLocaleDateString()} <br />
                      <span className="text-muted-foreground text-xs">
                        {new Date(assignment.dueDate).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {/* {t("maxScoreCard")} */}
                    {/* </span>
                    <Button asChild className="max-w-full w-full">
                      <a href={assignment?.file} target="_blank"> 
                        View File
                      </a>
                    </Button> */}
                  {/* </div> */} 
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-xl font-bold border-border/60 z-10 relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateForm.reset({
                          title: assignment.title,
                          maxScore: assignment.maxScore,
                          dueDate: assignment.dueDate.slice(0, 16),
                        });
                      }}
                    >
                      {t("editAssignmentBtn")}
                    </Button>
                  </DialogTrigger>

                  <DialogContent
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-3xl p-8"
                  >
                    <DialogHeader className="mb-4">
                      <DialogTitle className="text-2xl font-bold">
                        {t("editAssignmentTitle")}
                      </DialogTitle>
                    </DialogHeader>

                    <Form {...updateForm}>
                      <form
                        onSubmit={updateForm.handleSubmit((data) =>
                          handleUpdateAssignment(data, assignment.id),
                        )}
                        className="space-y-4"
                      >
                        <FormField
                          control={updateForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">
                                {t("titleLabel")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={updateForm.control}
                            name="maxScore"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">
                                  {t("maxScoreLabel")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="h-12 rounded-xl bg-muted/50 border-0 px-4"
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
                            control={updateForm.control}
                            name="dueDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">
                                  {t("dueDateLabel")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="datetime-local"
                                    className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={updateForm.control}
                            name="fileAsimment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">
                                  Update PDF
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="application/pdf"
                                    className="h-12 rounded-xl bg-muted/50 border-0 px-4"
                                    onChange={(e) =>
                                      field.onChange(e.target.files?.[0])
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          disabled={isUpdating}
                          type="submit"
                          className="w-full h-12 rounded-xl font-bold shadow-lg mt-4"
                        >
                          {isUpdating
                            ? t("updating")
                            : t("updateAssignmentBtn")}
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
        <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed">
          <p className="text-muted-foreground text-lg font-bold">
            {t("noAssignments")} 🚀
          </p>
        </div>
      )}
    </div>
  );
}
