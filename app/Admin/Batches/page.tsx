/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteBatchMutation } from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Batch } from "@/app/interfaces/index";
import { useMemo } from "react";
import EditBatchModal from "@/components/EditBatchModal";
import { useGetBatchQuery } from "@/app/redux/slices/ApiSlice";
import { useTranslations } from "next-intl";

export default function Batches() {
  const { data, isLoading, isError } = useGetBatchQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const t = useTranslations("BatchesPage");

  const batches: Batch[] = data?.data.items ?? [];

  const sortedBatches = useMemo(() => {
    return [...batches].sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  }, [batches]);

  if (isLoading) return <p>{t("loading")}</p>;
  if (isError) return <p>{t("error")}</p>;

  const handleDelete = async (batchId: string) => {
    try {
      await deleteBatch(batchId).unwrap();
      toast.success("Batch deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete batch");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">{t("title")}</h1>

        <Link
          className={buttonVariants()}
          href={"/Admin/Batches/createbatches"}
        >
          {t("createBatch")}
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{t("name")}</TableHead>
            <TableHead className="text-start">{t("startDate")}</TableHead>
            <TableHead className="text-start">{t("students")}</TableHead>
            <TableHead className="text-start">{t("tracks")}</TableHead>
            <TableHead className="text-start"></TableHead>
            <TableHead className="text-start"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBatches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell className="text-start">
                <Link href={`/Admin/Batches/${batch.id}`}>{batch.name}</Link>
              </TableCell>
              <TableCell className="text-start">
                {new Date(batch.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-start">{batch.studentCount}</TableCell>
              <TableCell className="text-start">{batch.trackCount}</TableCell>
              <TableCell className="text-start">
                <EditBatchModal batch={batch} />
              </TableCell>
              <TableCell className="text-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="text-sm">
                      {t("delete")}
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("deleteBatch")}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                      {t("deleteConfirm")}
                    </p>

                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">{t("cancel")}</Button>
                      </DialogClose>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(batch.id)}
                      >
                        {t("delete")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
