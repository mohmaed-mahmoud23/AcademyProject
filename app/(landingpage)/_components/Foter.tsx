"use client";
import Logo from "@/public/images/Habib academy svg Logo.svg";
import { Globe, Share2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description + Social */}
        <div className="space-y-4">
          <h2 className="flex items-center font-bold text-lg text-primary">
            <Image src={Logo} alt="image" width={50} height={50} />
            <Share2 size={20} />
            Habib Academy.
          </h2>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
          <div className="flex gap-3">
            <button className={buttonVariants({ variant: "outline", size: "icon" })}>
              <Share2 size={16} />
            </button>
            <button className={buttonVariants({ variant: "outline", size: "icon" })}>
              <Globe size={16} />
            </button>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="space-y-2">
          <h3 className="font-semibold">{t("services")}</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">{t("service1")}</li>
            <li className="hover:text-primary cursor-pointer">{t("service2")}</li>
            <li className="hover:text-primary cursor-pointer">{t("service3")}</li>
            <li className="hover:text-primary cursor-pointer">{t("service4")}</li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="space-y-2">
          <h3 className="font-semibold">{t("company")}</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">
              <Link href="/about">{t("company1")}</Link>
            </li>
            <li className="hover:text-primary cursor-pointer">{t("company2")}</li>
            <li className="hover:text-primary cursor-pointer">{t("company3")}</li>
            <li className="hover:text-primary cursor-pointer">{t("company4")}</li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="space-y-2">
          <h3 className="font-semibold">{t("support")}</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer">{t("support1")}</li>
            <li className="hover:text-primary cursor-pointer">{t("support2")}</li>
            <li className="hover:text-primary cursor-pointer">{t("support3")}</li>
            <li className="hover:text-primary cursor-pointer">{t("support4")}</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex flex-col gap-1">
            <span>{t("copyright")}</span>
            <span className="text-xs font-semibold text-primary/80">{t("developer")}</span>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <button
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " flex items-center gap-1"
              }
            >
              <Globe size={14} /> {t("language")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
