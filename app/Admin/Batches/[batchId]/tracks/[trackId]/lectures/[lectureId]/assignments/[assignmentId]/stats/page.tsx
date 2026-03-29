"use client";

import { useGetAssignmentStatsQuery } from "@/app/redux/slices/ApiSlice";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function AssignmentStatsPage() {
  const { assignmentId } = useParams() as { assignmentId: string };
  const { data, isLoading, isError } = useGetAssignmentStatsQuery(assignmentId);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading stats...</p>;
  if (isError || !data?.data)
    return <p className="text-center mt-10 text-red-500">Stats not found</p>;

  const stats = data.data;
  console.log( "ava",stats.averageScore)

  return (
    <div className="max-w-full w-full mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Assignment Stats</h1>

      <Accordion type="single" collapsible className="w-full space-y-4 ">
        {/* Total Students */}
        <AccordionItem
          value="total-students"
          className="border rounded-lg shadow-sm"
        >
          <AccordionTrigger className="text-lg font-semibold px-2">
            Total Students
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 text-lg font-medium">
              {stats.totalStudents}
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Submitted Count */}
        <AccordionItem
          value="submitted-count"
          className="border rounded-lg shadow-sm"
        >
          <AccordionTrigger className="text-lg font-semibold px-2">
            Submitted Count
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-green-600 text-lg font-medium">
              {stats.submittedCount}
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Not Submitted Count */}
        <AccordionItem
          value="not-submitted-count"
          className="border rounded-lg shadow-sm"
        >
          <AccordionTrigger className="text-lg font-semibold px-2">
            Not Submitted Count
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-red-600 text-lg font-medium">
              {stats.notSubmittedCount}
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Average Score */}
        <AccordionItem
          value="average-score"
          className="border rounded-lg shadow-sm"
        >
          <AccordionTrigger className="text-lg font-semibold px-2">
            Average Score
          </AccordionTrigger>
          <AccordionContent>
          {
            stats.averageScore?<>{stats.averageScore}</>:<>No yeet</>
          }
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
