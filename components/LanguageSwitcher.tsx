"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Navbar");

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "ar" : "en";
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 font-medium"
        >
            <Globe size={14} />
            {t("switchLang")}
        </Button>
    );
}
