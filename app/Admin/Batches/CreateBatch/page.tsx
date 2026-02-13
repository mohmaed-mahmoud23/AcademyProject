import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function createBatches(){
  return (
    <>
      <div className=" flex items-center justify-between   gap-4">
        <div>
          <h1> create Batch </h1>
        </div>
        <Link
          href={"/Admin/Batches"}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeftIcon className=" size-4" />
        </Link>
      </div>
    </>
  );
}