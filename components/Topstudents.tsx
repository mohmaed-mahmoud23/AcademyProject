"use client";

import { useGetAdminDashboardQuery } from "@/app/redux/slices/ApiSlice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export function TopStudents() {
  const { data } = useGetAdminDashboardQuery();

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Top Students</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.data.topStudents.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-muted-foreground">
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && index + 1}
              </span>

              <div>
                <p className="font-medium">{student.studentName}</p>
                <p className="text-xs text-muted-foreground">{student.email}</p>
              </div>
            </div>

            <Badge>{student.averageScore}%</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
