"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAdminDashboardQuery } from "@/app/redux/slices/ApiSlice";
import { useTranslations } from "next-intl";

export function SectionCards() {
  const { data } = useGetAdminDashboardQuery();
  const t = useTranslations("SectionCards");

  if (!data) return <div>{t("loading")}</div>;

  const stats = [
    {
      title: t("totalStudents"),
      value: data.data.totalStudents,
      trend: "up",
      description: t("studentsDesc"),
    },
    {
      title: t("totalAdmins"),
      value: data.data.totalAdmins,
      trend: "up",
      description: t("adminsDesc"),
    },
    {
      title: t("totalTracks"),
      value: data.data.totalTracks,
      trend: "up",
      description: t("tracksDesc"),
    },
    {
      title: t("totalBatches"),
      value: data.data.totalBatches,
      trend: "up",
      description: t("batchesDesc"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {stat.trend === "up" ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {stat.trend === "up" ? "+12%" : "-12%"}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {stat.description}{" "}
              {stat.trend === "up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}