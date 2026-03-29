import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GetAllarticles(){
    return (
      <div>
        GetAllarticles
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black"> </h1>

          <Link className="flex items-center " href={"/Admin/articles/create"}>
            <Button variant={"outline"}>
              <ArrowLeft className="rtl:rotate-180" />
              backe
            </Button>
          </Link>
        </div>
      </div>
    );
}