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

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
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

      console.log("reslat", result.data)
      // 🔥 أهم جزء
      const { accessToken, refreshToken, roles } = result.data;
      // ✅ خزّن accessToken
      cookieService.set("token", accessToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      }); 

      // ✅ خزّن refreshToken (ده كان ناقصك)
      cookieService.set("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      toast.success(result.message);

      form.reset({
        email: "",
        password: "",
        rememberMe: true,
      });

      // ✅ redirect حسب role
      if (roles?.includes("Admin")) {
        router.push("/Admin");
      } else {
        router.push("/dashboard"); // غيرها حسب عندك
      }
    } catch (err: unknown) {
      const message = err?.data?.message || err.message || "Login failed";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <Input placeholder={t("emailPlaceholder")} {...field} />
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
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Submit */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? t("loggingIn") : t("loginButton")}
        </Button>
      </form>
    </Form>
  );
}
