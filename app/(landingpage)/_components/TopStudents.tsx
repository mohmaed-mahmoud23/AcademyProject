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

import { Button } from "@/components/ui/button"
import Image from "next/image";

export default function TopStudents() {
  


 const batches = [
  {
    id: 1,
    name: "Batch 1",
    students: [
      { rank: 1, name: "Jordan Smith", xp: 12450, avatar: "/Image.png" },
      { rank: 2, name: "Elena Rigby", xp: 11200, avatar: "/Image.png" },
      { rank: 3, name: "Marcus Vane", xp: 9840, avatar: "/Image.png" },
      { rank: 4, name: "Liam Noor", xp: 9300, avatar: "/Image.png" },
      { rank: 5, name: "Sara Ali", xp: 8900, avatar: "/Image.png" },
    ]
  },
  {
    id: 2,
    name: "Batch 2",
    students: [
      { rank: 1, name: "Omar Adel", xp: 13100, avatar: "/Image.png" },
      { rank: 2, name: "Mona Samy", xp: 12050, avatar: "/Image.png" },
      { rank: 3, name: "Youssef Ashraf", xp: 10100, avatar: "/Image.png" },
      { rank: 4, name: "Hana Nabil", xp: 9500, avatar: "/Image.png" },
      { rank: 5, name: "Kareem Fathi", xp: 9100, avatar: "/Image.png" },
    ]
  },
  {
    id: 3,
    name: "Batch 3",
    students: [
      { rank: 1, name: "mohamed", xp: 13100, avatar: "/Image.png" },
      { rank: 2, name: "saif", xp: 12050, avatar: "/Image.png" },
      { rank: 3, name: "maryem", xp: 10100, avatar: "/Image.png" },
      { rank: 4, name: "nehal", xp: 9500, avatar: "/Image.png" },
      { rank: 5, name: "karma", xp: 9100, avatar: "/Image.png" },
    ]
  }
];

  const [activeBatch, setActiveBatch] = useState(batches[0]);

  return (
    <section className="p-6   rounded-xl">
      <h1 className="text-4xl text-muted-foreground font-bold   lg:text-5xl lg:pl-2 lg:mb-10 md:pl-5 md:mb-5 mb-6">
        Top Students
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
                {student.name}
              </TableCell>

              <TableCell className="text-right ">
                {student.xp}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
