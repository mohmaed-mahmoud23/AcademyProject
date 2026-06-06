"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  Users,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SectionCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-[2rem] border border-border/50 dark:border-slate-800 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-border/50 dark:border-slate-800 flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${iconBg}`}>
          <Icon size={22} className={iconColor} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}


export default function HelpPage() {
  const t = useTranslations("StudentHelp");
  const locale = useLocale();
  const router = useRouter();
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  const members = [
    {
      name: locale === "ar" ? "محمود حبيب" : "Mahmoud Habib",
      role: locale === "ar" ? "المدير التنفيذي (CEO)" : "Chief Executive Officer (CEO)",
      whatsapp: "https://wa.me/201064501682",
      image: "/WhatsApp Image 2026-06-05 at 17.54.18.jpeg",
    },
    {
      name: locale === "ar" ? "محمد محمود" : "Mohamed Mahmoud",
      role: locale === "ar" ? "خبرة 3 سنوات | دعم فني" : "3 Years Experience | Technical Support",
      whatsapp: "https://wa.me/201063264363",
      image: "/team/mahmoud_mahmoud.png",
    },
    {
      name: locale === "ar" ? "حلا" : "Hala",
      role: locale === "ar" ? "متخصصة دعم" : "Support Specialist",
      whatsapp: "https://wa.me/905313869483",
      image: "/team/hala.png",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Mobile back button */}
      <motion.button
        initial={{ opacity: 0, x: locale === "ar" ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="md:hidden flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <BackIcon size={18} />
        <span>{t("back")}</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-800 to-violet-700 dark:from-violet-900 dark:via-purple-950 dark:to-violet-900 p-8 shadow-xl border border-violet-600/30"
      >
        <div className="absolute inset-0 bg-white/5" />
        <div className="absolute -end-16 -top-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
            <HelpCircle className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{t("title")}</h1>
            <p className="text-violet-200 mt-1 text-sm font-medium">{t("subtitle")}</p>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <SectionCard
        icon={HelpCircle}
        iconBg="bg-amber-100 dark:bg-amber-900/30"
        iconColor="text-amber-600 dark:text-amber-400"
        title={t("faq.sectionTitle")}
        subtitle={t("faq.sectionSubtitle")}
        delay={0.1}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-border/50 dark:border-slate-800">
              <AccordionTrigger className="text-start font-semibold text-foreground hover:no-underline py-4 text-sm">
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed ps-9">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionCard>

      {/* Support Team */}
      <SectionCard
        icon={Users}
        iconBg="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
        title={t("team.sectionTitle")}
        subtitle={t("team.sectionSubtitle")}
        delay={0.2}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + idx * 0.07 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-border/40 dark:border-slate-800 text-center group hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">{member.role}</p>
              </div>
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs font-bold mt-1"
              >
                <MessageCircle size={14} />
                واتساب
              </a>
            </motion.div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}
