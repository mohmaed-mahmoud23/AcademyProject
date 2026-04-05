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
import { useTranslations } from "next-intl";

interface EditLectureModalProps {
  lecture: {
    id: string;
    title: string;
    contentText: string;
    driveLink?: string;
    fileUrl?: string;
  };
  trackId: string;
}

interface FormValues {
  title: string;
  contentText: string;
  driveLink?: string;
  file?: FileList;
}

export default function EditLectureModal({ lecture, trackId }: EditLectureModalProps) {
  const t = useTranslations("EditLectureModal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateLecture] = useUpdateLectureMutation();
  const { refetch } = useGetlecturesidQuery(trackId);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
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
        file: data.file?.[0], 
      }).unwrap();

      toast.success(t("success"));
      refetch(); 
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center justify-center gap-2">
          <Edit2Icon size={16} /> {t("editLecture")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {t("editLecture")} <Edit2Icon size={18} />
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-semibold mb-1">{t("title")}</label>
            <input
              {...register("title", { required: t("titleRequired") })}
              className="w-full border rounded-xl px-4 py-2 bg-muted/50 focus:ring-1 focus:ring-primary outline-none"
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">{t("contentText")}</label>
            <textarea
              {...register("contentText", { required: t("contentRequired") })}
              className="w-full border rounded-xl px-4 py-2 bg-muted/50 min-h-[100px] focus:ring-1 focus:ring-primary outline-none"
            />
            {errors.contentText && <p className="text-xs text-rose-500 mt-1">{errors.contentText.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">{t("driveLink")}</label>
            <input
              {...register("driveLink")}
              className="w-full border rounded-xl px-4 py-2 bg-muted/50 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">{t("fileOptional")}</label>
            <input type="file" {...register("file")} className="w-full border rounded-xl px-3 py-2 bg-muted/50" />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl font-semibold">{t("cancel")}</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="rounded-xl font-bold">
              {isSubmitting ? t("updating") : t("updateLecture")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
