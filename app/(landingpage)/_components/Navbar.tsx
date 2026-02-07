"use client";

import Image from "next/image";
import LoGO from "@/public/Image.png";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemToggle } from "@/components/ui/themToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between md:px-6 lg:px-8 min-h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center ">
          <Image src={LoGO} alt="Logo" width={60} height={20} />
          <span className="font-bold text-lg">Habib Academy.</span>
        </Link>

        {/* Desktop Navigation */}
        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-2">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Login
          </Link>

          <Link href="/get-started" className={buttonVariants()}>
            Get Started
          </Link>
          <ThemToggle/>
        </nav>

        {/* Mobile Hamburger (Optional) */}
        <div className="md:hidden">
          {/* لاحقًا ممكن تحط أيقونة الهامبرجر */}
        </div>
      </div>
    </header>
  );
}
