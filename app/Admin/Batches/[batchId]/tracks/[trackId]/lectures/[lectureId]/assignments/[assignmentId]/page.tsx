"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  useCloseAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentByIdQuery,
} from "@/app/redux/slices/ApiSlice";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import EditLectureModal from "@/components/EditLectureModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
export default function AssignmentDetailsPage() {
  const { assignmentId, batchId, lectureId, trackId } = useParams() as {
    assignmentId: string;
    trackId: string;
    batchId: string;
    lectureId: string;
  };
const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  // 🔹 كل الـ Hooks لازم تكون فوق
  const [closeAssignment, { isLoading: isClosing }] =
    useCloseAssignmentMutation();

  const [deleteAssignment, { isLoading: isDeleting }] =
    useDeleteAssignmentMutation();

  const { data, isLoading, isError } = useGetAssignmentByIdQuery(assignmentId);

  // 🔹 الشروط بعد الـ Hooks
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !data?.data) {
    return <p className="text-center mt-10">Assignment not found</p>;
  }

  const assignment = data.data;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const res = await deleteAssignment(assignment.id).unwrap();
      toast.success(res.message);

      router.push(
        `/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments`,
      );
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleClose = async () => {
    try {
      const resultCloseAssignment = await closeAssignment(
        assignment.id,
      ).unwrap();

      toast.success(resultCloseAssignment.message);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-full w-full mx-auto mt-10 px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Assignment Details
      </h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            {assignment.title}
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Max Score</span>
                <span className="font-medium">{assignment.maxScore}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium">
                  {new Date(assignment.dueDate).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={
                    assignment.isClosed
                      ? "text-red-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  {assignment.isClosed ? "Closed" : "Open"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Lecture</span>
                <span className="font-medium">{assignment.lectureTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Track</span>
                <span className="font-medium">{assignment.trackName}</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      `/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments/${assignment.id}/submissions`,
                    )
                  }
                >
                  View Submissions
                </Button>

                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  onClick={() =>
                    router.push(
                      `/Admin/Batches/${batchId}/tracks/${trackId}/lectures/${lectureId}/assignments/${assignment.id}/stats`,
                    )
                  }
                >
                  View Stats
                </Button>

                <Button
                  disabled={assignment.isClosed || isClosing}
                  onClick={handleClose}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                >
                  {assignment.isClosed ? "Already Closed" : "Close Assignment"}
                </Button>

           <Dialog open={openDelete} onOpenChange={setOpenDelete}>
  <DialogTrigger asChild>
    <Button
      disabled={isDeleting}
      className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md"
    >
      Delete Assignment
    </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Assignment</DialogTitle>
    </DialogHeader>

    <p className="text-sm text-gray-500">
      Are you sure you want to delete this assignment? This action cannot be
      undone.
    </p>

    <DialogFooter className="mt-4">
      <Button variant="outline" onClick={() => setOpenDelete(false)}>
        Cancel
      </Button>

      <Button
        variant="destructive"
        disabled={isDeleting}
        onClick={async () => {
          try {
            const res = await deleteAssignment(assignment.id).unwrap();
            toast.success(res.message);

            router.push(
              `/Admin/Batches/${batchId}/tracks/${trackId}/lectures`,
            );
          } catch {
            toast.error("Delete failed");
          }
        }}
      >
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
              </div>
            </div>


            
          </AccordionContent>
          
        </AccordionItem>
      </Accordion>
    </div>
  );
}
