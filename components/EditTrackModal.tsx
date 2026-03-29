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

export default function EditTrackModal({ track }: { track: Track }) {
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

      toast.success(res.message || "Track updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
         
                                   <Edit2Icon size={10}/>    Edit Track
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Track</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} />

          <Button type="submit" disabled={isLoading} className="w-full">
            Update Track
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}