"use client";

import { useGetBatchQuery } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BatchesStudent() {
  const { data, isLoading } = useGetBatchQuery();
  const router = useRouter();
  const t = useTranslations("BatchesStudent");

  if (isLoading)
    return (
      <div className="flex justify-center flex-row w-full items-center h-[70vh] text-xl">
        {t("loading")}
      </div>
    );

  return (
    <div className="p-10 space-y-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-3">
          <ReactTyped
            strings={[
              t("welcome1"),
              t("welcome2"),
              t("welcome3"),
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
          />
        </h1>

        <p className="text-muted-foreground text-lg">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Table */}
      <Card className="shadow-lg border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] text-start">{t("batch")}</TableHead>
                <TableHead className="text-start">{t("tracks")}</TableHead>
                <TableHead className="text-start">{t("students")}</TableHead>
                <TableHead className="text-start">{t("startDate")}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.items?.map((batch) => (
                <TableRow
                  key={batch.id}
                  onClick={() =>
                    router.push(`/dashboard/BatchesStudent/${batch.id}`)
                  }
                  className="cursor-pointer hover:bg-muted/50 transition"
                >
                  <TableCell className="font-medium text-base text-start">
                    {batch.name}
                  </TableCell>

                  <TableCell className="text-start">
                    <Badge variant="secondary">{t("tracksCount", { count: batch.trackCount })}</Badge>
                  </TableCell>

                  <TableCell className="text-start">
                    <Badge variant="outline">
                      {t("studentsCount", { count: batch.studentCount })}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground text-start">
                    {new Date(batch.startDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
