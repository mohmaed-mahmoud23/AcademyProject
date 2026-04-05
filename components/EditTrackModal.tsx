"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useUpdateTrackMutation } from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";
import { Track } from "@/app/interfaces";
import { Edit2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EditTrackModal({ track }: { track: Track }) {
  const t = useTranslations("EditTrackModal");
  const [updateTrack, { isLoading }] = useUpdateTrackMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: track.name,
    },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      const res = await updateTrack({
        trackId: track.id,
        name: data.name,
      }).unwrap();

      toast.success(res.message || t("success"));
    } catch (err: any) {
      toast.error(err?.data?.message || t("error"));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center justify-center gap-2 h-10 w-full rounded-xl hover:shadow-sm font-bold border-border/40">
          <Edit2Icon size={14} /> <span className="hidden sm:inline">{t("editTrack")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editTrack")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} placeholder={t("trackNamePlaceholder")} />

          <Button type="submit" disabled={isLoading} className="w-full font-bold">
            {isLoading ? t("updating") : t("updateTrack")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}