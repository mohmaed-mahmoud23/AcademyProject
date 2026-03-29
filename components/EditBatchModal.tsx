"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUpdateBatchMutation } from "@/app/redux/slices/ApiSlice";
import { UpdateBatchFormValues, updateBatchSchema } from "@/lib/zodSecma";
import { useTranslations } from "next-intl";

interface Props {
  batch: {
    id: string;
    name: string;
    startDate: string;
  };
}

export default function EditBatchModal({ batch }: Props) {
  const [updateBatch, { isLoading }] = useUpdateBatchMutation();
  const [open, setOpen] = useState(false);
  const t = useTranslations("EditBatchModal");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBatchFormValues>({
    resolver: zodResolver(updateBatchSchema),
    defaultValues: {
      id: batch.id,
      name: batch.name,
      startDate: batch.startDate.split("T")[0],
    },
  });

  useEffect(() => {
    reset({
      id: batch.id,
      name: batch.name,
      startDate: batch.startDate.split("T")[0],
    });
  }, [batch, reset]);

  const onSubmit = async (data: UpdateBatchFormValues) => {
    try {
      await updateBatch({
        ...data,
        startDate: new Date(data.startDate).toISOString(),
      }).unwrap();

      toast.success(t("success"));
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("error"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {t("edit")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editBatch")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("id")} />

          <div>
            <Label>{t("batchName")}</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>{t("startDate")}</Label>
            <Input type="date" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("updating") : t("updateBatch")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
