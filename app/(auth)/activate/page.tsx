/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activeScemaStudent, ActiveStudentCodeType } from "@/lib/zodSecma";
import { useActiveStudentMutation } from "@/app/redux/slices/ApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import cookieService from "@/lib/cookieService";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

export default function ActivatePage() {
  const [activate, { isLoading }] = useActiveStudentMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations("Activate");

  const form = useForm<ActiveStudentCodeType>({
    resolver: zodResolver(activeScemaStudent),
    defaultValues: { code: "", password: "" },
  });

  const onSubmit = async (data: ActiveStudentCodeType) => {
    setErrorMessage("");
    try {
      const res = await activate(data).unwrap();

      cookieService.set("token", res.data.accessToken, { path: "/", secure: true, sameSite: "Strict" });
      cookieService.set("refreshToken", res.data.refreshToken, { path: "/", secure: true, sameSite: "Strict" });

      toast.success(res.message || "Account activated successfully 🔥");
      form.reset({ code: "", password: "" });

      setTimeout(() => { router.push("Login"); }, 1500);
    } catch (err: any) {
      const message = err?.data?.message || err.message || "Activation failed";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  {t("codeLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("codePlaceholder")}
                    className="h-11 bg-card border-border focus-visible:ring-primary/40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  {t("passwordLabel")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="h-11 bg-card border-border focus-visible:ring-primary/40 pe-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error */}
          {errorMessage && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-2.5">
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 font-semibold gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t("activating")}
              </>
            ) : (
              <>
                <KeyRound size={16} />
                {t("submitButton")}
              </>
            )}
          </Button>

        </form>
      </Form>
    </div>
  );
}
