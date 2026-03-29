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
import { ArrowLeft, ArrowRight, Edit2Icon, Tractor, Trash2 } from "lucide-react";
import { IconTrashFilled } from "@tabler/icons-react";
  export default function TrackDetails() {
    // ✅ استخدم useParams بدل params
    const { batchId, trackId } = useParams() as {
      batchId: string;
      trackId: string;
    };

    const [postLecture] = usePostLectureMutation();
    const { data: lecture } = useGetlechtuertrackQuery(trackId);
    const lectureTracks: Lecturere[] = lecture?.data || [];
const [openDelete, setOpenDelete] = useState(false);
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
        toast.success(resalt.message);
      } catch (err) {
        toast.error("Lecture created successfully already!!");
      }
    };

    const { data } = useGettracksdetailsQuery(trackId);
    const [deleteLecture, { isLoading: isDeleting }] = useDeleteLectureMutation()

  const handleDelete = async (lectureId: string) => {
    try {
      await deleteLecture(lectureId).unwrap();

      toast.success("Lecture deleted successfully");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to delete lecture";

      toast.error(errorMessage);
      console.error("Delete Error:", err);
    }
  };
    return (
      <div className="p-6 space-y-6">
        {/* Track Details */}
        <div className="space-y-2 ">
          <h1 className="text-2xl font-bold">Track Name: {data?.data.name}</h1>
          <p className="text-muted-foreground">
            Lecture Count: {data?.data.lectureCount}
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Lectcher</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle> Create Lectcher</DialogTitle>
              </DialogHeader>
              <Form {...LectcherForm}>
                <form
                  onSubmit={LectcherForm.handleSubmit(onLectuherSubmit)}
                  className="flex flex-col items-center gap-4 w-full max-w-md mx-auto"
                >
                  <FormField
                    control={LectcherForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={LectcherForm.control}
                    name="ContentText"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Content Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Content Text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={LectcherForm.control}
                    name="DriveLink"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Drive Link</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Drive Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={LectcherForm.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Create lecture
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lectures Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {lectureTracks.length ? (
            lectureTracks.map((lecture) => (
              <AccordionItem
                key={lecture.id}
                value={lecture.id}
                className="border rounded-2xl shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 transition">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{lecture.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 m-3.5">
                    <div className="bg-muted/40 p-4 rounded-xl">
                      <p className="text-sm leading-relaxed">
                        {lecture.contentText}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 ">
                      {lecture.driveLink && (
                        <a
                          href={lecture.driveLink}
                          target="_blank"
                          className="border rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition text-center"
                        >
                          📂 Open Drive
                        </a>
                      )}
                      {lecture.fileUrl && (
                        <a
                          href={lecture.fileUrl}
                          target="_blank"
                          className="border rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition text-center"
                        >
                          📎 View File
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      {/* زر Go To Lecture Details */}
                      <Link
                        href={`/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lecture.id}`}
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-xl flex items-center justify-center gap-2"
                        >
                          <ArrowRight/> Go To Lecture Details
                        </Button>
                      </Link>

                      {/* زر Edit Lecture */}
                       <EditLectureModal  lecture={lecture} trackId={trackId} />
                  
                      {/* زر Delete Lecture */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            disabled={isDeleting}
                            className="w-full rounded-xl flex items-center justify-center gap-2"
                          >
                            <Trash2 /> Delete Lecture
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Lecture</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm text-gray-500 mt-2">
                            Are you sure you want to delete this lecture? This
                            action cannot be undone.
                          </p>
                          <DialogFooter className="mt-4 flex justify-end gap-2">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              disabled={isDeleting}
                              onClick={() => handleDelete(lecture.id)}
                            >
                              <Trash2 /> Delete
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
            <>No Tracks Yet Now</>
          )}
        </Accordion>
      </div>
    );
  }
