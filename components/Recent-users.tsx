"use client";

import { useGetAdminDashboardQuery } from "@/app/redux/slices/ApiSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function RecentUsers() {
  const { data } = useGetAdminDashboardQuery();
  const t = useTranslations("RecentUsers");

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">{t("name")}</TableHead>
              <TableHead className="text-start">{t("email")}</TableHead>
              <TableHead className="text-start">{t("role")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.data.recentUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{user.fullName}</TableCell>
                <TableCell className="text-start">{user.email}</TableCell>
                <TableCell className="text-start">
                  <Badge>{user.role === "Admin" ? t("admin") : t("student")}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
