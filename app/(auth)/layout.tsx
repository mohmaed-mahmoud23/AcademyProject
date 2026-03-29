import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/images/Habib academy svg Logo.svg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations("Auth");

  return (
    <div className="flex relative flex-col items-center min-h-screen justify-center gap-8">
      <div className="mx-auto w-full max-w-md p-8">
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "absolute top-4 start-4",
          })}
          href={"/"}
        >
          <ArrowLeft />
          {t("back")}
        </Link>

        <div className="flex w-full max-w-sm justify-center items-center">
          <Link
            className="text-center items-center self-center text-muted-foreground font-medium"
            href={"/"}
          >
            {t("brand")}
          </Link>
          <div></div>
          <Image src={Logo} alt="logo" width={100} height={100}  className="rounded-full"/>
        </div>
        {children}

        <div className="text-balance text-center text-sm hover:text-primary cursor-pointer hover:underline mt-4">
          {t("policy")}
        </div>
      </div>
    </div>
  );
}
