/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useLoginMutation } from "@/app/redux/slices/ApiSlice";
import { LoginResponse } from "@/app/interfaces";
import { LoginFormType, loginSchema } from "@/lib/zodSecma";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import cookieService from "@/lib/cookieService";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations("Login");

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    setErrorMessage("");
    try {
      const result: LoginResponse = await login(data).unwrap();
      const { accessToken, refreshToken, roles } = result.data;

      cookieService.set("token", accessToken, { path: "/", secure: true, sameSite: "Strict" });
      cookieService.set("refreshToken", refreshToken, { path: "/", secure: true, sameSite: "Strict" });

      toast.success(result.message);
      form.reset({ email: "", password: "", rememberMe: true });

      if (roles?.includes("Admin")) {
        router.push("/Admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const message = err?.data?.message || err.message || "Login failed";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold text-foreground">{t("loginButton")}</h2>
        <p className="text-sm text-muted-foreground">{t("emailPlaceholder")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  {t("username")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("emailPlaceholder")}
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
                  {t("password")}
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="h-11 w-full bg-card border-border focus-visible:ring-primary/40 pe-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

          {/* Error message */}
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
                {t("loggingIn")}
              </>
            ) : (
              <>
                <LogIn size={16} />
                {t("loginButton")}
              </>
            )}
          </Button>

        </form>
      </Form>
    </div>
  );
}
