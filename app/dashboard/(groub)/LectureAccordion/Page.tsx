"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  BookOpen,
  FileText,
  ExternalLink,
  CalendarDays,
  Award,
  ChevronRight,
} from "lucide-react";

import { useGetlecturesidassignmentsQuery } from "@/app/redux/slices/ApiSlice";
import { useRouter } from "next/navigation";
import { Lecturere } from "@/app/interfaces";

interface Props {
  lecture: Lecturere
}


export default function LectureAccordion({ lecture }: Props) {
  const { data: assignmentsData, isLoading } = useGetlecturesidassignmentsQuery(
    lecture.id,
  );

  const router = useRouter();
  console.log("fileUrl:", lecture.fileUrl);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={lecture.id}
        className="mb-6 rounded-2xl border bg-background shadow-sm transition-all"
      >
        {/* HEADER */}
        <AccordionTrigger className="px-6 py-6 hover:no-underline">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl border">
                <BookOpen className="w-5 h-5" />
              </div>

              <div className="space-y-1 text-left">
                <h3 className="text-lg font-semibold tracking-tight">
                  {lecture.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {lecture.contentText}
                </p>
              </div>
            </div>

            <Badge variant="outline" className="text-xs">
              Lecture
            </Badge>
          </div>
        </AccordionTrigger>

        {/* CONTENT */}
        <AccordionContent className="px-6 pb-8 pt-2">
          <div className="space-y-8">
            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {lecture.contentText}
              </p>
            </div>

            {/* Drive Button */}
            {lecture.driveLink && (
              <Button
                asChild
                variant="outline"
                className="w-full h-11 rounded-xl"
              >
                <a
                  href={lecture.driveLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Lecture Resources
                </a>
              </Button>
            )}
            {lecture.fileUrl && (
              <Button
                asChild
                variant="outline"
                className="w-full h-11 rounded-xl"
              >
                <a
                  href={lecture.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Uploaded File
                </a>
              </Button>
            )}
            <Separator />

            {/* Assignments */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-semibold">
                  <FileText className="w-4 h-4" />
                  Assignments
                </h4>

                <Badge variant="secondary">
                  {assignmentsData?.data?.length || 0}
                </Badge>
              </div>

              {isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading assignments...
                </p>
              )}

              {assignmentsData?.data?.length === 0 && !isLoading && (
                <div className="text-sm text-muted-foreground border rounded-xl p-6 text-center">
                  No assignments available for this lecture
                </div>
              )}

              <div className="divide-y rounded-xl border">
                {assignmentsData?.data?.map((assignment: any) => (
                  <div
                    key={assignment.id}
                    onClick={() => router.push(`/assignments/${assignment.id}`)}
                    className="group flex items-center justify-between px-5 py-4 cursor-pointer transition hover:bg-muted/40"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{assignment.title}</p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-xs">
                        <Award className="w-3 h-3 me-1" />
                        {assignment.maxScore}
                      </Badge>

                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
