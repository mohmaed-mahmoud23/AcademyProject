"use client";

import { useGetStudentProgressQuery } from "@/app/redux/slices/ApiSlice";
import { useParams } from "next/navigation";
import { Loader2, Trophy, Percent, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StudentProgressPage() {
  const params = useParams();

  const studentId = params.studentId as string;
  const trackId = params.trackId as string;
console.log("trackId:", trackId);
console.log("studentId:", studentId);
  const { data, isLoading, isError } = useGetStudentProgressQuery({
    studentId,
    trackId,
  });

  console.log(data);
console.log("API DATA", data);
console.log("progress", data?.data?.completionPercentage);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-500 text-lg font-semibold">
         no Yet 
      </div>
    );

  const rank = data.data.rank;
  const averageScore = data.data.averageScore;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Student Track Progress
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* Progress Circle */}
          {/* <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#2563eb"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={339.292}
                  strokeDashoffset={
                    339.292 - (339.292 * progress) / 100
                  }
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>

              {/* <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-600">
                {progress}%
              </div> */}
            {/* </div>
          </div> */} 

          {/* Progress Bar */}
          {/* <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Track Completion</span>
              <span>{progress}%</span>
            </div>

            <Progress value={progress} />
          </div> */}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">

            <Card className="p-4 flex items-center gap-3">
              <Trophy className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Rank</p>
                <p className="font-bold text-lg">{rank}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-3">
              <Percent className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="font-bold text-lg">{averageScore}</p>
              </div>
            </Card>

          </div>

          {/* Status */}
          {/* <div className="flex justify-center">
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium
              ${
                progress === 100
                  ? "bg-green-100 text-green-600"
                  : progress >= 50
                  ? "bg-blue-100 text-blue-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {progress === 100
                ? "Completed"
                : progress >= 50
                ? "In Progress"
                : "Just Started"}
            </span>
          </div> */}

        </CardContent>
      </Card>
    </div>
  );
}