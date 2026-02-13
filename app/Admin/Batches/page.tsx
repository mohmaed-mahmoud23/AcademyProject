import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Batches(){
  return (
    <>
      <div className=" flex items-center justify-between  ">
        
        <h1 className="text-2xl font-black"> All Batches </h1>
        <Link className={buttonVariants()} href={"/Admin/Batches/CreateBatch"}>
          Create cours
        </Link>
      </div>

      <div>
        <h1> Here you show all Your Batches </h1>
      </div>
    </>
  );
}