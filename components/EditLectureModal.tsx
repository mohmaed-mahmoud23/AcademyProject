"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  useGetlecturesidQuery,
  useUpdateLectureMutation,
} from "@/app/redux/slices/ApiSlice";
import { Edit2Icon } from "lucide-react";

interface EditLectureModalProps {
  lecture: {
    id: string;
    title: string;
    contentText: string;
    driveLink?: string;
    fileUrl?: string;
  };
  trackId: string; // عشان نقدر نعمل refetch
}

interface FormValues {
  title: string;
  contentText: string;
  driveLink?: string;
  file?: FileList;
}

export default function EditLectureModal({
  lecture,
  trackId,
}: EditLectureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateLecture] = useUpdateLectureMutation();
  const { refetch } = useGetlecturesidQuery(trackId); // 🔄 refetch بعد التحديث

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: lecture.title,
      contentText: lecture.contentText,
      driveLink: lecture.driveLink || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await updateLecture({
        lectureId: lecture.id,
        title: data.title,
        ContentText: data.contentText,
        DriveLink: data.driveLink || "",
        file: data.file?.[0], // خليها File حقيقي
      }).unwrap();

      toast.success("Lecture updated successfully!");
      refetch(); // 🔄 تحديث القائمة بعد التعديل
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update lecture");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Edit2Icon />
          Edit Lecture
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader >
          <DialogTitle className="flex items-center gap-4">
            Edit Lecture
            <Edit2Icon size={15}/>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Content Text
            </label>
            <textarea
              {...register("contentText", { required: "Content is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.contentText && (
              <p className="text-xs text-red-500">
                {errors.contentText.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Drive Link</label>
            <input
              {...register("driveLink")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              File (Optional)
            </label>
            <input type="file" {...register("file")} className="w-full" />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Lecture"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
