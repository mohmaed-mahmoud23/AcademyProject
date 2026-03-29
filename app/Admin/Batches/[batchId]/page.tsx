"use client";

import {
  BatchDatadetails,
  BatchStudent,
  CreateStudentResponse,
  Track,
} from "@/app/interfaces";


import { MoreHorizontal, Eye, Pencil, Trash2, Edit2Icon } from "lucide-react";
import {
  useADminCreatestudentMutation,
  useDeleteStudentMutation,
  useDeleteTrackMutation,
  useGetBatchdetailsQuery,
  useGetBatchStudentsQuery,
  useGetBatchtracksQuery,
  usePostbatchTracksMutation,
} from "@/app/redux/slices/ApiSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateStudentFormValues,
  createStudentSchema,
  secmanametrack,
} from "@/lib/zodSecma";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DeleteIcon } from "lucide-react";
import { useParams } from "next/navigation";
import EditTrackModal from "@/components/EditTrackModal";

export default function BatchDetails() {
  const { batchId } = useParams() as { batchId: string };
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteStudent] = useDeleteStudentMutation();

  const [createTrack, { isLoading: Loading }] = usePostbatchTracksMutation();

  // batch details
  const { data: batchRes, isLoading: batchLoading } =
    useGetBatchdetailsQuery(batchId);
  const [Createstudent, { isLoading }] = useADminCreatestudentMutation();
  const [backendErrors, setBackendErrors] = useState<string | null>(null);
  const [createdStudent, setCreatedStudent] =
    useState<CreateStudentResponse | null>(null);

  const studentForm = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
    },
  });
  const onStudentSubmit = async (data: CreateStudentFormValues) => {
    try {
      const result = await Createstudent({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        batchId: batchId,
      }).unwrap();

      setCreatedStudent(result);
      console.log(result);

      toast.success("Student created successfully");
    } catch (err: any) {
      toast.error(err.data?.message || "Error");
    }
  };

  const trackForm = useForm({
    resolver: zodResolver(secmanametrack),
    defaultValues: {
      name: "",
    },
  });

  const onTrackSubmit = async (data: { name: string }) => {
    try {
      const result = await createTrack({
        batchId: batchId,
        name: data.name,
      }).unwrap();

      toast.success(result.message);

      console.log(result);
    } catch (err: any) {
      toast.error(err.data?.message || "tracks is added Conflict");
    }
  };
  const handleDelete = async (studentId: string) => {
    if (!batch) return;

    try {
      await deleteStudent({ batchId: batch.id, studentId }).unwrap();
      toast.success("Student deleted successfully");
      // ممكن تحدث قائمة الطلاب بعد الحذف
    } catch (error: any) {
      console.error("Failed to delete student:", error);
      toast.error(error.data?.message || "Failed to delete student");
    }
  };
  // batch students
  const { data: studentsRes, isLoading: studentsLoading } =
    useGetBatchStudentsQuery(batchId);
  const [deleteTrack] = useDeleteTrackMutation();

  // batch tracks
  const { data: tracksRes, isLoading: tracksLoading } =
    useGetBatchtracksQuery(batchId);

  if (batchLoading || studentsLoading || tracksLoading)
    return <div>Loading...</div>;

  const batch: BatchDatadetails | undefined = batchRes?.data;
  const students: BatchStudent[] = studentsRes?.data ?? [];
  const tracks: Track[] = tracksRes?.data ?? [];

  const handleDeleteTrack = async (trackId: string) => {
    try {
      const resalt = await deleteTrack(trackId).unwrap();
      toast.success(resalt.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete track");
    }
  };
  return (
    <div className="space-y-6 p-6">
      {/* Batch Details Card */}
      <Card className="rounded-2xl shadow-lg border p-4 hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Batch Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of this batch
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Batch Name */}
            <div className="flex flex-col items-start p-4 border rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📛</span>
                <span className="text-sm text-muted-foreground font-medium">
                  Name
                </span>
              </div>
              <span className="text-lg font-semibold">
                {batch?.name || "-"}
              </span>
            </div>

            {/* Start Date */}
            <div className="flex flex-col items-start p-4 border rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📅</span>
                <span className="text-sm text-muted-foreground font-medium">
                  Start Date
                </span>
              </div>
              <span className="text-lg font-semibold">
                {batch ? new Date(batch.startDate).toLocaleDateString() : "-"}
              </span>
            </div>

            {/* Total Students */}
            <div className="flex flex-col items-start p-4 border rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👩‍🎓</span>
                <span className="text-sm text-muted-foreground font-medium">
                  Students
                </span>
              </div>
              <span className="text-lg font-semibold">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {students.length}
                </span>
              </span>
            </div>

            {/* Total Tracks */}
            <div className="flex flex-col items-start p-4 border rounded-xl hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <span className="text-sm text-muted-foreground font-medium">
                  Tracks
                </span>
              </div>
              <span className="text-lg font-semibold">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {tracks.length}
                </span>
              </span>
            </div>
          </div>

          {/* Optional: Progress Indicator for Batch */}
          <div className="mt-6">
            <h3 className="text-sm text-muted-foreground mb-2 font-medium">
              Batch Progress Overview
            </h3>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${Math.min((students.length / 50) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {students.length} / 50 students enrolled
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Students Section */}
      <Card className="rounded-2xl shadow-sm border">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">
              Batch Students
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Total Students: {students.length}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl">+ Add Student</Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Add New Student
                  </DialogTitle>
                </DialogHeader>

                <Form {...studentForm}>
                  <form
                    onSubmit={studentForm.handleSubmit(onStudentSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={studentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-xl"
                              type="email"
                              placeholder="Enter email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={studentForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                className="rounded-xl"
                                placeholder="First name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={studentForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                className="rounded-xl"
                                placeholder="Last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={studentForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full rounded-xl">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full rounded-xl">
                      Create Student
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <TableRow
                      key={student.studentId}
                      className="hover:bg-muted/30 transition"
                    >
                      {/* Name */}
                      <TableCell className="font-medium">
                        {student.fullName}
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-muted-foreground">
                        {student.email}
                      </TableCell>

                      {/* Rank Badge */}
                      <TableCell>
                        <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                          #{student.rank}
                        </span>
                      </TableCell>

                      {/* Average Score with Progress */}
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {student.averageScore}%
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${student.averageScore}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right space-x-2">
                        <Link
                          href={`/Admin/Batches/${batchId}/tracks/${tracks[0]?.id}/students/${student.studentId}/progress`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl"
                          >
                            View
                          </Button>
                        </Link>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(student.studentId)}
                        >
                          <DeleteIcon className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tracks Section */}
      <Card className="shadow-sm border rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Batch Tracks</CardTitle>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-xl">
                + Create Track
              </Button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  Add New Track
                </DialogTitle>
              </DialogHeader>

              <Form {...trackForm}>
                <form
                  onSubmit={trackForm.handleSubmit(onTrackSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={trackForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-xl"
                            placeholder="Enter track name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full rounded-xl">
                    Create Track
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {tracks.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-3">
              {tracks.map((track) => (
                <AccordionItem
                  key={track.id}
                  value={track.id}
                  className="border rounded-xl px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between w-full pe-4">
                      <span className="font-medium">{track.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {track.lectureCount} Lectures
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/30">
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/Admin/Batches/${batchId}/tracks/${track.id}`}
                        >
                          <Button
                            size="sm"
                            variant="default"
                            className="flex items-center gap-2"
                          >
                            <Eye /> View
                          </Button>
                        </Link>
                        <EditTrackModal track={track} />

                      </div>

                      {/* Danger zone */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Trash2 /> Delete
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Track</DialogTitle>
                          </DialogHeader>

                          <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete this track? This
                            action cannot be undone.
                          </p>

                          <DialogFooter className="mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>

                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteTrack(track.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              No tracks found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
