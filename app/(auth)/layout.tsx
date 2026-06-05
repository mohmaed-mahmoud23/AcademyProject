import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/habib-logo.jpg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("Auth");

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-5 inset-s-5 z-10 group flex items-center gap-2 bg-card/60 backdrop-blur-md border border-border hover:border-primary/40 text-muted-foreground hover:text-primary rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm"
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
          <ArrowLeft size={11} />
        </span>
        <Home size={13} />
        {t("back")}
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="p-1 rounded-2xl bg-primary/10 border border-primary/20">
            <Image src={Logo} alt="logo" width={56} height={56} className="rounded-xl" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">
              Habib <span className="text-primary">Academy</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("brand")}</p>
          </div>
        </div>

        {children}

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          {t("policy")}
        </p>
      </div>

    </div>
  );
}
