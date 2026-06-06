"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  KeyRound,
  Globe,
  Bell,
  Eye,
  EyeOff,
  Settings,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useChangePasswordMutation } from "@/app/redux/slices/ApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
            checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const t = useTranslations("StudentSettings");
  const locale = useLocale();
  const router = useRouter();

  const [changePassword, { isLoading: isSaving }] = useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [notifLectures, setNotifLectures] = useState(true);
  const [notifAssignments, setNotifAssignments] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("habib_notifications");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifLectures(parsed.lectures ?? true);
      setNotifAssignments(parsed.assignments ?? true);
    }
  }, []);

  const saveNotifications = (lectures: boolean, assignments: boolean) => {
    localStorage.setItem(
      "habib_notifications",
      JSON.stringify({ lectures, assignments })
    );
  };

  const handleLecturesToggle = (v: boolean) => {
    setNotifLectures(v);
    saveNotifications(v, notifAssignments);
  };

  const handleAssignmentsToggle = (v: boolean) => {
    setNotifAssignments(v);
    saveNotifications(notifLectures, v);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t("password.required"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("password.mismatch"));
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      toast.success(t("password.success"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password");
    }
  };

  const switchLanguage = (lang: string) => {
    if (lang === locale) return;
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

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
        <span>{locale === "ar" ? "رجوع" : "Back"}</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-8 shadow-xl border border-slate-700/50"
      >
        <div className="absolute inset-0 bg-indigo-600/5" />
        <div className="absolute -end-16 -top-16 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="p-4 bg-indigo-600/20 rounded-2xl border border-indigo-500/30">
            <Settings className="text-indigo-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{t("title")}</h1>
            <p className="text-slate-400 mt-1 text-sm font-medium">{t("subtitle")}</p>
          </div>
        </div>
      </motion.div>

      {/* Change Password */}
      <SectionCard
        icon={KeyRound}
        iconBg="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
        title={t("password.sectionTitle")}
        subtitle={t("password.sectionSubtitle")}
        delay={0.1}
      >
        <div className="space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("password.current")}
            </Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t("password.placeholder")}
                className="pe-11 bg-slate-50 dark:bg-slate-900/50 border-border/60 rounded-xl h-11"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("password.new")}
            </Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("password.placeholder")}
                className="pe-11 bg-slate-50 dark:bg-slate-900/50 border-border/60 rounded-xl h-11"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("password.confirm")}
            </Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("password.placeholder")}
                className="pe-11 bg-slate-50 dark:bg-slate-900/50 border-border/60 rounded-xl h-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={isSaving}
            className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
          >
            {isSaving ? t("password.saving") : t("password.save")}
          </Button>
        </div>
      </SectionCard>

      {/* Language Settings */}
      <SectionCard
        icon={Globe}
        iconBg="bg-emerald-100 dark:bg-emerald-900/30"
        iconColor="text-emerald-600 dark:text-emerald-400"
        title={t("language.sectionTitle")}
        subtitle={t("language.sectionSubtitle")}
        delay={0.2}
      >
        <div className="grid grid-cols-2 gap-3">
          {(["ar", "en"] as const).map((lang) => {
            const isActive = locale === lang;
            const label = lang === "ar" ? t("language.arabic") : t("language.english");
            return (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`relative flex items-center justify-between gap-3 p-4 rounded-2xl border-2 transition-all duration-200 font-bold text-sm ${
                  isActive
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "border-border/50 bg-slate-50 dark:bg-slate-900/30 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <span className="text-lg">{lang === "ar" ? "🇸🇦" : "🇺🇸"}</span>
                <span className="flex-1 text-start">{label}</span>
                {isActive && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Notification Settings */}
      <SectionCard
        icon={Bell}
        iconBg="bg-purple-100 dark:bg-purple-900/30"
        iconColor="text-purple-600 dark:text-purple-400"
        title={t("notifications.sectionTitle")}
        subtitle={t("notifications.sectionSubtitle")}
        delay={0.3}
      >
        <div className="divide-y divide-border/50 dark:divide-slate-800">
          <NotificationToggle
            label={t("notifications.newLectures")}
            description={t("notifications.newLecturesDesc")}
            checked={notifLectures}
            onChange={handleLecturesToggle}
          />
          <NotificationToggle
            label={t("notifications.assignments")}
            description={t("notifications.assignmentsDesc")}
            checked={notifAssignments}
            onChange={handleAssignmentsToggle}
          />
        </div>
      </SectionCard>
    </div>
  );
}
