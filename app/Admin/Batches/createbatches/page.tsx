"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, BackpackIcon } from "lucide-react";
import { useCreatebatcgMutation } from "@/app/redux/slices/ApiSlice";
import { useTranslations } from "next-intl";

export default function CreateBatchPage() {
  const t = useTranslations("AdminCreateBatch");
  const router = useRouter();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    startDate: "",
  });

  const [createBatch, { isLoading }] = useCreatebatcgMutation();

  // validation function
  const validate = () => {
    let valid = true;

    const newErrors = {
      name: "",
      startDate: "",
    };

    if (!name.trim()) {
      newErrors.name = "Batch name is required";
      valid = false;
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {
      await createBatch({
        name,
        startDate,
      }).unwrap();

      toast.success(t("success"));

      router.push(`/Admin/Batches`);
    } catch (error: unknown) {
      toast.error(error?.data?.message || t("error"));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">{t("title")}</h1>

        <Link className="flex items-center " href={"/Admin/Batches"}>
          <Button variant={"outline"}>
            <ArrowLeft className="rtl:rotate-180" />
            {t("back")}
          </Button>
        </Link>
      </div>

      <div className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t("cardTitle")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Batch Name */}
            <div className="space-y-2">
              <Label>{t("nameLabel")}</Label>

              <Input
                placeholder={t("namePlaceholder")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
              />

              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label>{t("dateLabel")}</Label>

              <Input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setErrors((prev) => ({ ...prev, startDate: "" }));
                }}
              />

              {errors.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate}</p>
              )}
            </div>

            {/* Button */}
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? t("creating") : t("createButton")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
