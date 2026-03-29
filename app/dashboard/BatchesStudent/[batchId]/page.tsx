"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

import { useGetBatchtracksQuery } from "@/app/redux/slices/ApiSlice";

export default function BatchTracksPage() {
  const params = useParams();
  const batchId = params.batchId as string;

  const { data, isLoading, error } = useGetBatchtracksQuery(batchId);

  if (isLoading) return <div>Loading tracks...</div>;
  if (!data) return <div className=" flex h-[100vh] justify-center w-full  items-center font-extrabold text-blue-400  text-3xl"> Please Select Your Batch !!!</div>;

  return (
    <div className="w-full p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Tracks</h1>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {data?.data?.map((track) => (
          <AccordionItem
            key={track.id}
            value={track.id}
            className="w-full border rounded-lg shadow-sm"
          >
            <AccordionTrigger className="flex justify-between items-center px-4 py-3 rounded-lg w-full transition">
              <span className="font-medium text-shadow-muted-foreground">{track.name}</span>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4 w-full">
              <Card className="p-3 border rounded-lg shadow-none w-full">
                <Link
                  href={`/dashboard/BatchesStudent/${batchId}/${track.id}/lectures`}
                  className="block w-full  hover:text-blue-600 transition"
                >
                  Go to Lectures
                </Link>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
