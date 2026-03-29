"use client";

import { useGetAdminDashboardQuery } from "@/app/redux/slices/ApiSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export function TopStudentsLeaderboard() {
  const { data, isLoading } = useGetAdminDashboardQuery();
  const t = useTranslations("StudentsChart");

  if (isLoading) return <p className="text-center">{t("loading")}</p>;
  if (!data) return null;

  const students = data.data.topStudents;

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          🏆 {t("title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {students.map((student, index) => (
          <div
            key={student.email}
            className={`flex items-center gap-4 p-4 rounded-xl transition hover:bg-muted/50 ${index < 3 ? "bg-muted/30 border" : ""
              }`}
          >
            {/* Rank */}
            <div className="text-xl font-bold w-8 text-center">
              {getRankIcon(index)}
            </div>

            {/* Avatar */}
            <Avatar>
              <AvatarFallback>
                {student.studentName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Student Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{student.studentName}</p>

                <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                  {student.batchName ? (
                    <><div>🎓{student.batchName}</div></>
                  ) : (
                    <><p>{t("noBatch")}</p></>
                  )}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{student.email}</p>

              <Progress value={student.averageScore} className="mt-2 h-2" />
            </div>

            {/* Score */}
            <div className="text-end">
              <p className="font-bold text-lg">{student.averageScore}%</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
