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

export default function ActivatePage() {
  const [activate, { isLoading }] = useActiveStudentMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<ActiveStudentCodeType>({
    resolver: zodResolver(activeScemaStudent),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const onSubmit = async (data: ActiveStudentCodeType) => {
    setErrorMessage("");

    try {
      const res = await activate(data).unwrap();
      console.log("resaxctive", res);

      cookieService.set("token", res.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      cookieService.set("refreshToken", res.data.refreshToken, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      toast.success(res.message || "Account activated successfully 🔥");

      form.reset({
        code: "",
        password: "",
      });

      setTimeout(() => {
        router.push("Login");
      }, 1500);
    } catch (err: any) {
      const message = err?.data?.message || err.message || "Activation failed";

      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Activate Account</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activation Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your code" {...field} />
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
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Activating..." : "Activate Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
