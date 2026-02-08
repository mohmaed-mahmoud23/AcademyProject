"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { batches } from "@/app/data/topStudents";
import Image from "next/image";

export default function TopStudents() {
  const [activeBatch, setActiveBatch] = useState(batches[0]);

  return (
    <section className="p-6  text-white rounded-xl">
      <h1 className="text-4xl text-muted-foreground font-bold   lg:text-5xl lg:pl-2 lg:mb-10 md:pl-5 md:mb-5 mb-6">
        TopStudents
      </h1>
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {batches.map((batch) => (
          <Button
            key={batch.id}
            variant={activeBatch.id === batch.id ? "default" : "outline"}
            onClick={() => setActiveBatch(batch)}
          >
            {batch.name}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="text-right">XP</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {activeBatch.students.map((student) => (
            <TableRow key={student.rank}>
              <TableCell className="font-medium">{student.rank}</TableCell>

              <TableCell className="flex items-center gap-3">
                <Image
                width={122}
                height={120}
                  src={student.avatar}
                  alt={student.name}
                  className="w-8 h-8 rounded-full"
                />
                {/* {student.name} */}
              </TableCell>

              <TableCell className="text-right text-blue-400">
                {student.xp}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
