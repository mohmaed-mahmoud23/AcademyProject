"use client";

import { useParams } from "next/navigation";
import { useGetlechtuertrackQuery } from "@/app/redux/slices/ApiSlice";
import LectureAccordion from "@/app/dashboard/(groub)/LectureAccordion/Page";
import { GetLecturesdetailsResponse, Lecturere, Lectureredetails } from "@/app/interfaces";

export default function TrackLecturesPage() {
  const params = useParams();
  const trackId = params.trackId as string;

  console.log("trackId:", trackId);

  const { data, isLoading, error } = useGetlechtuertrackQuery(trackId);

  console.log("API data:", data);
  console.log("API error:", error);

  if (isLoading) return <div>Loading lectures...</div>;
  if (error) return <div>Error loading lectures</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Track Lectures</h1>
      {data?.data?.map((lecture: Lecturere) => (
        <LectureAccordion key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
}
