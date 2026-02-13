import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/Image.png";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex relative flex-col items-center min-h-screen  justify-center gap-8">
      <div className=" mx-auto  w-full max-w-md p-8 item ">
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "absolute top-4 left-4",
          })}
          href={"/"}
        >
          <ArrowLeft />
          Back
        </Link>

        <div className=" flex w-full max-w-sm justify-center items-center  ">
          <Link
            className="text-center items-center self-center text-muted-foreground font-medium"
            href={"/"}
          >
            Habib Academy.
          </Link>
          <div></div>
          <Image src={Logo} alt="sds" width={50} height={40} />
        </div>
        {children}

        <div className="text-balance  text-center text-sm hover:text-primary cursor-pointer hover:underline ">
          containue to policy, termes of services
        </div>
      </div>
    </div>
  );
}
